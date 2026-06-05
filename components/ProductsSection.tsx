"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

/* ── PRODUCTS ─────────────────────────────────────────────────────── */
const products = [
  {
    id: "cortex",
    name: "MGX Cortex",
    tag: "AI & Intelligence",
    tagline: "The brain behind your operation.",
    desc: "Cortex is MGX's AI and analytics engine. It ingests your data, models patterns, and surfaces intelligence that drives better decisions — in real time. From demand forecasting to anomaly detection, Cortex makes your business smarter without replacing the humans in it.",
    features: [
      "Real-time analytics dashboards",
      "Custom ML model training & deployment",
      "Natural language query interface",
      "Automated reporting & alerts",
      "API-first, plug into any stack",
    ],
    status: "Live",
    color: "#3B9FE8",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3"/>
        <circle cx="32" cy="32" r="16" stroke="currentColor" strokeWidth="1.5"/>
        <circle cx="32" cy="32" r="4" fill="currentColor"/>
        {[0,60,120,180,240,300].map((deg, i) => {
          const r = 22, rad = (deg * Math.PI) / 180;
          const x = 32 + r * Math.cos(rad), y = 32 + r * Math.sin(rad);
          return <circle key={i} cx={x} cy={y} r="2.5" fill="currentColor" opacity="0.6"/>;
        })}
      </svg>
    ),
  },
  {
    id: "sentinel",
    name: "MGX Sentinel",
    tag: "Security & Resilience",
    tagline: "Threats detected. Attacks stopped.",
    desc: "Sentinel is our end-to-end cybersecurity platform — combining threat intelligence, identity management, and incident response into one unified system. Built for organisations that operate in high-risk environments and can't afford a single breach.",
    features: [
      "24/7 threat monitoring & response",
      "Zero-trust identity & access control",
      "Vulnerability scanning & patching",
      "Compliance reporting (ISO, GDPR, NDPR)",
      "Incident playbook automation",
    ],
    status: "Live",
    color: "#E84B3B",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <path d="M32 8 L52 16 L52 32 C52 44 43 54 32 58 C21 54 12 44 12 32 L12 16 Z"
          stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        <path d="M23 32 L29 38 L41 26" stroke="currentColor" strokeWidth="2"
          strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "flow",
    name: "MGX Flow",
    tag: "Automation & Robotics",
    tagline: "Automate the repeatable. Free the capable.",
    desc: "Flow is our intelligent automation platform — drag-and-drop process builder, RPA bots, and workflow orchestration in one tool. Deploy in days, not months. Works with your existing systems, no rip-and-replace required.",
    features: [
      "Visual drag-and-drop workflow builder",
      "RPA bots for any desktop or web task",
      "300+ pre-built integrations",
      "Smart exception handling",
      "Real-time process analytics",
    ],
    status: "Beta",
    color: "#F5A623",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <rect x="8" y="20" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="24" y="34" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="40" y="20" width="16" height="10" rx="2" stroke="currentColor" strokeWidth="1.5"/>
        <path d="M24 25 L24 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M24 25 L40 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M40 25 L40 20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <path d="M32 34 L32 30 L32 25" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "nexus",
    name: "MGX Nexus",
    tag: "Governance & Smart Systems",
    tagline: "Government services that actually work.",
    desc: "Nexus is our e-governance and public service platform. Built with African institutions in mind — multilingual, offline-capable, low-bandwidth optimised. From permit applications to citizen portals, Nexus makes public services fast, transparent and accessible.",
    features: [
      "Citizen identity & digital ID management",
      "Permit, licence & registry workflows",
      "Offline-capable progressive web app",
      "Audit trail & transparency dashboard",
      "Multilingual (EN, FR, Swahili + more)",
    ],
    status: "Live",
    color: "#9B59B6",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <path d="M12 28 L32 12 L52 28" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        <rect x="20" y="28" width="24" height="22" rx="1" stroke="currentColor" strokeWidth="1.5"/>
        <rect x="27" y="38" width="10" height="12" rx="1" stroke="currentColor" strokeWidth="1.2"/>
        <path d="M26 22 L38 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "pulse",
    name: "MGX Pulse",
    tag: "HealthTech",
    tagline: "Healthcare infrastructure for the next billion.",
    desc: "Pulse connects patients, providers and health systems on one interoperable platform. EMR/EHR management, telemedicine, supply chain tracking and health analytics — designed for the realities of healthcare delivery across Africa.",
    features: [
      "Electronic medical records (EMR/EHR)",
      "Telemedicine & remote consultation",
      "Pharmacy & supply chain management",
      "Health analytics & outbreak detection",
      "Insurance & billing integration",
    ],
    status: "In Development",
    color: "#3DBE6E",
    icon: (
      <svg viewBox="0 0 64 64" fill="none" className="w-full h-full">
        <path d="M8 32 L20 32 L26 18 L32 46 L38 28 L44 32 L56 32"
          stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

const statusColors: Record<string, string> = {
  "Live":           "#3DBE6E",
  "Beta":           "#F5A623",
  "In Development": "#3B9FE8",
};

/* ── PRODUCT DETAIL ───────────────────────────────────────────────── */
function ProductDetail({ product }: { product: typeof products[0] }) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={product.id}
        className="flex flex-col gap-8 h-full"
        initial={{ opacity: 0, x: 30 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -30 }}
        transition={{ duration: 0.45, ease }}
      >
        {/* Icon */}
        <div
          className="w-16 h-16 shrink-0"
          style={{ color: product.color }}
        >
          {product.icon}
        </div>

        {/* Tag + status */}
        <div className="flex items-center gap-3">
          <div style={{ display: "inline-block", transform: "skewX(-10deg)" }}>
            <span
              className="font-mono text-[10px] uppercase font-semibold"
              style={{
                display: "inline-block",
                transform: "skewX(10deg)",
                letterSpacing: "0.18em",
                color: product.color,
                background: `${product.color}18`,
                border: `1px solid ${product.color}35`,
                padding: "3px 10px",
              }}
            >
              {product.tag}
            </span>
          </div>
          <span
            className="font-mono text-[10px] uppercase tracking-[0.15em] px-2.5 py-1 rounded-full"
            style={{
              color: statusColors[product.status],
              background: `${statusColors[product.status]}15`,
              border: `1px solid ${statusColors[product.status]}30`,
            }}
          >
            ● {product.status}
          </span>
        </div>

        {/* Name + tagline */}
        <div>
          <h3
            className="font-display font-black text-white leading-none mb-3"
            style={{ fontSize: "clamp(2.5rem, 4vw, 4rem)", letterSpacing: "-0.04em" }}
          >
            {product.name}
          </h3>
          <p
            className="font-display font-semibold leading-tight"
            style={{
              fontSize: "clamp(1rem, 1.8vw, 1.3rem)",
              letterSpacing: "-0.02em",
              color: product.color,
            }}
          >
            {product.tagline}
          </p>
        </div>

        {/* Description */}
        <p className="text-[15px] leading-relaxed" style={{ color: "rgba(255,255,255,0.6)", maxWidth: "48ch" }}>
          {product.desc}
        </p>

        {/* Features */}
        <div className="flex flex-col gap-2.5">
          {product.features.map((f, i) => (
            <motion.div
              key={f}
              className="flex items-start gap-3"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 + 0.1, duration: 0.35, ease }}
            >
              <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: product.color }} />
              <span className="text-[14px]" style={{ color: "rgba(255,255,255,0.75)" }}>{f}</span>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.4 }}
          className="flex gap-3 mt-auto pt-4"
        >
          <button
            className="px-6 py-3 rounded-md text-[14px] font-semibold text-stone-900 hover:brightness-95 active:scale-[0.97] transition-all"
            style={{ background: product.color }}
          >
            {product.status === "Live" ? "Request Access →" : "Join Waitlist →"}
          </button>
          <button
            className="px-6 py-3 rounded-md text-[14px] font-semibold border transition-all hover:border-white/30"
            style={{ color: "rgba(255,255,255,0.5)", borderColor: "rgba(255,255,255,0.12)" }}
          >
            Learn More
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

