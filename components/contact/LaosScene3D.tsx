"use client";

import {
  Suspense,
  memo,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  ContactShadows,
  Html,
  Line,
  OrbitControls,
} from "@react-three/drei";
import * as THREE from "three";
import {
  buildProvinceGeoms,
  COLOR_BY_TIER,
  EDGE_COLOR,
  type BuiltScene,
  type LaoFC,
  type ProvinceGeom,
} from "./_laosGeo";
import { hubs } from "@/lib/hubs";
import { useLocale } from "@/lib/i18n";

const LABEL_ISOS = new Set([
  "LA-VT", // Vientiane Capital
  "LA-LP", // Luang Prabang
  "LA-SV", // Savannakhet
  "LA-CH", // Champasack
  "LA-HO", // Houaphan
  "LA-PH", // Phongsaly
]);

const HUB_BY_ISO = new Map(hubs.map((h) => [h.iso, h]));

export default function LaosScene3D() {
  const [fc, setFc] = useState<LaoFC | null>(null);

  useEffect(() => {
    let alive = true;
    fetch("/geo/laos-admin1.geojson")
      .then((r) => r.json() as Promise<LaoFC>)
      .then((data) => {
        if (alive) setFc(data);
      })
      .catch(() => {
        // Silent — the badge + legend chrome remain meaningful even on load failure.
      });
    return () => {
      alive = false;
    };
  }, []);

  const built = useMemo<BuiltScene | null>(
    () => (fc ? buildProvinceGeoms(fc) : null),
    [fc]
  );

  // Dispose extrude geometries on unmount / data change to avoid leaks.
  useEffect(() => {
    return () => {
      built?.provinces.forEach((p) => {
        p.geometry.dispose();
        p.edges.dispose();
      });
    };
  }, [built]);

  return (
    <Canvas
      // shadows="percentage" → THREE.PCFShadowMap, the supported non-deprecated
      // shadow map type. Plain `shadows` would default to PCFSoftShadowMap
      // which THREE 0.184+ emits a deprecation warning for.
      shadows="percentage"
      dpr={[1, 2]}
      camera={{ position: [0, 2.4, 3.6], fov: 28 }}
      // alpha:true gives a transparent canvas background — no need for an
      // explicit <color attach="background"/>, which trips THREE.Color when
      // given an 8-char hex like "#ffffff00".
      gl={{ antialias: true, alpha: true }}
      style={{ width: "100%", height: "100%", display: "block" }}
    >
      <ambientLight intensity={0.55} />
      <directionalLight
        position={[2.5, 4, 3]}
        intensity={1.05}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={12}
        shadow-camera-left={-3}
        shadow-camera-right={3}
        shadow-camera-top={3}
        shadow-camera-bottom={-3}
      />
      <directionalLight position={[-2.5, 1.8, -2]} intensity={0.35} color="#a7e8c2" />

      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>

      {built && (
        <SceneBody built={built} />
      )}

      <mesh
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, -0.001, 0]}
        receiveShadow
      >
        <planeGeometry args={[PLANE_BG_W, PLANE_BG_H]} />
        <shadowMaterial transparent opacity={0.18} />
      </mesh>

      <ContactShadows
        position={[0, 0, 0]}
        opacity={0.22}
        scale={5}
        blur={2.6}
        far={2}
        color="#0e1a13"
      />

      <OrbitControls
        makeDefault
        enablePan={false}
        enableRotate
        enableZoom
        minDistance={2.2}
        maxDistance={5.4}
        minPolarAngle={Math.PI * 0.16}
        maxPolarAngle={Math.PI * 0.49}
        minAzimuthAngle={-Math.PI * 0.55}
        maxAzimuthAngle={Math.PI * 0.55}
        rotateSpeed={0.7}
        zoomSpeed={0.7}
        enableDamping
        dampingFactor={0.12}
        autoRotate
        autoRotateSpeed={0.45}
        target={[0, 0.08, 0]}
        touches={{ ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_PAN }}
      />
    </Canvas>
  );
}

const PLANE_BG_W = 4.2;
const PLANE_BG_H = 5.6;

function SceneBody({ built }: { built: BuiltScene }) {
  const { provinces, vtCentroidTop } = built;

  const arcs = useMemo(() => {
    return provinces
      .filter((p) => p.iso !== "LA-VT")
      .map((p, i) => ({
        province: p,
        curve: arcCurve(vtCentroidTop, p.centroidTop),
        phase: (i % 8) * 0.3,
      }));
  }, [provinces, vtCentroidTop]);

  return (
    <group>
      {provinces.map((p) => (
        <ProvincePrism key={p.iso} province={p} />
      ))}

      <pointLight
        position={[vtCentroidTop[0], vtCentroidTop[1] + 0.3, vtCentroidTop[2]]}
        intensity={0.55}
        distance={1.4}
        color="#22c55e"
      />

      {arcs.map(({ province, curve, phase }) => (
        <RouteArc key={`arc-${province.iso}`} curve={curve} phase={phase} />
      ))}

      <PulseRings center={vtCentroidTop} />

      <VtBeacon center={vtCentroidTop} />

      {provinces.map((p) => {
        if (p.iso === "LA-VT") return null;
        return <ProvinceMarker key={`m-${p.iso}`} center={p.centroidTop} />;
      })}

      <Labels provinces={provinces} />
    </group>
  );
}

