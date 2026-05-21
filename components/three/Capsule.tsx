"use client";

import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

type Props = {
  colorA?: string;
  colorB?: string;
  position?: [number, number, number];
  rotation?: [number, number, number];
  speed?: number;
};

export function Capsule3D({
  colorA = "#16a34a",
  colorB = "#ffffff",
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  speed = 1,
}: Props) {
  const group = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.position.y =
      position[1] + Math.sin(t * speed + position[0]) * 0.12;
    group.current.rotation.z = rotation[2] + Math.sin(t * 0.6) * 0.18;
  });

  return (
    <group ref={group} position={position} rotation={rotation}>
      {/* Left half (sphere + half cylinder) */}
      <group position={[-0.35, 0, 0]}>
        <mesh castShadow>
          <sphereGeometry
            args={[0.22, 24, 16, 0, Math.PI, 0, Math.PI]}
          />
          <meshPhysicalMaterial color={colorA} roughness={0.32} clearcoat={0.5} />
        </mesh>
        <mesh castShadow position={[0.175, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.35, 32, 1, false, 0, Math.PI]} />
          <meshPhysicalMaterial color={colorA} roughness={0.32} clearcoat={0.5} />
        </mesh>
      </group>

      {/* Right half */}
      <group position={[0.35, 0, 0]}>
        <mesh castShadow rotation={[0, Math.PI, 0]}>
          <sphereGeometry args={[0.22, 24, 16, 0, Math.PI, 0, Math.PI]} />
          <meshPhysicalMaterial color={colorB} roughness={0.32} clearcoat={0.5} />
        </mesh>
        <mesh castShadow position={[-0.175, 0, 0]} rotation={[0, 0, -Math.PI / 2]}>
          <cylinderGeometry args={[0.22, 0.22, 0.35, 32, 1, false, 0, Math.PI]} />
          <meshPhysicalMaterial color={colorB} roughness={0.32} clearcoat={0.5} />
        </mesh>
      </group>
    </group>
  );
}