/* ── MAIN ─────────────────────────────────────────────────────────── */
export default function ProductsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ background: "linear-gradient(160deg, #06090f 0%, #0b1422 50%, #06090f 100%)", minHeight: "100vh" }}
    >
      {/* Grain */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='250' height='250'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='250' height='250' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "250px",
          opacity: 0.1,
          mixBlendMode: "overlay",
        }}
      />

      {/* Colour glow — tracks active product */}
      <motion.div
        className="absolute top-[-20%] right-[-10%] w-[700px] h-[700px] rounded-full blur-[160px] pointer-events-none"
        animate={{ background: products[active].color, opacity: 0.06 }}
        transition={{ duration: 0.8 }}
      />

      <div className="relative z-10 max-w-[1320px] mx-auto px-8 py-24 flex flex-col gap-16">

        {/* Section header */}
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] mb-4"
            style={{ color: "rgba(255,255,255,0.3)" }}>
            Our Products
          </p>
          <h2
            className="font-display font-black text-white leading-none"
            style={{ fontSize: "clamp(2.5rem, 5vw, 5rem)", letterSpacing: "-0.04em" }}
          >
            Built by MGX.
            <br />
            <span style={{
              background: "linear-gradient(135deg, #3B9FE8 20%, #3DBE6E 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
            }}>
              Deployed everywhere.
            </span>
          </h2>
        </div>

        {/* Main interactive layout */}
        <div className="flex gap-8 min-h-[560px]">

          {/* ── LEFT: Product nav list ── */}
          <div className="flex flex-col gap-1 w-[260px] shrink-0">
            {products.map((p, i) => (
              <button
                key={p.id}
                onClick={() => setActive(i)}
                className="group relative flex flex-col gap-0.5 px-4 py-4 rounded-xl text-left transition-all duration-200"
                style={{
                  background: active === i ? `${p.color}12` : "transparent",
                  border: `1px solid ${active === i ? `${p.color}30` : "transparent"}`,
                }}
              >
                {/* Active left bar */}
                <motion.div
                  className="absolute left-0 top-3 bottom-3 w-[3px] rounded-full"
                  animate={{ opacity: active === i ? 1 : 0, scaleY: active === i ? 1 : 0.3 }}
                  style={{ background: p.color, transformOrigin: "center" }}
                  transition={{ duration: 0.25 }}
                />

                <span
                  className="font-display font-bold text-[15px] leading-tight transition-colors"
                  style={{ color: active === i ? "white" : "rgba(255,255,255,0.4)" }}
                >
                  {p.name}
                </span>
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.12em] transition-colors"
                  style={{ color: active === i ? p.color : "rgba(255,255,255,0.2)" }}
                >
                  {p.tag}
                </span>
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="w-px shrink-0" style={{ background: "rgba(255,255,255,0.06)" }} />

          {/* ── RIGHT: Product detail ── */}
          <div className="flex-1 pl-4">
            <ProductDetail product={products[active]} />
          </div>
        </div>

      </div>
    </section>
  );
}
