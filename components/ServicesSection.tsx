"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedX from "./AnimatedX";

const ease = [0.23, 1, 0.32, 1] as const;

const services = [
  {
    n: "01",
    title: "Intelligence Systems",
    sub: "AI · ML · Data Analytics · SaaS",
    desc: "We turn raw data into decisions. Custom AI models, real-time analytics, and intelligent dashboards that adapt to how your business actually operates.",
  },
  {
    n: "02",
    title: "Security & Resilience",
    sub: "Cybersecurity · Managed IT · Threat Intel",
    desc: "Proactive defence across your entire digital surface. Zero-trust architecture, 24/7 monitoring and incident response — so a breach stays a near-miss.",
  },
  {
    n: "03",
    title: "Automation & Robotics",
    sub: "RPA · Robotics · Process Intelligence",
    desc: "Eliminate work that shouldn't need a human. We design automation that scales  from front-office workflows to factory floor robotics.",
  },
  {
    n: "04",
    title: "Digital Infrastructure",
    sub: "Cloud · Enterprise · Custom Software",
    desc: "We architect cloud environments, enterprise platforms and custom software built for reliability at scale  without locking you into a single vendor.",
  },
  {
    n: "05",
    title: "Governance & Smart Systems",
    sub: "E-Governance · Smart Cities · Urban Tech",
    desc: "Technology that serves the public good. From citizen portals to smart city infrastructure  systems designed for the people who use them every day.",
  },
  {
    n: "06",
    title: "Human-Centered Innovation",
    sub: "HealthTech · EdTech · UX Design",
    desc: "Innovation with the human in the room. We build health, education and service platforms designed for real people, real constraints, real communities.",
  },
];

function ServiceCard({ s, index }: { s: (typeof services)[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay: (index % 3) * 0.07 }}
      className="flex flex-col gap-4 sm:gap-5
                 p-6 sm:p-7 md:p-8
                 bg-white rounded-lg group
                 hover:shadow-[0_12px_36px_rgba(11,107,130,0.08)]
                 hover:-translate-y-1 transition-all duration-300 cursor-default"
      style={{ border: "1px solid #E2E8F0" }}
    >
      <div className="flex items-start justify-between">
        <span className="font-mono text-xs text-[#C0CDD8] tracking-[0.15em]">{s.n}</span>
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "#0B6B82" }}
        >
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
            <path
              d="M2 5h6M5 2l3 3-3 3"
              stroke="white"
              strokeWidth="1.3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </div>

      <div>
        <h3
          className="font-display font-bold text-[#0C0E12] leading-tight mb-1.5"
          style={{ fontSize: "20px", letterSpacing: "-0.02em" }}
        >
          {s.title}
        </h3>
        <p className="font-mono text-xs uppercase tracking-[0.14em] text-[#94A3B8]">
          {s.sub}
        </p>
      </div>

      <p className="text-base leading-[1.75] text-[#566070]">{s.desc}</p>

      <div
        className="mt-auto h-[1.5px] w-0 group-hover:w-10 transition-all duration-300 rounded-full"
        style={{ background: "#0B6B82" }}
      />
    </motion.div>
  );
}

export default function ServicesSection() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="services"
      className="w-full"
      style={{ background: "#F4F7FA", borderTop: "1px solid #E2E8F0" }}
    >
      <div
        className="max-w-[1280px] mx-auto
                   px-5 sm:px-8 md:px-12 lg:px-20
                   pt-20 sm:pt-24 md:pt-28 lg:pt-32
                   pb-20 sm:pb-24 md:pb-28 lg:pb-32"
      >
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.65, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-5">
              Our Services
            </p>
            <h2
              className="font-display font-black text-[#0C0E12] leading-[1.0]"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
                letterSpacing: "-0.035em",
              }}
            >
              What We Build
            </h2>
          </div>

          <p
            className="text-lg leading-[1.75] text-[#566070] hidden md:block"
            style={{ maxWidth: "44ch" }}
          >
            Six interconnected domains. Each one a discipline in its own right.
            All available through a single trusted partner.
          </p>
        </motion.div>

        {/* Grid — gapped cards, no shared borders */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <ServiceCard key={s.n} s={s} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex justify-center mt-14"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-3 px-8 py-4 text-base font-semibold text-white rounded-md transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: "#0B6B82" }}
          >
            Work with MG<AnimatedX />
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
