"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import AnimatedX from "./AnimatedX";

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

/* ── Antigravity cursor burst — particles erupt from the pointer and shoot outward fast ── */
function AntigravityCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const colors = ["#0B6B82", "#2CBF68", "#3B9FE8", "#0E90A8"];

    type Particle = {
      x: number; y: number;
      vx: number; vy: number;
      radius: number;
      color: string;
      alpha: number;
      decay: number;
    };

    let particles: Particle[] = [];
    let lastX = 0;
    let lastY = 0;
    let hasPointer = false;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      // Speed of cursor movement → more particles + faster outward velocity when flicking fast
      const dx = hasPointer ? x - lastX : 0;
      const dy = hasPointer ? y - lastY : 0;
      const speed = Math.min(Math.hypot(dx, dy), 60);
      lastX = x;
      lastY = y;
      hasPointer = true;

      const spawnCount = 5 + Math.round(speed / 6);
      for (let i = 0; i < spawnCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        // Burst speed scales with cursor speed — fast flicks throw particles further/faster
        const force = 2.5 + Math.random() * 4 + speed * 0.18;
        particles.push({
          x,
          y,
          vx: Math.cos(angle) * force,
          vy: Math.sin(angle) * force,
          radius: Math.random() * 3 + 1.5,
          color: colors[Math.floor(Math.random() * colors.length)],
          alpha: 1,
          decay: 0.025 + Math.random() * 0.025,
        });
      }
    };
    window.addEventListener("pointermove", handlePointerMove);

    let animationFrameId: number;

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      particles = particles.filter((p) => p.alpha > 0);

      particles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;

        // Quick outward-spread deceleration — fast burst, then settle
        p.vx *= 0.92;
        p.vy *= 0.92;

        p.alpha -= p.decay;

        if (p.alpha > 0) {
          ctx.save();
          ctx.globalAlpha = Math.max(p.alpha, 0);
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = p.color;
          ctx.shadowBlur = 10;
          ctx.shadowColor = p.color;
          ctx.fill();
          ctx.restore();
        }
      });

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", handlePointerMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none z-10"
    />
  );
}

/* ── Soft floating orb ───────────────────────────────────────────── */
function Orb({
  className,
  color,
  delay = 0,
  opacity = 0.16,
}: {
  className: string;
  color: string;
  delay?: number;
  opacity?: number;
}) {
  return (
    <motion.div
      className={className}
      style={{
        background: color,
        filter: "blur(140px)",
        zIndex: 2,
        opacity,
      }}
      animate={{
        scale: [1, 1.18, 1],
        opacity: [opacity * 0.7, opacity, opacity * 0.7],
      }}
      transition={{
        duration: 14,
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
      {/* Interactive Antigravity Canvas Background */}
      <AntigravityCanvas />

      {/* Layer 1: wash */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(180deg, #FFFFFF 0%, #F7FAFC 60%, #FFFFFF 100%)",
          zIndex: 1,
        }}
      />

      {/* Layer 2: orbs — scale down on mobile so they don't dominate */}
      <Orb
        className="absolute top-[-20%] right-[-25%] w-[80vw] sm:w-[70vw] md:w-[60vw] h-[80vw] sm:h-[70vw] md:h-[60vw] rounded-full"
        color="#0B6B82"
        delay={0}
        opacity={0.14}
      />
      <Orb
        className="absolute bottom-[-25%] left-[-20%] w-[70vw] sm:w-[60vw] md:w-[50vw] h-[70vw] sm:h-[60vw] md:h-[50vw] rounded-full"
        color="#2CBF68"
        delay={5}
        opacity={0.1}
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
            Enugu, Nigeria · Est. 2019
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
