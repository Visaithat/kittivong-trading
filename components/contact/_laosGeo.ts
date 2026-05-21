import * as THREE from "three";
import { geoMercator } from "d3-geo";
import type { Feature, FeatureCollection, Polygon } from "geojson";

export const PLANE_W = 2.4;
export const PLANE_H = 3.2;
export const PROVINCE_DEPTH = 0.08;
export const CAPITAL_DEPTH = 0.22;

export type LaoProps = { shapeISO: string; shapeName: string };
export type LaoFeature = Feature<Polygon, LaoProps>;
export type LaoFC = FeatureCollection<Polygon, LaoProps>;

export type Tier = "north" | "central" | "south" | "capital";

const NORTHERN = new Set(["LA-PH", "LA-LM", "LA-BK", "LA-OU", "LA-HO", "LA-LP"]);
const CENTRAL = new Set(["LA-XA", "LA-XI", "LA-XN", "LA-VI", "LA-BL", "LA-KH"]);

export const COLOR_BY_TIER: Record<Tier, string> = {
  north: "#bbf7d0",
  central: "#86efac",
  south: "#4ade80",
  capital: "#16a34a",
};

export const EDGE_COLOR = "#047857";

export function tierForIso(iso: string): Tier {
  if (iso === "LA-VT") return "capital";
  if (NORTHERN.has(iso)) return "north";
  if (CENTRAL.has(iso)) return "central";
  return "south";
}

export type ProvinceGeom = {
  iso: string;
  name: string;
  tier: Tier;
  depth: number;
  geometry: THREE.ExtrudeGeometry;
  edges: THREE.EdgesGeometry;
  /** Planar centroid in scene space, lifted to top of the prism. [x, y, z] with Y up. */
  centroidTop: [number, number, number];
};

export type BuiltScene = {
  provinces: ProvinceGeom[];
  vtCentroidTop: [number, number, number];
};

const EXTRUDE_OPTS = {
  bevelEnabled: true,
  bevelSize: 0.006,
  bevelThickness: 0.006,
  bevelSegments: 2,
  curveSegments: 1,
};

/**
 * Compute lon/lat bounding box directly from coordinates. We skip d3-geo's
 * `geoBounds` because geoBoundaries' GeoJSON winds outer rings clockwise
 * (Shapefile convention), which d3-geo interprets as "the whole globe minus
 * this region" — making `geoBounds(fc)` return [[-180,-90],[180,90]] and
 * `fitSize` collapse everything to a single pixel.
 */
function lonLatBounds(fc: LaoFC) {
  let minLon = Infinity;
  let maxLon = -Infinity;
  let minLat = Infinity;
  let maxLat = -Infinity;
  for (const f of fc.features) {
    for (const ring of f.geometry.coordinates) {
      for (const [lon, lat] of ring) {
        if (lon < minLon) minLon = lon;
        if (lon > maxLon) maxLon = lon;
        if (lat < minLat) minLat = lat;
        if (lat > maxLat) maxLat = lat;
      }
    }
  }
  return { minLon, maxLon, minLat, maxLat };
}

