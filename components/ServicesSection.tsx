"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── DATA ─────────────────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    title: "Intelligence Systems",
    sub: "AI · ML · Data Analytics · SaaS",
    desc: "We turn your raw data into decisions. Custom AI models, real-time analytics, and intelligent dashboards that adapt to how your business actually operates — not how a vendor imagines it should.",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1200",
    span: "wide" as const,
  },
  {
    number: "02",
    title: "Security & Resilience",
    sub: "Cybersecurity · Managed IT · Threat Intel",
    desc: "Proactive defence across your entire digital surface. Zero-trust architecture, 24/7 monitoring and incident response — so a breach stays a near-miss, not a headline.",
    img: "https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg?auto=compress&cs=tinysrgb&w=900",
    span: "normal" as const,
  },
  {
    number: "03",
    title: "Automation & Robotics",
    sub: "RPA · Robotics · Process Intelligence",
    desc: "Eliminate the work that shouldn't need a human. We design and deploy automation that scales — from front-office workflows to factory floor robotics.",
    img: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=900",
    span: "normal" as const,
  },
  {
    number: "04",
    title: "Digital Infrastructure",
    sub: "Cloud · Enterprise · Custom Software",
    desc: "The foundation everything runs on. We architect cloud environments, enterprise platforms and custom software built for reliability at scale — without locking you into a single vendor.",
    img: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=1200",
    span: "wide" as const,
  },
  {
    number: "05",
    title: "Governance & Smart Systems",
    sub: "E-Governance · Smart Cities · Urban Tech",
    desc: "Technology that serves the public good. From citizen portals to smart city infrastructure — systems designed first for the people who use them every day.",
    img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=900",
    span: "normal" as const,
  },
  {
    number: "06",
    title: "Human-Centered Innovation",
    sub: "HealthTech · EdTech · UX Design",
    desc: "Innovation with the human in the room. We build health, education and service platforms designed for real people, real constraints, and real communities.",
    img: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=900",
    span: "normal" as const,
  },
];

/* ── CARD ─────────────────────────────────────────────────────────── */
function ServiceCard({
  service,
}: {
  service: (typeof services)[0];
}) {
  const isWide = service.span === "wide";

  return (
    <motion.div
      className="service-card group relative overflow-hidden rounded-2xl"
      style={{
        gridColumn: isWide ? "span 2" : "span 1",
        height: isWide ? "360px" : "360px",
        background: "oklch(98.5% 0.005 78 / 0.85)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        border: "1px solid oklch(100% 0 0 / 0.7)",
        boxShadow:
          "0 2px 12px oklch(14% 0.012 260 / 0.05), inset 0 1px 0 oklch(100% 0 0 / 0.9)",
        cursor: "pointer",
      }}
      whileHover={{
        y: -6,
        scale: 1.015,
        boxShadow:
          "0 20px 60px oklch(14% 0.012 260 / 0.12), inset 0 1px 0 oklch(100% 0 0 / 0.9)",
        transition: { duration: 0.35, ease: [0.23, 1, 0.32, 1] },
      }}
    >
      {/* ── WIDE: side-by-side layout ── */}
      {isWide ? (
        <div className="flex h-full">
          {/* Text side */}
          <div className="flex flex-col justify-between p-8 flex-1 relative z-10">
            {/* Watermark number */}
            <span
              className="absolute top-4 right-4 font-display font-black select-none pointer-events-none"
              style={{
                fontSize: "7rem",
                lineHeight: 1,
                letterSpacing: "-0.06em",
                color: "oklch(14% 0.012 260 / 0.04)",
              }}
            >
              {service.number}
            </span>

            {/* Top */}
            <div className="flex flex-col gap-4">
              {/* Slanted tag */}
              <div style={{ display: "inline-block", transform: "skewX(-10deg)", width: "fit-content" }}>
                <span
                  className="font-mono text-[10px] uppercase font-semibold"
                  style={{
                    display: "inline-block",
                    transform: "skewX(10deg)",
                    letterSpacing: "0.18em",
                    color: "oklch(35% 0.01 260)",
                    background: "oklch(92% 0.01 70)",
                    border: "1px solid oklch(84% 0.01 70)",
                    padding: "3px 10px",
                  }}
                >
                  {service.sub}
                </span>
              </div>

              <h3
                className="font-display font-black text-stone-900 leading-tight"
                style={{ fontSize: "clamp(1.6rem, 2.5vw, 2.4rem)", letterSpacing: "-0.04em" }}
              >
                {service.title}
              </h3>

              <p className="text-[14px] leading-relaxed text-stone-500" style={{ maxWidth: "38ch" }}>
                {service.desc}
              </p>
            </div>

            {/* Bottom CTA */}
            <motion.button
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md text-[13px] font-semibold text-stone-900 w-fit"
              style={{ background: "#EBFFB3" }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore Service
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
          </div>

          {/* Image side */}
          <div className="w-[42%] relative overflow-hidden">
            <Image
              src={service.img}
              alt={service.title}
              fill
              sizes="400px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            {/* Fade edge */}
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to right, oklch(98.5% 0.005 78 / 0.9) 0%, transparent 35%)",
              }}
            />
          </div>
        </div>
      ) : (
        /* ── NORMAL: image bg + text overlay ── */
        <div className="relative h-full flex flex-col justify-between p-6">
          {/* Background image */}
          <div className="absolute inset-0">
            <Image
              src={service.img}
              alt={service.title}
              fill
              sizes="400px"
              className="object-cover transition-transform duration-700 group-hover:scale-[1.06]"
            />
            <div
              className="absolute inset-0"
              style={{
                background: "linear-gradient(to bottom, rgba(250,249,246,0.65) 0%, rgba(250,249,246,0.2) 30%, rgba(4,7,15,0.75) 100%)",
              }}
            />
          </div>

          {/* Watermark */}
          <span
            className="absolute top-3 right-4 font-display font-black select-none pointer-events-none z-10"
            style={{
              fontSize: "5rem",
              lineHeight: 1,
              letterSpacing: "-0.06em",
              color: "rgba(255,255,255,0.08)",
            }}
          >
            {service.number}
          </span>

          {/* Top badge */}
          <div className="relative z-10">
            <div style={{ display: "inline-block", transform: "skewX(-10deg)", width: "fit-content" }}>
              <span
                className="font-mono text-[10px] uppercase font-semibold"
                style={{
                  display: "inline-block",
                  transform: "skewX(10deg)",
                  letterSpacing: "0.18em",
                  color: "oklch(20% 0.01 260)",
                  background: "rgba(255,255,255,0.75)",
                  border: "1px solid rgba(255,255,255,0.5)",
                  backdropFilter: "blur(8px)",
                  padding: "3px 10px",
                }}
              >
                {service.sub}
              </span>
            </div>
          </div>

          {/* Bottom content */}
          <div className="relative z-10 flex flex-col gap-2">
            <h3
              className="font-display font-black text-white leading-tight"
              style={{ fontSize: "clamp(1.4rem, 2vw, 1.9rem)", letterSpacing: "-0.04em" }}
            >
              {service.title}
            </h3>
            <p className="text-[13px] leading-relaxed" style={{ color: "rgba(255,255,255,0.75)", maxWidth: "30ch" }}>
              {service.desc}
            </p>
            <motion.button
              className="inline-flex items-center gap-2 px-4 py-2 rounded-md text-[12px] font-semibold text-stone-900 mt-1 w-fit"
              style={{ background: "#EBFFB3" }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              Explore →
            </motion.button>
          </div>
        </div>
      )}
    </motion.div>
  );
}

