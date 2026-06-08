"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView } from "framer-motion";
import AnimatedX from "./AnimatedX";

const ease = [0.23, 1, 0.32, 1] as const;

const products = [
  {
    id: "cortex",
    n: "01",
    name: "Cortex",
    tag: "Intelligence",
    tagline: "The brain behind your operation.",
    desc: "Cortex ingests your data, models patterns, and surfaces intelligence that drives real-time decisions. From demand forecasting to anomaly detection — without replacing the humans in the loop.",
    features: [
      "Real-time analytics dashboards",
      "Custom ML model training & deployment",
      "Natural language query interface",
      "Automated reporting & alerts",
    ],
    status: "Live",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "sentinel",
    n: "02",
    name: "Sentinel",
    tag: "Security",
    tagline: "Threats detected. Attacks stopped.",
    desc: "End-to-end cybersecurity combining threat intelligence, identity management, and incident response. Built for organisations that cannot afford a single breach.",
    features: [
      "24/7 threat monitoring & response",
      "Zero-trust identity & access control",
      "Vulnerability scanning & patching",
      "Compliance (ISO, GDPR, NDPR)",
    ],
    status: "Live",
    img: "https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "flow",
    n: "03",
    name: "Flow",
    tag: "Automation",
    tagline: "Automate the repeatable.",
    desc: "Visual workflow builder, RPA bots, and process orchestration in one tool. Deploy in days, not months. Connects to your existing stack — no rip-and-replace.",
    features: [
      "Visual drag-and-drop builder",
      "RPA bots for desktop & web",
      "300+ pre-built integrations",
      "Smart exception handling",
    ],
    status: "Beta",
    img: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "nexus",
    n: "04",
    name: "Nexus",
    tag: "Governance",
    tagline: "Public services that work.",
    desc: "E-governance platform for African institutions — multilingual, offline-capable, low-bandwidth optimised. From permits to citizen portals, fast and transparent.",
    features: [
      "Digital ID & citizen management",
      "Permit, licence & registry workflows",
      "Offline-capable progressive web app",
      "Multilingual (EN, FR, Hausa, Igbo +)",
    ],
    status: "Live",
    img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    id: "pulse",
    n: "05",
    name: "Pulse",
    tag: "HealthTech",
    tagline: "Healthcare for the next billion.",
    desc: "Patients, providers and health systems on one interoperable platform. EMR/EHR, telemedicine, supply chain, analytics — designed for African realities.",
    features: [
      "Electronic medical records (EMR)",
      "Telemedicine & remote consultation",
      "Pharmacy & supply chain tracking",
      "Outbreak detection & analytics",
    ],
    status: "In Development",
    img: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

const statusColor: Record<string, string> = {
  Live: "#2CBF68",
  Beta: "#0B6B82",
  "In Development": "#94A3B8",
};

export default function ProductsSection() {
  const [active, setActive] = useState(0);
  const p = products[active];
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section
      id="products"
      className="w-full bg-white"
      style={{ borderTop: "1px solid #E2E8F0" }}
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
          transition={{ duration: 0.7, ease }}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14"
        >
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-5">
              Our Platforms
            </p>
            <h2
              className="font-display font-black text-[#0C0E12] leading-[1.0]"
              style={{
                fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
                letterSpacing: "-0.035em",
                maxWidth: "16ch",
              }}
            >
              Built by MG<AnimatedX />.
              <br />
              <span style={{ color: "#94A3B8" }}>Deployed everywhere.</span>
            </h2>
          </div>
          <p
            className="text-lg leading-[1.75] text-[#566070] hidden md:block"
            style={{ maxWidth: "36ch" }}
          >
            Five platforms. Every research pillar covered. One trusted partner.
          </p>
        </motion.div>

        {/* Tab strip — horizontal scroll on mobile */}
        <div
          className="flex overflow-x-auto md:overflow-visible md:flex-wrap gap-0 mb-10 sm:mb-12
                     -mx-5 px-5 sm:mx-0 sm:px-0
                     [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          style={{ borderBottom: "1px solid #E2E8F0" }}
        >
          {products.map((prod, i) => {
            const isActive = i === active;
            return (
              <button
                key={prod.id}
                onClick={() => setActive(i)}
                className="relative flex items-baseline gap-2 sm:gap-3
                           px-4 sm:px-5 md:px-7 py-4 sm:py-5
                           shrink-0 transition-colors duration-200"
                style={{ outline: "none" }}
              >
                <span
                  className="font-mono text-xs tracking-[0.15em] transition-colors duration-200"
                  style={{ color: isActive ? "#0B6B82" : "#C0CDD8" }}
                >
                  {prod.n}
                </span>
                <span
                  className="font-display font-bold transition-colors duration-200"
                  style={{
                    fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
                    color: isActive ? "#0C0E12" : "#94A3B8",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {prod.name}
                </span>
                {isActive && (
                  <motion.div
                    layoutId="tab-underline"
                    className="absolute bottom-[-1px] left-0 right-0 h-[2px]"
                    style={{ background: "#0B6B82" }}
                    transition={{ duration: 0.4, ease }}
                  />
                )}
              </button>
            );
          })}
        </div>

        {/* Detail panel — image left, content right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0" style={{ border: "1px solid #E2E8F0", borderRadius: "4px", overflow: "hidden" }}>
          {/* Image */}
          <div
            className="relative lg:col-span-7 overflow-hidden bg-[#F4F7FA]
                       min-h-[300px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[520px]"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.6, ease }}
              >
                <Image
                  src={p.img}
                  alt={p.name}
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  className="object-cover"
                  priority
                />
                {/* Soft duotone wash */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(135deg, rgba(11,107,130,0.18) 0%, transparent 55%)",
                    mixBlendMode: "multiply",
                  }}
                />
              </motion.div>
            </AnimatePresence>

            {/* Status badge */}
            <div className="absolute top-5 left-5 z-10">
              <span
                className="font-mono text-xs uppercase tracking-[0.2em] text-white px-3 py-1.5 rounded-sm"
                style={{
                  background: statusColor[p.status],
                  boxShadow: "0 4px 16px rgba(0,0,0,0.15)",
                }}
              >
                ● {p.status}
              </span>
            </div>

            {/* Floating number — luxury watch detail */}
            <div className="absolute bottom-5 right-5 z-10">
              <span
                className="font-display font-black text-white/15"
                style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.06em", lineHeight: 1 }}
              >
                {p.n}
              </span>
            </div>
          </div>

          {/* Content */}
          <div
            className="lg:col-span-5 flex flex-col
                       p-6 sm:p-8 md:p-10 lg:p-12
                       gap-6 sm:gap-7 bg-white"
            style={{ borderLeft: "1px solid #E2E8F0" }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.45, ease }}
                className="flex flex-col gap-6"
              >
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.22em] text-[#94A3B8] mb-3">
                    MG<AnimatedX /> {p.name} · {p.tag}
                  </p>
                  <h3
                    className="font-display font-black text-[#0C0E12] leading-[1.0]"
                    style={{ fontSize: "clamp(1.8rem, 2.8vw, 2.6rem)", letterSpacing: "-0.035em" }}
                  >
                    {p.tagline}
                  </h3>
                </div>

                <p className="text-base leading-[1.75] text-[#566070]">{p.desc}</p>

                {/* Feature list */}
                <div className="flex flex-col" style={{ borderTop: "1px solid #EDF2F7" }}>
                  {p.features.map((f, i) => (
                    <motion.div
                      key={f}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.05, ease }}
                      className="flex items-center gap-4 py-3.5"
                      style={{ borderBottom: "1px solid #EDF2F7" }}
                    >
                      <span
                        className="font-mono text-xs text-[#C0CDD8] w-5 shrink-0"
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="text-base text-[#0C0E12]">{f}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 px-5 py-3 text-sm lg:text-base font-semibold text-white rounded-md transition-all hover:opacity-90 active:scale-[0.97]"
                    style={{ background: "#0B6B82" }}
                  >
                    {p.status === "Live" ? "Request Access" : "Join Waitlist"}
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h7M6 2.5L9 6 6 9.5" stroke="white" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </a>
                  <a
                    href="#contact"
                    className="px-5 py-3 text-sm lg:text-base font-semibold text-[#0B6B82] hover:underline underline-offset-4 transition-all"
                  >
                    Talk to us →
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