export function buildProvinceGeoms(fc: LaoFC): BuiltScene {
  // Build the Mercator projection by hand instead of fitSize — see the bounds
  // helper above for why fitSize fails on this data.
  const { minLon, maxLon, minLat, maxLat } = lonLatBounds(fc);
  const centerLon = (minLon + maxLon) / 2;
  const centerLat = (minLat + maxLat) / 2;
  const dLon = maxLon - minLon;
  const dLat = maxLat - minLat;
  const cosLat = Math.cos((centerLat * Math.PI) / 180);
  // Mercator scale s gives: dx ≈ s * (PI/180) * dLon, dy ≈ s * (PI/180) * dLat / cos(lat).
  // Pick the smaller of the two so the country fits inside the plane on both axes.
  const scaleX = (PLANE_W / (dLon * (Math.PI / 180))) * 0.78;
  const scaleY = ((PLANE_H * cosLat) / (dLat * (Math.PI / 180))) * 0.78;
  const scale = Math.min(scaleX, scaleY);

  const projection = geoMercator()
    .center([centerLon, centerLat])
    .scale(scale)
    .translate([PLANE_W / 2, PLANE_H / 2]);

  // Center the planar coords on origin: the projection puts the center of
  // Laos at (PLANE_W/2, PLANE_H/2); subtract to put it at world origin.
  const cx = PLANE_W / 2;
  const cy = PLANE_H / 2;

  const provinces: ProvinceGeom[] = [];
  let vtCentroidTop: BuiltScene["vtCentroidTop"] = [0, CAPITAL_DEPTH, 0];

  for (const feature of fc.features) {
    const iso = feature.properties.shapeISO;
    const tier = tierForIso(iso);
    const depth = tier === "capital" ? CAPITAL_DEPTH : PROVINCE_DEPTH;

    const ring = feature.geometry.coordinates[0];
    if (!ring || ring.length < 3) continue;

    // Project each ring vertex into shape-local space (centered at origin,
    // Y flipped so north is +Y in the shape's local plane).
    const shapePts: Array<[number, number]> = [];
    for (const coord of ring) {
      const projected = projection(coord as [number, number]);
      if (!projected) continue;
      shapePts.push([projected[0] - cx, cy - projected[1]]);
    }
    if (shapePts.length < 3) continue;

    const shape = new THREE.Shape();
    shape.moveTo(shapePts[0][0], shapePts[0][1]);
    for (let i = 1; i < shapePts.length; i++) {
      shape.lineTo(shapePts[i][0], shapePts[i][1]);
    }

    const geometry = new THREE.ExtrudeGeometry(shape, {
      ...EXTRUDE_OPTS,
      depth,
    });
    // Extrusion happens along +Z in shape-local space. We rotate the mesh so
    // the extruded thickness becomes scene Y (up). Doing it on the geometry
    // (not the mesh) keeps the centroid math simple.
    geometry.rotateX(-Math.PI / 2);
    geometry.computeVertexNormals();

    // Sharp-edge outline (>22° dihedral). Renders as <lineSegments> for clean
    // province borders without the noisy ExtrudeGeometry triangulation.
    const edges = new THREE.EdgesGeometry(geometry, 22);

    // Area-weighted polygon centroid (shoelace formula). We compute manually
    // because d3-geo's `path.centroid` uses spherical math and the CW-wound
    // input data produces nonsense (~the antipode) for this collection.
    const [shapeCx, shapeCy] = polygonCentroid(shapePts);
    // After rotateX(-PI/2), shape-local (x, y) lands at scene (x, depth, -y).
    const top: [number, number, number] = [shapeCx, depth + 0.001, -shapeCy];

    provinces.push({
      iso,
      name: feature.properties.shapeName,
      tier,
      depth,
      geometry,
      edges,
      centroidTop: top,
    });

    if (iso === "LA-VT") vtCentroidTop = top;
  }

  return { provinces, vtCentroidTop };
}

function polygonCentroid(pts: ReadonlyArray<[number, number]>): [number, number] {
  let twiceArea = 0;
  let cx = 0;
  let cy = 0;
  for (let i = 0, n = pts.length; i < n; i++) {
    const [x0, y0] = pts[i];
    const [x1, y1] = pts[(i + 1) % n];
    const cross = x0 * y1 - x1 * y0;
    twiceArea += cross;
    cx += (x0 + x1) * cross;
    cy += (y0 + y1) * cross;
  }
  if (twiceArea === 0) {
    // Degenerate — fall back to vertex mean.
    let sx = 0;
    let sy = 0;
    for (const [x, y] of pts) {
      sx += x;
      sy += y;
    }
    return [sx / pts.length, sy / pts.length];
  }
  const sixArea = 3 * twiceArea;
  return [cx / sixArea, cy / sixArea];
}
