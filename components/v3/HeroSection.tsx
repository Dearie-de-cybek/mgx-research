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

const STATS = [
  { n: "10+",  label: "Research domains" },
  { n: "200+", label: "Campus capacity"  },
  { n: "2026", label: "Campus opens"     },
];

export default function HeroSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });

  return (
    <section style={{ background: WHITE, paddingTop: "clamp(120px,14vw,180px)", paddingBottom: "clamp(80px,10vw,120px)", overflow: "hidden" }}>
      <div ref={ref} className="max-w-[1080px] mx-auto px-6 sm:px-8">

        {/* Eyebrow */}
        <motion.p
          className="font-mono text-[11px] uppercase tracking-[0.24em] mb-10 inline-flex items-center gap-3"
          style={{ color: SILVER }}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <span
            className="w-[6px] h-[6px] rounded-full shrink-0"
            style={{ background: GREEN, boxShadow: `0 0 0 3px rgba(78,208,116,0.18)` }}
          />
          MGX Research · Enugu, Nigeria
        </motion.p>

        {/* Two-column: headline left, photo right */}
        <div className="grid md:grid-cols-[1fr_420px] gap-10 items-start">
          <div>
            <motion.h1
              className="font-serif"
              style={{
                fontWeight: 300,
                fontSize: "clamp(60px,8.5vw,118px)",
                lineHeight: 0.97,
                letterSpacing: "-0.04em",
                color: INK,
              }}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, ease, delay: 0.08 }}
            >
              Turning<br />
              insight<br />
              into{" "}
              <em style={{ fontStyle: "italic", color: GREEN }}>impact.</em>
            </motion.h1>

            <motion.p
              className="mt-8 text-[17px] leading-[1.72]"
              style={{ color: MUTE, maxWidth: "44ch" }}
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease, delay: 0.2 }}
            >
              Africa's premier ecosystem for research, technology,
              innovation and entrepreneurship.
              Built in Enugu. Built for the world.
            </motion.p>

            <motion.div
              className="flex items-center gap-6 mt-8"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.3 }}
            >
              <a
                href="#focus"
                className="text-[15px] font-medium"
                style={{
                  color: INK,
                  textDecoration: "underline",
                  textUnderlineOffset: "4px",
                  textDecorationColor: GREEN,
                }}
              >
                Explore our work
              </a>
              <a
                href="mailto:hello@mgx.africa"
                className="text-[15px] transition-colors duration-200"
                style={{ color: SILVER }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = INK)}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = SILVER)}
              >
                Contact us
              </a>
            </motion.div>

            {/* Stats */}
            <motion.div
              className="mt-12 pt-8 grid grid-cols-3 gap-4"
              style={{ borderTop: `1px solid ${LINE}` }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: 0.45 }}
            >
              {STATS.map((s, i) => (
                <div key={s.n}>
                  <div
                    className="font-serif"
                    style={{
                      fontSize: "clamp(28px,3vw,44px)",
                      fontWeight: 300,
                      letterSpacing: "-0.025em",
                      color: i === 0 ? GREEN : i === 1 ? TEAL : INK,
                    }}
                  >
                    {s.n}
                  </div>
                  <div className="mt-1 font-mono text-[11px] uppercase tracking-[0.14em]" style={{ color: SILVER }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: tall photo */}
          <motion.div
            className="hidden md:block"
            style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "3/4", marginTop: "6px" }}
            initial={{ opacity: 0, scale: 0.97 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=900"
              alt="Research and innovation at MGX"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
            />
          </motion.div>
        </div>

        {/* Wide secondary photo strip */}
        <motion.div
          className="mt-10 grid grid-cols-3 gap-3"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.5 }}
        >
          {[
            { src: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Collaboration" },
            { src: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Team at work" },
            { src: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg?auto=compress&cs=tinysrgb&w=600", alt: "Innovation" },
          ].map((img) => (
            <div key={img.src} style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
