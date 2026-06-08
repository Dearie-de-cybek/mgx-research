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

/*
  Logo — "MG" white (for dark/image backgrounds)
         "MG" dark  (for light panel backgrounds)
         "X"  always blue→green gradient
*/
function MGXLogo({
  size = "text-[24px]",
  mgColor = "white",
}: {
  size?: string;
  mgColor?: "white" | "dark";
}) {
  return (
    <span
      className={`font-display font-black ${size} leading-none select-none uppercase`}
      style={{ letterSpacing: "0.12em" }}
    >
      <span
        style={{
          color: mgColor === "white" ? "#ffffff" : "#0c0c0d",
          textShadow: mgColor === "white" ? "0 1px 6px rgba(0,0,0,0.25)" : "none",
        }}
      >
        MG
      </span>
      <span
        style={{
          background: "linear-gradient(135deg, #3B9FE8 20%, #3DBE6E 100%)",
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

/* ── BOOK MODAL ───────────────────────────────────────────────────
   Two solid-white panels: person card left, scheduler right.
   No glass. Thick white. Calendly-style.
──────────────────────────────────────────────────────────────── */

const PEOPLE = {
  emeka: {
    name: "Emeka",
    role: "Co-Founder & CEO",
    img: "https://images.pexels.com/photos/5083224/pexels-photo-5083224.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
  drvee: {
    name: "Dr Vee",
    role: "Chief Innovation Officer",
    img: "https://images.pexels.com/photos/5905885/pexels-photo-5905885.jpeg?auto=compress&cs=tinysrgb&w=700",
  },
} as const;

type PersonKey = keyof typeof PEOPLE;

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAYS   = ["Mo","Tu","We","Th","Fr","Sa","Su"];
const TIMES  = ["9:00 AM","10:00 AM","11:00 AM","12:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"];

function MiniCalendar({
  onSelect,
}: {
  onSelect: (date: string) => void;
}) {
  const today = new Date();
  const [year, setYear]     = useState(today.getFullYear());
  const [month, setMonth]   = useState(today.getMonth());
  const [selected, setSelected] = useState<number | null>(null);

  const firstDay = new Date(year, month, 1).getDay(); // 0=Sun
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  // Shift so Monday = 0
  const offset = (firstDay + 6) % 7;

  const prev = () => { if (month === 0) { setMonth(11); setYear(y => y - 1); } else setMonth(m => m - 1); setSelected(null); };
  const next = () => { if (month === 11) { setMonth(0); setYear(y => y + 1); } else setMonth(m => m + 1); setSelected(null); };

  const pick = (d: number) => {
    setSelected(d);
    onSelect(`${MONTHS[month]} ${d}, ${year}`);
  };

  const cells: (number | null)[] = [
    ...Array(offset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];
  while (cells.length % 7 !== 0) cells.push(null);

  return (
    <div>
      {/* Month nav */}
      <div className="flex items-center justify-between mb-5">
        <span className="font-semibold text-stone-900 text-[15px]">
          {MONTHS[month]} {year}
        </span>
        <div className="flex gap-1">
          {[prev, next].map((fn, i) => (
            <button key={i} onClick={fn}
              className="w-7 h-7 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-500 text-sm">
              {i === 0 ? "‹" : "›"}
            </button>
          ))}
        </div>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-2">
        {DAYS.map(d => (
          <div key={d} className="text-center font-mono text-[10px] uppercase tracking-wider text-stone-400 py-1">
            {d}
          </div>
        ))}
      </div>

      {/* Date grid */}
      <div className="grid grid-cols-7 gap-y-1">
        {cells.map((d, i) => {
          const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
          const isPast  = d !== null && new Date(year, month, d) < new Date(today.getFullYear(), today.getMonth(), today.getDate());
          const isSel   = d === selected;
          return (
            <div key={i} className="flex items-center justify-center h-8">
              {d ? (
                <button
                  onClick={() => !isPast && pick(d)}
                  disabled={isPast}
                  className={`w-8 h-8 rounded-full text-[13px] font-medium transition-all duration-150
                    ${isPast ? "text-stone-300 cursor-not-allowed" : "hover:bg-stone-100 cursor-pointer"}
                    ${isSel ? "!bg-stone-900 text-white" : ""}
                    ${isToday && !isSel ? "border border-stone-300 text-stone-900" : "text-stone-700"}
                  `}
                >
                  {d}
                </button>
              ) : null}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function BookModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [person, setPerson]       = useState<PersonKey>("emeka");
  const [dropOpen, setDropOpen]   = useState(false);
  const [selDate, setSelDate]     = useState<string | null>(null);
  const [selTime, setSelTime]     = useState<string | null>(null);
  const p = PEOPLE[person];

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bm-bg"
            className="fixed inset-0 z-[80]"
            style={{ background: "rgba(0,0,0,0.35)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
          />

          {/* Two-panel container */}
          <motion.div
            key="bm-wrap"
            className="fixed inset-4 md:inset-0 md:top-1/2 md:left-1/2 z-[90] md:-translate-x-1/2 md:-translate-y-1/2 flex overflow-hidden rounded-2xl shadow-2xl"
            style={{ maxWidth: "860px", maxHeight: "90vh", width: "100%", height: "fit-content" }}
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 20 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
          >
            {/* ── LEFT: Person card ── */}
            <div className="bg-white w-[320px] shrink-0 flex flex-col p-7 gap-5 border-r border-stone-100">
              {/* Duration badge */}
              <div className="inline-flex">
                <span className="border border-stone-300 text-stone-600 text-[11px] font-mono uppercase tracking-[0.15em] px-3 py-1 rounded">
                  30 Mins
                </span>
              </div>

              {/* Title with dropdown */}
              <div>
                <p className="text-stone-500 text-[13px] mb-1">Book an intro call with</p>
                <div className="relative">
                  <button
                    onClick={() => setDropOpen(v => !v)}
                    className="flex items-center gap-1.5 font-semibold text-stone-900 text-[17px] hover:opacity-70 transition-opacity"
                  >
                    {p.name}
                    <motion.svg
                      width="12" height="12" viewBox="0 0 12 12" fill="none"
                      animate={{ rotate: dropOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </motion.svg>
                  </button>

                  <AnimatePresence>
                    {dropOpen && (
                      <motion.div
                        key="person-drop"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 6 }}
                        transition={{ duration: 0.18 }}
                        className="absolute top-full left-0 mt-2 bg-white border border-stone-200 rounded-xl shadow-lg overflow-hidden z-10 w-44"
                      >
                        {(Object.keys(PEOPLE) as PersonKey[]).map(key => (
                          <button
                            key={key}
                            onClick={() => { setPerson(key); setDropOpen(false); }}
                            className={`w-full text-left px-4 py-3 text-[14px] font-medium transition-colors hover:bg-stone-50
                              ${person === key ? "text-stone-900 bg-stone-50" : "text-stone-600"}`}
                          >
                            <span className="block">{PEOPLE[key].name}</span>
                            <span className="block text-[11px] font-normal text-stone-400">{PEOPLE[key].role}</span>
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Photo — animates on swap */}
              <div className="relative flex-1 min-h-[260px] rounded-xl overflow-hidden bg-stone-100">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={person}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <Image
                      src={p.img}
                      alt={p.name}
                      fill
                      sizes="280px"
                      className="object-cover object-top"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Role */}
              <div>
                <p className="font-semibold text-stone-900 text-[14px]">{p.name}</p>
                <p className="text-stone-400 text-[12px]">{p.role}</p>
              </div>
            </div>

            {/* ── RIGHT: Scheduler ── */}
            <div className="bg-white flex-1 flex flex-col overflow-y-auto">
              {/* Close btn */}
              <div className="flex justify-end p-5 pb-0">
                <button
                  onClick={onClose}
                  className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-stone-100 transition-colors text-stone-400 text-lg"
                >
                  ×
                </button>
              </div>

              <div className="px-7 pb-8 flex flex-col gap-6">
                <div>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-400 mb-1">
                    MGX Research
                  </p>
                  <h3 className="font-semibold text-stone-900 text-[18px] leading-snug">
                    Select a date &amp; time
                  </h3>
                </div>

                {/* Calendar */}
                <MiniCalendar onSelect={setSelDate} />

                {/* Time slots — show after date selected */}
                <AnimatePresence>
                  {selDate && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-[12px] font-mono uppercase tracking-[0.18em] text-stone-400 mb-3">
                        {selDate} · WAT (GMT+1)
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {TIMES.map(t => (
                          <button
                            key={t}
                            onClick={() => setSelTime(t)}
                            className={`py-2.5 rounded-lg text-[13px] font-medium border transition-all duration-150
                              ${selTime === t
                                ? "bg-stone-900 text-white border-stone-900"
                                : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                              }`}
                          >
                            {t}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Confirm */}
                <AnimatePresence>
                  {selDate && selTime && (
                    <motion.button
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="w-full py-3.5 rounded-xl bg-stone-900 text-white text-[14px] font-semibold hover:bg-stone-700 active:scale-[0.98] transition-all"
                    >
                      Confirm — {selDate} at {selTime}
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            </div>
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
            className="fixed top-5 left-1/2 -translate-x-1/2 z-50 hidden md:block"
            style={{ width: "calc(100% - 2rem)", maxWidth: "1320px" }}
            onMouseLeave={() => setServicesOpen(false)}
          >
            {/* pill */}
            <div className="glass-nav rounded-lg flex items-center justify-between px-10 py-4 gap-20">
              {/* Logo — MG white, X blue-green (on taupe glass over dark image) */}
              <a href="/" className="shrink-0 hover:opacity-85 transition-opacity duration-150">
                <MGXLogo size="text-[26px]" mgColor="white" />
              </a>

              {/* Nav links */}
              {/* FIX 2: font-semibold for contrast on image */}
              <nav className="flex items-center gap-3">
                {navLinks.map((link) =>
                  link.dropdown ? (
                    <button
                      key={link.label}
                      onMouseEnter={() => setServicesOpen(true)}
                      onClick={(e) => {
                        e.stopPropagation();
                        setServicesOpen((v) => !v);
                      }}
                      className="flex items-center gap-2 px-6 py-2.5 rounded-md text-[17px] font-semibold text-stone-950 hover:underline underline-offset-4 transition-all duration-150"
                    >
                      {link.label}
                      <ChevronDown open={servicesOpen} />
                    </button>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className="relative flex items-center px-6 py-2.5 rounded-md text-[17px] font-semibold text-stone-950 hover:underline underline-offset-4 transition-all duration-150"
                    >
                      {link.label}
                      {link.active && <BlinkDot />}
                    </a>
                  )
                )}
              </nav>

              {/* Book CTA — FIX 3: no rounded-xl → rounded-md, no border */}
              <button
                onClick={() => setBookOpen(true)}
                className="flex items-center gap-2 px-6 py-3 rounded-md text-[15px] font-semibold text-stone-900 shrink-0 transition-all duration-150 active:scale-[0.97] hover:brightness-95"
                style={{ background: "#EBFFB3" }}
              >
                Book a call now
                <ArrowRight rotate={bookOpen} />
              </button>
            </div>

            {/* Services dropdown — hover stays open, onMouseLeave on pill closes */}
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
              <a href="/" className="hover:opacity-80 transition-opacity">
                <MGXLogo size="text-[20px]" mgColor="dark" />
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
                <a href="/" className="hover:opacity-80 transition-opacity">
                  <MGXLogo size="text-[22px]" mgColor="dark" />
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
          MOBILE — FLOATING PILL
      ════════════════════════════════════════════════════════════ */}
      <div className="md:hidden fixed top-4 left-4 right-4 z-50">
        <div className="glass-nav rounded-xl flex items-center justify-between px-5 py-3">
          <a href="/" className="hover:opacity-80 transition-opacity">
            <MGXLogo size="text-[20px]" mgColor="white" />
          </a>
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle mobile menu"
            className="flex flex-col gap-[5px] p-1"
          >
            {/* Yugen-style offset hamburger */}
            <span className="block h-px w-5 bg-stone-800" />
            <span className="block h-px w-3.5 bg-stone-800 ml-auto" />
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════════════════════════════
          MOBILE — FULL SCREEN MENU (Yugen-style)
      ════════════════════════════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="md:hidden fixed inset-0 z-40 flex flex-col"
            style={{
              backdropFilter: "blur(28px) saturate(160%)",
              WebkitBackdropFilter: "blur(28px) saturate(160%)",
              background: "rgb(200 194 188 / 0.82)",
            }}
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 pt-6 pb-5">
              <a href="/" className="hover:opacity-80 transition-opacity"
                onClick={() => setMobileOpen(false)}>
                <MGXLogo size="text-[22px]" mgColor="dark" />
              </a>
              <button
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 flex items-center justify-center text-stone-700 text-2xl leading-none font-light hover:opacity-60 transition-opacity"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            {/* ── Nav links ── */}
            <nav className="flex flex-col flex-1 px-6 overflow-y-auto">
              {/* Home — active with underline */}
              <motion.a
                href="/"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.04, duration: 0.38, ease }}
                onClick={() => setMobileOpen(false)}
                className="py-5 border-b border-stone-400/25 text-stone-900 font-medium tracking-tight leading-none"
                style={{ fontSize: "clamp(1.8rem, 7vw, 2.4rem)" }}
              >
                <span className="underline underline-offset-4 decoration-stone-900 decoration-[1.5px]">Home</span>
              </motion.a>

              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: (i + 1) * 0.05 + 0.04, duration: 0.38, ease }}
                  onClick={() => setMobileOpen(false)}
                  className="relative flex items-center py-5 border-b border-stone-400/25 text-stone-900 font-medium tracking-tight leading-none hover:opacity-70 transition-opacity"
                  style={{ fontSize: "clamp(1.8rem, 7vw, 2.4rem)" }}
                >
                  {link.label}
                  {link.active && (
                    <span className="absolute right-0 top-1/2 -translate-y-1/2 flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
                    </span>
                  )}
                </motion.a>
              ))}

              {/* MGX Campus — accent colour like YGN Bloom */}
              <motion.a
                href="#campus"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.36, duration: 0.38, ease }}
                onClick={() => setMobileOpen(false)}
                className="py-5 font-medium tracking-tight leading-none hover:opacity-70 transition-opacity"
                style={{
                  fontSize: "clamp(1.8rem, 7vw, 2.4rem)",
                  color: "#8B6F4E",
                }}
              >
                MGX Campus
              </motion.a>
            </nav>

            {/* ── Bottom section ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.38 }}
              className="px-6 pb-8 pt-5 flex flex-col gap-5"
            >
              {/* Divider */}
              <div className="w-full h-px bg-stone-400/25" />

              {/* Social + badges row */}
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1.5">
                  {["LinkedIn", "Instagram"].map((s) => (
                    <a key={s} href="#"
                      className="text-[14px] text-stone-700 hover:text-stone-900 transition-colors font-medium">
                      {s}
                    </a>
                  ))}
                </div>

                {/* Certification badges */}
                <div className="flex items-center gap-3">
                  {/* Badge 1 — circular stamp style */}
                  <div className="w-12 h-12 rounded-full border border-stone-400/40 flex items-center justify-center bg-stone-100/50">
                    <span className="font-mono text-[9px] uppercase text-stone-600 text-center leading-tight tracking-tight">
                      ISO<br/>27001
                    </span>
                  </div>
                  {/* Badge 2 */}
                  <div className="w-12 h-12 rounded-full border border-stone-400/40 flex items-center justify-center bg-stone-100/50">
                    <span className="font-mono text-[9px] uppercase text-stone-600 text-center leading-tight tracking-tight">
                      MGX<br/>CERT
                    </span>
                  </div>
                </div>
              </div>

              {/* Divider */}
              <div className="w-full h-px bg-stone-400/25" />

              {/* CTA */}
              <button
                onClick={() => { setMobileOpen(false); setBookOpen(true); }}
                className="w-full py-4 rounded-xl text-stone-900 text-[16px] font-semibold flex items-center justify-center gap-2 hover:brightness-95 active:scale-[0.98] transition-all"
                style={{ background: "#EBFFB3" }}
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
