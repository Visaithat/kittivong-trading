"use client";

import { Canvas } from "@react-three/fiber";
import { Environment, ContactShadows } from "@react-three/drei";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  cameraZ?: number;
  fov?: number;
};

export default function ThreeScene({ children, cameraZ = 4, fov = 35 }: Props) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ position: [0, 0.3, cameraZ], fov }}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: false }}
      style={{ background: "transparent" }}
    >
      <color attach="background" args={["#ffffff00"]} />
      <ambientLight intensity={0.45} />
      <directionalLight
        position={[3, 5, 4]}
        intensity={1.1}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#a7e8c2" />
      <Environment preset="studio" />
      {children}
      <ContactShadows
        position={[0, -1.05, 0]}
        opacity={0.35}
        scale={6}
        blur={2.4}
        far={3}
        color="#0e1a13"
      />
    </Canvas>
  );
}
