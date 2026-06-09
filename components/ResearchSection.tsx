"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

function FadeUp({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

const stats = [
  { value: "6+",   label: "Research Domains" },
  { value: "18+",  label: "Countries Served"  },
  { value: "50+",  label: "Partners & Clients"},
  { value: "2017", label: "Founded"            },
];

export default function ResearchSection() {
  return (
    <section
      id="research"
      style={{
        background: "#061f33",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        padding: "clamp(80px, 12vw, 160px) 0",
      }}
    >
      <div
        className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10
                   grid grid-cols-1 md:grid-cols-[1fr_2fr] gap-16 md:gap-20 items-start"
      >
        {/* Left: eyebrow + position + stats */}
        <FadeUp>
          <div className="flex flex-col gap-7">
            {/* Eyebrow */}
            <div className="flex items-center gap-2.5">
              <span className="w-7 h-[1px]" style={{ background: "#5dd673" }} />
              <span
                className="font-mono text-[11px] uppercase tracking-[0.24em]"
                style={{ color: "#5dd673" }}
              >
                Our Mandate
              </span>
            </div>

            {/* Position text */}
            <div
              className="font-mono text-sm leading-[1.7]"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              <span
                className="block font-mono text-[11px] uppercase tracking-[0.2em] mb-3"
                style={{ color: "#5dd673" }}
              >
                Position
              </span>
              Africa's premier ecosystem for research, technology, innovation &amp;
              entrepreneurship, operating at the intersection of academic rigour and
              real-world deployment.
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5 mt-1">
              {stats.map((s) => (
                <div key={s.label}>
                  <div
                    className="font-display font-semibold leading-none"
                    style={{
                      fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                      letterSpacing: "-0.04em",
                      color: "#5dd673",
                    }}
                  >
                    {s.value}
                  </div>
                  <div
                    className="font-mono text-[10px] uppercase tracking-[0.18em] mt-1.5"
                    style={{ color: "rgba(255,255,255,0.40)" }}
                  >
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeUp>

        {/* Right: big mission statement */}
        <FadeUp delay={0.1}>
          <h2
            className="font-display"
            style={{
              fontWeight: 500,
              fontSize: "clamp(36px, 5.4vw, 80px)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "#fff",
              maxWidth: "18ch",
            }}
          >
            We solve real human problems{" "}
            <span
              className="font-serif italic"
              style={{ color: "#5dd673", fontWeight: 400 }}
            >
              with technology
            </span>{" "}
            Built in Africa, for the world.
          </h2>
        </FadeUp>
      </div>
    </section>
  );
}
