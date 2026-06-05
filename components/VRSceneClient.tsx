"use client";

import dynamic from "next/dynamic";

const VRScene = dynamic(() => import("@/components/VRScene"), {
  ssr: false,
  loading: () => null,
});

export default function VRSceneClient() {
  return (
    <div
      className="hidden lg:block shrink-0"
      style={{ width: "460px", height: "460px", position: "relative" }}
    >
      <VRScene />
    </div>
  );
}
