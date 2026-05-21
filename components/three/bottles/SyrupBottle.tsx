"use client";

import { useMemo, useRef } from "react";
import * as THREE from "three";
import { Outlines, RoundedBox } from "@react-three/drei";
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

export function SyrupBottle({
  color = "#7a3411",
  capColor = "#f8fafc",
  label = "SY-04",
  pointer,
  hovered,
  phase = 2.1,
  clickNonce,
}: Props) {
  const group = useRef<THREE.Group>(null);
  useBottleMotion(group, { pointer, hovered, phase, clickNonce });

  const laoNonce = useLaoFontsReady();
  const labelTex = useMemo(
    () =>
      makeLabelTexture({
        paper: "#fefce8",
        accent: "#7a3411",
        code: label,
        subtitle: "ຢານ້ຳເຊື່ອມ · SYRUP · 100 ML",
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [label, laoNonce]
  );

  return (
    <group ref={group}>
      {/* Squared amber body */}
      <RoundedBox
        args={[0.95, 1.6, 0.6]}
        radius={0.08}
        smoothness={6}
        creaseAngle={0.4}
        castShadow
        receiveShadow
        position={[0, -0.15, 0]}
      >
        <meshPhysicalMaterial
          color={color}
          roughness={0.14}
          transmission={0.5}
          thickness={0.5}
          ior={1.5}
          attenuationColor="#4a2008"
          attenuationDistance={0.55}
          clearcoat={0.7}
          clearcoatRoughness={0.16}
        />
        <Outlines thickness={2.2} color="#0e1a13" screenspace angle={Math.PI} />
      </RoundedBox>

      {/* Neck */}
      <mesh castShadow position={[0, 0.75, 0]}>
        <cylinderGeometry args={[0.22, 0.27, 0.16, 32]} />
        <meshPhysicalMaterial
          color={color}
          roughness={0.16}
          transmission={0.4}
          clearcoat={0.7}
        />
      </mesh>

      {/* Tamper cap */}
      <mesh castShadow position={[0, 0.95, 0]}>
        <cylinderGeometry args={[0.26, 0.26, 0.26, 48]} />
        <meshPhysicalMaterial
          color={capColor}
          metalness={0.05}
          roughness={0.4}
          clearcoat={0.3}
        />
      </mesh>
      {/* Cap ribs */}
      {Array.from({ length: 28 }).map((_, i) => {
        const a = (i / 28) * Math.PI * 2;
        return (
          <mesh
            key={i}
            position={[Math.cos(a) * 0.262, 0.95, Math.sin(a) * 0.262]}
            rotation={[0, -a, 0]}
          >
            <boxGeometry args={[0.012, 0.24, 0.012]} />
            <meshStandardMaterial color="#d6d6d6" roughness={0.5} />
          </mesh>
        );
      })}

      {/* Tamper ring */}
      <mesh castShadow position={[0, 0.81, 0]}>
        <torusGeometry args={[0.27, 0.018, 14, 48]} />
        <meshStandardMaterial color="#bababa" metalness={0.4} roughness={0.5} />
      </mesh>

      {/* Front label */}
      <mesh position={[0, -0.18, 0.305]} renderOrder={3}>
        <planeGeometry args={[0.82, 1.1]} />
        <meshStandardMaterial map={labelTex} transparent roughness={0.85} />
      </mesh>
    </group>
  );
}
