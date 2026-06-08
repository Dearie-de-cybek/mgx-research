"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring, useTransform } from "framer-motion";

const NAV = [
  { label: "Research", href: "#research" },
  { label: "Services", href: "#services", isDropdown: true },
  { label: "Products", href: "#products" },
  { label: "Campus", href: "#campus" },
];

const SERVICES_ITEMS = [
  { label: "AI", href: "#services" },
  { label: "Robotics", href: "#services" },
  { label: "Automation", href: "#services" },
  { label: "Cybersecurity", href: "#services" },
  { label: "Smart Systems", href: "#services" },
  { label: "Digital Transformation", href: "#services" },
];

const ECOSYSTEM_ITEMS = [
  { label: "Research", href: "#research" },
  { label: "Technology", href: "#research" },
  { label: "Innovation", href: "#research" },
  { label: "Entrepreneurship", href: "#research" },
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
  const [desktopDropdownOpen, setDesktopDropdownOpen] = useState(false);

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
                     py-4 relative"
          style={{ maxWidth: "1280px" }}
        >
          <a href="/" className="shrink-0 hover:opacity-75 transition-opacity">
            <MGXLogo size={22} />
          </a>

          <nav className="flex items-center gap-0.5 lg:gap-1 flex-1 justify-center">
            {NAV.map((link) => {
              if (link.isDropdown) {
                return (
                  <div
                    key={link.label}
                    className="py-2"
                    onMouseEnter={() => setDesktopDropdownOpen(true)}
                    onMouseLeave={() => setDesktopDropdownOpen(false)}
                  >
                    <button
                      className="px-3 lg:px-5 py-2 text-base font-medium transition-colors duration-200 hover:text-[#0C0E12] flex items-center gap-1.5 cursor-pointer relative"
                      style={{ color: desktopDropdownOpen ? "#0C0E12" : "#566070" }}
                    >
                      {link.label}
                      <svg
                        width="10"
                        height="6"
                        viewBox="0 0 10 6"
                        fill="none"
                        className={`transition-transform duration-300 ${desktopDropdownOpen ? "rotate-180" : ""}`}
                      >
                        <path
                          d="M1 1l4 4 4-4"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </button>

                    <AnimatePresence>
                      {desktopDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 12, scale: 0.99 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 8, scale: 0.99 }}
                          transition={{ duration: 0.25, ease }}
                          className="absolute left-6 right-6 top-[calc(100%-8px)] mt-2
                                     bg-white shadow-2xl rounded-lg border border-[#E2E8F0] p-8 z-50 overflow-hidden"
                          style={{
                            boxShadow: "0 25px 50px -12px rgba(12, 14, 18, 0.15)",
                          }}
                        >
                          <div className="grid grid-cols-12 gap-8 text-left">
                            {/* Column 1: Services (span 4) */}
                            <div className="col-span-4 flex flex-col pl-4">
                              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C0CDD8] mb-6">
                                Core Capabilities
                              </p>
                              <div className="flex flex-col gap-3.5">
                                {SERVICES_ITEMS.map((item) => (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-[15px] font-semibold text-[#0C0E12] hover:text-[#0B6B82] hover:underline underline-offset-4 transition-all"
                                    onClick={() => setDesktopDropdownOpen(false)}
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Column 2: Ecosystem Pillars (span 4) */}
                            <div className="col-span-4 flex flex-col pl-4">
                              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[#C0CDD8] mb-6">
                                Ecosystem Focus
                              </p>
                              <div className="flex flex-col gap-3.5">
                                {ECOSYSTEM_ITEMS.map((item) => (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    className="text-[15px] font-semibold text-[#0C0E12] hover:text-[#0B6B82] hover:underline underline-offset-4 transition-all"
                                    onClick={() => setDesktopDropdownOpen(false)}
                                  >
                                    {item.label}
                                  </a>
                                ))}
                              </div>
                            </div>

                            {/* Column 3 & 4: Featured promo cards (span 4) */}
                            <div className="col-span-4 grid grid-cols-2 gap-4">
                              {/* Card 1: Core Labs */}
                              <a
                                href="#services"
                                onClick={() => setDesktopDropdownOpen(false)}
                                className="group/card flex flex-col gap-3 cursor-pointer"
                              >
                                <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-[#E2E8F0] bg-[#F4F7FA]">
                                  <Image
                                    src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600&q=90"
                                    alt="Intelligence Research Lab"
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 200px"
                                    quality={90}
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-103"
                                  />
                                </div>
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0C0E12] group-hover/card:text-[#0B6B82] transition-colors text-center">
                                  Core Labs
                                </span>
                              </a>

                              {/* Card 2: MGX Campus */}
                              <a
                                href="#campus"
                                onClick={() => setDesktopDropdownOpen(false)}
                                className="group/card flex flex-col gap-3 cursor-pointer"
                              >
                                <div className="relative aspect-[3/4] w-full rounded-sm overflow-hidden border border-[#E2E8F0] bg-[#F4F7FA]">
                                  <Image
                                    src="https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=1600&q=90"
                                    alt="MGX Innovation Campus"
                                    fill
                                    sizes="(max-width: 1024px) 50vw, 200px"
                                    quality={90}
                                    className="object-cover transition-transform duration-500 group-hover/card:scale-103"
                                  />
                                </div>
                                <span className="font-mono text-xs uppercase tracking-[0.2em] text-[#0C0E12] group-hover/card:text-[#0B6B82] transition-colors text-center">
                                  MGX Campus
                                </span>
                              </a>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              }

              return (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-3 lg:px-5 py-2
                             text-base font-medium
                             transition-colors duration-200 hover:text-[#0C0E12]
                             after:absolute after:bottom-0 after:left-1/2 after:-translate-x-1/2
                             after:h-[2px] after:w-[60%] after:scale-x-0 after:bg-[#0B6B82]
                             after:transition-transform after:duration-300 hover:after:scale-x-100"
                  style={{ color: "#566070" }}
                >
                  {link.label}
                </a>
              );
            })}
          </nav>

          <a
            href="#contact"
            className="group shrink-0 inline-flex items-center gap-1.5 px-4 lg:px-5 py-2.5
                       text-sm lg:text-base font-semibold text-white
                       rounded-md transition-all hover:opacity-90 active:scale-[0.97]"
            style={{ background: "#0B6B82" }}
          >
            Book a Call
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
              {NAV.map((link, i) => {
                if (link.isDropdown) {
                  return (
                    <div key={link.label} className="flex flex-col border-b border-[#E2E8F0] py-3">
                      <div className="text-[#0C0E12] font-semibold text-xl mb-3 px-2">
                        {link.label}
                      </div>
                      <div className="pl-4 pb-2 grid grid-cols-2 gap-y-2.5 gap-x-4">
                        {[...SERVICES_ITEMS, ...ECOSYSTEM_ITEMS].map((item) => (
                          <a
                            key={item.label}
                            href={item.href}
                            onClick={() => setMobileOpen(false)}
                            className="text-[15px] font-medium text-[#566070] hover:text-[#0B6B82] py-1.5 transition-colors"
                          >
                            {item.label}
                          </a>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
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
                );
              })}
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
