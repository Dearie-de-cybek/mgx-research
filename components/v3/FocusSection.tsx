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

const AREAS = [
  { n: "01", name: "Artificial Intelligence",    tag: "ML · Data Analytics"        },
  { n: "02", name: "Robotics",                   tag: "Automation · Mechatronics"   },
  { n: "03", name: "Cybersecurity",              tag: "Threat Intel · Zero-Trust"   },
  { n: "04", name: "Digital Infrastructure",     tag: "Cloud · Enterprise"          },
  { n: "05", name: "Smart Governance",           tag: "E-Gov · Smart Cities"        },
  { n: "06", name: "Human-Centered Innovation",  tag: "HealthTech · EdTech"         },
  { n: "07", name: "Research Systems",           tag: "Academic · Applied"          },
  { n: "08", name: "Entrepreneurship",           tag: "Startups · Ventures"         },
  { n: "09", name: "Digital Transformation",     tag: "Enterprise · Public Sector"  },
  { n: "10", name: "Emerging Technologies",      tag: "Blockchain · Quantum"        },
];

const PHOTOS = [
  { src: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=600",   alt: "AI and data" },
  { src: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",   alt: "Robotics"    },
  { src: "https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=600",   alt: "Governance"  },
];

function AreaRow({ area, delay }: { area: typeof AREAS[0]; delay: number }) {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-20px" });

  return (
    <motion.div
      ref={ref}
      className="flex items-baseline justify-between py-[22px]"
      style={{ borderBottom: `1px solid ${LINE}` }}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease, delay }}
    >
      <span
        className="font-mono text-[11px] shrink-0"
        style={{ color: TEAL, minWidth: "36px", fontWeight: 500 }}
      >
        {area.n}
      </span>
      <span
        className="flex-1 ml-7 font-serif"
        style={{
          fontSize: "clamp(19px,2vw,26px)",
          fontWeight: 300,
          letterSpacing: "-0.015em",
          color: INK,
        }}
      >
        {area.name}
      </span>
      <span
        className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.16em] text-right ml-6 shrink-0"
        style={{ color: SILVER }}
      >
        {area.tag}
      </span>
    </motion.div>
  );
}

export default function FocusSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section id="focus" style={{ background: WHITE, padding: "clamp(100px,13vw,180px) 0" }}>
      <div className="max-w-[1080px] mx-auto px-6 sm:px-8">

        {/* Header */}
        <motion.div
          ref={ref}
          className="flex items-end justify-between gap-8 mb-10"
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease }}
        >
          <div>
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em] inline-flex items-center gap-3"
              style={{ color: SILVER }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: GREEN }} />
              Our Focus
            </span>
            <h2
              className="font-serif mt-3"
              style={{
                fontSize: "clamp(40px,5vw,72px)",
                fontWeight: 300,
                lineHeight: 0.98,
                letterSpacing: "-0.03em",
                color: INK,
              }}
            >
              Ten focus{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>areas.</em>
            </h2>
          </div>
          <span
            className="hidden sm:block font-mono text-[12px] uppercase tracking-[0.18em] shrink-0"
            style={{ color: SILVER }}
          >
            Index 01 to 10
          </span>
        </motion.div>

        {/* Photo strip */}
        <motion.div
          className="grid grid-cols-3 gap-3 mb-10"
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease, delay: 0.15 }}
        >
          {PHOTOS.map((p) => (
            <div key={p.src} style={{ borderRadius: "6px", overflow: "hidden", aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
          ))}
        </motion.div>

        {/* Ruled list */}
        <div style={{ borderTop: `1px solid ${LINE}` }}>
          {AREAS.map((a, i) => (
            <AreaRow key={a.n} area={a} delay={i * 0.038} />
          ))}
        </div>
      </div>
    </section>
  );
}
