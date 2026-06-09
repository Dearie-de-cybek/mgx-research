"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const DESIGNS = [
  { n: "01", label: "Dark Navy", path: "/"   },
  { n: "02", label: "Editorial", path: "/v2" },
  { n: "03", label: "Apex",      path: "/v3" },
];

export default function DesignSwitcher() {
  const pathname = usePathname();

  return (
    <div
      className="fixed bottom-6 right-6 z-[9999] flex items-center gap-1 p-1.5 rounded-full"
      style={{
        background: "rgba(6,31,51,0.90)",
        backdropFilter: "blur(16px)",
        border: "1px solid rgba(255,255,255,0.14)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.35)",
      }}
    >
      <span
        className="font-mono text-[9px] uppercase tracking-[0.24em] pl-2.5 pr-1"
        style={{ color: "rgba(255,255,255,0.38)" }}
      >
        Design
      </span>

      {DESIGNS.map((d) => {
        const active = pathname === d.path;
        return (
          <Link
            key={d.path}
            href={d.path}
            className="font-mono text-[9px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-full transition-all duration-200"
            style={{
              background: active ? "#5dd673" : "transparent",
              color: active ? "#061f33" : "rgba(255,255,255,0.48)",
              fontWeight: active ? 600 : 400,
            }}
          >
            {d.n} · {d.label}
          </Link>
        );
      })}
    </div>
  );
}
