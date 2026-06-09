"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const NAV = [
  { label: "Focus",   href: "#focus"   },
  { label: "Pillars", href: "#pillars" },
  { label: "Campus",  href: "#campus"  },
  { label: "Contact", href: "#contact" },
];

function MGXLogo() {
  return (
    <div className="flex items-baseline gap-[1px]">
      <span
        className="font-display font-bold select-none"
        style={{ fontSize: "22px", letterSpacing: "-0.02em", color: "#14110d" }}
      >
        MG
      </span>
      <svg
        viewBox="0 0 32 32"
        style={{ width: "0.7em", height: "0.7em", display: "inline-block", verticalAlign: "middle" }}
        aria-hidden
      >
        <path d="M4 4 L14 4 L20 14 L14 28 L4 28 L11 16 Z" fill="#3fa9d9" />
        <path d="M28 4 L18 4 L12 14 L18 28 L28 28 L21 16 Z" fill="#4ed074" />
      </svg>
    </div>
  );
}

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();
  const scrolled = useSpring(scrollY, { stiffness: 120, damping: 24 });
  const bgOpacity = useTransform(scrolled, [0, 60], [0, 0.82]);
  const borderOpacity = useTransform(scrolled, [0, 60], [0, 1]);

  useEffect(() => {
    if (menuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50"
        style={{ padding: "22px 28px", display: "flex", alignItems: "center", justifyContent: "space-between" }}
      >
        {/* Scrolled glass bg */}
        <motion.div
          className="absolute inset-0 pointer-events-none"
          style={{
            opacity: bgOpacity,
            background: "rgba(250,249,245,0.82)",
            backdropFilter: "blur(18px) saturate(140%)",
            WebkitBackdropFilter: "blur(18px) saturate(140%)",
            borderBottom: "1px solid rgba(20,17,13,0.10)",
          }}
        />

        <a href="/" className="relative z-10">
          <MGXLogo />
        </a>

        {/* Desktop nav */}
        <nav className="relative z-10 hidden md:flex items-center gap-8">
          {NAV.map((n) => (
            <a
              key={n.label}
              href={n.href}
              className="relative text-sm transition-colors duration-200 group"
              style={{ color: "#6b6760" }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "#14110d")}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#6b6760")}
            >
              {n.label}
              <span
                className="absolute left-0 right-0 -bottom-1 h-[2px] rounded-full scale-x-0 group-hover:scale-x-100 transition-transform duration-200 origin-left"
                style={{ background: "#4ed074" }}
              />
            </a>
          ))}
        </nav>

        <div className="relative z-10 flex items-center gap-4">
          <a
            href="#contact"
            className="hidden md:block text-sm font-medium px-[18px] py-[10px] rounded-full transition-all duration-200"
            style={{ background: "#14110d", color: "#faf9f5" }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "#1a6680"; (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "#14110d"; (e.currentTarget as HTMLElement).style.transform = "none"; }}
          >
            Start a project
          </a>

          {/* Mobile burger */}
          <button
            className="md:hidden flex flex-col gap-[5px] p-2"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="block h-[1.5px] rounded-full"
                style={{ background: "#14110d", width: i === 1 ? "18px" : "24px" }}
                animate={
                  menuOpen
                    ? i === 0 ? { rotate: 45, y: 6.5, width: "24px" }
                    : i === 1 ? { opacity: 0 }
                    : { rotate: -45, y: -6.5, width: "24px" }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                transition={{ duration: 0.28, ease }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 flex flex-col justify-center px-8"
            style={{ background: "#faf9f5" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease }}
          >
            <nav className="flex flex-col gap-6">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.label}
                  href={n.href}
                  className="font-display text-4xl font-semibold"
                  style={{ color: "#14110d", letterSpacing: "-0.03em" }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, ease, delay: 0.05 + i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                >
                  {n.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
