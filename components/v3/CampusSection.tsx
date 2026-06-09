"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease   = [0.23, 1, 0.32, 1] as const;
const WHITE  = "#ffffff";
const INK    = "#1d1d1f";
const MUTE   = "#6e6e73";
const SILVER = "#a1a1a6";
const LINE   = "rgba(0,0,0,0.08)";
const GREEN  = "#4ed074";
const TEAL   = "#3fa9d9";

const FACTS = [
  { n: "200+", label: "Builders on campus", color: GREEN },
  { n: "4",    label: "Specialist labs",    color: TEAL  },
  { n: "2026", label: "Opening year",       color: GREEN },
  { n: "06°N", label: "Enugu, Nigeria",     color: TEAL  },
];

export default function CampusSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="campus" style={{ background: WHITE, overflow: "hidden" }}>
      <div
        className="max-w-[1080px] mx-auto"
        style={{ padding: "clamp(80px,10vw,140px) clamp(24px,4vw,32px)" }}
      >
        <div className="grid md:grid-cols-2 gap-16 items-center">

          {/* Left: text */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em] inline-flex items-center gap-3"
              style={{ color: SILVER }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: GREEN }} />
              MGX Campus · Enugu, NG
            </span>
            <h2
              className="font-serif mt-4"
              style={{
                fontSize: "clamp(36px,4.5vw,64px)",
                fontWeight: 300,
                lineHeight: 1.05,
                letterSpacing: "-0.03em",
                color: INK,
              }}
            >
              A place built<br />for{" "}
              <em style={{ fontStyle: "italic", color: GREEN }}>builders.</em>
            </h2>
            <p className="mt-6 text-[16px] leading-[1.75]" style={{ color: MUTE }}>
              West Africa's most advanced campus for technology research and
              entrepreneurship. Researchers, engineers, founders and institutions,
              under one roof. Opening 2026 in Enugu.
            </p>

            {/* Stat grid */}
            <div
              className="mt-8 pt-6 grid grid-cols-2 gap-6"
              style={{ borderTop: `1px solid ${LINE}` }}
            >
              {FACTS.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "clamp(24px,2.5vw,36px)",
                      fontWeight: 300,
                      letterSpacing: "-0.02em",
                      color: s.color,
                    }}
                  >
                    {s.n}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.15em]" style={{ color: SILVER }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "4/5" }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease, delay: 0.15 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="MGX Campus"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
