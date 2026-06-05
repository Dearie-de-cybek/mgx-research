"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const mgxStats = [
  { value: "6+",   label: "Service Pillars" },
  { value: "18+",  label: "Countries" },
  { value: "50+",  label: "Partners" },
  { value: "2019", label: "Founded" },
];

function MGXModal({ onClose }: { onClose: () => void }) {
  return (
    <>
      <motion.div
        key="modal-backdrop"
        className="fixed inset-0 z-[80]"
        style={{ background: "rgba(6,9,15,0.7)", backdropFilter: "blur(8px)" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
      />

      <motion.div
        key="modal-panel"
        className="fixed inset-y-0 right-0 z-[90] w-full max-w-2xl overflow-y-auto"
        style={{ background: "oklch(98% 0.006 80)", boxShadow: "-24px 0 80px rgba(0,0,0,0.2)" }}
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
      >
        <div className="flex items-start justify-between p-10 pb-0">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-2">About</p>
            <h2 className="font-display font-black text-stone-900 leading-none"
              style={{ fontSize: "clamp(2.5rem, 5vw, 3.5rem)", letterSpacing: "-0.04em" }}>
              Mexy<span style={{
                background: "linear-gradient(135deg, #3B9FE8 20%, #3DBE6E 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
              }}>Gabriel</span>
            </h2>
          </div>
          <button onClick={onClose}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-400 text-xl mt-1">
            ×
          </button>
        </div>

        <div className="px-10 py-8 flex flex-col gap-10">
          <p className="font-display font-semibold text-stone-900 leading-tight"
            style={{ fontSize: "clamp(1.1rem, 2vw, 1.4rem)", letterSpacing: "-0.02em" }}>
            "From Insight to Impact — the technology partner that builds what actually matters."
          </p>

          <div className="grid grid-cols-4 gap-4">
            {mgxStats.map((s) => (
              <div key={s.label} className="flex flex-col gap-1 p-4 rounded-xl bg-stone-50">
                <span className="font-display font-black text-stone-900 text-3xl leading-none"
                  style={{ letterSpacing: "-0.03em" }}>{s.value}</span>
                <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-stone-400">{s.label}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-6">
            {[
              { title: "Who We Are", body: "MexyGabriel (MGX) is a full-spectrum technology solutions company turning research-grade thinking into real-world systems. We bridge the gap between cutting-edge research and practical deployment — serving startups, enterprises, and governments with solutions that are intelligent, resilient, and human-centered." },
              { title: "What We Build", body: "From AI and automation systems to cybersecurity infrastructure, digital governance platforms, and HealthTech solutions — MGX operates across six technology pillars, each combining research depth with hands-on engineering. We don't just consult. We build and deploy." },
              { title: "Our Mission", body: "Africa-rooted, globally-minded. MGX exists to prove that the most innovative technology solutions for the world's hardest problems can be designed, built, and scaled from Africa. We serve 18+ countries, partnering with institutions and founders who are building the future." },
            ].map(({ title, body }) => (
              <div key={title}>
                <h3 className="font-semibold text-stone-900 text-base mb-2">{title}</h3>
                <p className="text-stone-600 text-[15px] leading-relaxed">{body}</p>
              </div>
            ))}
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-400 mb-4">Our 6 Pillars</p>
            <div className="grid grid-cols-2 gap-2">
              {["Intelligence Systems","Security & Resilience","Automation & Robotics","Digital Infrastructure","Governance & Smart Systems","Human-Centered Innovation"].map((p) => (
                <div key={p} className="px-4 py-3 rounded-lg text-[13px] font-medium text-stone-700"
                  style={{ background: "oklch(94% 0.008 75)" }}>{p}</div>
              ))}
            </div>
          </div>

          <div className="flex gap-3 pt-2 pb-4">
            <a href="#services" onClick={onClose}
              className="px-6 py-3 rounded-md text-[14px] font-semibold text-stone-900 hover:brightness-95 transition-all"
              style={{ background: "#EBFFB3" }}>Explore Services</a>
            <a href="#campus" onClick={onClose}
              className="px-6 py-3 rounded-md text-[14px] font-semibold text-stone-700 border border-stone-200 hover:border-stone-400 transition-all">MGX Campus →</a>
          </div>
        </div>
      </motion.div>
    </>
  );
}

/* ── MAIN SECTION ────────────────────────────────────────────────── */
export default function AboutSection() {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <section
        className="w-full px-6 py-16 md:py-24"
        style={{ background: "oklch(97% 0.006 80)" }}
      >
        <div className="max-w-[1320px] mx-auto">

          {/* Section label */}
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-8">
            Our World
          </p>

          {/* Two cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {/* ── CARD 1: MGX Campus (image + text overlay) ── */}
            <div
              className="relative overflow-hidden rounded-2xl cursor-pointer group"
              style={{ minHeight: "580px" }}
            >
              <Image
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="MGX Campus — Innovation Hub"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Gradient overlay — heavier at bottom for text */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(4,7,15,0.15) 0%, rgba(4,7,15,0.3) 40%, rgba(4,7,15,0.85) 100%)",
                }}
              />

              {/* Top-left badge */}
              <div className="absolute top-6 left-6">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/70"
                  style={{
                    background: "rgba(0,0,0,0.35)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  Innovation Hub
                </span>
              </div>

              {/* Bottom text */}
              <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-3">
                <h2
                  className="font-display font-black text-white leading-none"
                  style={{ fontSize: "clamp(2.5rem, 4vw, 3.8rem)", letterSpacing: "-0.04em" }}
                >
                  MGX Campus
                </h2>
                <p className="text-white/75 text-[15px] leading-relaxed max-w-sm">
                  Our physical and digital hub for research, experimentation, and collaboration. Where engineers, researchers, and founders converge.
                </p>
                <a
                  href="#campus"
                  className="inline-flex items-center gap-2 font-semibold text-[13px] mt-1 group/link"
                  style={{ color: "#EBFFB3" }}
                >
                  Learn about Campus
                  <motion.span
                    className="inline-block"
                    whileHover={{ x: 4 }}
                    transition={{ duration: 0.2 }}
                  >
                    →
                  </motion.span>
                </a>
              </div>
            </div>

            {/* ── CARD 2: About MGX (image + click for modal) ── */}
            <div
              onClick={() => setModalOpen(true)}
              className="relative overflow-hidden rounded-2xl cursor-pointer group flex flex-col justify-between p-8"
              style={{ minHeight: "580px" }}
            >
              {/* Background image */}
              <Image
                src="/images/about.jpg"
                alt="MGX — About"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
              />

              {/* Dark gradient overlay */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to bottom, rgba(4,7,15,0.45) 0%, rgba(4,7,15,0.35) 40%, rgba(4,7,15,0.88) 100%)",
                }}
              />

              {/* Top */}
              <div className="relative flex items-start justify-between">
                <span
                  className="font-mono text-[10px] uppercase tracking-[0.2em]"
                  style={{
                    color: "rgba(255,255,255,0.4)",
                    background: "rgba(255,255,255,0.06)",
                    backdropFilter: "blur(8px)",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  Who We Are
                </span>

                {/* Click hint */}
                <motion.div
                  className="flex items-center gap-1.5"
                  initial={{ opacity: 0.4 }}
                  whileHover={{ opacity: 1 }}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/40">
                    Learn more
                  </span>
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center border border-white/10 group-hover:border-white/30 transition-colors"
                    style={{ background: "rgba(255,255,255,0.05)" }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                      <path d="M2 6h8M6 2l4 4-4 4" stroke="rgba(255,255,255,0.6)" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                </motion.div>
              </div>

              {/* Middle — large MGX */}
              <div className="relative flex-1 flex items-center">
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/30 mb-4">
                    MexyGabriel
                  </p>
                  <h2
                    className="font-display font-black leading-none"
                    style={{
                      fontSize: "clamp(3rem, 5vw, 5.5rem)",
                      letterSpacing: "-0.04em",
                    }}
                  >
                    <span className="text-white">MG</span>
                    <span style={{
                      background: "linear-gradient(135deg, #3B9FE8 20%, #3DBE6E 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>X</span>
                  </h2>
                  <p
                    className="text-white/60 text-[15px] leading-relaxed mt-4"
                    style={{ maxWidth: "36ch" }}
                  >
                    Africa-rooted. Globally-minded. We build the systems that make innovation impossible to ignore.
                  </p>
                </div>
              </div>

              {/* Bottom stats */}
              <div className="relative grid grid-cols-3 gap-4 pt-6 border-t border-white/8">
                {[
                  { v: "6+", l: "Pillars" },
                  { v: "18+", l: "Countries" },
                  { v: "50+", l: "Partners" },
                ].map((s) => (
                  <div key={s.l} className="flex flex-col gap-1">
                    <span
                      className="font-display font-black text-white text-2xl leading-none"
                      style={{ letterSpacing: "-0.03em" }}
                    >
                      {s.v}
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-white/35">
                      {s.l}
                    </span>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {modalOpen && <MGXModal onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
}
