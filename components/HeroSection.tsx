"use client";

import { motion } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

/* ── Africa silhouette (contour-line style from design v2) ─────── */
function AfricaSilhouette() {
  return (
    <div
      className="absolute pointer-events-none select-none hidden md:block"
      style={{ right: "-120px", bottom: "-120px", width: "620px", height: "620px", opacity: 0.18 }}
      aria-hidden
    >
      <svg viewBox="0 0 400 400" style={{ width: "100%", height: "100%" }}>
        <defs>
          <linearGradient id="af-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#5dd673" />
            <stop offset="1" stopColor="#3fa9d9" />
          </linearGradient>
        </defs>
        <g fill="url(#af-grad)">
          <rect x="160" y="50"  width="80"  height="6" rx="3"/>
          <rect x="140" y="68"  width="120" height="6" rx="3"/>
          <rect x="125" y="86"  width="155" height="6" rx="3"/>
          <rect x="120" y="104" width="170" height="6" rx="3"/>
          <rect x="115" y="122" width="180" height="6" rx="3"/>
          <rect x="112" y="140" width="190" height="6" rx="3"/>
          <rect x="110" y="158" width="200" height="6" rx="3"/>
          <rect x="108" y="176" width="200" height="6" rx="3"/>
          <rect x="110" y="194" width="195" height="6" rx="3"/>
          <rect x="115" y="212" width="180" height="6" rx="3"/>
          <rect x="125" y="230" width="160" height="6" rx="3"/>
          <rect x="140" y="248" width="135" height="6" rx="3"/>
          <rect x="155" y="266" width="110" height="6" rx="3"/>
          <rect x="170" y="284" width="85"  height="6" rx="3"/>
          <rect x="180" y="302" width="65"  height="6" rx="3"/>
          <rect x="190" y="320" width="45"  height="6" rx="3"/>
          <rect x="200" y="338" width="25"  height="6" rx="3"/>
        </g>
      </svg>
    </div>
  );
}

/* ── Floating photo tiles (desktop only) ────────────────────────── */
const PHOTOS = [
  {
    src: "https://images.pexels.com/photos/8728285/pexels-photo-8728285.jpeg?auto=compress&cs=tinysrgb&w=600",
    cap: "Robotics · Lab",
    w: 200, h: 140, tx: 20,
  },
  {
    src: "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=600",
    cap: "AI · Research",
    w: 160, h: 220, tx: -40,
  },
  {
    src: "https://images.pexels.com/photos/8728382/pexels-photo-8728382.jpeg?auto=compress&cs=tinysrgb&w=600",
    cap: "Field · Enugu",
    w: 220, h: 140, tx: 10,
  },
];

