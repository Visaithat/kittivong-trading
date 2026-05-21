"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Outlines } from "@react-three/drei";
import { useBottleMotion } from "./_hooks";
import { makeLabelTexture } from "./_labels";
import { useLaoFontsReady } from "./_useLaoFontsReady";

type Props = {
  color?: string;
  capColor?: string;
  label?: string;
  pointer?: { x: number; y: number };
  hovered?: boolean;
  phase?: number;
  clickNonce?: number;
};

export function DropperBottle({
  color = "#0f3a25",
  capColor = "#b48455",
  label = "DR-02",
  pointer,
  hovered,
  phase = 0.7,
  clickNonce,
}: Props) {
  const group = useRef<THREE.Group>(null);
  useBottleMotion(group, { pointer, hovered, phase, clickNonce });

  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -0.85));
    pts.push(new THREE.Vector2(0.5, -0.85));
    pts.push(new THREE.Vector2(0.54, -0.8));
    pts.push(new THREE.Vector2(0.54, 0.35));
    pts.push(new THREE.Vector2(0.42, 0.5));
    pts.push(new THREE.Vector2(0.26, 0.65));
    pts.push(new THREE.Vector2(0.26, 0.85));
    pts.push(new THREE.Vector2(0.0, 0.85));
    return pts;
  }, []);

  const laoNonce = useLaoFontsReady();
  const labelTex = useMemo(
    () =>
      makeLabelTexture({
        paper: "#f1f5ee",
        accent: "#0f3a25",
        code: label,
        subtitle: "ຢາຫຍອດ · TINCTURE · 30 ML",
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [label, laoNonce]
  );

  return (
    <group ref={group}>
      {/* Glass body */}
      <mesh castShadow receiveShadow>
        <latheGeometry args={[profile, 64]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.16}
          transmission={0.45}
          thickness={0.4}
          ior={1.5}
          attenuationColor="#082b18"
          attenuationDistance={0.7}
          clearcoat={0.8}
          clearcoatRoughness={0.15}
        />
        <Outlines thickness={2.2} color="#0e1a13" screenspace angle={Math.PI} />
      </mesh>

      {/* Front label plate (slightly inset so the cartoon outline still reads bottle silhouette) */}
      <mesh position={[0, -0.18, 0.545]} renderOrder={3}>
        <planeGeometry args={[0.82, 1.0]} />
        <meshStandardMaterial
          map={labelTex}
          transparent
          roughness={0.85}
        />
      </mesh>

      {/* Brass collar */}
      <mesh castShadow position={[0, 0.72, 0]}>
        <torusGeometry args={[0.27, 0.022, 14, 48]} />
        <meshStandardMaterial color="#b48455" metalness={0.85} roughness={0.3} />
      </mesh>

      {/* Cap (dropper base) */}
      <mesh castShadow position={[0, 0.92, 0]}>
        <cylinderGeometry args={[0.3, 0.28, 0.22, 48]} />
        <meshPhysicalMaterial
          color={capColor}
          metalness={0.7}
          roughness={0.32}
          clearcoat={0.5}
        />
      </mesh>

      {/* Rubber bulb */}
      <mesh castShadow position={[0, 1.18, 0]}>
        <sphereGeometry args={[0.18, 32, 24]} />
        <meshPhysicalMaterial
          color="#16a34a"
          roughness={0.45}
          sheen={0.6}
          sheenColor="#bbf7d0"
        />
      </mesh>
      <mesh castShadow position={[0, 1.33, 0]}>
        <cylinderGeometry args={[0.07, 0.07, 0.08, 24]} />
        <meshStandardMaterial color="#064e3b" roughness={0.5} />
      </mesh>

      {/* Glass dropper stem visible inside */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 16]} />
        <meshPhysicalMaterial color="#e8efea" transmission={0.7} thickness={0.1} />
      </mesh>
    </group>
  );
}
