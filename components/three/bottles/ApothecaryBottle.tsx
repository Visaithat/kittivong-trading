"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Outlines } from "@react-three/drei";
import { useBottleMotion } from "./_hooks";
import { makeLabelTexture } from "./_labels";
import { useLaoFontsReady } from "./_useLaoFontsReady";

type Props = {
  color?: string; // amber glass tint
  capColor?: string;
  label?: string;
  pointer?: { x: number; y: number };
  hovered?: boolean;
  phase?: number;
  clickNonce?: number;
};

export function ApothecaryBottle({
  color = "#9a4a13",
  capColor = "#0f2d1e",
  label = "AP-01",
  pointer,
  hovered,
  phase = 0,
  clickNonce,
}: Props) {
  const group = useRef<THREE.Group>(null);
  useBottleMotion(group, { pointer, hovered, phase, clickNonce });

  // Lathe profile (radius, y) base → shoulder → neck
  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -0.95));
    pts.push(new THREE.Vector2(0.42, -0.95));
    pts.push(new THREE.Vector2(0.46, -0.9));
    pts.push(new THREE.Vector2(0.46, 0.45));
    pts.push(new THREE.Vector2(0.42, 0.55));
    pts.push(new THREE.Vector2(0.3, 0.68));
    pts.push(new THREE.Vector2(0.2, 0.78));
    pts.push(new THREE.Vector2(0.2, 0.92));
    pts.push(new THREE.Vector2(0.0, 0.92));
    return pts;
  }, []);

  const laoNonce = useLaoFontsReady();
  const labelTex = useMemo(
    () =>
      makeLabelTexture({
        accent: "#0d5b2e",
        code: label,
        subtitle: "ຢານ້ຳ · TINCTURE · 30 ML",
      }),
    // re-bake when Lao fonts finish loading so the Lao line renders with Noto Serif Lao
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [label, laoNonce]
  );

  return (
    <group ref={group}>
      {/* Amber glass body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 64]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.12}
          metalness={0}
          transmission={0.55}
          thickness={0.5}
          ior={1.5}
          attenuationColor="#6b2f0a"
          attenuationDistance={0.6}
          clearcoat={0.7}
          clearcoatRoughness={0.18}
        />
        <Outlines thickness={2.2} color="#0e1a13" screenspace angle={Math.PI} />
      </mesh>

      {/* Paper wrap label — slightly above body radius to read as wrap */}
      <mesh position={[0, -0.18, 0]} renderOrder={2}>
        <cylinderGeometry args={[0.465, 0.465, 0.62, 64, 1, true]} />
        <meshStandardMaterial
          map={labelTex}
          transparent
          side={THREE.DoubleSide}
          roughness={0.85}
        />
      </mesh>

      {/* Cork-style cap base */}
      <mesh castShadow position={[0, 1.0, 0]}>
        <cylinderGeometry args={[0.21, 0.21, 0.18, 32]} />
        <meshStandardMaterial color="#c9a774" roughness={0.7} />
      </mesh>
      {/* Wax seal over the cork */}
      <mesh castShadow position={[0, 1.12, 0]}>
        <cylinderGeometry args={[0.24, 0.22, 0.08, 32]} />
        <meshPhysicalMaterial
          color={capColor}
          roughness={0.45}
          clearcoat={0.4}
        />
      </mesh>
      <mesh castShadow position={[0, 1.17, 0]}>
        <cylinderGeometry args={[0.25, 0.24, 0.02, 32]} />
        <meshPhysicalMaterial color={capColor} roughness={0.3} clearcoat={0.6} />
      </mesh>

      {/* Brass shoulder ring (collar) */}
      <mesh castShadow position={[0, 0.82, 0]}>
        <torusGeometry args={[0.21, 0.018, 12, 48]} />
        <meshStandardMaterial color="#b48455" metalness={0.85} roughness={0.32} />
      </mesh>
    </group>
  );
}