function HeroPhotos() {
  return (
    <div
      className="absolute hidden xl:flex flex-col gap-4 pointer-events-none z-[3]"
      style={{ right: "clamp(20px, 4vw, 80px)", top: "140px" }}
      aria-hidden
    >
      {PHOTOS.map((p, i) => (
        <motion.div
          key={p.cap}
          className="relative overflow-hidden rounded-sm"
          style={{
            width: p.w,
            height: p.h,
            transform: `translateX(${p.tx}px)`,
            border: "1px solid rgba(255,255,255,0.12)",
            boxShadow: "0 24px 60px -20px rgba(0,0,0,0.6)",
            background: "#0e3d5c",
          }}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease, delay: 0.55 + i * 0.13 }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={p.src}
            alt=""
            style={{
              display: "block",
              width: "100%",
              height: "100%",
              objectFit: "cover",
              filter: "saturate(0.7) contrast(1.05)",
              mixBlendMode: "luminosity",
              opacity: 0.85,
            }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(14,61,92,0.15), rgba(6,31,51,0.55))",
            }}
          />
          <span
            className="absolute left-2.5 bottom-2 z-10 font-mono text-[9px] uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.92)" }}
          >
            {p.cap}
          </span>
        </motion.div>
      ))}
    </div>
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full flex flex-col justify-between overflow-hidden"
      style={{
        minHeight: "100svh",
        paddingTop: "160px",
        paddingBottom: "80px",
        background: `
          radial-gradient(1100px 700px at 85% 10%, rgba(63,169,217,0.18), transparent 60%),
          radial-gradient(900px 600px at 0% 90%, rgba(78,208,116,0.10), transparent 55%),
          linear-gradient(180deg, #061f33 0%, #0a2c46 60%, #0e3d5c 100%)
        `,
      }}
    >
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-hero-grid pointer-events-none" style={{ zIndex: 1 }} />

      {/* Ghost "MGX" watermark */}
      <div
        className="absolute pointer-events-none select-none font-display font-bold leading-none"
        style={{
          right: "-40px",
          top: "50%",
          transform: "translateY(-50%)",
          fontSize: "clamp(280px, 38vw, 640px)",
          letterSpacing: "-0.07em",
          color: "rgba(255,255,255,0.025)",
          zIndex: 1,
        }}
        aria-hidden
      >
        MGX
      </div>

      <AfricaSilhouette />
      <HeroPhotos />

      {/* Content */}
      <div
        className="relative mx-auto w-full px-5 sm:px-8 lg:px-10"
        style={{ maxWidth: "1320px", zIndex: 10 }}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-[clamp(48px,12vh,140px)]">
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="font-mono flex items-center gap-3 text-xs uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0 animate-pulse-dot"
              style={{ background: "#5dd673" }}
            />
            Now in Enugu, Nigeria · Est. 2017
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.15 }}
            className="font-mono hidden sm:flex items-center gap-2 text-xs uppercase tracking-[0.22em]"
            style={{ color: "rgba(255,255,255,0.62)" }}
          >
            <span style={{ color: "#5dd673" }}>●</span> Active engagements
          </motion.div>
        </div>

        {/* H1 */}
        <h1
          className="font-display"
          style={{
            fontWeight: 500,
            fontSize: "clamp(64px, 12vw, 200px)",
            lineHeight: 0.88,
            letterSpacing: "-0.045em",
          }}
        >
          {/* "from" — serif italic, muted */}
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.22 }}
          >
            <span
              className="font-serif italic"
              style={{
                color: "rgba(255,255,255,0.36)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
              }}
            >
              from
            </span>
          </motion.span>

          {/* "Insight" — white-to-ice gradient */}
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.32 }}
            style={{
              background: "linear-gradient(180deg, #ffffff 0%, #cfe8f5 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Insight
          </motion.span>

          {/* "to Impact." */}
          <motion.span
            className="block"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.42 }}
          >
            <span
              className="font-serif italic"
              style={{
                color: "rgba(255,255,255,0.36)",
                fontWeight: 400,
                letterSpacing: "-0.02em",
                marginRight: "0.1em",
              }}
            >
              to{" "}
            </span>
            <span
              style={{
                background: "linear-gradient(135deg, #5dd673 0%, #3fa9d9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                position: "relative",
              }}
            >
              Impact.
              {/* Underline accent */}
              <span
                style={{
                  position: "absolute",
                  left: 0,
                  right: "8px",
                  bottom: "-0.02em",
                  height: "0.06em",
                  background: "linear-gradient(90deg, #5dd673, #3fa9d9)",
                  borderRadius: "4px",
                  opacity: 0.5,
                }}
              />
            </span>
          </motion.span>
        </h1>

        {/* Lede + CTAs */}
        <div className="grid grid-cols-1 md:grid-cols-[1.2fr_1fr] gap-10 mt-[clamp(48px,10vh,100px)]">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.55 }}
            style={{
              fontSize: "clamp(17px, 1.5vw, 21px)",
              lineHeight: 1.55,
              color: "rgba(255,255,255,0.78)",
              maxWidth: "52ch",
            }}
          >
            <strong style={{ color: "#fff", fontWeight: 600 }}>
              MGX is Africa's premier ecosystem
            </strong>{" "}
            for research, technology, innovation &amp; entrepreneurship. We
            translate rigorous thinking into systems that solve real human
            problems, at scale.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: 0.65 }}
            className="flex gap-4 flex-wrap items-start"
          >
            <a
              href="#focus"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-0.5 active:scale-[0.97]"
              style={{ background: "#5dd673", color: "#061f33" }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow =
                  "0 16px 40px -16px rgba(78,208,116,0.55)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              See our focus
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>

            <a
              href="#campus"
              className="inline-flex items-center gap-3 px-6 py-4 rounded-full text-sm font-semibold transition-all duration-200"
              style={{
                color: "#fff",
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.03)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.07)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.18)";
              }}
            >
              Visit MGX Campus
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path
                  d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1.1 }}
        className="absolute bottom-6 left-5 sm:left-8 z-10 font-mono flex items-center gap-2.5 select-none"
        style={{
          fontSize: "10px",
          letterSpacing: "0.3em",
          textTransform: "uppercase",
          color: "rgba(255,255,255,0.62)",
        }}
      >
        Scroll
        <span
          className="relative overflow-hidden"
          style={{ width: "32px", height: "1px", background: "rgba(255,255,255,0.4)" }}
        >
          <span
            className="absolute left-0 top-0 bottom-0 w-[40%] animate-slide-bar"
            style={{ background: "#5dd673" }}
          />
        </span>
        01 / 06
      </motion.div>
    </section>
  );
}