/* ── MAIN ─────────────────────────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef   = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* Word reveal on headline */
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current.querySelectorAll(".word"),
          { y: 70, opacity: 0, rotateX: -35 },
          {
            y: 0, opacity: 1, rotateX: 0,
            stagger: 0.09, duration: 0.85, ease: "power4.out",
            scrollTrigger: { trigger: titleRef.current, start: "top 85%" },
          }
        );
      }

      /* Cards clip-path wipe */
      gsap.utils.toArray<HTMLElement>(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { clipPath: "inset(100% 0% 0% 0%)", y: 30 },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.0,
            ease: "power4.out",
            delay: (i % 3) * 0.1,
            scrollTrigger: { trigger: card, start: "top 90%", toggleActions: "play none none none" },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full py-24 px-8"
      style={{ background: "oklch(96.5% 0.007 78)" }}
    >
      <div className="max-w-[1320px] mx-auto flex flex-col gap-14">

        {/* Header */}
        <div className="flex items-end justify-between gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-4">
              Our Services
            </p>
            <div
              ref={titleRef}
              className="font-display font-black text-stone-900 leading-none"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                letterSpacing: "-0.04em",
                perspective: "600px",
              }}
            >
              {["What", "We", "Do"].map((word) => (
                <span
                  key={word}
                  className="word inline-block mr-[0.2em]"
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Expanding gradient line */}
            <div
              className="mt-5 h-px"
              style={{
                width: "220px",
                background: "linear-gradient(to right, oklch(14% 0.012 260), oklch(88% 0.008 80))",
              }}
            />
          </div>

          <p
            className="text-stone-500 text-[15px] leading-relaxed hidden md:block"
            style={{ maxWidth: "36ch" }}
          >
            Six interconnected domains. Each one a discipline in its own right. All of them available through a single trusted partner.
          </p>
        </div>

        {/* Bento grid */}
        <div
          className="grid gap-4"
          style={{ gridTemplateColumns: "1fr 1fr 1fr" }}
        >
          {services.map((s) => (
            <ServiceCard key={s.number} service={s} />
          ))}
        </div>

      </div>
    </section>
  );
}
