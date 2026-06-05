"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";

/* ── DATA ─────────────────────────────────────────────────────────── */

const serviceCategories = [
  {
    heading: "By Domain",
    items: [
      { label: "Intelligence & AI", href: "#services" },
      { label: "Security & Resilience", href: "#services" },
      { label: "Automation & Robotics", href: "#services" },
      { label: "Digital Infrastructure", href: "#services" },
      { label: "Governance & Smart Systems", href: "#services" },
      { label: "Human-Centered Innovation", href: "#services" },
    ],
  },
  {
    heading: "By Service",
    items: [
      { label: "Custom Software", href: "#services" },
      { label: "Cloud Solutions", href: "#services" },
      { label: "Managed IT Services", href: "#services" },
      { label: "Cybersecurity Services", href: "#services" },
      { label: "E-Governance Solutions", href: "#services" },
      { label: "Data Analytics & BI", href: "#services" },
      { label: "SaaS Solutions", href: "#services" },
      { label: "Robotic Process Automation", href: "#services" },
    ],
  },
  {
    heading: "By Sector",
    items: [
      { label: "Government & Public Sector", href: "#services" },
      { label: "Healthcare", href: "#services" },
      { label: "Education & Learning", href: "#services" },
      { label: "Finance & Fintech", href: "#services" },
      { label: "Enterprise & SMEs", href: "#services" },
      { label: "Startups & Founders", href: "#services" },
    ],
  },
];

const editorialImages = [
  {
    label: "MGX Campus",
    img: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&q=85",
    href: "#campus",
  },
  {
    label: "Enterprise Solutions",
    img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&q=85",
    href: "#services",
  },
];

