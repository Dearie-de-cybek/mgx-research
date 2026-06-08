"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const services = [
  {
    n: "01",
    title: "Intelligence Systems",
    tags: ["AI & ML", "Analytics"],
    desc: "Custom AI models and analytics pipelines that adapt to real operational data — not vendor assumptions.",
    img: "https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#0B6B82",
    gradient: "from-[#0B6B82]/18 via-[#0B6B82]/5 to-[#2CBF68]/8",
    border: "border-[#0B6B82]/35",
    shadow: "shadow-[0_20px_50px_rgba(11,107,130,0.06)]",
  },
  {
    n: "02",
    title: "Security & Resilience",
    tags: ["Zero-Trust", "Threat Intel"],
    desc: "Zero-trust architecture, 24/7 monitoring, and incident response for high-risk environments.",
    img: "https://images.pexels.com/photos/323311/pexels-photo-323311.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#2CBF68",
    gradient: "from-[#2CBF68]/18 via-[#2CBF68]/5 to-[#3B9FE8]/8",
    border: "border-[#2CBF68]/35",
    shadow: "shadow-[0_20px_50px_rgba(44,191,104,0.06)]",
  },
  {
    n: "03",
    title: "Automation & Robotics",
    tags: ["RPA", "Control Logic"],
    desc: "Eliminate repeatable work. From front-office workflows to factory floor robotics.",
    img: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#3B9FE8",
    gradient: "from-[#3B9FE8]/18 via-[#3B9FE8]/5 to-[#0B6B82]/8",
    border: "border-[#3B9FE8]/35",
    shadow: "shadow-[0_20px_50px_rgba(59,159,232,0.06)]",
  },
  {
    n: "04",
    title: "Digital Infrastructure",
    tags: ["Cloud", "APIs & Apps"],
    desc: "Cloud environments and custom enterprise platforms built for reliability at scale — no vendor lock-in.",
    img: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#0E90A8",
    gradient: "from-[#0E90A8]/18 via-[#0E90A8]/5 to-[#2CBF68]/8",
    border: "border-[#0E90A8]/35",
    shadow: "shadow-[0_20px_50px_rgba(14,144,168,0.06)]",
  },
  {
    n: "05",
    title: "Governance Systems",
    tags: ["E-Gov", "Smart Cities"],
    desc: "Citizen portals and smart infrastructure designed first for the people who use them daily.",
    img: "https://images.pexels.com/photos/3183158/pexels-photo-3183158.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#0B6B82",
    gradient: "from-[#0B6B82]/18 via-[#0B6B82]/5 to-[#3B9FE8]/8",
    border: "border-[#0B6B82]/35",
    shadow: "shadow-[0_20px_50px_rgba(11,107,130,0.06)]",
  },
  {
    n: "06",
    title: "Human Innovation",
    tags: ["Health & EdTech", "UX Design"],
    desc: "Health, education, and service platforms designed for real constraints and real communities.",
    img: "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600",
    color: "#2CBF68",
    gradient: "from-[#2CBF68]/18 via-[#2CBF68]/5 to-[#0E90A8]/8",
    border: "border-[#2CBF68]/35",
    shadow: "shadow-[0_20px_50px_rgba(44,191,104,0.06)]",
  },
];

