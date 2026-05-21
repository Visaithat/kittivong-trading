"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef } from "react";
import type * as THREE from "three";

type Opts = {
  pointer?: { x: number; y: number };
  hovered?: boolean;
  /** seed so multiple bottles aren't perfectly in phase */
  phase?: number;
  /** continuous idle Y rotation per second */
  idleSpin?: number;
  /** breathing bob amplitude */
  bobAmp?: number;
  /** trigger a tap nudge when this number changes */
  clickNonce?: number;
};

export function useBottleMotion(
  ref: React.RefObject<THREE.Group | null>,
  opts: Opts = {}
) {
  const {
    pointer = { x: 0, y: 0 },
    hovered = false,
    phase = 0,
    idleSpin = 0.22,
    bobAmp = 0.045,
    clickNonce = 0,
  } = opts;

  const baseY = useRef(0);
  const wobble = useRef(0); // angular impulse decaying after unhover
  const wobbleV = useRef(0);
  const tap = useRef(0); // angular impulse on click

  // Trigger settle wobble each time hover transitions to false
  const prevHover = useRef(hovered);
  useEffect(() => {
    if (prevHover.current && !hovered) {
      // Add a small angular impulse to the damped oscillator
      wobbleV.current += 0.18;
    }
    prevHover.current = hovered;
  }, [hovered]);

  // Trigger a quick tap nudge on clickNonce change
  const prevTap = useRef(clickNonce);
  useEffect(() => {
    if (clickNonce !== prevTap.current) {
      tap.current = 0.4;
      prevTap.current = clickNonce;
    }
  }, [clickNonce]);

  useFrame((state, delta) => {
    const g = ref.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    const d = Math.min(delta, 0.05); // clamp big delta on tab refocus

    // 1. Idle rotation — always happens
    g.rotation.y += d * idleSpin;

    // 2. Breathing bob
    const bob = Math.sin(t * 1.15 + phase) * bobAmp;
    g.position.y = baseY.current + bob;

    // 3. Pointer tilt (springy)
    const targetRotX = -pointer.y * 0.35;
    const targetTiltZ = pointer.x * 0.12;
    const k = Math.min(1, d * 5);
    g.rotation.x += (targetRotX - g.rotation.x) * k;
    g.rotation.z += (targetTiltZ - g.rotation.z) * k;

    // 4. Hover scale
    const targetScale = hovered ? 1.06 : 1.0;
    const cur = g.scale.x;
    const next = cur + (targetScale - cur) * Math.min(1, d * 6);
    g.scale.setScalar(next);

    // 5. Settle wobble (damped harmonic oscillator)
    const wobbleK = 24; // stiffness
    const wobbleC = 6;  // damping
    wobbleV.current += (-wobbleK * wobble.current - wobbleC * wobbleV.current) * d;
    wobble.current += wobbleV.current * d;
    if (Math.abs(wobble.current) < 0.0005 && Math.abs(wobbleV.current) < 0.0005) {
      wobble.current = 0;
      wobbleV.current = 0;
    }

    // 6. Tap nudge — quick exponential decay
    if (tap.current > 0.001) {
      g.rotation.y += tap.current;
      tap.current *= Math.max(0, 1 - d * 6);
    } else {
      tap.current = 0;
    }

    g.rotation.z += wobble.current;
  });
}