const navLinks = [
  { label: "Work", href: "#work", active: true },
  { label: "Services", href: "#services", dropdown: true },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

/* ── EASING ───────────────────────────────────────────────────────── */
const ease = [0.23, 1, 0.32, 1] as const;
const easeDrawer = [0.32, 0.72, 0, 1] as const;

/* ── COMPONENTS ───────────────────────────────────────────────────── */

/* Superscript dot — absolutely positioned top-right of parent link */
function BlinkDot() {
  return (
    <span className="absolute top-2 right-2.5 flex h-[7px] w-[7px]">
      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
      <span className="relative inline-flex rounded-full h-[7px] w-[7px] bg-red-500" />
    </span>
  );
}

function ArrowRight({ rotate }: { rotate: boolean }) {
  return (
    <motion.svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      fill="none"
      animate={{ rotate: rotate ? 90 : 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="shrink-0"
    >
      <path
        d="M2.5 7H11.5M8 3.5L11.5 7L8 10.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function ChevronDown({ open }: { open: boolean }) {
  return (
    <motion.svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      animate={{ rotate: open ? 180 : 0 }}
      transition={{ duration: 0.22, ease: "easeOut" }}
    >
      <path
        d="M1.5 3.5L5 7L8.5 3.5"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div className="flex flex-col gap-[5px] w-[18px] cursor-pointer">
      <motion.span
        animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="block h-px bg-stone-800 origin-center"
        style={{ width: "100%" }}
      />
      <motion.span
        animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.2 }}
        className="block h-px bg-stone-800 origin-right"
        style={{ width: "70%" }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        className="block h-px bg-stone-800 origin-center"
        style={{ width: "100%" }}
      />
    </div>
  );
}

/* Editorial mega-menu dropdown */
function ServicesDropdown({ open }: { open: boolean }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="svc-drop"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.25, ease }}
          style={{ transformOrigin: "top center" }}
          className="absolute top-[calc(100%+10px)] left-0 right-0 z-50 rounded-lg overflow-hidden shadow-xl shadow-black/8"
        >
          {/* White editorial ground */}
          <div
            className="w-full flex"
            style={{ background: "oklch(99% 0.003 80 / 0.97)", backdropFilter: "blur(24px)" }}
          >
            {/* ── LEFT: category columns ── */}
            <div className="flex-1 grid grid-cols-3 gap-0 px-8 py-8 border-r border-stone-100">
              {serviceCategories.map((cat, ci) => (
                <div key={cat.heading} className={ci > 0 ? "pl-8 border-l border-stone-100" : ""}>
                  {/* Category header */}
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-5">
                    {cat.heading}
                  </p>

                  {/* Items */}
                  <ul className="flex flex-col gap-0">
                    {cat.items.map((item) => (
                      <li key={item.label}>
                        <a
                          href={item.href}
                          className="inline-block py-[7px] text-[14px] text-stone-800 hover:text-black hover:underline underline-offset-2 transition-colors duration-150"
                        >
                          {item.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* ── RIGHT: editorial images ── */}
            <div className="flex gap-4 px-6 py-8 shrink-0">
              {editorialImages.map((img, i) => (
                <motion.a
                  key={img.label}
                  href={img.href}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 + 0.08, duration: 0.35, ease }}
                  className="group flex flex-col gap-3 w-[160px]"
                >
                  <div className="relative w-full h-[220px] overflow-hidden rounded-sm bg-stone-100">
                    <Image
                      src={img.img}
                      alt={img.label}
                      fill
                      sizes="160px"
                      className="object-cover group-hover:scale-[1.04] transition-transform duration-700"
                    />
                  </div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-stone-500 group-hover:text-black transition-colors duration-200">
                    {img.label}
                  </p>
                </motion.a>
              ))}
            </div>
          </div>

          {/* Bottom strip — thin accent */}
          <div className="h-px w-full bg-stone-100" />
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* Book modal */
function BookModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="modal-bg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/15 backdrop-blur-sm"
          />
          <motion.div
            key="modal-panel"
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.35, ease }}
            style={{ transformOrigin: "center" }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-[90] max-w-md mx-auto glass-strong rounded-3xl p-7"
          >
            <div className="flex items-start justify-between mb-5">
              <div>
                <p className="font-mono text-[10px] text-stone-400 uppercase tracking-[0.15em] mb-1">
                  MGX Research
                </p>
                <h2 className="text-xl font-semibold text-stone-900 tracking-tight">
                  Book a call
                </h2>
              </div>
              <button
                onClick={onClose}
                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-stone-400 text-lg leading-none mt-0.5"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <p className="text-stone-500 text-sm leading-relaxed mb-5">
              Let's talk. We'll reach out within 24 hours to find a time that
              works.
            </p>

            <form
              className="flex flex-col gap-2.5"
              onSubmit={(e) => e.preventDefault()}
            >
              {[
                { type: "text", placeholder: "Your name" },
                { type: "email", placeholder: "Work email" },
                { type: "text", placeholder: "Company (optional)" },
              ].map((field) => (
                <input
                  key={field.placeholder}
                  type={field.type}
                  placeholder={field.placeholder}
                  className="w-full px-4 py-3 rounded-xl bg-white/60 border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm outline-none focus:border-stone-300 focus:bg-white/90 transition-all duration-150"
                />
              ))}
              <textarea
                placeholder="What are you working on?"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-white/60 border border-stone-200 text-stone-900 placeholder:text-stone-400 text-sm outline-none focus:border-stone-300 focus:bg-white/90 transition-all duration-150 resize-none"
              />
              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-stone-900 text-white text-sm font-medium hover:bg-stone-700 active:scale-[0.98] transition-all duration-150 mt-0.5"
              >
                Send request →
              </button>
            </form>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

/* ── MAIN HEADER ──────────────────────────────────────────────────── */
export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [sideOpen, setSideOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bookOpen, setBookOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);

  /* Scroll detection */
  useEffect(() => {
    const threshold = window.innerHeight * 0.8;
    const onScroll = () => setIsScrolled(window.scrollY > threshold);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Close services dropdown on outside click */
  const closeServices = useCallback((e: MouseEvent) => {
    if (navRef.current && !navRef.current.contains(e.target as Node)) {
      setServicesOpen(false);
    }
  }, []);

  useEffect(() => {
    if (servicesOpen) {
      document.addEventListener("mousedown", closeServices);
    }
    return () => document.removeEventListener("mousedown", closeServices);
  }, [servicesOpen, closeServices]);

  /* Close side panel on scroll back to top */
  useEffect(() => {
    if (!isScrolled) setSideOpen(false);
  }, [isScrolled]);

  return (
    <>
      {/* ════════════════════════════════════════════════════════════
          DESKTOP — FLOATING PILL NAV (hero zone)
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {!isScrolled && (
          <motion.header
            key="pill-nav"
            ref={navRef}
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
            transition={{ duration: 0.45, ease }}
            className="fixed top-14 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            style={{ width: "calc(100% - 3rem)", maxWidth: "1100px" }}
          >
            <div className="glass-nav rounded-lg flex items-center justify-between px-8 py-4 gap-16">
              {/* Logo */}
              <a
                href="/"
                className="font-display text-[24px] font-bold tracking-tight text-black shrink-0 select-none uppercase leading-none group"
              >
                <span className="underline-offset-4 group-hover:underline decoration-black decoration-2">
                  MGX
                </span>
              </a>

              {/* Nav links */}
              <nav className="flex items-center gap-3">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <button
                      key={link.label}
                      onClick={(e) => {
                        e.stopPropagation();
                        setServicesOpen((v) => !v);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-md text-[17px] text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      {link.label}
                      <ChevronDown open={servicesOpen} />
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="relative flex items-center px-6 py-2.5 rounded-md text-[17px] text-black hover:underline underline-offset-4 transition-all duration-200"
                    >
                      {link.label}
                      {link.active && <BlinkDot />}
                    </a>
                  )
                )}
              </nav>

              {/* Book CTA — #EBFFB3 */}
              <button
                onClick={() => setBookOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-xl text-[15px] font-medium text-stone-900 shrink-0 transition-all duration-200 active:scale-[0.97] hover:brightness-95"
                style={{ background: "#EBFFB3" }}
              >
                Book a call now
                <ArrowRight rotate={bookOpen} />
              </button>
            </div>

            {/* Services dropdown — lives inside relative header */}
            <ServicesDropdown open={servicesOpen} />
          </motion.header>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP — SIDE PILL (scrolled state)
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isScrolled && (
          <motion.div
            key="side-pill"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16, transition: { duration: 0.2 } }}
            transition={{ duration: 0.4, ease }}
            className="fixed left-5 top-1/2 -translate-y-1/2 z-50 hidden md:flex flex-col"
          >
            <div className="glass-nav rounded-2xl flex items-center gap-3 px-4 py-3">
              <a
                href="/"
                className="font-display text-[20px] font-bold tracking-tight text-stone-900 select-none uppercase leading-none"
              >
                MGX
              </a>
              <div className="w-px h-4 bg-stone-300/70 shrink-0" />
              <button
                onClick={() => setSideOpen((v) => !v)}
                aria-label="Toggle menu"
                className="hover:opacity-60 transition-opacity"
              >
                <HamburgerIcon open={sideOpen} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP — SIDE DRAWER (half panel from left)
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {isScrolled && sideOpen && (
          <>
            {/* Invisible click-away */}
            <motion.div
              key="side-drawer-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setSideOpen(false)}
              className="fixed inset-0 z-40 hidden md:block"
            />

            <motion.div
              key="side-drawer"
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.45, ease: easeDrawer }}
              className="fixed left-0 top-0 bottom-0 z-50 hidden md:flex flex-col w-[42vw] max-w-[340px] glass-strong border-r border-white/40 p-8"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-12">
                <a
                  href="/"
                  className="font-display text-xl font-bold tracking-tight text-stone-900 select-none uppercase"
                >
                  MGX
                </a>
                <button
                  onClick={() => setSideOpen(false)}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-black/5 transition-colors text-stone-400 text-xl leading-none"
                  aria-label="Close"
                >
                  ×
                </button>
              </div>

              {/* Drawer nav links */}
              <nav className="flex flex-col gap-1 flex-1">
                {navLinks.map((link, i) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay: i * 0.055 + 0.12,
                      duration: 0.38,
                      ease,
                    }}
                    onClick={() => setSideOpen(false)}
                    className="group flex items-center gap-2.5 px-4 py-3.5 rounded-2xl text-stone-800 text-base font-medium hover:bg-white/55 transition-all duration-200"
                  >
                    <span className="flex-1">{link.label}</span>
                    {link.active && <BlinkDot />}
                    <svg
                      className="w-4 h-4 text-stone-300 group-hover:text-stone-500 group-hover:translate-x-0.5 transition-all duration-200 shrink-0"
                      viewBox="0 0 16 16"
                      fill="none"
                    >
                      <path
                        d="M3 8h10M9 4l4 4-4 4"
                        stroke="currentColor"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </motion.a>
                ))}

                {/* Campus link */}
                <motion.a
                  href="#campus"
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.35, duration: 0.38, ease }}
                  onClick={() => setSideOpen(false)}
                  className="flex items-center gap-2.5 px-4 py-3.5 rounded-2xl text-[#8B6F4E] text-base font-medium hover:bg-[#f5ede4]/60 transition-all duration-200 group mt-2"
                >
                  <span className="flex-1">MGX Campus</span>
                  <svg
                    className="w-4 h-4 opacity-40 group-hover:opacity-70 transition-opacity shrink-0"
                    viewBox="0 0 16 16"
                    fill="none"
                  >
                    <path
                      d="M3 8h10M9 4l4 4-4 4"
                      stroke="currentColor"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.a>
              </nav>

              {/* Drawer CTA */}
              <motion.button
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.35 }}
                onClick={() => {
                  setSideOpen(false);
                  setBookOpen(true);
                }}
                className="w-full py-3.5 rounded-2xl text-stone-900 text-sm font-medium flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all duration-150"
                style={{ background: "oklch(88% 0.2 120)" }}
              >
                Book a call now →
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          MOBILE — FLOATING PILL (always visible)
      ════════════════════════════════════════════════════════════ */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="glass-nav rounded-2xl flex items-center justify-between px-5 py-3.5">
          <a
            href="/"
            className="font-display text-[22px] font-bold tracking-tight text-stone-900 select-none uppercase leading-none"
          >
            MGX
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            className="p-1.5"
          >
            <HamburgerIcon open={mobileOpen} />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE — FULL SCREEN MENU
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{
              backdropFilter: "blur(32px) saturate(180%)",
              WebkitBackdropFilter: "blur(32px) saturate(180%)",
              background: "oklch(99% 0.004 80 / 0.88)",
            }}
          >
            {/* Mobile header */}
            <div className="flex items-center justify-between px-6 pt-5 pb-4">
              <a
                href="/"
                className="font-display text-[22px] font-bold tracking-tight text-stone-900 select-none uppercase leading-none"
              >
                MGX
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full bg-stone-100/80 text-stone-500 text-xl leading-none"
                aria-label="Close menu"
              >
                ×
              </button>
            </div>

            <div className="w-full h-px bg-stone-200/60 mb-2" />

            {/* Mobile nav links — large type */}
            <nav className="flex flex-col flex-1 px-4 pt-4 gap-0.5">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease }}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-3 py-4 px-2 border-b border-stone-200/50 text-stone-900 text-[2rem] font-medium tracking-tight leading-none"
                >
                  <span className="flex-1">{link.label}</span>
                  {link.active && <BlinkDot />}
                </motion.a>
              ))}

              <motion.a
                href="#campus"
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28, duration: 0.4, ease }}
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-4 px-2 border-b border-stone-200/50 text-[2rem] font-medium tracking-tight leading-none"
                style={{ color: "#8B6F4E" }}
              >
                MGX Campus
              </motion.a>
            </nav>

            {/* Mobile bottom */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.4 }}
              className="px-6 pb-10 pt-6 space-y-4"
            >
              <div className="flex items-center gap-5">
                {["LinkedIn", "Twitter", "Instagram"].map((s) => (
                  <a
                    key={s}
                    href="#"
                    className="text-sm text-stone-500 hover:text-stone-800 transition-colors"
                  >
                    {s}
                  </a>
                ))}
              </div>
              <button
                onClick={() => {
                  setMobileOpen(false);
                  setBookOpen(true);
                }}
                className="w-full py-4 rounded-2xl text-stone-900 text-base font-medium flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all duration-150"
                style={{ background: "oklch(88% 0.2 120)" }}
              >
                Book a call now →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════════════════════
          BOOK A CALL MODAL
      ════════════════════════════════════════════════════════════ */}
      <BookModal open={bookOpen} onClose={() => setBookOpen(false)} />
    </>
  );
}
