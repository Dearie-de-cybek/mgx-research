"use client";

import { Suspense, useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, Center } from "@react-three/drei";
import * as THREE from "three";

/* Auto-fits the model into a 1.8-unit bounding box, then floats + rotates */
function VRHeadset() {
  const { scene } = useGLTF("/models/vr-headset.glb");
  const groupRef = useRef<THREE.Group>(null);

  /* Scale model to fit target size regardless of its original dimensions */
  useEffect(() => {
    if (!groupRef.current) return;
    const box = new THREE.Box3().setFromObject(groupRef.current);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z);
    if (maxDim === 0) return;
    const targetSize = 1.8;
    groupRef.current.scale.setScalar(targetSize / maxDim);
  }, [scene]);

  /* Float + gentle rotation every frame */
  useFrame((state) => {
    if (!groupRef.current) return;
    const t = state.clock.elapsedTime;
    groupRef.current.position.y = Math.sin(t * 0.6) * 0.1;
    groupRef.current.rotation.y = t * 0.25;
    groupRef.current.rotation.z = Math.sin(t * 0.4) * 0.04;
  });

  return (
    /* Center normalises the model's pivot to origin */
    <Center>
      <group ref={groupRef}>
        <primitive object={scene} />
      </group>
    </Center>
  );
}

export default function VRScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 4], fov: 42 }}
      /* Must fill the parent div — parent sets the pixel dimensions */
      style={{ width: "100%", height: "100%", background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.5} />

      {/* Main key light */}
      <directionalLight position={[3, 4, 3]} intensity={1.4} color="#ffffff" />

      {/* Brand blue fill — left */}
      <pointLight position={[-4, 1, 2]} intensity={6} color="#3B9FE8" distance={10} />

      {/* Brand green rim — right-back */}
      <pointLight position={[4, -1, -1]} intensity={5} color="#3DBE6E" distance={10} />

      {/* Bottom bounce */}
      <pointLight position={[0, -3, 2]} intensity={1.2} color="#ffffff" />

      <Suspense fallback={null}>
        <VRHeadset />
      </Suspense>
    </Canvas>
  );
}

useGLTF.preload("/models/vr-headset.glb");
