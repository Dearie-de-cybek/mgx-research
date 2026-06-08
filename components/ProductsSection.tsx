"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

/* ── PRODUCTS ─────────────────────────────────────────────────────── */
const products = [
  {
    id: "cortex",
    number: "01",
    name: "MGX Cortex",
    tag: "AI & Intelligence",
    tagline: "The brain behind your operation.",
    desc: "Cortex ingests your data, models patterns, and surfaces intelligence that drives better decisions in real time. From demand forecasting to anomaly detection — it makes your business smarter without replacing the humans in it.",
    features: ["Real-time analytics dashboards", "Custom ML model training & deployment", "Natural language query interface", "Automated reporting & alerts"],
    status: "Live",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "sentinel",
    number: "02",
    name: "MGX Sentinel",
    tag: "Security & Resilience",
    tagline: "Threats detected. Attacks stopped.",
    desc: "End-to-end cybersecurity combining threat intelligence, identity management, and incident response. Built for organisations operating in high-risk environments that cannot afford a single breach.",
    features: ["24/7 threat monitoring & response", "Zero-trust identity & access control", "Vulnerability scanning & patching", "Compliance reporting (ISO, GDPR, NDPR)"],
    status: "Live",
    img: "https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "flow",
    number: "03",
    name: "MGX Flow",
    tag: "Automation",
    tagline: "Automate the repeatable. Free the capable.",
    desc: "Visual workflow builder, RPA bots, and process orchestration in one tool. Deploy in days, not months. Connects to your existing stack — no rip-and-replace.",
    features: ["Visual drag-and-drop builder", "RPA bots for desktop & web", "300+ pre-built integrations", "Smart exception handling"],
    status: "Beta",
    img: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "nexus",
    number: "04",
    name: "MGX Nexus",
    tag: "Governance",
    tagline: "Government services that actually work.",
    desc: "E-governance and public service platform built for African institutions — multilingual, offline-capable, low-bandwidth optimised. From permits to citizen portals, Nexus makes public services fast and transparent.",
    features: ["Digital ID & citizen management", "Permit, licence & registry workflows", "Offline-capable progressive web app", "Multilingual (EN, FR, Swahili +)"],
    status: "Live",
    img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
  {
    id: "pulse",
    number: "05",
    name: "MGX Pulse",
    tag: "HealthTech",
    tagline: "Healthcare infrastructure for the next billion.",
    desc: "Connects patients, providers and health systems on one interoperable platform. EMR/EHR, telemedicine, supply chain tracking and health analytics — designed for the realities of healthcare delivery across Africa.",
    features: ["Electronic medical records (EMR)", "Telemedicine & remote consultation", "Pharmacy & supply chain tracking", "Health analytics & outbreak detection"],
    status: "In Development",
    img: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1200",
  },
];

const statusLabel: Record<string, string> = {
  "Live": "● Live",
  "Beta": "● Beta",
  "In Development": "● In Development",
};

/* ── STICKY VISUAL PANEL ──────────────────────────────────────────── */
function StickyPanel({ active }: { active: number }) {
  const p = products[active];
  return (
    <div className="sticky top-0 h-screen flex flex-col justify-center pl-12 pr-4">
      {/* Image */}
      <div className="relative w-full rounded-2xl overflow-hidden mb-6" style={{ height: "52vh" }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={p.id}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            transition={{ duration: 0.55, ease }}
          >
            <Image
              src={p.img}
              alt={p.name}
              fill
              sizes="50vw"
              className="object-cover"
              priority
            />
          </motion.div>
        </AnimatePresence>

        {/* Status badge */}
        <div className="absolute top-4 left-4 z-10">
          <span className="font-mono text-[10px] uppercase tracking-[0.18em] px-3 py-1.5 rounded-sm text-stone-700"
            style={{
              background: "rgba(255,255,255,0.85)",
              backdropFilter: "blur(8px)",
              border: "1px solid rgba(0,0,0,0.08)",
            }}>
            {statusLabel[p.status]}
          </span>
        </div>
      </div>

      {/* Product detail */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`detail-${p.id}`}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -12 }}
          transition={{ duration: 0.4, ease }}
          className="flex flex-col gap-3"
        >
          {/* Slanted tag */}
          <div style={{ display: "inline-block", transform: "skewX(-10deg)", width: "fit-content" }}>
            <span className="font-mono text-[10px] uppercase font-semibold"
              style={{
                display: "inline-block",
                transform: "skewX(10deg)",
                letterSpacing: "0.18em",
                color: "oklch(14% 0.012 260)",
                background: "oklch(93% 0.01 70)",
                border: "1px solid oklch(85% 0.01 70)",
                padding: "3px 10px",
              }}>
              {p.tag}
            </span>
          </div>

          <p className="text-[16px] leading-relaxed" style={{ color: "oklch(35% 0.01 260)", maxWidth: "44ch" }}>
            {p.desc}
          </p>

          {/* Features */}
          <div className="flex flex-col gap-2 mt-1">
            {p.features.map((f) => (
              <div key={f} className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "oklch(14% 0.012 260)" }} />
                <span className="text-[15px]" style={{ color: "oklch(25% 0.01 260)" }}>{f}</span>
              </div>
            ))}
          </div>

          {/* CTA */}
          <button
            className="mt-3 inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold text-stone-900 hover:brightness-95 active:scale-[0.97] transition-all w-fit"
            style={{ background: "#EBFFB3" }}
          >
            {p.status === "Live" ? "Request Access" : "Join Waitlist"} →
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

