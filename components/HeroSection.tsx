"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import AnimatedX from "./AnimatedX";
import ParticleBackground from "./particles/ParticleBackground";

const ease = [0.23, 1, 0.32, 1] as const;

/* ── Typewriter Effect ───────────────────────────────────────────── */
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [subIndex, setSubIndex] = useState(0);
  const [reverse, setReverse] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (subIndex === words[index].length + 1 && !reverse) {
      const timeout = setTimeout(() => setReverse(true), 1200);
      return () => clearTimeout(timeout);
    }

    if (subIndex === 0 && reverse) {
      setReverse(false);
      setIndex((prev) => (prev + 1) % words.length);
      return;
    }

    const timeout = setTimeout(() => {
      setSubIndex((prev) => prev + (reverse ? -1 : 1));
    }, reverse ? 30 : 60);

    return () => clearTimeout(timeout);
  }, [subIndex, reverse, index, words]);

  useEffect(() => {
    setText(words[index].substring(0, subIndex));
  }, [subIndex, index, words]);

  return (
    <span className="inline-block border-r-2 border-[#2CBF68] pr-1 font-semibold text-[#0B6B82] animate-blink">
      {text}
    </span>
  );
}

/* ── Soft floating orb ───────────────────────────────────────────── */
function Orb({
  className,
  color,
  delay = 0,
  opacity = 0.16,
  duration = 14,
  driftX = 0,
  driftY = 0,
}: {
  className: string;
  color: string;
  delay?: number;
  opacity?: number;
  duration?: number;
  /** Max lateral drift in px — gives the blob a slow weightless wander, not just a pulse. */
  driftX?: number;
  driftY?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{
        background: color,
        filter: "blur(90px)",
        zIndex: 2,
        opacity,
        mixBlendMode: "multiply",
      }}
      animate={{
        // Calm horizontal sweep — left edge to right edge and back, with a soft
        // vertical sway so the path reads as a gentle arc rather than a straight line.
        x: [-driftX, driftX, -driftX],
        y: [-driftY, driftY, -driftY],
        scale: [1, 1.14, 1],
        opacity: [opacity * 0.75, opacity, opacity * 0.75],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: "easeInOut",
        delay,
      }}
    />
  );
}