export default function ServicesSection() {
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
  });

  // Scroll mapping for desktop (horizontal slide of cards)
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-70%"]);

  return (
    <section
      ref={targetRef}
      id="services"
      className="relative w-full bg-[#F8FAFC] md:h-[300vh]"
      style={{ borderTop: "1px solid #E2E8F0" }}
    >
      {/* Viewport container pinned during vertical scroll */}
      <div className="md:sticky md:top-0 md:h-screen flex flex-col justify-center overflow-hidden py-16 sm:py-20 md:py-0">
        <div className="max-w-[1280px] mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-20 mb-8 md:mb-12 shrink-0">
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#94A3B8] mb-4">
            Capabilities
          </p>
          <h2 className="font-display font-black text-[#0C0E12] uppercase tracking-tighter leading-none select-none text-[clamp(3rem,8vw,6.5rem)]">
            Services
          </h2>
        </div>

        {/* Desktop horizontal track */}
        <div className="hidden md:block w-full">
          <motion.div
            style={{ x }}
            className="flex gap-8 pl-[35vw] pr-12 lg:pr-20"
          >
            {services.map((s) => (
              <div
                key={s.n}
                className={`group w-[440px] lg:w-[480px] shrink-0 bg-gradient-to-br ${s.gradient} backdrop-blur-md border ${s.border} rounded-3xl flex flex-col h-[460px] lg:h-[500px] ${s.shadow} overflow-hidden transition-all duration-500 hover:-translate-y-2 cursor-pointer`}
              >
                {/* Top card layout: full-bleed image container */}
                <div className="relative w-full h-[200px] lg:h-[230px] overflow-hidden shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={s.img}
                    alt={s.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                  
                  {/* Floating Tags and Arrow on image */}
                  <div className="absolute top-5 left-5 flex gap-2">
                    {s.tags.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[9px] uppercase tracking-[0.12em] px-3 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-white/85 shadow-sm"
                        style={{ color: s.color }}
                      >
                        {t}
                      </span>
                    ))}
                  </div>

                  <div
                    className="absolute top-5 right-5 w-11 h-11 rounded-full bg-white/95 backdrop-blur-sm border border-white/85 flex items-center justify-center shadow-md transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                    style={{ color: s.color }}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="7" y1="17" x2="17" y2="7"></line>
                      <polyline points="7 7 17 7 17 17"></polyline>
                    </svg>
                  </div>
                </div>

                {/* Divider border */}
                <div className={`w-full h-[1px] border-b ${s.border} opacity-80`} />

                {/* Bottom card content */}
                <div className="p-7 lg:p-8 relative flex-1 flex flex-col justify-start overflow-hidden">
                  {/* Huge background watermark number */}
                  <span
                    className="absolute bottom-2 right-6 font-display font-black leading-none select-none pointer-events-none text-[8.5rem] lg:text-[10rem] tracking-tighter"
                    style={{ color: s.color, opacity: 0.09 }}
                  >
                    {s.n}
                  </span>

                  <div className="relative z-10 flex flex-col gap-2">
                    <h3 className="font-display font-bold text-[#0C0E12] text-xl lg:text-2xl tracking-tight">
                      {s.title}
                    </h3>
                    <p className="text-sm lg:text-base leading-[1.6] text-[#566070] max-w-[92%]">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Mobile touch scroll track (fallback) */}
        <div className="md:hidden w-full overflow-x-auto scrollbar-none px-5 sm:px-8 flex gap-6 snap-x snap-mandatory pb-6">
          {services.map((s) => (
            <div
              key={s.n}
              className={`group w-[290px] sm:w-[320px] shrink-0 snap-start bg-gradient-to-br ${s.gradient} border ${s.border} rounded-3xl flex flex-col h-[380px] ${s.shadow} overflow-hidden`}
            >
              {/* Full-bleed image top */}
              <div className="relative w-full h-[160px] overflow-hidden shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={s.img}
                  alt={s.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                
                {/* Overlaid tags & arrow */}
                <div className="absolute top-4 left-4 flex gap-1.5">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="font-mono text-[8.5px] uppercase tracking-[0.1em] px-2.5 py-1 bg-white/95 backdrop-blur-sm rounded-full border border-white/85 shadow-sm"
                      style={{ color: s.color }}
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/95 backdrop-blur-sm border border-white/85 flex items-center justify-center shadow-md"
                  style={{ color: s.color }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                  </svg>
                </div>
              </div>

              {/* Divider border */}
              <div className={`w-full h-[1px] border-b ${s.border} opacity-80`} />

              {/* Mobile text content */}
              <div className="p-5 relative flex-1 flex flex-col justify-start overflow-hidden">
                <span
                  className="absolute bottom-2 right-4 font-display font-black leading-none select-none pointer-events-none text-[6.5rem] tracking-tighter"
                  style={{ color: s.color, opacity: 0.09 }}
                >
                  {s.n}
                </span>

                <div className="relative z-10 flex flex-col gap-1.5">
                  <h3 className="font-display font-bold text-[#0C0E12] text-lg tracking-tight">
                    {s.title}
                  </h3>
                  <p className="text-xs sm:text-sm leading-[1.5] text-[#566070] max-w-[90%]">
                    {s.desc}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
