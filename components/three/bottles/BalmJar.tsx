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

export function BalmJar({
  color = "#b34a16",
  capColor = "#b48455",
  label = "BJ-03",
  pointer,
  hovered,
  phase = 1.4,
  clickNonce,
}: Props) {
  const group = useRef<THREE.Group>(null);
  useBottleMotion(group, { pointer, hovered, phase, clickNonce });

  // Stout round jar profile
  const profile = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    pts.push(new THREE.Vector2(0.0, -0.4));
    pts.push(new THREE.Vector2(0.55, -0.4));
    pts.push(new THREE.Vector2(0.62, -0.34));
    pts.push(new THREE.Vector2(0.62, 0.24));
    pts.push(new THREE.Vector2(0.55, 0.3));
    pts.push(new THREE.Vector2(0.0, 0.3));
    return pts;
  }, []);

  const laoNonce = useLaoFontsReady();
  const labelTex = useMemo(
    () =>
      makeLabelTexture({
        width: 1024,
        height: 220,
        paper: "#fdf7e6",
        accent: "#9b1c1c",
        code: label,
        subtitle: "ຢາທາ · BALM · 25 G",
        torn: false,
      }),
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
          roughness={0.18}
          transmission={0.4}
          thickness={0.4}
          ior={1.5}
          attenuationColor="#5a210a"
          attenuationDistance={0.5}
          clearcoat={0.7}
          clearcoatRoughness={0.18}
        />
        <Outlines thickness={2.2} color="#0e1a13" screenspace angle={Math.PI} />
      </mesh>

      {/* Brass screw lid */}
      <mesh castShadow position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.64, 0.62, 0.24, 64]} />
        <meshStandardMaterial color={capColor} metalness={0.88} roughness={0.32} />
      </mesh>
      {/* Lid ribs (vertical) */}
      {Array.from({ length: 36 }).map((_, i) => {
        const a = (i / 36) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.635, 0.4, Math.sin(a) * 0.635]}
            rotation={[0, -a, 0]}
            castShadow
          >
            <boxGeometry args={[0.012, 0.22, 0.012]} />
            <meshStandardMaterial color="#8a6038" metalness={0.7} roughness={0.45} />
          </mesh>
        );
      })}
      {/* Lid top rim */}
      <mesh castShadow position={[0, 0.52, 0]}>
        <cylinderGeometry args={[0.66, 0.66, 0.02, 64]} />
        <meshStandardMaterial color="#8a6038" metalness={0.8} roughness={0.35} />
      </mesh>
      {/* Embossed crest on top */}
      <mesh position={[0, 0.535, 0]}>
        <ringGeometry args={[0.2, 0.36, 64]} />
        <meshStandardMaterial color={capColor} metalness={0.9} roughness={0.28} />
      </mesh>

      {/* Wrap label around the jar body */}
      <mesh position={[0, -0.05, 0]} renderOrder={3}>
        <cylinderGeometry args={[0.63, 0.63, 0.36, 64, 1, true]} />
        <meshStandardMaterial
          map={labelTex}
          transparent
          side={THREE.DoubleSide}
          roughness={0.85}
        />
      </mesh>
    </group>
  );
}
