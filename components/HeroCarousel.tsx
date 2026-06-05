"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export interface Slide {
  src: string;
  alt: string;
  eyebrow: string;
  headline: string;
  sub: string;
}

export const slides: Slide[] = [
  {
    src: "https://images.pexels.com/photos/5083210/pexels-photo-5083210.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Black tech professional",
    eyebrow: "AI & Machine Learning",
    headline: "From Insight\nto Impact",
    sub: "MexyGabriel (MGX) is a full-spectrum technology solutions company turning research-grade thinking into real-world systems. We build, deploy, and scale intelligent solutions across Africa and beyond from AI to automation, governance to cloud.",
  },
  {
    src: "https://images.pexels.com/photos/6285069/pexels-photo-6285069.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "Young African business team",
    eyebrow: "Infrastructure & Cloud",
    headline: "Built for\nthe Future",
    sub: "From enterprise cloud migrations to custom infrastructure design, we architect systems that are resilient by default. Our engineering teams deliver at speed  without cutting corners on security or scale.",
  },
  {
    src: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=90",
    alt: "Earth from space",
    eyebrow: "Global Impact",
    headline: "Africa to\nthe World",
    sub: "Rooted in Africa, reaching globally. MGX partners with startups, SMEs, and government institutions across 18+ countries  delivering technology that serves communities, drives policy, and powers the next generation of African innovation.",
  },
  {
    src: "https://images.pexels.com/photos/5448163/pexels-photo-5448163.jpeg?auto=compress&cs=tinysrgb&w=1920",
    alt: "African professional corporate",
    eyebrow: "Security & Resilience",
    headline: "Defend.\nBuild. Scale.",
    sub: "Threat intelligence, managed security, and identity protection  built for organisations that cannot afford to be wrong. Our cybersecurity division operates at enterprise grade for startups and governments alike.",
  },
];

const INTERVAL = 6500;

interface Props {
  index: number;
  onIndexChange: (i: number) => void;
  flash: boolean;
}

export default function HeroCarousel({ index, onIndexChange, flash }: Props) {
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Auto-advance */
  useEffect(() => {
    timerRef.current = setInterval(() => {
      onIndexChange((index + 1) % slides.length);
    }, INTERVAL);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [index, onIndexChange]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* ALL slides rendered in DOM — fixes Next.js Image not loading on first show */}
      {slides.map((slide, i) => (
        <motion.div
          key={i}
          className="absolute inset-0"
          animate={{ opacity: i === index ? 1 : 0 }}
          transition={{ duration: 1.0, ease: "easeInOut" }}
          style={{ zIndex: i === index ? 1 : 0 }}
        >
          {/* Ken Burns: active slide slowly zooms */}
          <motion.div
            className="absolute inset-0"
            animate={i === index ? { scale: 1.08 } : { scale: 1.0 }}
            transition={{
              duration: INTERVAL / 1000,
              ease: "linear",
            }}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={i <= 1}
              sizes="100vw"
              className="object-cover object-center"
            />
          </motion.div>
        </motion.div>
      ))}

      {/* Permanent dark overlay */}
      <div className="absolute inset-0 bg-black/52 z-10" />

      {/* Pixelated flash on slide change — digital scan effect */}
      <AnimatePresence>
        {flash && (
          <motion.div
            key="flash"
            className="absolute inset-0 z-20 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.65, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, times: [0, 0.3, 1] }}
            style={{
              background:
                "repeating-linear-gradient(0deg, rgba(0,0,0,0.6) 0px, rgba(0,0,0,0.6) 2px, transparent 2px, transparent 4px)",
            }}
          />
        )}
      </AnimatePresence>

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2.5 z-30">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => onIndexChange(i)}
            aria-label={`Slide ${i + 1}`}
          >
            <motion.div
              animate={{ width: i === index ? 28 : 6, opacity: i === index ? 1 : 0.35 }}
              transition={{ duration: 0.3 }}
              className="h-[3px] rounded-full bg-white"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
