"use client";

import { useState, useCallback, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { slides } from "@/components/HeroCarousel";

const ease = [0.23, 1, 0.32, 1] as const;
const INTERVAL = 6500;
const TAGS = ["Vision", "Strategy", "Execution"];

/* ── SVG grain data URI ─────────────────────────────────────────── */
const grainSVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.72' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`;

export default function HeroSection() {
  const [index, setIndex] = useState(0);

  /* Auto-advance slides */
  useEffect(() => {
    const t = setInterval(() => setIndex((i) => (i + 1) % slides.length), INTERVAL);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="relative w-full min-h-screen overflow-hidden flex items-center">

      {/* ── LAYER 0: dark gradient base ── */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(135deg, #06090f 0%, #0b1220 45%, #080d18 75%, #06090f 100%)",
          zIndex: 0,
        }}
      />

      {/* ── LAYER 1: video ── */}
      <video
        className="absolute inset-0 w-full h-full"
        style={{ objectFit: "cover", opacity: 0.65, zIndex: 1 }}
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="/videos/tech2.mp4" type="video/mp4" />
      </video>

      {/* ── LAYER 2: dark overlay so text always readable ── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(4,7,15,0.55)", zIndex: 2 }}
      />

      {/* ── LAYER 3: brand colour glows ── */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 3 }}>
        <div className="absolute top-[-15%] right-[-8%] w-175 h-175 rounded-full blur-[140px]"
          style={{ background: "#3B9FE8", opacity: 0.08 }} />
        <div className="absolute bottom-[-10%] left-[-5%] w-150 h-150 rounded-full blur-[120px]"
          style={{ background: "#3DBE6E", opacity: 0.06 }} />
      </div>

      {/* ── LAYER 4: grain ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: grainSVG,
          backgroundRepeat: "repeat",
          backgroundSize: "300px 300px",
          opacity: 0.15,
          mixBlendMode: "overlay",
          zIndex: 4,
        }}
      />

      {/* ════════════════════════════════════════════════════════════
          CONTENT
      ════════════════════════════════════════════════════════════ */}
      <div
        className="relative w-full mx-auto px-8 flex items-center justify-between gap-4"
        style={{ zIndex: 10, maxWidth: "1320px", paddingTop: "12rem", paddingBottom: "5rem" }}
      >
        {/* ── TEXT ── */}
        <div className="flex flex-col gap-6 flex-1">

          {/* Eyebrow badge */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`eyebrow-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease }}
              className="inline-block"
            >
              <div
                style={{
                  display: "inline-block",
                  transform: "skewX(-12deg)",
                  background: "#EBFFB3",
                  border: "1px solid rgba(235,255,179,0.6)",
                  padding: "5px 18px",
                }}
              >
                <span
                  className="font-mono text-[11px] uppercase text-stone-900"
                  style={{
                    display: "inline-block",
                    transform: "skewX(12deg)",
                    letterSpacing: "0.22em",
                  }}
                >
                  {slides[index].eyebrow}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Headline */}
          <AnimatePresence mode="wait">
            <motion.h1
              key={`headline-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease, delay: 0.05 }}
              className="font-display font-black text-white"
              style={{
                fontSize: "clamp(3rem, 5.5vw, 6.5rem)",
                lineHeight: 0.93,
                letterSpacing: "-0.04em",
                whiteSpace: "pre-line",
              }}
            >
              {slides[index].headline}
            </motion.h1>
          </AnimatePresence>

          {/* Subtitle */}
          <AnimatePresence mode="wait">
            <motion.p
              key={`sub-${index}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4, ease, delay: 0.1 }}
              className="text-[20px] leading-[1.7] text-whitesmoke"
              style={{ maxWidth: "42ch" }}
            >
              {slides[index].sub}
            </motion.p>
          </AnimatePresence>

          {/* CTAs — more breathing room from subtitle */}
          <div className="flex items-center gap-3 pt-12">
            <a
              href="#services"
              className="px-6 py-3 rounded-md text-[15px] font-semibold text-stone-900 transition-all duration-150 hover:brightness-95 active:scale-[0.97]"
              style={{ background: "#EBFFB3" }}
            >
              Explore Solutions
            </a>
            <a
              href="#campus"
              className="px-6 py-3 rounded-md text-[15px] font-semibold text-white border border-white/25 hover:border-white/50 transition-all duration-150"
            >
              MGX Campus →
            </a>
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          TAGS — bottom right, row
      ════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-10 right-8 z-10 flex flex-row items-center gap-2">
        {TAGS.map((tag, i) => (
          <motion.span
            key={tag}
            initial={{ opacity: 0, x: 16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.12 + 0.6, duration: 0.45, ease }}
            style={{
              display: "inline-block",
              background: "rgba(0,0,0,0.45)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              padding: "5px 14px",
              borderRadius: "4px",
              color: "rgba(255,255,255,0.75)",
              fontSize: "11px",
              fontFamily: "var(--mono-font)",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            {tag}
          </motion.span>
        ))}
      </div>

      {/* ════════════════════════════════════════════════════════════
          SLIDE INDICATORS — bottom centre
      ════════════════════════════════════════════════════════════ */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <motion.div
              animate={{ width: i === index ? 28 : 6, opacity: i === index ? 1 : 0.3 }}
              transition={{ duration: 0.3 }}
              className="h-0.75 rounded-full bg-white"
            />
          </button>
        ))}
      </div>
    </section>
  );
}
