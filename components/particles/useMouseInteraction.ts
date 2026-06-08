"use client";

import { useRef, useCallback } from "react";
import { useThree } from "@react-three/fiber";
import { Vector2, Vector3, Plane, Raycaster } from "three";

/**
 * Converts the cursor's screen position into world-space XY on the particle
 * plane (z = 0), and exposes an eased "strength" scalar that ramps up while
 * the pointer is inside the canvas and decays back to 0 on leave/idle.
 *
 * Kept outside React state on purpose — `update()` mutates refs and is meant
 * to be called once per frame from the render loop, so a cursor flick never
 * triggers a React re-render.
 */
export function useMouseInteraction() {
  const { camera, gl } = useThree();

  const target = useRef(new Vector2(0, 0));   // world-space XY the shader reads
  const current = useRef(new Vector2(0, 0));  // eased toward `target` each frame
  const strength = useRef(0);                 // 0 → 1, eased; drives uMouseStrength
  const inside = useRef(false);

  const raycaster = useRef(new Raycaster());
  const plane = useRef(new Plane(new Vector3(0, 0, 1), 0));
  const ndc = useRef(new Vector2());
  const hit = useRef(new Vector3());

  const handlePointerMove = useCallback(
    (event: PointerEvent) => {
      const rect = gl.domElement.getBoundingClientRect();
      ndc.current.set(
        ((event.clientX - rect.left) / rect.width) * 2 - 1,
        -((event.clientY - rect.top) / rect.height) * 2 + 1
      );

      raycaster.current.setFromCamera(ndc.current, camera);
      if (raycaster.current.ray.intersectPlane(plane.current, hit.current)) {
        target.current.set(hit.current.x, hit.current.y);
      }
      inside.current = true;
    },
    [camera, gl]
  );

  const handlePointerLeave = useCallback(() => {
    inside.current = false;
  }, []);

  /** Call once per frame. Returns the current eased mouse state for shader uniforms. */
  const update = useCallback((delta: number) => {
    // Critically-damped exponential ease — frame-rate independent, never overshoots.
    const followLerp = 1 - Math.pow(0.001, delta);
    current.current.lerp(target.current, followLerp);

    const strengthLerp = 1 - Math.pow(inside.current ? 0.0005 : 0.00005, delta);
    const goal = inside.current ? 1 : 0;
    strength.current += (goal - strength.current) * strengthLerp;

    return { position: current.current, strength: strength.current };
  }, []);

  return { handlePointerMove, handlePointerLeave, update };
}
