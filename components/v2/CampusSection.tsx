"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const INK    = "#14110d";
const PAPER  = "#faf9f5";
const PAPER2 = "#f3f1e8";
const PAPER3 = "#ebe7dc";
const MUTE   = "#6b6760";
const GREEN  = "#4ed074";
const GREEN_INK = "#1f6b3a";
const TEAL   = "#1a6680";
const LINE   = "rgba(20,17,13,0.10)";

function FadeUp({ children, delay = 0, className, style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease, delay }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}

export default function CampusSection() {
  return (
    <section
      id="campus"
      style={{ padding: "clamp(80px,10vw,140px) 0", background: PAPER2, overflow: "hidden" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-7">
        {/* Header */}
        <FadeUp className="mb-14">
          <span className="font-mono text-[11px] uppercase tracking-[0.26em] inline-flex items-center gap-3" style={{ color: INK }}>
            <span className="w-[7px] h-[7px] rounded-full" style={{ background: GREEN, boxShadow: "0 0 0 4px rgba(78,208,116,0.20)" }} />
            MGX Campus · Enugu, NG
          </span>
          <h2
            className="font-serif mt-4"
            style={{ fontWeight: 400, fontSize: "clamp(40px,5.5vw,84px)", lineHeight: 0.98, letterSpacing: "-0.025em", color: INK, maxWidth: "16ch" }}
          >
            A place built for{" "}
            <em style={{ fontStyle: "italic", color: GREEN_INK }}>builders</em>.
          </h2>
        </FadeUp>

        {/* Campus bento */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "110px",
            gap: "16px",
          }}
        >
          {/* Main photo */}
          <FadeUp
            delay={0.05}
            className="rounded-[16px] overflow-hidden relative"
            style={{ gridColumn: "span 7", gridRow: "span 4", background: INK, border: `1px solid ${LINE}` } as React.CSSProperties}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="MGX Campus"
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.85) contrast(1.05)" }}
            />
            <span
              className="absolute top-[18px] left-[18px] font-mono text-[10px] uppercase tracking-[0.22em] inline-flex items-center gap-2 px-[14px] py-[8px] rounded-full"
              style={{ background: "rgba(250,249,245,0.94)", backdropFilter: "blur(10px)", color: INK }}
            >
              <span className="w-[6px] h-[6px] rounded-full animate-pulse-dot" style={{ background: GREEN }} />
              Under development · 2026
            </span>
            <div className="absolute left-[22px] bottom-[22px] right-[22px] flex justify-between items-end gap-6">
              <span
                className="font-serif italic text-white"
                style={{ fontSize: "clamp(22px,2.4vw,32px)", lineHeight: 1.1, maxWidth: "22ch", textShadow: "0 2px 14px rgba(0,0,0,0.4)" }}
              >
                A physical innovation hub coming to Enugu.
              </span>
              <span
                className="font-mono text-[11px] uppercase tracking-[0.22em] text-right shrink-0"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                06°27&apos;N<br/>07°30&apos;E
              </span>
            </div>
          </FadeUp>

          {/* Description text card */}
          <FadeUp
            delay={0.1}
            className="rounded-[16px] flex flex-col justify-between overflow-hidden relative"
            style={{ gridColumn: "span 5", gridRow: "span 4", background: PAPER, border: `1px solid ${LINE}`, padding: "26px 28px" } as React.CSSProperties}
          >
            {/* Dot decor */}
            <div
              className="absolute pointer-events-none"
              style={{ width: "220px", height: "220px", bottom: "-30px", right: "-30px", backgroundImage: `radial-gradient(circle, ${GREEN} 1.6px, transparent 1.8px)`, backgroundSize: "18px 18px", maskImage: "radial-gradient(circle at 70% 70%, black 0%, transparent 70%)", WebkitMaskImage: "radial-gradient(circle at 70% 70%, black 0%, transparent 70%)", opacity: 0.4 }}
              aria-hidden
            />
            <div />
            <p
              className="font-serif relative z-10"
              style={{ fontSize: "clamp(20px,2vw,28px)", lineHeight: 1.25, letterSpacing: "-0.01em", color: INK, maxWidth: "30ch" }}
            >
              West Africa&apos;s most advanced campus for technology{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>research</em> and entrepreneurship, bringing researchers, engineers, founders and institutions under one roof.
            </p>
          </FadeUp>

          {/* Quote card */}
          <FadeUp
            delay={0.14}
            className="rounded-[16px] flex flex-col justify-between overflow-hidden"
            style={{ gridColumn: "span 3", gridRow: "span 3", background: PAPER3, border: `1px solid ${LINE}`, padding: "22px 24px" } as React.CSSProperties}
          >
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: TEAL }}>¶ Note</span>
            <div
              className="font-serif"
              style={{ fontSize: "clamp(20px,1.9vw,26px)", lineHeight: 1.2, letterSpacing: "-0.015em", color: INK }}
            >
              Where <em style={{ fontStyle: "italic", color: TEAL }}>theory</em> becomes practice, and the next generation of African technologists learn, build &amp; launch.
            </div>
            <span className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: MUTE }}>MexyGabriel</span>
          </FadeUp>

          {/* Features grid */}
          <FadeUp
            delay={0.18}
            className="rounded-[16px] overflow-hidden"
            style={{ gridColumn: "span 6", gridRow: "span 3", background: PAPER, border: `1px solid ${LINE}`, padding: "24px 26px" } as React.CSSProperties}
          >
            <div className="grid grid-cols-2 gap-x-7 gap-y-5 h-full content-start">
              {[
                { lbl: "01 · Labs",  name: "Research Labs",    sub: "AI, robotics & emerging tech." },
                { lbl: "02 · Hub",   name: "Innovation Hub",   sub: "Founders & enterprise teams." },
                { lbl: "03 · Demo",  name: "Demo & Showcase",  sub: "Live MGX product demos." },
                { lbl: "04 · Learn", name: "Learning Centre",  sub: "Training & workshops." },
              ].map((f) => (
                <div key={f.name} className="pt-1">
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1.5 inline-flex items-center gap-2"
                    style={{ color: GREEN_INK }}
                  >
                    <span className="w-[5px] h-[5px] rounded-full" style={{ background: GREEN }} />
                    {f.lbl}
                  </div>
                  <div className="text-base font-semibold tracking-[-0.01em]" style={{ color: INK }}>{f.name}</div>
                  <div className="text-[13.5px] mt-1 leading-[1.5]" style={{ color: MUTE }}>{f.sub}</div>
                </div>
              ))}
            </div>
          </FadeUp>

          {/* Stat card */}
          <FadeUp
            delay={0.22}
            className="rounded-[16px] flex flex-col justify-between"
            style={{ gridColumn: "span 3", gridRow: "span 3", background: INK, padding: "24px" } as React.CSSProperties}
          >
            <div className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: GREEN }}>Capacity</div>
            <div
              className="font-serif"
              style={{ fontSize: "clamp(54px,5vw,80px)", lineHeight: 0.9, letterSpacing: "-0.02em", color: "#fff" }}
            >
              200<em className="font-serif italic" style={{ color: GREEN, fontSize: "0.45em", verticalAlign: "top" }}>+</em>
            </div>
            <div
              className="flex justify-between items-center font-mono text-[10px] uppercase tracking-[0.22em]"
              style={{ color: "rgba(255,255,255,0.6)" }}
            >
              <span>Builders on campus</span>
              <span style={{ color: GREEN }}>↗</span>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
