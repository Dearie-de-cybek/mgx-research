"use client";

import { useRef, useLayoutEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/* ── SERVICE DATA ─────────────────────────────────────────────────── */
const services = [
  {
    number: "01",
    title: "Intelligence Systems",
    sub: "AI · ML · Data Analytics · SaaS",
    desc: "Turning raw data into competitive intelligence. We design, train and deploy AI models that learn from your environment and adapt to your operations.",
    img: "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=900",
    color: "#3B9FE8",
  },
  {
    number: "02",
    title: "Security & Resilience",
    sub: "Cybersecurity · Managed IT · Threat Intel",
    desc: "Proactive defence across your entire digital surface. From zero-trust architecture to real-time threat monitoring — we keep you ahead of the threat.",
    img: "https://images.pexels.com/photos/5380660/pexels-photo-5380660.jpeg?auto=compress&cs=tinysrgb&w=900",
    color: "#E84B3B",
  },
  {
    number: "03",
    title: "Automation & Robotics",
    sub: "RPA · Robotics · Process Intelligence",
    desc: "Eliminate repetitive work at scale. We build intelligent automation pipelines that free your teams to focus on what only humans can do.",
    img: "https://images.pexels.com/photos/3913025/pexels-photo-3913025.jpeg?auto=compress&cs=tinysrgb&w=900",
    color: "#F5A623",
  },
  {
    number: "04",
    title: "Digital Infrastructure",
    sub: "Cloud · Enterprise · Custom Software",
    desc: "The foundation everything runs on. We architect cloud environments, enterprise platforms and custom software built for reliability at scale.",
    img: "https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg?auto=compress&cs=tinysrgb&w=900",
    color: "#3DBE6E",
  },
  {
    number: "05",
    title: "Governance & Smart Systems",
    sub: "E-Governance · Smart Cities · Urban Tech",
    desc: "Technology that serves the public good. From e-governance portals to smart city infrastructure — we build platforms that work for institutions and citizens alike.",
    img: "https://images.pexels.com/photos/3769138/pexels-photo-3769138.jpeg?auto=compress&cs=tinysrgb&w=900",
    color: "#9B59B6",
  },
  {
    number: "06",
    title: "Human-Centered Innovation",
    sub: "HealthTech · EdTech · UX Design",
    desc: "Innovation with the human in the room. We build health, education and service platforms designed first for the people who use them.",
    img: "https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=900",
    color: "#EBFFB3",
  },
];

/* ── CARD ─────────────────────────────────────────────────────────── */
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[0];
  index: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* 3D tilt on mouse move */
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(cardRef.current, {
      rotateX: -y * 10,
      rotateY: x * 10,
      transformPerspective: 900,
      duration: 0.35,
      ease: "power2.out",
    });
    gsap.to(imgRef.current, {
      scale: 1.07,
      duration: 0.6,
      ease: "power2.out",
    });
  };

  const handleMouseLeave = () => {
    gsap.to(cardRef.current, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
    });
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: "power2.out",
    });
  };

  return (
    <div
      ref={cardRef}
      className="service-card relative overflow-hidden rounded-2xl cursor-pointer"
      style={{
        height: "420px",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Image layer */}
      <div ref={imgRef} className="parallax-img absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src={service.img}
          alt={service.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Dark overlay */}
      <div
        ref={overlayRef}
        className="absolute inset-0 transition-all duration-300"
        style={{
          background:
            "linear-gradient(to bottom, rgba(4,7,15,0.2) 0%, rgba(4,7,15,0.45) 50%, rgba(4,7,15,0.9) 100%)",
        }}
      />

      {/* Number top-left */}
      <div className="absolute top-6 left-6 z-10">
        <span
          className="font-display font-black leading-none"
          style={{
            fontSize: "3rem",
            color: service.color,
            opacity: 0.9,
            letterSpacing: "-0.05em",
            textShadow: `0 0 40px ${service.color}66`,
          }}
        >
          {service.number}
        </span>
      </div>

      {/* Content bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-6 z-10 flex flex-col gap-3">

        {/* Slanted sub-label badge */}
        <div style={{ display: "inline-block", transform: "skewX(-10deg)", width: "fit-content" }}>
          <span
            className="font-mono text-[10px] uppercase font-semibold"
            style={{
              display: "inline-block",
              transform: "skewX(10deg)",
              letterSpacing: "0.18em",
              color: service.color,
              background: `${service.color}22`,
              border: `1px solid ${service.color}44`,
              padding: "3px 10px",
            }}
          >
            {service.sub}
          </span>
        </div>

        <h3
          className="font-display font-black text-white leading-tight"
          style={{ fontSize: "clamp(1.4rem, 2vw, 1.8rem)", letterSpacing: "-0.03em" }}
        >
          {service.title}
        </h3>

        <p
          className="card-desc text-[13px] leading-relaxed"
          style={{ color: "rgba(255,255,255,0.7)", maxWidth: "36ch" }}
        >
          {service.desc}
        </p>

        {/* Learn More button */}
        <div className="card-arrow mt-1">
          <button
            className="flex items-center gap-2 px-4 py-2 rounded-md text-[12px] font-semibold font-mono uppercase tracking-[0.12em] transition-all duration-200 hover:brightness-110 active:scale-[0.97]"
            style={{
              color: "#0a0a0a",
              background: service.color,
              letterSpacing: "0.12em",
            }}
          >
            Learn More
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path d="M2 6h8M6 2l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── MAIN SECTION ─────────────────────────────────────────────────── */
export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      /* ── 1. Section headline word reveal ── */
      if (titleRef.current) {
        const words = titleRef.current.querySelectorAll(".word");
        gsap.fromTo(
          words,
          { y: 80, opacity: 0, rotateX: -40 },
          {
            y: 0,
            opacity: 1,
            rotateX: 0,
            stagger: 0.08,
            duration: 0.9,
            ease: "power4.out",
            scrollTrigger: {
              trigger: titleRef.current,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      }

      /* ── 2. Decorative line expand ── */
      if (lineRef.current) {
        gsap.fromTo(
          lineRef.current,
          { scaleX: 0, transformOrigin: "left" },
          {
            scaleX: 1,
            duration: 1.2,
            ease: "power3.inOut",
            scrollTrigger: {
              trigger: lineRef.current,
              start: "top 88%",
            },
          }
        );
      }

      /* ── 3. Cards: clip-path wipe from below ── */
      const cards = gsap.utils.toArray<HTMLElement>(".service-card");
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          {
            clipPath: "inset(100% 0% 0% 0%)",
            y: 40,
          },
          {
            clipPath: "inset(0% 0% 0% 0%)",
            y: 0,
            duration: 1.1,
            ease: "power4.out",
            delay: (i % 3) * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      /* ── 4. Image parallax on each card ── */
      gsap.utils.toArray<HTMLElement>(".parallax-img").forEach((img) => {
        gsap.fromTo(
          img,
          { yPercent: -8 },
          {
            yPercent: 8,
            ease: "none",
            scrollTrigger: {
              trigger: img.closest(".service-card"),
              start: "top bottom",
              end: "bottom top",
              scrub: 1.5,
            },
          }
        );
      });

      /* ── 5. Sub label + number pop on scroll ── */
      const subLabels = gsap.utils.toArray<HTMLElement>(".service-card .font-mono");
      gsap.fromTo(
        subLabels,
        { opacity: 0, x: -20 },
        {
          opacity: 0.85,
          x: 0,
          stagger: 0.06,
          duration: 0.6,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="w-full px-6 py-24"
      style={{ background: "oklch(97% 0.006 80)" }}
    >
      <div className="max-w-[1320px] mx-auto">

        {/* ── HEADER ── */}
        <div className="flex items-end justify-between mb-14 gap-8">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400 mb-4">
              What We Build
            </p>

            {/* Word-split title */}
            <div
              ref={titleRef}
              className="font-display font-black text-stone-900 leading-none overflow-hidden"
              style={{
                fontSize: "clamp(2.8rem, 5vw, 5.5rem)",
                letterSpacing: "-0.04em",
                perspective: "600px",
              }}
            >
              {["Our", "Six", "Pillars"].map((word) => (
                <span
                  key={word}
                  className="word inline-block mr-[0.2em]"
                  style={{ display: "inline-block" }}
                >
                  {word}
                </span>
              ))}
            </div>

            {/* Expanding line */}
            <div
              ref={lineRef}
              className="mt-5 h-px"
              style={{
                width: "280px",
                background:
                  "linear-gradient(to right, #3B9FE8, #3DBE6E)",
              }}
            />
          </div>

          <p
            className="text-stone-500 text-[15px] leading-relaxed hidden md:block"
            style={{ maxWidth: "34ch" }}
          >
            Six technology domains. One integrated partner. Every pillar backed by research and deployed with precision.
          </p>
        </div>

        {/* ── GRID ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <ServiceCard key={s.number} service={s} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
