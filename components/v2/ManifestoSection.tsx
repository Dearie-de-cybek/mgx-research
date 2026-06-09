"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const GREEN = "#4ed074";

export default function ManifestoSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      style={{
        position: "relative",
        overflow: "hidden",
        background: "#14110d",
        padding: "clamp(100px,14vw,200px) 0",
        color: "#faf9f5",
      }}
    >
      {/* Full-bleed photo */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: "brightness(0.4) saturate(0.7)" }}
        />
      </div>

      {/* Overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 50%, transparent 0%, rgba(20,17,13,0.65) 80%), linear-gradient(180deg, rgba(20,17,13,0.4), rgba(20,17,13,0.6))",
        }}
        aria-hidden
      />

      {/* Content */}
      <div
        ref={ref}
        className="max-w-[1320px] mx-auto px-5 sm:px-7 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease }}
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.26em] inline-flex items-center justify-center gap-3"
            style={{ color: "rgba(255,255,255,0.7)" }}
          >
            <span
              className="w-[7px] h-[7px] rounded-full"
              style={{ background: GREEN, boxShadow: "0 0 0 4px rgba(78,208,116,0.20)" }}
            />
            Manifesto
          </span>

          <h2
            className="font-serif"
            style={{
              fontWeight: 400,
              fontSize: "clamp(44px, 6.5vw, 110px)",
              lineHeight: 1.02,
              letterSpacing: "-0.03em",
              color: "#fff",
              maxWidth: "22ch",
              margin: "24px auto 0",
            }}
          >
            We don&apos;t build technology for technology&apos;s sake. We build it for{" "}
            <em style={{ fontStyle: "italic", color: GREEN }}>people</em>.
          </h2>

          <div
            className="font-mono text-[11px] uppercase tracking-[0.26em] mt-9"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            MGX · Solving real human problems with technology
          </div>
        </motion.div>
      </div>
    </section>
  );
}
