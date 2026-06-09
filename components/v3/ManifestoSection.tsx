"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

export default function ManifestoSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section style={{ position: "relative", overflow: "hidden", padding: "clamp(120px,16vw,220px) 0" }}>
      {/* Background photo */}
      <div className="absolute inset-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://images.pexels.com/photos/1181271/pexels-photo-1181271.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", filter: "brightness(0.28) saturate(0.45)" }}
        />
      </div>
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: "linear-gradient(160deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.55) 100%)" }}
        aria-hidden
      />

      {/* Content */}
      <div ref={ref} className="max-w-[1080px] mx-auto px-6 sm:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease }}
        >
          <span
            className="font-mono text-[11px] uppercase tracking-[0.24em] block mb-8"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Manifesto
          </span>

          <p
            className="font-serif"
            style={{
              fontWeight: 300,
              fontSize: "clamp(36px,4.8vw,76px)",
              lineHeight: 1.12,
              letterSpacing: "-0.03em",
              color: "#ffffff",
              maxWidth: "20ch",
            }}
          >
            We build technology for{" "}
            <em style={{ fontStyle: "italic", color: "rgba(255,255,255,0.6)" }}>people</em>
            {", "}not for technology's sake.
          </p>

          <div
            className="mt-12 pt-8 font-mono text-[11px] uppercase tracking-[0.22em]"
            style={{ borderTop: "1px solid rgba(255,255,255,0.12)", color: "rgba(255,255,255,0.4)" }}
          >
            MGX · Solving real human problems with technology
          </div>
        </motion.div>
      </div>
    </section>
  );
}
