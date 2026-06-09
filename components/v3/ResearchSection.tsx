"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease   = [0.23, 1, 0.32, 1] as const;
const SNOW   = "#f5f5f7";
const INK    = "#1d1d1f";
const MUTE   = "#6e6e73";
const SILVER = "#a1a1a6";
const LINE   = "rgba(0,0,0,0.08)";
const GREEN  = "#4ed074";
const TEAL   = "#3fa9d9";

export default function ResearchSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ background: SNOW, padding: "clamp(100px,13vw,180px) 0" }}>
      <div ref={ref} className="max-w-[1080px] mx-auto px-6 sm:px-8">
        <div
          className="grid gap-10"
          style={{ gridTemplateColumns: "minmax(0,1fr) minmax(0,2fr) minmax(0,1.1fr)", alignItems: "start" }}
        >
          {/* Left: number + label */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, ease }}
          >
            <div
              className="font-serif select-none"
              style={{
                fontSize: "clamp(80px,10vw,140px)",
                fontWeight: 300,
                lineHeight: 0.88,
                letterSpacing: "-0.04em",
                color: TEAL,
                opacity: 0.22,
              }}
            >
              01
            </div>
            <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: SILVER }}>
              The Mandate
            </p>
          </motion.div>

          {/* Centre: quote + body */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease, delay: 0.1 }}
          >
            <p
              className="font-serif"
              style={{
                fontSize: "clamp(24px,2.6vw,38px)",
                fontWeight: 300,
                lineHeight: 1.3,
                letterSpacing: "-0.02em",
                color: INK,
              }}
            >
              Rigorous thinking, deployed as{" "}
              <em style={{ fontStyle: "italic", color: GREEN }}>real systems</em>
              . We produce tools, platforms and infrastructure that change how Africa's
              institutions function.
            </p>
            <p className="mt-7 text-[16px] leading-[1.75]" style={{ color: MUTE, maxWidth: "50ch" }}>
              From AI-driven analytics to smart city infrastructure, MGX bridges the gap between
              academic insight and operational reality. Research that ships.
            </p>
            <div className="mt-8 pt-5" style={{ borderTop: `1px solid ${LINE}` }}>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em]" style={{ color: SILVER }}>
                MGX · Research, Technology, Innovation
              </span>
            </div>
          </motion.div>

          {/* Right: photo */}
          <motion.div
            style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "3/4" }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.1, ease, delay: 0.2 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt="MGX team at work"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