const ProvincePrism = memo(function ProvincePrism({
  province,
}: {
  province: ProvinceGeom;
}) {
  const isCapital = province.tier === "capital";
  return (
    <group>
      <mesh
        geometry={province.geometry}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial
          color={COLOR_BY_TIER[province.tier]}
          roughness={isCapital ? 0.32 : 0.62}
          metalness={isCapital ? 0.06 : 0.02}
          emissive={isCapital ? "#22c55e" : "#000000"}
          emissiveIntensity={isCapital ? 0.45 : 0}
        />
      </mesh>
      {/* Hard-edge outline (>22° dihedral) — crisp province borders without
          the noisy ExtrudeGeometry triangulation. */}
      <lineSegments geometry={province.edges}>
        <lineBasicMaterial
          color={EDGE_COLOR}
          transparent
          opacity={isCapital ? 0.85 : 0.55}
        />
      </lineSegments>
    </group>
  );
});

function arcCurve(
  from: [number, number, number],
  to: [number, number, number]
): THREE.QuadraticBezierCurve3 {
  const a = new THREE.Vector3(...from);
  const b = new THREE.Vector3(...to);
  const dist = a.distanceTo(b);
  const mid = a.clone().add(b).multiplyScalar(0.5);
  mid.y += 0.22 + dist * 0.18;
  return new THREE.QuadraticBezierCurve3(a, mid, b);
}

