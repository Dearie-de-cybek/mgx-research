"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const INK    = "#14110d";
const PAPER  = "#faf9f5";
const PAPER2 = "#f3f1e8";
const MUTE   = "#6b6760";
const GREEN  = "#4ed074";
const TEAL   = "#1a6680";
const TEAL2  = "#2c8fa8";
const LINE   = "rgba(20,17,13,0.10)";

/* Dot-grid decorative overlay */
function DotDecor({ color = GREEN, at = "70% 70%", size = 320, offset = -40 }: {
  color?: string; at?: string; size?: number; offset?: number;
}) {
  return (
    <div
      className="absolute pointer-events-none"
      style={{
        width: `${size}px`, height: `${size}px`,
        bottom: `${offset}px`, right: `${offset}px`,
        backgroundImage: `radial-gradient(circle, ${color} 1.6px, transparent 1.8px)`,
        backgroundSize: "18px 18px",
        maskImage: `radial-gradient(circle at ${at}, black 0%, transparent 70%)`,
        WebkitMaskImage: `radial-gradient(circle at ${at}, black 0%, transparent 70%)`,
        opacity: 0.42,
      }}
      aria-hidden
    />
  );
}

/* Circular arrow button */
function ArrowBtn({ href, dark = false }: { href: string; dark?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={href}
      aria-label="Go"
      className="flex items-center justify-center shrink-0 rounded-full transition-all duration-300"
      style={{
        width: 64, height: 64,
        background: hov ? GREEN : (dark ? "rgba(255,255,255,0.15)" : INK),
        color: hov ? INK : PAPER,
        transform: hov ? "rotate(-45deg)" : "none",
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <path d="M5 11h12M12.5 5.5L18 11l-5.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </a>
  );
}

/* Small circle arrow for focus cells */
function CircleArrow({ dark = false, green = false }: { dark?: boolean; green?: boolean }) {
  const [hov, setHov] = useState(false);
  return (
    <div
      className="flex items-center justify-center rounded-full transition-all duration-300 self-end"
      style={{
        width: 30, height: 30,
        border: hov ? `1px solid ${GREEN}` : green ? `1px solid ${INK}` : `1px solid ${LINE}`,
        background: hov ? GREEN : green ? INK : "transparent",
        color: hov ? INK : green ? GREEN : dark ? "rgba(255,255,255,0.8)" : INK,
        transform: hov ? "rotate(-45deg)" : "none",
        cursor: "default",
        flexShrink: 0,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
        <path d="M3 11L11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </div>
  );
}

/* Hoverable focus cell */
function FocusCell({ n, name, italic, variant = "default", wide = false }: {
  n: string;
  name: string;
  italic?: string; // italic part suffix
  variant?: "default" | "dark" | "pop";
  wide?: boolean;
}) {
  const [hov, setHov] = useState(false);

  const bg = variant === "dark" ? INK : variant === "pop" ? GREEN : hov ? PAPER2 : PAPER;
  const textColor = variant === "dark" ? "#fff" : variant === "pop" ? INK : INK;
  const idxColor = variant === "dark" ? "rgba(255,255,255,0.55)" : MUTE;
  const idxBold = variant === "dark" ? GREEN : variant === "pop" ? INK : INK;

  return (
    <div
      className="rounded-[14px] flex flex-col justify-between cursor-default transition-all duration-300"
      style={{
        gridColumn: wide ? "span 2" : undefined,
        background: bg,
        border: `1px solid ${variant === "dark" ? INK : variant === "pop" ? GREEN : LINE}`,
        padding: "22px",
        minHeight: "180px",
        transform: hov ? "translateY(-4px)" : "none",
        boxShadow: hov ? "0 22px 50px -24px rgba(20,17,13,0.18)" : "none",
        borderColor: hov && variant === "default" ? "rgba(78,208,116,0.5)" : undefined,
      }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span
        className="font-mono text-[11px] tracking-[0.22em]"
        style={{ color: idxColor }}
      >
        <b style={{ color: idxBold, fontWeight: 500 }}>{n}</b> · index
      </span>
      <div
        className="font-serif mt-3"
        style={{
          fontSize: wide ? "clamp(28px,3vw,42px)" : "clamp(26px,2.4vw,34px)",
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: textColor,
          maxWidth: wide ? "22ch" : undefined,
        }}
      >
        {italic ? (
          <>{name}<em style={{ fontStyle: "italic", color: variant === "dark" ? GREEN : variant === "pop" ? INK : TEAL }}>{italic}</em></>
        ) : name}
      </div>
      <CircleArrow dark={variant === "dark"} green={variant === "pop"} />
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      style={{ padding: "110px 0 40px", background: PAPER, position: "relative" }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-7">

        {/* Bento grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(12, 1fr)",
            gridAutoRows: "100px",
            gap: "16px",
          }}
        >
          {/* ── Title card ── */}
          <motion.div
            className="rounded-[18px] flex flex-col justify-between overflow-hidden relative"
            style={{
              gridColumn: "span 7",
              gridRow: "span 6",
              padding: "36px 40px 32px",
              background: PAPER,
              border: `1px solid ${LINE}`,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.1 }}
          >
            <DotDecor />

            {/* Head row */}
            <div className="flex justify-between items-center relative z-10">
              <span
                className="font-mono text-[11px] uppercase tracking-[0.24em] inline-flex items-center gap-[10px] px-[14px] py-[8px] rounded-full"
                style={{
                  color: INK,
                  background: "rgba(78,208,116,0.10)",
                  border: "1px solid rgba(78,208,116,0.35)",
                }}
              >
                <span
                  className="w-[7px] h-[7px] rounded-full animate-pulse-dot"
                  style={{ background: GREEN, boxShadow: "0 0 0 3px rgba(78,208,116,0.25)" }}
                />
                Now in Enugu · Nigeria
              </span>
              <span
                className="font-mono text-[11px] tracking-[0.2em]"
                style={{ color: MUTE, letterSpacing: "0.2em" }}
              >
                VOL. 01 · ISSUE 06
              </span>
            </div>

            {/* Headline */}
            <div
              className="font-serif relative z-10"
              style={{
                fontSize: "clamp(64px, 9vw, 152px)",
                lineHeight: 0.94,
                letterSpacing: "-0.025em",
                color: INK,
              }}
            >
              From{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>Insight</em>
              <br />
              to Impact
              <span
                style={{
                  display: "inline-block",
                  width: "0.14em",
                  height: "0.14em",
                  background: GREEN,
                  borderRadius: "999px",
                  verticalAlign: "baseline",
                  marginLeft: "0.04em",
                  marginBottom: "0.02em",
                }}
              />
            </div>

            {/* Footer */}
            <div className="flex justify-between items-end gap-6 flex-wrap relative z-10">
              <p
                className="text-base leading-[1.55]"
                style={{ color: MUTE, maxWidth: "42ch" }}
              >
                <strong style={{ color: INK, fontWeight: 600 }}>
                  MGX is Africa&apos;s premier ecosystem
                </strong>{" "}
                for research, technology, innovation &amp; entrepreneurship.
              </p>
              <ArrowBtn href="#focus" />
            </div>
          </motion.div>

          {/* ── Photo card ── */}
          <motion.div
            className="rounded-[18px] overflow-hidden relative"
            style={{
              gridColumn: "span 5",
              gridRow: "span 6",
              background: INK,
              border: `1px solid ${LINE}`,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.18 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt=""
              className="w-full h-full object-cover"
              style={{ filter: "saturate(0.85) contrast(1.04)" }}
            />
            <span
              className="absolute top-[18px] left-[18px] font-mono text-[10px] uppercase tracking-[0.22em] inline-flex items-center gap-2 px-[14px] py-[8px] rounded-full"
              style={{
                background: "rgba(250,249,245,0.92)",
                backdropFilter: "blur(10px)",
                color: INK,
              }}
            >
              <span className="w-[6px] h-[6px] rounded-full" style={{ background: GREEN }} />
              Issue · No. 01
            </span>
            <div className="absolute bottom-[18px] left-[18px] right-[18px] flex justify-between items-end gap-4">
              <span
                className="font-serif italic text-white"
                style={{ fontSize: "22px", lineHeight: 1.1, maxWidth: "22ch", textShadow: "0 2px 14px rgba(0,0,0,0.25)" }}
              >
                Building systems that serve real human needs.
              </span>
              <span
                className="font-mono text-[10px] uppercase tracking-[0.22em] text-right shrink-0"
                style={{ color: "rgba(255,255,255,0.85)" }}
              >
                02 / Field
              </span>
            </div>
          </motion.div>

          {/* ── Stat card (dark) ── */}
          <motion.div
            className="rounded-[18px] flex flex-col justify-between overflow-hidden"
            style={{
              gridColumn: "span 5",
              gridRow: "span 4",
              padding: "28px 32px",
              background: INK,
              color: PAPER,
              border: `1px solid ${INK}`,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.26 }}
          >
            <div>
              <div
                className="font-mono text-[10px] uppercase tracking-[0.24em]"
                style={{ color: GREEN }}
              >
                Index of focus
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(54px, 6vw, 96px)",
                  lineHeight: 0.9,
                  letterSpacing: "-0.02em",
                  color: "#fff",
                }}
              >
                10
                <span
                  className="font-serif italic"
                  style={{ color: GREEN, fontSize: "0.5em", verticalAlign: "top" }}
                >
                  +
                </span>
              </div>
            </div>
            <div
              className="flex justify-between items-end gap-4 font-mono text-[11px] uppercase tracking-[0.18em]"
              style={{ color: "rgba(255,255,255,0.65)" }}
            >
              <span>Domains we research</span>
              <span style={{ color: GREEN }}>↗</span>
            </div>
          </motion.div>

          {/* ── Meta card ── */}
          <motion.div
            className="rounded-[18px] flex flex-col justify-between overflow-hidden relative"
            style={{
              gridColumn: "span 7",
              gridRow: "span 4",
              padding: "22px 24px",
              background: PAPER2,
              border: `1px solid ${LINE}`,
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.32 }}
          >
            {/* Teal dot decor */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "200px",
                height: "200px",
                right: "-30px",
                top: "-30px",
                backgroundImage: `radial-gradient(circle, ${TEAL2} 1.4px, transparent 1.6px)`,
                backgroundSize: "16px 16px",
                maskImage: "radial-gradient(circle at 70% 30%, black 0%, transparent 70%)",
                WebkitMaskImage: "radial-gradient(circle at 70% 30%, black 0%, transparent 70%)",
                opacity: 0.4,
              }}
              aria-hidden
            />
            <div className="relative z-10">
              <div
                className="font-mono text-[10px] uppercase tracking-[0.22em] mb-[10px]"
                style={{ color: TEAL }}
              >
                Manifesto
              </div>
              <div
                className="font-serif"
                style={{
                  fontSize: "clamp(22px, 2.4vw, 32px)",
                  lineHeight: 1.15,
                  letterSpacing: "-0.015em",
                  color: INK,
                  maxWidth: "22ch",
                }}
              >
                Solving real human problems{" "}
                <em style={{ fontStyle: "italic", color: TEAL }}>with technology</em>{" "}
                Built in Africa, for the world.
              </div>
            </div>
            <div
              className="flex flex-col gap-2 font-mono text-[11px] uppercase tracking-[0.18em] relative z-10"
              style={{ color: MUTE }}
            >
              {["Africa-rooted", "Globally-minded", "Research-first"].map((item) => (
                <span key={item} className="inline-flex items-center gap-2">
                  <span
                    className="w-[5px] h-[5px] rounded-full shrink-0"
                    style={{ background: GREEN }}
                  />
                  {item}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
