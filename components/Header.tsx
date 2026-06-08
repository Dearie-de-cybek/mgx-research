"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

const NAV = [
  { label: "Research", href: "#research" },
  { label: "Services", href: "#services" },
  { label: "Products", href: "#products" },
  { label: "Campus", href: "#campus" },
];

const ease = [0.23, 1, 0.32, 1] as const;

/* ── Static MGX logo (nav + footer) ─────────────────────────────── */
function MGXLogo({ size = 22 }: { size?: number }) {
  return (
    <span
      className="font-display font-black select-none"
      style={{ fontSize: `${size}px`, letterSpacing: "0.08em", color: "#0C0E12" }}
    >
      MG
      <span
        style={{
          background: "linear-gradient(135deg, #3B9FE8 20%, #2CBF68 100%)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        X
      </span>
    </span>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  /* Smooth scroll progress with spring damping → no jitter */
  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, {
    stiffness: 120,
    damping: 24,
    mass: 0.3,
  });

  /* Tight range 0 → 180px. Only cheap GPU-friendly props. */
  const RANGE: [number, number] = [0, 180];

  const navBg = useTransform(
    smoothY,
    RANGE,
    ["rgba(255,255,255,0.0)", "rgba(255,255,255,0.92)"]
  );
  const navBorder = useTransform(
    smoothY,
    RANGE,
    ["rgba(226,232,240,0)", "rgba(226,232,240,1)"]
  );
  const navShadow = useTransform(
    smoothY,
    RANGE,
    ["0 0 0 rgba(0,0,0,0)", "0 1px 24px rgba(11,107,130,0.06)"]
  );

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  return (
    <>
      {/* ── Desktop nav — fixed geometry, only bg/border/shadow morph ── */}
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 hidden md:block"
        style={{
          background: navBg,
          borderBottom: "1px solid transparent",
          borderBottomColor: navBorder,
          boxShadow: navShadow,
          backdropFilter: "blur(20px) saturate(160%)",
          WebkitBackdropFilter: "blur(20px) saturate(160%)",
          willChange: "background-color, border-color, box-shadow",
        }}
        initial={{ y: -32, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease }}
      >
        <div
          className="mx-auto flex items-center justify-between
                     gap-6 lg:gap-12
                     px-6 md:px-8 lg:px-10
                     py-4"
          style={{ maxWidth: "1280px" }}
        >
          <a href="/" className="shrink-0 hover:opacity-75 transition-opacity">
            <MGXLogo size={22} />
          </a>

          <nav className="flex items-center gap-0.5 lg:gap-1 flex-1 justify-center">
            {NAV.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3 lg:px-5 py-2
                           text-base font-medium
                           rounded-md transition-colors duration-200 hover:text-[#0C0E12]"
                style={{ color: "#566070" }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <a
            href="#contact"
            className="shrink-0 px-4 lg:px-5 py-2.5
                       text-sm lg:text-base font-semibold text-white
                       rounded-md transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: "#0B6B82" }}
          >
            Book a Call
          </a>
        </div>
      </motion.header>

      {/* ── Mobile bar — same morph mechanics, larger tap targets ─── */}
      <motion.div
        className="md:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 py-4"
        style={{
          background: navBg,
          borderBottom: "1px solid transparent",
          borderBottomColor: navBorder,
          boxShadow: navShadow,
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          willChange: "background-color, border-color, box-shadow",
        }}
      >
        <a
          href="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center min-h-[44px]"
        >
          <MGXLogo size={20} />
        </a>
        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Open menu"
          className="flex flex-col gap-1.5 p-3 -mr-3"
          style={{ minWidth: "44px", minHeight: "44px", alignItems: "flex-end", justifyContent: "center" }}
        >
          <span className="block h-[1.5px] w-5" style={{ background: "#0C0E12" }} />
          <span className="block h-[1.5px] w-3" style={{ background: "#0C0E12" }} />
        </button>
      </motion.div>

      {/* ── Mobile: fullscreen menu ────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease }}
            className="md:hidden fixed inset-0 z-40 flex flex-col bg-white"
          >
            <div
              className="flex items-center justify-between px-6 pt-7 pb-6"
              style={{ borderBottom: "1px solid #E2E8F0" }}
            >
              <MGXLogo size={22} />
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center text-[#566070] text-2xl leading-none hover:text-[#0C0E12] transition-colors"
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
                  className="flex items-center justify-between py-5 text-[#0C0E12] font-medium text-2xl hover:text-[#0B6B82] transition-colors"
                  style={{ borderBottom: "1px solid #E2E8F0" }}
                >
                  {link.label}
                  <span className="text-lg text-[#E2E8F0]">→</span>
                </motion.a>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.35 }}
              className="px-6 pb-10 pt-6"
              style={{ borderTop: "1px solid #E2E8F0" }}
            >
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#94A3B8] mb-3">
                Enugu, Nigeria · www.mgx.africa
              </p>
              <a
                href="#contact"
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center w-full py-4 text-base font-semibold text-white rounded-md hover:opacity-90 transition-opacity"
                style={{ background: "#0B6B82" }}
              >
                Book a Call
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
