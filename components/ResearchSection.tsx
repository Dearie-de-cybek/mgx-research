"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedX from "./AnimatedX";

const ease = [0.23, 1, 0.32, 1] as const;

const stats = [
  { value: "6+", label: "Research Domains" },
  { value: "18+", label: "Countries Served" },
  { value: "50+", label: "Partners" },
  { value: "2019", label: "Founded" },
];

const pillars = [
  {
    n: "01",
    name: "Intelligence Systems",
    sub: "AI · ML · Data Analytics",
    desc: "Custom AI models and analytics pipelines that adapt to real operational data — not vendor assumptions.",
  },
  {
    n: "02",
    name: "Security & Resilience",
    sub: "Cybersecurity · Threat Intel",
    desc: "Zero-trust architecture, 24/7 monitoring and incident response for high-risk environments.",
  },
  {
    n: "03",
    name: "Automation & Robotics",
    sub: "RPA · Process Intelligence",
    desc: "Eliminate repeatable work. From front-office workflows to factory floor robotics.",
  },
  {
    n: "04",
    name: "Digital Infrastructure",
    sub: "Cloud · Enterprise · Software",
    desc: "Cloud environments and custom platforms built for reliability at scale — no vendor lock-in.",
  },
  {
    n: "05",
    name: "Governance & Smart Systems",
    sub: "E-Governance · Smart Cities",
    desc: "Citizen portals and smart infrastructure designed first for the people who use them daily.",
  },
  {
    n: "06",
    name: "Human-Centered Innovation",
    sub: "HealthTech · EdTech · UX",
    desc: "Health, education and service platforms designed for real constraints and real communities.",
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
      transition={{ duration: 0.7, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ResearchSection() {
  return (
    <section
      id="research"
      className="w-full bg-white"
      style={{ borderTop: "1px solid #E2E8F0" }}
    >
      {/* ── Main body ───────────────────────────────────────────── */}
      <div
        className="max-w-[1280px] mx-auto
                   px-5 sm:px-8 md:px-12 lg:px-20
                   pt-20 sm:pt-24 md:pt-28 lg:pt-32
                   pb-16 sm:pb-20 md:pb-24 lg:pb-28"
      >
        {/* Header */}
        <FadeUp>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#94A3B8] mb-5">
            MG<AnimatedX /> Research
          </p>
        </FadeUp>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <FadeUp delay={0.05}>
            <h2
              className="font-display font-black text-[#0C0E12] leading-[1.0]"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 5rem)",
                letterSpacing: "-0.035em",
                maxWidth: "16ch",
              }}
            >
              Where curiosity
              <br />
              becomes{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #0B6B82 0%, #2CBF68 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                technology.
              </span>
            </h2>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              className="text-[17px] leading-[1.8] text-[#566070]"
              style={{ maxWidth: "46ch" }}
            >
              MexyGabriel (MG<AnimatedX />) is a full-spectrum technology
              solutions company turning research-grade thinking into real-world
              systems. We serve startups, enterprises and governments with
              solutions that are intelligent, resilient, and human-centered.
            </p>
          </FadeUp>
        </div>

        {/* Stats — minimal inline row, no boxes */}
        <FadeUp delay={0.12}>
          <div
            className="grid grid-cols-2 md:flex md:flex-wrap md:items-baseline
                       gap-y-6 py-8 sm:py-10"
            style={{
              borderTop: "1px solid #E2E8F0",
              borderBottom: "1px solid #E2E8F0",
            }}
          >
            {stats.map((s, i) => (
              <div
                key={s.label}
                className="flex items-baseline
                           gap-3 sm:gap-4
                           md:flex-1 md:min-w-[160px]
                           md:pl-8 md:first:pl-0
                           md:[&:nth-child(n+2)]:border-l
                           md:[&:nth-child(n+2)]:border-[#E2E8F0]"
              >
                <span
                  className="font-display font-black text-[#0B6B82] leading-none"
                  style={{
                    fontSize: "clamp(1.8rem, 4.5vw, 2.8rem)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {s.value}
                </span>
                <span className="font-mono text-[9px] sm:text-[10px] uppercase tracking-[0.16em] sm:tracking-[0.18em] text-[#566070]">
                  {s.label}
                </span>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Pillars — editorial numbered list, no grid */}
        <div className="mt-24">
          <FadeUp>
            <div className="flex items-baseline justify-between mb-10">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-[#94A3B8]">
                Our 6 Research Pillars
              </p>
              <span className="font-mono text-[10px] tracking-[0.2em] text-[#C0CDD8]">
                001 — 006
              </span>
            </div>
          </FadeUp>

          {/* Editorial list — 1 col on mobile, 2 col tablet+ */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 lg:gap-x-16 gap-y-0">
            {pillars.map((p, i) => (
              <FadeUp key={p.n} delay={(i % 2) * 0.05}>
                <div
                  className="group flex items-start gap-4 sm:gap-6 py-7 sm:py-9"
                  style={{ borderBottom: "1px solid #EDF2F7" }}
                >
                  <span
                    className="font-display font-black leading-none shrink-0 transition-colors duration-300"
                    style={{
                      fontSize: "clamp(2rem, 5.5vw, 2.75rem)",
                      letterSpacing: "-0.04em",
                      color: "#C0CDD8",
                    }}
                  >
                    {p.n}
                  </span>
                  <div className="flex flex-col gap-2 pt-1 min-w-0">
                    <h3
                      className="font-display font-bold text-[#0C0E12] leading-tight group-hover:text-[#0B6B82] transition-colors duration-200"
                      style={{
                        fontSize: "clamp(1rem, 2.4vw, 1.25rem)",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      {p.name}
                    </h3>
                    <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[#94A3B8]">
                      {p.sub}
                    </p>
                    <p className="text-[13px] sm:text-[14px] leading-[1.7] text-[#566070] mt-1">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>

      {/* Mission strip */}
      <div style={{ background: "#0B6B82", borderTop: "1px solid #075062" }}>
        <div
          className="max-w-[1280px] mx-auto
                     px-5 sm:px-8 md:px-12 lg:px-20
                     py-8 sm:py-10
                     flex flex-col md:flex-row md:items-center md:justify-between
                     gap-5 md:gap-6"
        >
          <p
            className="font-display font-bold text-white leading-snug"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em", maxWidth: "52ch" }}
          >
            "Solving real human problems with technology — Africa-rooted, globally-minded."
          </p>
          <a
            href="#services"
            className="shrink-0 px-6 py-3 text-[14px] font-semibold rounded-md transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: "#FFFFFF", color: "#0B6B82" }}
          >
            Explore Our Services
          </a>
        </div>
      </div>
    </section>
  );
}
