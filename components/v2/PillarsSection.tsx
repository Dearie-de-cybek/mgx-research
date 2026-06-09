"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const INK    = "#14110d";
const PAPER  = "#faf9f5";
const PAPER2 = "#f3f1e8";
const MUTE   = "#6b6760";
const GREEN  = "#4ed074";
const TEAL   = "#1a6680";
const LINE   = "rgba(20,17,13,0.10)";

const PILLARS = [
  { n: "P 01", name: "Intelligence Systems", tag: "AI · ML · Data Analytics", desc: "Custom AI models and analytics pipelines that adapt to real operational data, not vendor assumptions." },
  { n: "P 02", name: "Security & Resilience", tag: "Cybersecurity · Threat Intel", desc: "Zero-trust architecture, 24/7 monitoring and incident response for high-risk environments." },
  { n: "P 03", name: "Automation & Robotics", tag: "RPA · Process Intelligence", desc: "Eliminate repeatable work. From front-office workflows to factory-floor robotics." },
  { n: "P 04", name: "Digital Infrastructure", tag: "Cloud · Enterprise · Software", desc: "Cloud environments and custom platforms built for reliability at scale, no vendor lock-in." },
  { n: "P 05", name: "Smart Governance", tag: "E-Governance · Smart Cities", desc: "Citizen portals and smart infrastructure designed first for the people who use them daily." },
  { n: "P 06", name: "Human-Centered Innovation", tag: "HealthTech · EdTech · UX", desc: "Health, education and service platforms designed for real constraints and real communities." },
];

function PillarRow({ p, delay }: { p: typeof PILLARS[0]; delay: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="cursor-default transition-all duration-300"
      style={{
        display: "grid",
        gridTemplateColumns: "80px 1.4fr 1fr 60px",
        gap: "40px",
        padding: `32px ${hov ? "16px" : "0px"}`,
        borderBottom: `1px solid ${LINE}`,
        alignItems: "center",
        background: hov ? PAPER2 : "transparent",
      }}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span
        className="font-mono text-[11px] uppercase tracking-[0.22em]"
        style={{ color: MUTE }}
      >
        {p.n}
      </span>

      <div>
        <div
          className="font-serif transition-colors duration-300"
          style={{
            fontSize: "clamp(24px, 2.6vw, 36px)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: hov ? TEAL : INK,
          }}
        >
          {p.name}
        </div>
        <span
          className="block font-mono text-[11px] uppercase tracking-[0.2em] mt-2"
          style={{ color: MUTE }}
        >
          {p.tag}
        </span>
      </div>

      <p className="text-[15px] leading-[1.6]" style={{ color: MUTE, maxWidth: "40ch" }}>
        {p.desc}
      </p>

      {/* Arrow */}
      <div
        className="flex items-center justify-center rounded-full transition-all duration-300"
        style={{
          width: 40, height: 40,
          border: `1px solid ${hov ? GREEN : LINE}`,
          background: hov ? GREEN : "transparent",
          color: INK,
          transform: hov ? "rotate(-45deg)" : "none",
        }}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
}

export default function PillarsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="pillars"
      style={{ padding: "clamp(80px,10vw,140px) 0", background: PAPER, overflow: "hidden" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-7">
        {/* Header */}
        <motion.div
          ref={ref}
          className="mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] inline-flex items-center gap-3" style={{ color: INK }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{ background: GREEN, boxShadow: "0 0 0 4px rgba(78,208,116,0.20)" }} />
            Research Pillars
          </span>
          <h2
            className="font-serif mt-4"
            style={{
              fontWeight: 400,
              fontSize: "clamp(40px,5.5vw,84px)",
              lineHeight: 0.98,
              letterSpacing: "-0.025em",
              color: INK,
              maxWidth: "16ch",
            }}
          >
            Six domains we go{" "}
            <em style={{ fontStyle: "italic", color: TEAL }}>deep</em> on.
          </h2>
        </motion.div>

        {/* List */}
        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {PILLARS.map((p, i) => (
            <PillarRow key={p.n} p={p} delay={i * 0.05} />
          ))}
        </div>
      </div>
    </section>
  );
}
