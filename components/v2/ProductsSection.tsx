"use client";

import { useState, useRef } from "react";
import { AnimatePresence, motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

function FadeUp({ children, delay = 0, className }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.8, ease, delay }} className={className}>
      {children}
    </motion.div>
  );
}

const GALLERY = [
  { src: "https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg?auto=compress&cs=tinysrgb&w=900", cap: "Robotics · Lab 01", style: { gridColumn: "1", gridRow: "1 / 3" } as React.CSSProperties },
  { src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=900", cap: "AI · Research", style: { gridColumn: "2", gridRow: "1" } as React.CSSProperties },
  { src: "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=900", cap: "Field · Enugu", style: { gridColumn: "3", gridRow: "1" } as React.CSSProperties },
  { src: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=900", cap: "Systems · Lagos", style: { gridColumn: "2 / 4", gridRow: "2" } as React.CSSProperties },
  { src: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=900", cap: "Infrastructure", style: { gridColumn: "1 / 3", gridRow: "3" } as React.CSSProperties },
  { src: "https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=900", cap: "Governance · Abuja", style: { gridColumn: "3", gridRow: "3" } as React.CSSProperties },
];

const products = [
  { id: "cortex", n: "01", name: "Cortex", tag: "Intelligence", tagline: "The brain behind your operation.", desc: "Cortex ingests your data, models patterns, and surfaces intelligence that drives real-time decisions. From demand forecasting to anomaly detection, without replacing the humans in the loop.", features: ["Real-time analytics dashboards", "Custom ML model training & deployment", "Natural language query interface", "Automated reporting & alerts"], status: "Live", img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: "sentinel", n: "02", name: "Sentinel", tag: "Security", tagline: "Threats detected. Attacks stopped.", desc: "End-to-end cybersecurity combining threat intelligence, identity management, and incident response. Built for organisations that cannot afford a single breach.", features: ["24/7 threat monitoring & response", "Zero-trust identity & access control", "Vulnerability scanning & patching", "Compliance (ISO, GDPR, NDPR)"], status: "Live", img: "https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: "flow", n: "03", name: "Flow", tag: "Automation", tagline: "Automate the repeatable.", desc: "Visual workflow builder, RPA bots, and process orchestration in one tool. Deploy in days, not months. Connects to your existing stack, no rip-and-replace.", features: ["Visual drag-and-drop builder", "RPA bots for desktop & web", "300+ pre-built integrations", "Smart exception handling"], status: "Beta", img: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: "nexus", n: "04", name: "Nexus", tag: "Governance", tagline: "Public services that work.", desc: "E-governance platform for African institutions. Multilingual, offline-capable, low-bandwidth optimised.", features: ["Digital ID & citizen management", "Permit, licence & registry workflows", "Offline-capable progressive web app", "Multilingual (EN, FR, Hausa, Igbo +)"], status: "Live", img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=1600" },
  { id: "pulse", n: "05", name: "Pulse", tag: "HealthTech", tagline: "Healthcare for the next billion.", desc: "Patients, providers and health systems on one interoperable platform. EMR/EHR, telemedicine, supply chain, analytics, designed for African realities.", features: ["Electronic medical records (EMR)", "Telemedicine & remote consultation", "Pharmacy & supply chain tracking", "Outbreak detection & analytics"], status: "In Development", img: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=1600" },
];

const statusColor: Record<string, string> = {
  Live: "#1a6680",
  Beta: "#5dd673",
  "In Development": "rgba(12,14,18,0.38)",
};

export default function ProductsSection() {
  const [active, setActive] = useState(0);
  const p = products[active];

  return (
    <>
      {/* Field Gallery */}
      <section style={{ background: "#ECE6D6", padding: "clamp(80px, 10vw, 140px) 0", borderTop: "1px solid rgba(12,14,18,0.10)" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeUp>
            <div className="flex items-center justify-between mb-10">
              <div className="flex items-center gap-2.5">
                <span className="w-7 h-[1px]" style={{ background: "#1a6680" }} />
                <span className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "#1a6680" }}>In the Field</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] hidden sm:block" style={{ color: "rgba(12,14,18,0.38)" }}>MGX · Active Engagements</span>
            </div>
          </FadeUp>
          <FadeUp delay={0.1}>
            <div className="hidden md:grid gap-[5px]" style={{ gridTemplateColumns: "repeat(3, 1fr)", gridTemplateRows: "repeat(3, 180px)" }}>
              {GALLERY.map((g, i) => (
                <motion.div key={i} className="relative overflow-hidden group" style={{ ...g.style, border: "1px solid rgba(12,14,18,0.10)" }} initial={{ opacity: 0, scale: 1.04 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true, margin: "-40px" }} transition={{ duration: 0.8, ease, delay: i * 0.06 }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.cap} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" style={{ filter: "saturate(0.5) contrast(1.08)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(12,14,18,0.65) 100%)" }} />
                  <span className="absolute left-3.5 bottom-3 font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.75)" }}>{g.cap}</span>
                </motion.div>
              ))}
            </div>
            <div className="md:hidden grid grid-cols-2 gap-[5px]">
              {GALLERY.slice(0, 4).map((g, i) => (
                <div key={i} className="relative overflow-hidden" style={{ height: "160px", border: "1px solid rgba(12,14,18,0.10)" }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={g.src} alt={g.cap} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(0.5) contrast(1.08)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, transparent 50%, rgba(12,14,18,0.65) 100%)" }} />
                  <span className="absolute left-2.5 bottom-2.5 font-mono text-[9px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.75)" }}>{g.cap}</span>
                </div>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      {/* Products */}
      <section id="products" style={{ background: "#FAF9F7", padding: "clamp(80px, 10vw, 140px) 0", borderTop: "1px solid rgba(12,14,18,0.10)" }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10">
          <FadeUp className="mb-14">
            <div className="flex items-center gap-2.5 mb-5">
              <span className="w-7 h-[1px]" style={{ background: "#1a6680" }} />
              <span className="font-mono text-[11px] uppercase tracking-[0.24em]" style={{ color: "#1a6680" }}>Our Platforms</span>
            </div>
            <h2 className="font-display" style={{ fontWeight: 500, fontSize: "clamp(40px, 5.5vw, 84px)", lineHeight: 0.95, letterSpacing: "-0.04em", color: "#0c0e12", maxWidth: "16ch" }}>
              Built to{" "}<span className="font-serif italic" style={{ color: "#1a6680", fontWeight: 400 }}>deploy</span>.
            </h2>
          </FadeUp>

          {/* Tab strip */}
          <div className="flex overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden -mx-5 px-5 sm:mx-0 sm:px-0 mb-10" style={{ borderBottom: "1px solid rgba(12,14,18,0.10)" }}>
            {products.map((prod, i) => {
              const isActive = i === active;
              return (
                <button key={prod.id} onClick={() => setActive(i)} className="relative flex items-baseline gap-2.5 px-5 py-4 shrink-0 transition-all duration-200" style={{ outline: "none" }}>
                  <span className="font-mono text-xs tracking-[0.15em]" style={{ color: isActive ? "#1a6680" : "rgba(12,14,18,0.3)", transition: "color 0.2s" }}>{prod.n}</span>
                  <span className="font-display font-semibold" style={{ fontSize: "clamp(0.9rem, 1.3vw, 1.1rem)", color: isActive ? "#0c0e12" : "rgba(12,14,18,0.42)", letterSpacing: "-0.01em", transition: "color 0.2s" }}>{prod.name}</span>
                  {isActive && <motion.div layoutId="tab-underline-v2" className="absolute bottom-[-1px] left-0 right-0 h-[2px]" style={{ background: "#1a6680" }} transition={{ duration: 0.4, ease }} />}
                </button>
              );
            })}
          </div>

          {/* Detail panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12" style={{ border: "1px solid rgba(12,14,18,0.10)", overflow: "hidden" }}>
            {/* Image */}
            <div className="relative lg:col-span-7 min-h-[280px] sm:min-h-[360px] lg:min-h-[480px] overflow-hidden" style={{ background: "#ECE6D6" }}>
              <AnimatePresence mode="wait">
                <motion.div key={p.id} className="absolute inset-0" initial={{ opacity: 0, scale: 1.04 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.98 }} transition={{ duration: 0.6, ease }}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover" style={{ filter: "saturate(0.5) contrast(1.1)" }} />
                  <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(250,249,247,0.3) 0%, rgba(12,14,18,0.15) 100%)" }} />
                </motion.div>
              </AnimatePresence>
              <div className="absolute top-5 left-5 z-10">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] px-3 py-1.5" style={{ color: statusColor[p.status], border: `1px solid ${statusColor[p.status]}`, background: "rgba(250,249,247,0.85)", backdropFilter: "blur(8px)" }}>
                  ● {p.status}
                </span>
              </div>
              <div className="absolute bottom-4 right-5 z-10 select-none pointer-events-none">
                <span className="font-display font-bold" style={{ fontSize: "clamp(3rem, 7vw, 6rem)", letterSpacing: "-0.06em", color: "rgba(12,14,18,0.06)", lineHeight: 1 }}>{p.n}</span>
              </div>
            </div>

            {/* Content */}
            <div className="lg:col-span-5 flex flex-col p-7 sm:p-9 lg:p-12 gap-7" style={{ background: "#FAF9F7", borderLeft: "1px solid rgba(12,14,18,0.08)" }}>
              <AnimatePresence mode="wait">
                <motion.div key={p.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.45, ease }} className="flex flex-col gap-6">
                  <div>
                    <p className="font-mono text-[11px] uppercase tracking-[0.22em] mb-3" style={{ color: "#1a6680" }}>MGX {p.name} · {p.tag}</p>
                    <h3 className="font-display" style={{ fontWeight: 500, fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "#0c0e12" }}>{p.tagline}</h3>
                  </div>
                  <p className="text-sm sm:text-base leading-[1.72]" style={{ color: "rgba(12,14,18,0.65)" }}>{p.desc}</p>
                  <div className="flex flex-col" style={{ borderTop: "1px solid rgba(12,14,18,0.08)" }}>
                    {p.features.map((f, i) => (
                      <motion.div key={f} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.4, delay: i * 0.05, ease }} className="flex items-center gap-4 py-3" style={{ borderBottom: "1px solid rgba(12,14,18,0.07)" }}>
                        <span className="font-mono text-[10px] w-5 shrink-0" style={{ color: "#1a6680" }}>{String(i + 1).padStart(2, "0")}</span>
                        <span className="text-sm" style={{ color: "rgba(12,14,18,0.78)" }}>{f}</span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="flex items-center gap-3 pt-1 flex-wrap">
                    <a href="#contact" className="inline-flex items-center gap-2.5 px-5 py-3 text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 active:scale-[0.97]" style={{ background: "#1a6680", color: "#fff" }}>
                      {p.status === "Live" ? "Request Access" : "Join Waitlist"}
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6h7M6 2.5L9 6 6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    </a>
                    <a href="#contact" className="px-4 py-3 text-sm font-semibold transition-all hover:underline underline-offset-4" style={{ color: "rgba(12,14,18,0.52)" }}>Talk to us →</a>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
