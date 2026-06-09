"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const FEATS = [
  { lbl: "01 · Labs",  name: "Research Labs",     sub: "Dedicated labs for AI, robotics and emerging technology." },
  { lbl: "02 · Hub",   name: "Innovation Hub",     sub: "Workspaces for startups, founders and enterprise teams." },
  { lbl: "03 · Demo",  name: "Demo & Showcase",    sub: "Live demonstration environments for MGX products." },
  { lbl: "04 · Learn", name: "Learning Centre",    sub: "Training, workshops and continuing-education programmes." },
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
      transition={{ duration: 0.7, ease, delay }}
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
      style={{
        background: "#061f33",
        color: "#fff",
        padding: "clamp(80px, 10vw, 140px) 0",
        borderTop: "1px solid rgba(255,255,255,0.10)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Ambient gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            radial-gradient(700px 500px at 20% 30%, rgba(63,169,217,0.16), transparent 60%),
            radial-gradient(700px 500px at 90% 80%, rgba(78,208,116,0.10), transparent 55%)
          `,
        }}
      />

      <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_1fr] gap-12 lg:gap-16 items-stretch">
          {/* Left column */}
          <div className="flex flex-col">
            <FadeUp>
              <div className="flex items-center gap-2.5 mb-5">
                <span className="w-7 h-[1px]" style={{ background: "#5dd673" }} />
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.24em]"
                  style={{ color: "#5dd673" }}
                >
                  MGX Campus · Enugu, NG
                </span>
              </div>
            </FadeUp>

            <FadeUp delay={0.08}>
              <h2
                className="font-display mt-5"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(40px, 5.5vw, 84px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                }}
              >
                A place built for{" "}
                <span
                  className="font-serif italic"
                  style={{ color: "#5dd673", fontWeight: 400 }}
                >
                  builders
                </span>
                .
              </h2>
            </FadeUp>

            <FadeUp delay={0.14}>
              <p
                className="mt-7 text-base sm:text-lg leading-[1.65]"
                style={{ color: "rgba(255,255,255,0.75)", maxWidth: "48ch" }}
              >
                A physical innovation hub coming to Enugu, bringing researchers,
                engineers, founders and institutions under one roof. West Africa's
                most advanced campus for technology research and entrepreneurship.
              </p>
            </FadeUp>

            {/* Feature grid */}
            <FadeUp delay={0.2} className="mt-10">
              <div
                className="grid grid-cols-2 gap-[1px]"
                style={{
                  background: "rgba(255,255,255,0.10)",
                  border: "1px solid rgba(255,255,255,0.10)",
                }}
              >
                {FEATS.map((f) => (
                  <div
                    key={f.name}
                    className="px-5 py-5 sm:px-6 sm:py-6"
                    style={{ background: "#061f33" }}
                  >
                    <div
                      className="font-mono text-[11px] uppercase tracking-[0.2em] mb-2"
                      style={{ color: "#5dd673" }}
                    >
                      {f.lbl}
                    </div>
                    <div
                      className="font-display text-base font-semibold leading-tight"
                      style={{ letterSpacing: "-0.01em" }}
                    >
                      {f.name}
                    </div>
                    <div
                      className="text-sm leading-[1.55] mt-1.5"
                      style={{ color: "rgba(255,255,255,0.62)" }}
                    >
                      {f.sub}
                    </div>
                  </div>
                ))}
              </div>
            </FadeUp>

            {/* CTAs */}
            <FadeUp delay={0.26} className="mt-8 flex gap-4 flex-wrap">
              <a
                href="#contact"
                className="px-6 py-3 text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ background: "#5dd673", color: "#061f33" }}
              >
                Partner with Campus
              </a>
              <a
                href="#contact"
                className="px-6 py-3 text-sm font-semibold transition-all hover:underline underline-offset-4"
                style={{ color: "rgba(255,255,255,0.75)" }}
              >
                Learn more →
              </a>
            </FadeUp>
          </div>

          {/* Right column: campus image with corner brackets */}
          <FadeUp delay={0.16} className="relative min-h-[420px] lg:min-h-[520px]">
            <div
              className="absolute inset-0 overflow-hidden"
              style={{ border: "1px solid rgba(255,255,255,0.12)" }}
            >
              {/* Corner brackets */}
              {(["tl", "tr", "bl", "br"] as const).map((pos) => (
                <span
                  key={pos}
                  className="absolute z-10"
                  style={{
                    width: "28px",
                    height: "28px",
                    border: "1px solid #5dd673",
                    top:    pos.startsWith("t") ? "-1px" : undefined,
                    bottom: pos.startsWith("b") ? "-1px" : undefined,
                    left:   pos.endsWith("l")   ? "-1px" : undefined,
                    right:  pos.endsWith("r")   ? "-1px" : undefined,
                    borderRight:  pos.endsWith("l")   ? 0 : undefined,
                    borderLeft:   pos.endsWith("r")   ? 0 : undefined,
                    borderBottom: pos.startsWith("t") ? 0 : undefined,
                    borderTop:    pos.startsWith("b") ? 0 : undefined,
                  }}
                />
              ))}

              {/* Photo */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="MGX Campus, Enugu Nigeria"
                style={{
                  position: "absolute",
                  inset: 0,
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  filter: "saturate(0.7) contrast(1.05)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "linear-gradient(160deg, rgba(6,31,51,0.45) 0%, rgba(6,31,51,0.85) 100%)",
                }}
              />

              {/* Overlay text */}
              <div
                className="absolute inset-0 z-[2] flex flex-col justify-between p-7"
                style={{ pointerEvents: "none" }}
              >
                <div
                  className="font-mono text-[11px] uppercase tracking-[0.2em] flex justify-between"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  <span>06° 27' N</span>
                  <span>07° 30' E · Enugu</span>
                </div>

                <div
                  className="self-center font-mono text-[11px] uppercase tracking-[0.18em] text-center px-4 py-3"
                  style={{
                    color: "#fff",
                    border: "1px dashed rgba(255,255,255,0.4)",
                    background: "rgba(6,31,51,0.4)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  MGX Campus · Enugu, Nigeria
                </div>

                <div
                  className="font-mono text-[11px] uppercase tracking-[0.2em]"
                  style={{ color: "rgba(255,255,255,0.62)" }}
                >
                  Status · Under development 2026
                </div>
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}
