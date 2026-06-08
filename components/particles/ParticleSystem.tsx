"use client";

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Color, NormalBlending, Points, ShaderMaterial } from "three";
import { vertexShader, fragmentShader } from "./shaders";
import { useMouseInteraction } from "./useMouseInteraction";

type ParticleSystemProps = {
  count: number;
  /** World-space half-extent the particle field is seeded across. */
  spread: number;
  /** 0 → 1 fade-in driven by the parent on mount. */
  introRef: React.MutableRefObject<number>;
};

const COLOR_NEAR = new Color("#1A1F26"); // near-black ink
const COLOR_FAR = new Color("#A6AFBC");  // soft gray, recedes toward white bg

export default function ParticleSystem({ count, spread, introRef }: ParticleSystemProps) {
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<ShaderMaterial>(null);
  const { handlePointerMove, handlePointerLeave, update } = useMouseInteraction();

  // Geometry attributes are generated once per `count`/`spread` and handed to
  // BufferGeometry directly — no per-frame allocation, no React re-render path.
  const { positions, seeds, scales } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const scales = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      // Spherical-ish distribution: denser toward center, thins at the edges —
      // reads as a "field" rather than a hard-edged cube of dots.
      const radius = spread * Math.cbrt(Math.random());
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i * 3 + 0] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta) * 0.55; // flatten on Y
      positions[i * 3 + 2] = radius * Math.cos(phi) * 0.4;                     // flatten on Z

      seeds[i] = Math.random();
      scales[i] = 0.4 + Math.random() * 1.0;
    }

    return { positions, seeds, scales };
  }, [count, spread]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: { x: 0, y: 0 } },
      uMouseRadius: { value: spread * 0.35 },
      uMouseStrength: { value: 0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
      uSize: { value: 14 },
      uColorNear: { value: COLOR_NEAR },
      uColorFar: { value: COLOR_FAR },
      uOpacity: { value: 0 },
    }),
    [spread]
  );

  useFrame((state, delta) => {
    const material = materialRef.current;
    if (!material) return;

    const mouse = update(delta);

    material.uniforms.uTime.value = state.clock.elapsedTime;
    material.uniforms.uMouse.value.x = mouse.position.x;
    material.uniforms.uMouse.value.y = mouse.position.y;
    material.uniforms.uMouseStrength.value = mouse.strength;

    // Drive the fade-in from the shared intro ref the parent animates —
    // keeps the whole entrance inside the render loop, zero React renders.
    material.uniforms.uOpacity.value = introRef.current;
  });

  return (
    <points
      ref={pointsRef}
      onPointerMove={(e) => handlePointerMove(e.nativeEvent)}
      onPointerLeave={handlePointerLeave}
    >
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSeed" args={[seeds, 1]} />
        <bufferAttribute attach="attributes-aScale" args={[scales, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={NormalBlending}
      />
    </points>
  );
}