export default function HeroSection() {
  return (
    <section
      className="relative w-full flex items-center overflow-hidden"
      style={{
        background: "#FFFFFF",
        minHeight: "100svh", // small viewport height — accounts for mobile browser chrome
      }}
    >
      {/* Interactive WebGL particle field — flow-field motion + cursor swirl */}
      <ParticleBackground />

      {/* Layer 1: wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 60%, #FFFFFF 100%)",
          zIndex: 1,
        }}
      />

      {/* Layer 2: orbs — slow weightless drift + pulse, scale down on mobile so they don't dominate */}
      <Orb
        className="absolute top-[-20%] right-[-25%] w-[80vw] sm:w-[70vw] md:w-[60vw] h-[80vw] sm:h-[70vw] md:h-[60vw] rounded-full"
        color="#0B6B82"
        delay={0}
        opacity={0.34}
        duration={26}
        driftX={260}
        driftY={70}
      />
      <Orb
        className="absolute bottom-[-25%] left-[-20%] w-[70vw] sm:w-[60vw] md:w-[50vw] h-[70vw] sm:h-[60vw] md:h-[50vw] rounded-full"
        color="#2CBF68"
        delay={5}
        opacity={0.28}
        duration={32}
        driftX={220}
        driftY={60}
      />
      <Orb
        className="absolute top-[30%] left-[10%] w-[40vw] sm:w-[34vw] md:w-[28vw] h-[40vw] sm:h-[34vw] md:h-[28vw] rounded-full"
        color="#3B9FE8"
        delay={9}
        opacity={0.20}
        duration={22}
        driftX={180}
        driftY={50}
      />

      {/* Content — responsive padding ladder */}
      <div
        className="relative w-full mx-auto flex flex-col items-start
                   px-5 sm:px-8 md:px-12 lg:px-20
                   pt-28 sm:pt-32 md:pt-36 lg:pt-44
                   pb-20 sm:pb-24 md:pb-28 lg:pb-32"
        style={{
          zIndex: 10,
          maxWidth: "1280px",
        }}
      >
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.05 }}
          className="flex items-center gap-2.5 sm:gap-3 mb-8 sm:mb-10 md:mb-14"
        >
          <span
            className="w-1.5 h-1.5 rounded-full shrink-0"
            style={{
              background: "#2CBF68",
              boxShadow: "0 0 12px rgba(44,191,104,0.55)",
            }}
          />
          <span
            className="font-mono uppercase
                       text-xs sm:text-sm
                       tracking-[0.22em] sm:tracking-[0.3em]"
            style={{ color: "#566070" }}
          >
            Enugu, Nigeria · Est. 2017
          </span>
        </motion.div>

        {/* Headline — fluid clamp tuned per breakpoint */}
        <div
          className="font-display font-black w-full"
          style={{
            fontSize: "clamp(2.5rem, 11vw, 9rem)",
            lineHeight: 0.92,
            letterSpacing: "-0.04em",
            color: "#0C0E12",
          }}
        >
          {["From", "Insight"].map((w, i) => (
            <motion.span
              key={w}
              className="inline-block mr-[0.22em] origin-center"
              initial={{ opacity: 0, scale: 0.65, filter: "blur(12px)" }}
              animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ type: "spring", stiffness: 65, damping: 14, mass: 0.8, delay: 0.18 + i * 0.08 }}
            >
              {w}
            </motion.span>
          ))}
          <br />
          <motion.span
            className="inline-block mr-[0.22em] origin-center"
            initial={{ opacity: 0, scale: 0.65, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 65, damping: 14, mass: 0.8, delay: 0.4 }}
          >
            to{" "}
          </motion.span>
          <motion.span
            className="inline-block animate-shifting-gradient bg-clip-text text-transparent origin-center"
            initial={{ opacity: 0, scale: 0.65, filter: "blur(12px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ type: "spring", stiffness: 65, damping: 14, mass: 0.8, delay: 0.5 }}
            style={{
              background: "linear-gradient(135deg, #0B6B82 0%, #2CBF68 50%, #3B9FE8 100%)",
              backgroundSize: "200% auto",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Impact.
          </motion.span>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease, delay: 0.7 }}
          className="mt-7 sm:mt-9 md:mt-10
                     text-base sm:text-lg md:text-xl
                     leading-[1.7] sm:leading-[1.75] md:leading-[1.8]"
          style={{ color: "#566070", maxWidth: "52ch" }}
        >
          Africa's premier ecosystem for <Typewriter words={["research", "technology", "innovation", "entrepreneurship", "AI & systems"]} />. We turn rigorous thinking into systems that
          serve real human needs — at scale.
        </motion.p>

        {/* CTAs — stack on xs, inline from sm+ */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease, delay: 0.85 }}
          className="flex flex-col sm:flex-row sm:items-center
                     gap-3 sm:gap-5 md:gap-6
                     mt-9 sm:mt-11 md:mt-12
                     w-full sm:w-auto"
        >
          <a
            href="#research"
            className="group inline-flex items-center justify-center sm:justify-start gap-3
                       w-full sm:w-auto
                       px-6 sm:px-7 py-3.5
                       text-base font-semibold text-white
                       rounded-md transition-all hover:opacity-95 active:scale-[0.97]"
            style={{
              background: "#0B6B82",
              boxShadow: "0 10px 28px rgba(11,107,130,0.22)",
            }}
          >
            Explore the Research
            <svg
              width="14"
              height="14"
              viewBox="0 0 14 14"
              fill="none"
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#campus"
            className="inline-flex items-center justify-center sm:justify-start
                       text-base font-medium
                       hover:underline underline-offset-4 transition-all
                       py-2 sm:py-0"
            style={{ color: "#0C0E12" }}
          >
            Visit MG <AnimatedX />  Campus →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