/* ── SCROLL ITEM ──────────────────────────────────────────────────── */
function ProductItem({
  product,
  index,
  isActive,
  onVisible,
}: {
  product: typeof products[0];
  index: number;
  isActive: boolean;
  onVisible: (i: number) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) onVisible(index); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [index, onVisible]);

  return (
    <div
      ref={ref}
      className="flex items-start gap-6 py-20 border-b"
      style={{ borderColor: "oklch(88% 0.008 80)" }}
    >
      {/* Number */}
      <span
        className="font-display font-black leading-none shrink-0"
        style={{
          fontSize: "clamp(4rem, 6vw, 7rem)",
          letterSpacing: "-0.06em",
          color: isActive ? "oklch(14% 0.012 260)" : "oklch(85% 0.008 80)",
          transition: "color 0.35s ease",
        }}
      >
        {product.number}
      </span>

      {/* Text */}
      <div className="flex flex-col gap-3 pt-3">
        <h3
          className="font-display font-black leading-none"
          style={{
            fontSize: "clamp(2.2rem, 3.5vw, 3.5rem)",
            letterSpacing: "-0.04em",
            color: isActive ? "oklch(14% 0.012 260)" : "oklch(60% 0.008 80)",
            transition: "color 0.35s ease",
          }}
        >
          {product.name}
        </h3>
        <p
          className="font-mono text-[13px] uppercase tracking-[0.18em]"
          style={{
            color: isActive ? "oklch(35% 0.01 260)" : "oklch(72% 0.008 80)",
            transition: "color 0.35s ease",
          }}
        >
          {product.tagline}
        </p>
      </div>
    </div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────────────── */
export default function ProductsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative w-full"
      style={{ background: "oklch(97% 0.006 80)" }}
    >
      <div className="max-w-[1320px] mx-auto px-8">

        {/* Section header */}
        <div className="pt-24 pb-12 border-b" style={{ borderColor: "oklch(88% 0.008 80)" }}>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{ color: "oklch(65% 0.008 260)" }}>
            Our Products
          </p>
          <div className="flex items-end justify-between gap-8">
            <h2
              className="font-display font-black leading-none"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 5rem)",
                letterSpacing: "-0.04em",
                color: "oklch(14% 0.012 260)",
              }}
            >
              Built by MGX.
              <br />
              Deployed everywhere.
            </h2>
            <p className="text-[14px] leading-relaxed hidden md:block"
              style={{ color: "oklch(45% 0.01 260)", maxWidth: "32ch" }}>
              Five platforms. Every pillar covered. One partner.
            </p>
          </div>
        </div>

        {/* Two-column scroll layout */}
        <div className="grid grid-cols-2 gap-0">

          {/* LEFT: scroll list */}
          <div className="pr-12 border-r" style={{ borderColor: "oklch(88% 0.008 80)" }}>
            {products.map((p, i) => (
              <ProductItem
                key={p.id}
                product={p}
                index={i}
                isActive={active === i}
                onVisible={setActive}
              />
            ))}
            <div className="pb-24" />
          </div>

          {/* RIGHT: sticky image + detail */}
          <div>
            <StickyPanel active={active} />
          </div>

        </div>
      </div>
    </section>
  );
}
