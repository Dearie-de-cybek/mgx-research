"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const NAV = [
  { label: "Focus",   href: "#focus"   },
  { label: "Pillars", href: "#pillars" },
  { label: "Campus",  href: "#campus"  },
  { label: "Contact", href: "#contact" },
];

/* ── Two-blade MGX logomark ─────────────────────────────────────── */
function MGXLogo({ size = 22 }: { size?: number }) {
  return (
    <span
      className="font-display font-bold select-none"
      style={{ fontSize: `${size}px`, letterSpacing: "-0.02em", color: "#fff" }}
    >
      MG
      <span
        style={{
          display: "inline-block",
          width: "0.68em",
          height: "0.68em",
          marginLeft: "1px",
          verticalAlign: "baseline",
          position: "relative",
          top: "0.04em",
        }}
      >
        <svg
          viewBox="0 0 32 32"
          style={{ width: "100%", height: "100%", display: "block" }}
          aria-hidden
        >
          <path d="M4 4 L14 4 L20 14 L14 28 L4 28 L11 16 Z" fill="#3fa9d9" />
          <path d="M28 4 L18 4 L12 14 L18 28 L28 28 L21 16 Z" fill="#5dd673" />
        </svg>
      </span>
    </span>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 120, damping: 24, mass: 0.3 });

  const RANGE: [number, number] = [0, 80];
  const navBg = useTransform(smoothY, RANGE, [
    "rgba(6,31,51,0.0)",
    "rgba(6,31,51,0.88)",
  ]);
  const navBorderOpacity = useTransform(smoothY, RANGE, [0, 1]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* Desktop nav */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 hidden md:block glass-nav"
        style={{
          background: navBg,
          borderBottom: "1px solid rgba(255,255,255,0.10)",
          borderBottomColor: navBorderOpacity.get() > 0.1
            ? "rgba(255,255,255,0.10)"
            : "transparent",
          willChange: "background",
        }}
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className="mx-auto flex items-center justify-between gap-8 lg:gap-12 px-8 lg:px-10 py-5"
          style={{ maxWidth: "1320px" }}
        >
          <a href="/" className="shrink-0 hover:opacity-75 transition-opacity">
            <MGXLogo size={22} />
          </a>

          <nav className="flex items-center gap-8 lg:gap-10 flex-1 justify-center">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm transition-colors duration-200 hover:text-white"
                style={{ color: "rgba(255,255,255,0.62)", letterSpacing: "0.02em" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="shrink-0 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                       text-sm font-semibold transition-all duration-200
                       hover:-translate-y-0.5 active:scale-[0.97]"
            style={{ background: "#5dd673", color: "#061f33" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow =
                "0 10px 30px -10px rgba(78,208,116,0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.boxShadow = "none";
            }}
          >
            Start a project
            <svg width="12" height="12" viewBox="0 0 14 14" fill="none">
              <path
                d="M2.5 7h9M8 3.5L11.5 7 8 10.5"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
        </div>
      </motion.header>

      {/* Mobile bar */}
      <motion.div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4 glass-nav"
        style={{ background: navBg, borderBottom: "1px solid rgba(255,255,255,0.10)" }}
      >
        <a href="/" onClick={() => setMobileOpen(false)}>
          <MGXLogo size={20} />
        </a>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
          style={{ minWidth: "44px", minHeight: "44px", display: "flex", flexDirection: "column", alignItems: "flex-end", justifyContent: "center", gap: "6px", padding: "12px", marginRight: "-12px" }}
        >
          <span className="block h-[1.5px] w-5 bg-white" />
          <span className="block h-[1.5px] w-3 bg-white" />
        </button>
      </motion.div>

      {/* Mobile fullscreen menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease }}
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{ background: "#061f33" }}
          >
            <div
              className="flex items-center justify-between px-6 py-5"
              style={{ borderBottom: "1px solid rgba(255,255,255,0.10)" }}
            >
              <MGXLogo size={22} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center text-2xl leading-none transition-colors"
                style={{ color: "rgba(255,255,255,0.62)" }}
              >
                ×
              </button>
            </div>

            <nav className="flex flex-col flex-1 px-6 pt-4 overflow-y-auto">
              {NAV.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 + 0.04, duration: 0.35 }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-between py-5 text-2xl font-medium transition-colors hover:text-white"
                  style={{
                    borderBottom: "1px solid rgba(255,255,255,0.10)",
                    color: "rgba(255,255,255,0.75)",
                  }}
                >
                  {link.label}
                  <span style={{ color: "rgba(255,255,255,0.25)", fontSize: "18px" }}>→</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
              className="px-6 pb-10 pt-6"
              style={{ borderTop: "1px solid rgba(255,255,255,0.10)" }}
            >
              <p
                className="font-mono text-xs uppercase tracking-[0.2em] mb-3"
                style={{ color: "rgba(255,255,255,0.28)" }}
              >
                Enugu, Nigeria · Est. 2017
              </p>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 text-base font-semibold rounded-full hover:opacity-90 transition-opacity"
                style={{ background: "#5dd673", color: "#061f33" }}
              >
                Start a project
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
