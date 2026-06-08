"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedX from "./AnimatedX";

const ease = [0.23, 1, 0.32, 1] as const;

const stats = [
  {
    value: "6+",
    title: "Research Domains",
    label: "Active exploration in AI, Robotics, Cybersecurity, Smart Systems, and Digital Infrastructure.",
    gradient: "from-[#0B6B82]/10 via-white/80 to-[#2CBF68]/5",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0B6B82" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    )
  },
  {
    value: "18+",
    title: "Countries Served",
    label: "Deploying solutions and collaboration networks across multiple continents.",
    gradient: "from-[#2CBF68]/10 via-white/80 to-[#3B9FE8]/5",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2CBF68" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    )
  },
  {
    value: "50+",
    title: "Partners",
    label: "Trusted by top-tier academic institutions, corporate leaders, and startup ecosystems.",
    gradient: "from-[#3B9FE8]/10 via-white/80 to-[#0B6B82]/5",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B9FE8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M16 3.13a4 4 0 0 1 0 7.75M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
          <circle cx="9" cy="7" r="4" />
      </svg>
    )
  },
  {
    value: "2017",
    title: "Founded",
    label: "Est. in Enugu, Nigeria, with a mission to bring high-fidelity research into production.",
    gradient: "from-[#0E90A8]/10 via-white/80 to-[#2CBF68]/5",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0E90A8" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
        <line x1="16" y1="2" x2="16" y2="6" />
        <line x1="8" y1="2" x2="8" y2="6" />
        <line x1="3" y1="10" x2="21" y2="10" />
      </svg>
    )
  },
];



function FadeUp({
  children,
  delay = 0,
  className,
  style,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
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
      style={style}
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
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-5">
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
              className="text-lg leading-[1.8] text-[#566070]"
              style={{ maxWidth: "46ch" }}
            >
              MexyGabriel (MG<AnimatedX />) is a full-spectrum technology
              solutions company turning research-grade thinking into real-world
              systems. We serve startups, enterprises and governments with
              solutions that are intelligent, resilient, and human-centered.
            </p>
          </FadeUp>
        </div>

        {/* Animated Marquee Spacing Strip */}
        <div className="my-16 md:my-24 relative overflow-hidden select-none py-6 border-y border-[#E2E8F0]/85 bg-[#F8FAFC]/40">
          {/* Fading side mask gradients */}
          <div className="absolute inset-y-0 left-0 w-20 md:w-32 bg-gradient-to-r from-white via-white/80 to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-20 md:w-32 bg-gradient-to-l from-white via-white/80 to-transparent z-10 pointer-events-none" />

          {/* Marquee Track */}
          <div className="flex overflow-hidden whitespace-nowrap">
            <div className="flex animate-marquee gap-16 text-[#0B6B82]/60 font-mono text-xs uppercase tracking-[0.32em] font-semibold shrink-0">
              <span>Intelligence & Systems</span>
              <span className="text-[#2CBF68]">•</span>
              <span>Deep-Tech Research</span>
              <span className="text-[#3B9FE8]">•</span>
              <span>Security & Resilience</span>
              <span className="text-[#0E90A8]">•</span>
              <span>Automation & Robotics</span>
              <span className="text-[#2CBF68]">•</span>
              <span>Governance & Infrastructure</span>
              <span className="text-[#0B6B82]">•</span>
              <span>Human Innovation</span>
              <span className="text-[#3B9FE8]">•</span>
              
              {/* Duplicate track for seamless infinite scroll */}
              <span>Intelligence & Systems</span>
              <span className="text-[#2CBF68]">•</span>
              <span>Deep-Tech Research</span>
              <span className="text-[#3B9FE8]">•</span>
              <span>Security & Resilience</span>
              <span className="text-[#0E90A8]">•</span>
              <span>Automation & Robotics</span>
              <span className="text-[#2CBF68]">•</span>
              <span>Governance & Infrastructure</span>
              <span className="text-[#0B6B82]">•</span>
              <span>Human Innovation</span>
              <span className="text-[#3B9FE8]">•</span>
            </div>
          </div>
        </div>

        {/* Stats Section — Stacking Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start relative pb-16">
          {/* Left Column - Sticky Description */}
          <div className="lg:col-span-5 lg:sticky lg:top-[120px] mb-8 lg:mb-0">
            <FadeUp>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-3">
                MGX Impact
              </p>
              <h3 className="font-display font-black text-[#0C0E12] text-3xl md:text-4xl leading-tight tracking-tight mb-6">
                Our operations by the numbers.
              </h3>
              <p className="text-[#566070] leading-[1.8] text-base md:text-lg">
                We measure our success by the scale of the systems we deploy, the partners we empower, and the real-world value created through our research.
              </p>
            </FadeUp>
          </div>

          {/* Right Column - Stacking Cards Stack */}
          <div className="lg:col-span-7 flex flex-col gap-6 md:gap-8 relative">
            {stats.map((s, i) => (
              <FadeUp
                key={s.title}
                delay={i * 0.05}
                className="sticky"
                style={{
                  top: `calc(120px + ${i * 40}px)`,
                  zIndex: i + 1,
                }}
              >
                <div className={`bg-gradient-to-br ${s.gradient} backdrop-blur-md border border-white/60 rounded-2xl p-8 md:p-10 shadow-[0_12px_40px_rgba(11,107,130,0.03)] flex flex-col gap-4 relative overflow-hidden transition-all duration-300 hover:shadow-[0_20px_50px_rgba(11,107,130,0.06)] hover:-translate-y-0.5`}>
                  {/* Subtle top light reflection bar */}
                  <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent" />
                  
                  <div className="flex items-center justify-between gap-4">
                    <span
                      className="font-display font-black text-[#0B6B82] leading-none"
                      style={{
                        fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {s.value}
                    </span>
                    <div className="shrink-0 p-3 rounded-xl bg-white/70 backdrop-blur-sm border border-white/90 shadow-[0_4px_12px_rgba(0,0,0,0.02)] flex items-center justify-center">
                      {s.icon}
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h4 className="font-display font-bold text-[#0C0E12] text-lg md:text-xl">
                      {s.title}
                    </h4>
                    <p className="text-sm md:text-base text-[#566070] leading-[1.6]">
                      {s.label}
                    </p>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
