"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { PerformanceMonitor } from "@react-three/drei";
import ParticleSystem from "./ParticleSystem";

const SPREAD = 9;

/**
 * Picks a starting particle budget from rough device signals — core count,
 * memory, viewport, and a coarse mobile sniff. `PerformanceMonitor` then
 * trims further at runtime if the GPU can't sustain frame rate, so the
 * floor here only needs to be a sane *starting* guess, not a guarantee.
 */
function getInitialCount(): number {
  if (typeof window === "undefined") return 6000;

  const cores = navigator.hardwareConcurrency ?? 4;
  const memory = (navigator as Navigator & { deviceMemory?: number }).deviceMemory ?? 4;
  const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
  const isNarrow = window.innerWidth < 768;

  if (isNarrow || isCoarsePointer) {
    return memory <= 4 ? 3500 : 5500;
  }
  if (cores <= 4 || memory <= 4) return 7000;
  if (cores >= 8 && memory >= 8) return 13000;
  return 9500;
}

/** Drives the canvas-wide fade-in entirely inside the render loop (no React state per frame). */
function IntroDriver({ introRef }: { introRef: React.MutableRefObject<number> }) {
  useFrame((_, delta) => {
    introRef.current = Math.min(1, introRef.current + delta * 0.45);
  });
  return null;
}

export default function ParticleBackground() {
  const [count, setCount] = useState<number>(() => getInitialCount());
  const [dpr, setDpr] = useState<[number, number]>([1, 2]);
  const introRef = useRef(0);

  const reduceMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  useEffect(() => {
    const onResize = () => setCount(getInitialCount());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  if (reduceMotion) {
    // Static, unobtrusive presence for users who opted out of motion —
    // a faint fixed field with no animation loop at all.
    return (
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 40%, rgba(26,31,38,0.05), rgba(255,255,255,0) 60%)",
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas
        dpr={dpr}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        camera={{ position: [0, 0, 9], fov: 50, near: 0.1, far: 50 }}
        className="!pointer-events-auto"
        style={{ background: "transparent" }}
      >
        {/* Steps the render-resolution multiplier down/up to hold frame rate —
            cheaper than recomputing the particle count, and reversible live. */}
        <PerformanceMonitor
          onDecline={() => setDpr(([min]) => [Math.max(0.75, min - 0.25), Math.max(1, min + 0.5)])}
          onIncline={() => setDpr(([, max]) => [1, Math.min(2, max + 0.25)])}
        />
        <IntroDriver introRef={introRef} />
        <ParticleSystem count={count} spread={SPREAD} introRef={introRef} />
      </Canvas>
    </div>
  );
}
