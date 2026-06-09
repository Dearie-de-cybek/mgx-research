"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const pillars = [
  {
    n: "01",
    name: "Intelligence Systems",
    sub: "AI · ML · Data Analytics",
    desc: "Custom AI models and analytics pipelines that adapt to real operational data, not vendor assumptions.",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    n: "02",
    name: "Security & Resilience",
    sub: "Cybersecurity · Threat Intel",
    desc: "Zero-trust architecture, 24/7 monitoring and incident response for high-risk environments.",
    img: "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    n: "03",
    name: "Automation & Robotics",
    sub: "RPA · Process Intelligence",
    desc: "Eliminate repeatable work. From front-office workflows to factory-floor robotics.",
    img: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    n: "04",
    name: "Digital Infrastructure",
    sub: "Cloud · Enterprise · Software",
    desc: "Cloud environments and custom platforms built for reliability at scale, no vendor lock-in.",
    img: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    n: "05",
    name: "Smart Governance",
    sub: "E-Governance · Smart Cities",
    desc: "Citizen portals and smart infrastructure designed first for the people who use them daily.",
    img: "https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
  {
    n: "06",
    name: "Human-Centered Innovation",
    sub: "HealthTech · EdTech · UX",
    desc: "Health, education and service platforms designed for real constraints and real communities.",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=300",
  },
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

function PillarRow({
  p,
  delay,
}: {
  p: (typeof pillars)[0];
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="py-7 cursor-default transition-all duration-300"
      style={{
        borderTop: "1px solid rgba(12,14,18,0.18)",
        paddingLeft: hovered ? "12px" : "0",
      }}
    >
      {/* Desktop 4-col layout */}
      <div className="hidden md:grid md:items-center gap-10" style={{ gridTemplateColumns: "64px 1fr 1fr 100px" }}>
        <div className="font-mono text-xs tracking-[0.2em] pt-2.5" style={{ color: "rgba(12,14,18,0.58)" }}>
          {p.n}
        </div>

        <div style={{ color: hovered ? "#1a6680" : "#0c0e12", transition: "color 0.3s" }}>
          <div
            className="font-display"
            style={{
              fontSize: "clamp(22px, 2.6vw, 38px)",
              fontWeight: 500,
              lineHeight: 1.05,
              letterSpacing: "-0.025em",
            }}
          >
            {p.name}
          </div>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.18em] mt-2.5"
            style={{ color: "rgba(12,14,18,0.58)", fontWeight: 500 }}
          >
            {p.sub}
          </div>
        </div>

        <div className="text-base leading-[1.6]" style={{ color: "rgba(12,14,18,0.7)" }}>
          {p.desc}
        </div>

        <div
          className="overflow-hidden rounded-sm"
          style={{
            width: "88px",
            height: "88px",
            border: "1px solid rgba(12,14,18,0.18)",
            flexShrink: 0,
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.img}
            alt={p.name}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: hovered ? "saturate(1) contrast(1.08)" : "saturate(0.7) contrast(1.05)",
              transform: hovered ? "scale(1.06)" : "scale(1)",
              transition: "transform 0.5s ease, filter 0.4s ease",
            }}
          />
        </div>
      </div>

      {/* Mobile 2-col layout */}
      <div className="md:hidden grid gap-4" style={{ gridTemplateColumns: "50px 1fr" }}>
        <div className="font-mono text-xs tracking-[0.2em] pt-1" style={{ color: "rgba(12,14,18,0.58)" }}>
          {p.n}
        </div>
        <div>
          <div
            className="font-display"
            style={{ fontSize: "22px", fontWeight: 500, lineHeight: 1.05, letterSpacing: "-0.025em", color: "#0c0e12" }}
          >
            {p.name}
          </div>
          <div className="font-mono text-[11px] uppercase tracking-[0.18em] mt-2" style={{ color: "rgba(12,14,18,0.58)" }}>
            {p.sub}
          </div>
          <div className="text-sm leading-[1.6] mt-2" style={{ color: "rgba(12,14,18,0.7)" }}>
            {p.desc}
          </div>
          <div className="mt-3 overflow-hidden rounded-sm w-full h-[120px]">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={p.img}
              alt={p.name}
              style={{ width: "100%", height: "100%", objectFit: "cover", filter: "saturate(0.7) contrast(1.05)" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export default function PillarsSection() {
  return (
    <section
      id="pillars"
      style={{
        background: "#ece6d6",
        color: "#0c0e12",
        padding: "clamp(80px, 10vw, 140px) 0",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
        {/* Header */}
        <div className="mb-16 md:mb-20">
          <FadeUp>
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-7 h-[1px]" style={{ background: "#1a6680" }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: "#1a6680" }}
              >
                Research Pillars
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
                maxWidth: "18ch",
              }}
            >
              Six domains we go{" "}
              <span
                className="font-serif italic"
                style={{ color: "#1a6680", fontWeight: 400 }}
              >
                deep
              </span>{" "}
              on.
            </h2>
          </FadeUp>
        </div>

        {/* Pillar list */}
        <div className="flex flex-col">
          {pillars.map((p, i) => (
            <PillarRow key={p.n} p={p} delay={i * 0.04} />
          ))}
          <div style={{ borderTop: "1px solid rgba(12,14,18,0.18)" }} />
        </div>
      </div>
    </section>
  );
}