function RouteArc({
  curve,
  phase,
}: {
  curve: THREE.QuadraticBezierCurve3;
  phase: number;
}) {
  const points = useMemo(() => curve.getPoints(48) as THREE.Vector3[], [curve]);
  const cometRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!cometRef.current) return;
    const period = 3.6;
    const t = ((state.clock.elapsedTime + phase) % period) / period;
    const p = curve.getPointAt(t);
    cometRef.current.position.copy(p);
    const scale = 0.6 + 0.8 * Math.sin(t * Math.PI);
    cometRef.current.scale.setScalar(scale);
  });

  return (
    <group>
      <Line
        points={points}
        color={EDGE_COLOR}
        lineWidth={1.1}
        transparent
        opacity={0.55}
        dashed
        dashScale={28}
        dashSize={1.6}
        gapSize={1}
      />
      <mesh ref={cometRef}>
        <sphereGeometry args={[0.022, 12, 12]} />
        <meshStandardMaterial
          color="#bbf7d0"
          emissive="#22c55e"
          emissiveIntensity={1.6}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function PulseRings({ center }: { center: [number, number, number] }) {
  const a = useRef<THREE.Mesh>(null);
  const b = useRef<THREE.Mesh>(null);
  const matA = useRef<THREE.MeshBasicMaterial>(null);
  const matB = useRef<THREE.MeshBasicMaterial>(null);
  const PERIOD = 4;
  const MAX_SCALE = 1.6;

  useFrame((state) => {
    const update = (mesh: THREE.Mesh | null, mat: THREE.MeshBasicMaterial | null, offset: number) => {
      if (!mesh || !mat) return;
      const t = ((state.clock.elapsedTime + offset) % PERIOD) / PERIOD;
      const scale = 0.05 + t * MAX_SCALE;
      mesh.scale.setScalar(scale);
      mat.opacity = 0.55 * (1 - t);
    };
    update(a.current, matA.current, 0);
    update(b.current, matB.current, PERIOD / 2);
  });

  return (
    <group position={[center[0], 0.005, center[2]]} rotation={[-Math.PI / 2, 0, 0]}>
      <mesh ref={a}>
        <ringGeometry args={[0.18, 0.22, 64]} />
        <meshBasicMaterial
          ref={matA}
          color="#16a34a"
          transparent
          opacity={0.55}
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={b}>
        <ringGeometry args={[0.18, 0.22, 64]} />
        <meshBasicMaterial
          ref={matB}
          color="#16a34a"
          transparent
          opacity={0.35}
          side={THREE.DoubleSide}
        />
      </mesh>
    </group>
  );
}

function VtBeacon({ center }: { center: [number, number, number] }) {
  const beamRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (beamRef.current) {
      const m = beamRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.18 + 0.08 * Math.sin(t * 1.8);
    }
    if (ringRef.current) {
      const period = 2.4;
      const phase = (t % period) / period;
      ringRef.current.scale.setScalar(1 + phase * 1.4);
      const m = ringRef.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.7 * (1 - phase);
    }
  });

  return (
    <group position={center}>
      <mesh>
        <sphereGeometry args={[0.038, 18, 18]} />
        <meshStandardMaterial
          color="#dcfce7"
          emissive="#22c55e"
          emissiveIntensity={2.2}
          toneMapped={false}
        />
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[0.06, 0.005, 8, 48]} />
        <meshBasicMaterial color="#bbf7d0" transparent opacity={0.7} toneMapped={false} />
      </mesh>
      <mesh ref={beamRef} position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.012, 0.028, 1.2, 16, 1, true]} />
        <meshBasicMaterial
          color="#22c55e"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function ProvinceMarker({ center }: { center: [number, number, number] }) {
  const ringRef = useRef<THREE.Mesh>(null);
  const phaseRef = useRef(Math.random() * Math.PI * 2);

  useFrame((state) => {
    if (!ringRef.current) return;
    const period = 2.6;
    const phase = ((state.clock.elapsedTime + phaseRef.current) % period) / period;
    ringRef.current.scale.setScalar(0.6 + phase * 1.6);
    const m = ringRef.current.material as THREE.MeshBasicMaterial;
    m.opacity = 0.55 * (1 - phase);
  });

  return (
    <group position={center}>
      <mesh>
        <sphereGeometry args={[0.018, 14, 14]} />
        <meshStandardMaterial
          color="#064e3b"
          emissive="#047857"
          emissiveIntensity={0.7}
          roughness={0.35}
        />
      </mesh>
      <mesh ref={ringRef} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[0.022, 0.028, 24]} />
        <meshBasicMaterial color="#064e3b" transparent opacity={0.55} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

// Per-ISO presentation tweaks so labels don't pile up on top of each other
// or run off the card. dy lifts the label above the prism in world units; tx
// nudges left/right; anchor controls which side of the label sits at the
// projected point so edge-of-map labels stay inside.
type LabelAnchor = "center" | "left" | "right";
// anchor controls which edge of the label sits at the projected point.
// Rule of thumb: provinces on the LEFT half of the map use anchor="left" so
// labels extend rightward (staying on the card); provinces on the RIGHT half
// use anchor="right" so labels extend leftward.
const LABEL_LAYOUT: Record<
  string,
  { dy: number; tx: number; anchor: LabelAnchor }
> = {
  "LA-VT": { dy: 0.42, tx: 0.05, anchor: "left" },   // capital, extends right
  "LA-LP": { dy: 0.55, tx: 0.05, anchor: "left" },   // Luang Prabang, extends right
  "LA-PH": { dy: 0.7, tx: 0.1, anchor: "left" },     // Phongsaly, extends right (clears badge)
  "LA-HO": { dy: 0.45, tx: 0.05, anchor: "left" },   // Houaphan, extends right
  "LA-SV": { dy: 0.32, tx: -0.05, anchor: "right" }, // Savannakhet, extends left
  "LA-CH": { dy: 0.22, tx: -0.05, anchor: "right" }, // Champasack, extends left
};

function Labels({ provinces }: { provinces: ProvinceGeom[] }) {
  const { lang } = useLocale();
  return (
    <>
      {provinces.map((p) => {
        const layout = LABEL_LAYOUT[p.iso];
        if (!layout || !LABEL_ISOS.has(p.iso)) return null;
        const hub = HUB_BY_ISO.get(p.iso);
        if (!hub) return null;
        const isCapital = p.iso === "LA-VT";
        const label = hub.name[lang];
        return (
          <group key={`label-${p.iso}`}>
            {/* Thin tether so the label clearly points at its province. */}
            <Line
              points={[
                [p.centroidTop[0], p.centroidTop[1], p.centroidTop[2]],
                [
                  p.centroidTop[0] + layout.tx,
                  p.centroidTop[1] + layout.dy,
                  p.centroidTop[2],
                ],
              ]}
              color={EDGE_COLOR}
              lineWidth={0.7}
              transparent
              opacity={isCapital ? 0.9 : 0.55}
            />
            <Html
              position={[
                p.centroidTop[0] + layout.tx,
                p.centroidTop[1] + layout.dy,
                p.centroidTop[2],
              ]}
              center={layout.anchor === "center"}
              distanceFactor={2.6}
              zIndexRange={[10, 0]}
              style={{ pointerEvents: "none" }}
            >
              <div
                className={[
                  "whitespace-nowrap rounded-full px-2 py-0.5 font-semibold",
                  "bg-white/95 backdrop-blur-sm shadow-[0_2px_6px_rgba(4,120,87,0.18)]",
                  isCapital
                    ? "text-[11px] text-green-900 ring-1 ring-green-400"
                    : "text-[9px] text-green-950 ring-1 ring-green-200",
                ].join(" ")}
                style={{
                  fontFamily:
                    lang === "lo"
                      ? "'Noto Sans Lao', 'Inter', sans-serif"
                      : "'Inter', ui-sans-serif, sans-serif",
                  transform:
                    layout.anchor === "left"
                      ? "translate(0, -50%)"
                      : layout.anchor === "right"
                        ? "translate(-100%, -50%)"
                        : undefined,
                }}
              >
                {label}
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

