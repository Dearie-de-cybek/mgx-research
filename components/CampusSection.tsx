"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import AnimatedX from "./AnimatedX";

const ease = [0.23, 1, 0.32, 1] as const;

const features = [
  {
    label: "Research Labs",
    desc: "Dedicated laboratories for AI, robotics, and emerging technology research.",
  },
  {
    label: "Innovation Hub",
    desc: "Collaborative workspaces for startups, founders, and enterprise teams.",
  },
  {
    label: "Demo & Showcase",
    desc: "Live demonstration environments for MGX products and partner solutions.",
  },
  {
    label: "Learning Centre",
    desc: "Training facilities, workshops, and continuing education programmes.",
  },
];

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
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 22 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, ease, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function CampusSection() {
  return (
    <section
      id="campus"
      className="w-full bg-white"
      style={{ borderTop: "1px solid #E2E8F0" }}
    >
      <div
        className="max-w-[1280px] mx-auto
                   px-5 sm:px-8 md:px-12 lg:px-20
                   pt-20 sm:pt-24 md:pt-28 lg:pt-32
                   pb-20 sm:pb-24 md:pb-28 lg:pb-32"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10 mb-16">
          <div>
            <FadeUp>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-5">
                MG<AnimatedX /> Campus — Enugu, Nigeria
              </p>
            </FadeUp>
            <FadeUp delay={0.06}>
              <h2
                className="font-display font-black text-[#0C0E12] leading-[1.0]"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 4.5rem)",
                  letterSpacing: "-0.035em",
                  maxWidth: "18ch",
                }}
              >
                A place built
                <br />
                for builders.
              </h2>
            </FadeUp>
          </div>

          <FadeUp delay={0.1}>
            <p
              className="text-lg leading-[1.8] text-[#566070]"
              style={{ maxWidth: "46ch" }}
            >
              The MG<AnimatedX /> Campus is a physical innovation ecosystem currently under
              development in Enugu, Nigeria. Designed to bring together
              researchers, engineers, founders, and institutions — it will be
              West Africa's most advanced hub for technology research and
              entrepreneurship.
            </p>
          </FadeUp>
        </div>

        {/* Main content: image + features (grid auto-stretches rows) */}
        <div
          className="grid grid-cols-1 lg:grid-cols-2 gap-0 items-stretch"
          style={{ border: "1px solid #E2E8F0" }}
        >
          {/* Image — fills full row height */}
          <div
            className="relative w-full overflow-hidden group
                       min-h-[340px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[560px]"
          >
            <Image
              src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt="MGX Campus — Innovation Hub, Enugu"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to bottom, transparent 40%, rgba(7,80,98,0.78) 100%)",
              }}
            />
            <div className="absolute bottom-8 left-8">
              <span
                className="font-mono text-xs uppercase tracking-[0.2em] text-white/85 px-3 py-1.5 rounded-sm"
                style={{
                  background: "rgba(11,107,130,0.7)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                }}
              >
                Under Development · 2025
              </span>
            </div>
          </div>

          {/* Features — flex column, evenly distributed */}
          <div
            className="flex flex-col"
            style={{ borderLeft: "1px solid #E2E8F0" }}
          >
            {features.map((f, i) => (
              <div
                key={f.label}
                className="flex-1 flex flex-col gap-2
                           px-6 sm:px-8 md:px-10
                           py-5 sm:py-6 md:py-7
                           group hover:bg-[#F4F7FA] transition-colors duration-200"
                style={{
                  borderBottom: "1px solid #E2E8F0",
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: "#2CBF68" }}
                  />
                  <h3
                    className="font-display font-bold text-[#0C0E12]"
                    style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
                  >
                    {f.label}
                  </h3>
                </div>
                <p
                  className="text-base leading-[1.7] text-[#566070]"
                  style={{ paddingLeft: "1.125rem" }}
                >
                  {f.desc}
                </p>
              </div>
            ))}

            {/* CTA row */}
            <div className="px-6 sm:px-8 md:px-10 py-5 sm:py-6 md:py-7
                            flex flex-col sm:flex-row sm:items-center
                            gap-3 sm:gap-4">
              <a
                href="#contact"
                className="px-6 py-3 text-sm sm:text-base font-semibold text-white
                           rounded-md text-center
                           transition-all hover:opacity-90 active:scale-[0.97]"
                style={{ background: "#0B6B82" }}
              >
                Partner with Campus
              </a>
              <a
                href="#contact"
                className="px-6 py-3 text-sm sm:text-base font-semibold text-[#0B6B82]
                           text-center sm:text-left
                           hover:underline underline-offset-4 transition-all"
              >
                Learn more →
              </a>
            </div>
          </div>
        </div>

        {/* Quote strip */}
        <FadeUp delay={0.12}>
          <div
            className="mt-12 sm:mt-16
                       px-6 sm:px-8 md:px-10
                       py-6 sm:py-7 md:py-8
                       flex items-start gap-4 sm:gap-5"
            style={{ background: "#F4F7FA", border: "1px solid #E2E8F0", borderRadius: "4px" }}
          >
            <div
              className="w-1 shrink-0 rounded-full self-stretch"
              style={{ background: "linear-gradient(to bottom, #0B6B82, #2CBF68)" }}
            />
            <div>
              <p
                className="font-display font-semibold text-[#0C0E12] leading-snug"
                style={{ fontSize: "clamp(1rem, 1.6vw, 1.2rem)", letterSpacing: "-0.01em" }}
              >
                "The campus is where theory becomes practice. Where the next generation
                of African technologists will learn, build, and launch the solutions
                the continent needs."
              </p>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[#94A3B8] mt-3">
                MexyGabriel — Founder, MG<AnimatedX />
              </p>
            </div>
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
