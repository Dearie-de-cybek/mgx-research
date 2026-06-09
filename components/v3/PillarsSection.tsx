"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease   = [0.23, 1, 0.32, 1] as const;
const SNOW   = "#f5f5f7";
const INK    = "#1d1d1f";
const MUTE   = "#6e6e73";
const SILVER = "#a1a1a6";
const LINE   = "rgba(0,0,0,0.08)";
const GREEN  = "#4ed074";
const TEAL   = "#3fa9d9";

const PILLARS = [
  { n: "P 01", name: "Intelligence Systems",       desc: "Custom AI models and analytics pipelines built on real operational data, not vendor templates.", accent: GREEN  },
  { n: "P 02", name: "Security and Resilience",    desc: "Zero-trust architecture, continuous monitoring and rapid incident response for high-stakes environments.", accent: TEAL   },
  { n: "P 03", name: "Automation and Robotics",    desc: "Eliminating repetitive work across industries, from front-office workflows to factory-floor robotics.", accent: GREEN  },
  { n: "P 04", name: "Digital Infrastructure",     desc: "Cloud environments and custom platforms engineered for reliability and scale, with no vendor lock-in.", accent: TEAL   },
  { n: "P 05", name: "Smart Governance",           desc: "Citizen-first portals and smart city infrastructure designed for the people who use them daily.", accent: GREEN  },
  { n: "P 06", name: "Human-Centered Innovation",  desc: "Health, education and service platforms designed for real communities and real constraints.", accent: TEAL   },
];

function PillarItem({ p, delay }: { p: typeof PILLARS[0]; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-30px" });

  return (
    <motion.div
      ref={ref}
      style={{ paddingTop: "32px", paddingBottom: "32px", borderBottom: `1px solid ${LINE}` }}
      initial={{ opacity: 0, y: 14 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }}
    >
      <p
        className="font-mono text-[11px] uppercase tracking-[0.18em] mb-3"
        style={{ color: p.accent, fontWeight: 500 }}
      >
        {p.n}
      </p>
      <h3
        className="font-serif mb-3"
        style={{ fontSize: "clamp(22px,2.2vw,30px)", fontWeight: 300, letterSpacing: "-0.015em", color: INK }}
      >
        {p.name}
      </h3>
      <p className="text-[15px] leading-[1.72]" style={{ color: MUTE, maxWidth: "42ch" }}>
        {p.desc}
      </p>
    </motion.div>
  );
}

export default function PillarsSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="pillars" style={{ background: SNOW, padding: "clamp(100px,13vw,180px) 0" }}>
      <div className="max-w-[1080px] mx-auto px-6 sm:px-8">

        {/* Header + lead photo row */}
        <div className="grid md:grid-cols-[1fr_1fr] gap-10 items-end mb-4">
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em] inline-flex items-center gap-3"
              style={{ color: SILVER }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: TEAL }} />
              Research Pillars
            </span>
            <h2
              className="font-serif mt-3"
              style={{
                fontSize: "clamp(40px,5vw,72px)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: INK,
              }}
            >
              Six pillars,<br />
              <em style={{ fontStyle: "italic", color: GREEN }}>one direction.</em>
            </h2>
          </motion.div>

          {/* Lead photo */}
          <motion.div
            style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "16/9" }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=800"
              alt="Research work"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>

        {/* Pillar grid */}
        <div
          className="grid md:grid-cols-2 gap-x-14 mt-10"
          style={{ borderTop: `1px solid ${LINE}` }}
        >
          {PILLARS.map((p, i) => (
            <PillarItem key={p.n} p={p} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}
