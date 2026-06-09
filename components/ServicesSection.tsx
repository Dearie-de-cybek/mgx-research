"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const FOCUSES = [
  { n: "0.01", name: "AI" },
  { n: "0.02", name: "Robotics" },
  { n: "0.03", name: "Automation" },
  { n: "0.04", name: "Cybersecurity" },
  { n: "0.05", name: "Smart Systems" },
  { n: "0.06", name: "Digital Transformation" },
  { n: "0.07", name: "Research" },
  { n: "0.08", name: "Technology" },
  { n: "0.09", name: "Innovation" },
  { n: "0.10", name: "Entrepreneurship" },
];

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FocusCell({ num, name }: { num: string; name: string }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRight: "1px solid rgba(12,14,18,0.12)",
        borderBottom: "1px solid rgba(12,14,18,0.12)",
        padding: "28px 24px",
        minHeight: "180px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        background: hovered ? "#0e3d5c" : "#f5f1e8",
        color: hovered ? "#fff" : "#0c0e12",
        transition: "background 0.3s, color 0.3s",
        position: "relative",
        cursor: "default",
      }}
    >
      <span
        className="font-mono text-[11px] tracking-[0.2em]"
        style={{
          color: hovered ? "#5dd673" : "rgba(12,14,18,0.58)",
          transition: "color 0.3s",
        }}
      >
        {num}
      </span>
      <span
        style={{
          fontSize: "clamp(18px, 2vw, 26px)",
          fontWeight: 600,
          lineHeight: 1.05,
          letterSpacing: "-0.02em",
        }}
      >
        {name}
      </span>
      <svg
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
        style={{
          position: "absolute",
          top: "24px",
          right: "24px",
          opacity: hovered ? 1 : 0,
          transform: hovered ? "translate(2px,-2px)" : "translate(0,0)",
          transition: "opacity 0.3s, transform 0.3s",
          color: "#5dd673",
        }}
      >
        <path
          d="M3 11L11 3M11 3H4M11 3v7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

export default function ServicesSection() {
  return (
    <section
      id="focus"
      style={{
        background: "#f5f1e8",
        color: "#0c0e12",
        padding: "clamp(80px, 10vw, 140px) 0",
        borderTop: "1px solid rgba(0,0,0,0.04)",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-8 mb-16">
          <div>
            <FadeUp>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-[1px]" style={{ background: "#1a6680" }} />
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.24em]"
                  style={{ color: "#1a6680" }}
                >
                  Our Focus
                </span>
              </div>
              <h2
                className="font-display"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(40px, 5.5vw, 84px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "#0c0e12",
                  maxWidth: "14ch",
                }}
              >
                Ten domains.{" "}
                <span
                  className="font-serif italic"
                  style={{ color: "#1a6680", fontWeight: 400 }}
                >
                  One
                </span>{" "}
                ecosystem.
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <div
              className="font-mono text-xs uppercase tracking-[0.22em]"
              style={{ color: "rgba(12,14,18,0.58)" }}
            >
              Index{" "}
              <span style={{ color: "#1a6680", fontWeight: 500 }}>0.01 to 0.10</span>
            </div>
          </FadeUp>
        </div>

        {/* Focus grid — 5 cols desktop, 3 tablet, 2 mobile */}
        <FadeUp delay={0.15}>
          <div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5"
            style={{
              borderTop: "1px solid rgba(12,14,18,0.12)",
              borderLeft: "1px solid rgba(12,14,18,0.12)",
            }}
          >
            {FOCUSES.map((f) => (
              <FocusCell key={f.n} num={f.n} name={f.name} />
            ))}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
