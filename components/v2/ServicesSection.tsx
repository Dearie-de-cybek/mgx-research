"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const INK    = "#14110d";
const PAPER  = "#faf9f5";
const PAPER2 = "#f3f1e8";
const MUTE   = "#6b6760";
const GREEN  = "#4ed074";
const TEAL   = "#1a6680";
const LINE   = "rgba(20,17,13,0.10)";

type Variant = "default" | "dark" | "pop";

interface Cell {
  n: string;
  name: string;
  italic?: string;
  variant?: Variant;
  wide?: boolean;
}

const CELLS: Cell[] = [
  { n: "01", name: "AI" },
  { n: "02", name: "Robotics" },
  { n: "03", name: "Auto", italic: "mation", variant: "dark" },
  { n: "04", name: "Cybersecurity" },
  { n: "05", name: "Smart Systems", variant: "pop" },
  { n: "06", name: "Digital Transformation" },
  { n: "07", name: "Research" },
  { n: "08", name: "Tech", italic: "nology", variant: "dark" },
  { n: "09", name: "Innovation" },
  { n: "10", name: "Entrepreneurship" },
  { n: "·",  name: "From the lab, to the ", italic: "field", variant: "dark", wide: true },
];

function FocusCell({ n, name, italic, variant = "default", wide = false, delay }: Cell & { delay: number }) {
  const [hov, setHov] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  const bg    = variant === "dark" ? INK : variant === "pop" ? GREEN : hov ? PAPER2 : PAPER;
  const text  = variant === "dark" ? "#fff" : INK;
  const idxC  = variant === "dark" ? "rgba(255,255,255,0.55)" : MUTE;
  const idxB  = variant === "dark" ? GREEN : variant === "pop" ? INK : INK;
  const bdr   = variant === "dark" ? INK : variant === "pop" ? GREEN : hov ? "rgba(78,208,116,0.5)" : LINE;

  return (
    <motion.div
      ref={ref}
      className="rounded-[14px] flex flex-col justify-between cursor-default overflow-hidden"
      style={{
        gridColumn: wide ? "span 2" : undefined,
        background: bg,
        border: `1px solid ${bdr}`,
        padding: "22px",
        minHeight: "180px",
        transform: hov ? "translateY(-4px)" : "translateY(0)",
        boxShadow: hov ? "0 22px 50px -24px rgba(20,17,13,0.18)" : "none",
        transition: "transform 0.3s, box-shadow 0.3s, border-color 0.3s, background 0.3s",
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, ease, delay }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
    >
      <span className="font-mono text-[11px] tracking-[0.22em]" style={{ color: idxC }}>
        <b style={{ color: idxB, fontWeight: 500 }}>{n}</b> · index
      </span>
      <div
        className="font-serif mt-3"
        style={{
          fontSize: wide ? "clamp(28px,3vw,42px)" : "clamp(26px,2.4vw,34px)",
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          color: text,
          maxWidth: wide ? "22ch" : undefined,
        }}
      >
        {name}
        {italic && (
          <em style={{ fontStyle: "italic", color: variant === "dark" ? GREEN : variant === "pop" ? INK : TEAL }}>
            {italic}
          </em>
        )}
        {wide && <span>, to the founder.</span>}
      </div>

      {/* Arrow */}
      <div
        className="self-end flex items-center justify-center rounded-full transition-all duration-300 mt-2"
        style={{
          width: 30, height: 30,
          border: hov ? `1px solid ${GREEN}` : variant === "pop" ? `1px solid ${INK}` : `1px solid ${LINE}`,
          background: hov ? GREEN : variant === "pop" ? INK : "transparent",
          color: hov ? INK : variant === "pop" ? GREEN : variant === "dark" ? "#fff" : INK,
          transform: hov ? "rotate(-45deg)" : "none",
        }}
      >
        <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
          <path d="M3 11L11 3M11 3H4M11 3v7" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>
    </motion.div>
  );
}

export default function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="focus"
      style={{
        padding: "clamp(80px,10vw,140px) 0",
        background: PAPER2,
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="max-w-[1320px] mx-auto px-5 sm:px-7">
        {/* Header */}
        <div ref={ref} className="flex justify-between items-end gap-8 flex-wrap mb-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] inline-flex items-center gap-3" style={{ color: INK }}>
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: GREEN, boxShadow: "0 0 0 4px rgba(78,208,116,0.20)" }} />
              Our Focus
            </span>
            <h2
              className="font-serif mt-4"
              style={{
                fontWeight: 400,
                fontSize: "clamp(40px,5.5vw,84px)",
                lineHeight: 0.98,
                letterSpacing: "-0.025em",
                color: INK,
                maxWidth: "14ch",
              }}
            >
              Ten domains.{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>One</em>{" "}
              ecosystem
              <span style={{ display: "inline-block", width: "0.12em", height: "0.12em", background: GREEN, borderRadius: "999px", verticalAlign: "baseline", marginLeft: "0.02em" }} />
            </h2>
          </motion.div>
          <motion.span
            className="font-mono text-[12px] uppercase tracking-[0.22em]"
            style={{ color: MUTE }}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease, delay: 0.1 }}
          >
            Index <b style={{ color: INK, fontWeight: 500 }}>01 to 10</b>
          </motion.span>
        </div>

        {/* Grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "repeat(4, 1fr)" }}
        >
          {/* Row 1 */}
          {CELLS.slice(0, 4).map((c, i) => (
            <FocusCell key={c.n} {...c} delay={i * 0.06} />
          ))}
          {/* Row 2 */}
          {CELLS.slice(4, 8).map((c, i) => (
            <FocusCell key={c.n} {...c} delay={0.08 + i * 0.06} />
          ))}
          {/* Row 3: 09, 10, wide-dark */}
          <FocusCell {...CELLS[8]} delay={0.16} />
          <FocusCell {...CELLS[9]} delay={0.2} />
          <FocusCell {...CELLS[10]} delay={0.24} />
        </div>
      </div>
    </section>
  );
}
