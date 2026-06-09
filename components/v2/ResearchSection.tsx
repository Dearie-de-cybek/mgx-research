"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const INK   = "#14110d";
const MUTE  = "#6b6760";
const GREEN = "#4ed074";
const TEAL  = "#1a6680";
const LINE  = "rgba(20,17,13,0.10)";

export default function StatementSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{
        padding: "clamp(80px,10vw,140px) 0",
        background: "#faf9f5",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Dot bg */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, ${TEAL} 1.2px, transparent 1.4px)`,
          backgroundSize: "22px 22px",
          maskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)",
          WebkitMaskImage: "radial-gradient(ellipse 60% 50% at 50% 50%, black 0%, transparent 70%)",
          opacity: 0.18,
        }}
        aria-hidden
      />

      <div
        ref={ref}
        className="max-w-[1320px] mx-auto px-5 sm:px-7 relative z-10 flex flex-col items-center"
      >
        {/* Decorative marks */}
        <motion.div
          className="flex items-center gap-4 font-mono text-[11px] uppercase tracking-[0.26em] mb-8"
          style={{ color: MUTE }}
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease }}
        >
          <span className="w-16 h-[1px]" style={{ background: LINE }} />
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: GREEN }} />
          <span>Mandate · 2026</span>
          <span className="w-[7px] h-[7px] rounded-full" style={{ background: GREEN }} />
          <span className="w-16 h-[1px]" style={{ background: LINE }} />
        </motion.div>

        {/* Quote */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease, delay: 0.08 }}
        >
          <h2
            className="font-serif"
            style={{
              fontWeight: 400,
              fontSize: "clamp(40px, 5vw, 80px)",
              lineHeight: 1.02,
              letterSpacing: "-0.025em",
              color: INK,
              maxWidth: "22ch",
              margin: "0 auto",
            }}
          >
            Rigorous thinking, deployed as{" "}
            <em style={{ fontStyle: "italic", color: TEAL }}>real systems</em>{" "}
            at scale
            <span
              style={{
                display: "inline-block",
                width: "0.12em",
                height: "0.12em",
                background: GREEN,
                borderRadius: "999px",
                verticalAlign: "baseline",
                marginLeft: "0.02em",
              }}
            />
          </h2>
          <div
            className="font-mono text-[11px] uppercase tracking-[0.24em] mt-7"
            style={{ color: MUTE }}
          >
            MGX Mandate
          </div>
        </motion.div>
      </div>
    </section>
  );
}
