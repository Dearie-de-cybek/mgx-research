"use client";

import { useEffect, useState } from "react";

const WHITE  = "#ffffff";
const INK    = "#1d1d1f";
const MUTE   = "#6e6e73";
const LINE   = "rgba(0,0,0,0.08)";

function MGXLogo() {
  return (
    <div className="flex items-baseline gap-[1px]">
      <span style={{ fontWeight: 600, fontSize: "18px", letterSpacing: "-0.02em", color: INK }}>MG</span>
      <svg viewBox="0 0 32 32" style={{ width: "0.65em", height: "0.65em", display: "inline-block", verticalAlign: "middle" }} aria-hidden>
        <path d="M4 4 L14 4 L20 14 L14 28 L4 28 L11 16 Z" fill="#3fa9d9" />
        <path d="M28 4 L18 4 L12 14 L18 28 L28 28 L21 16 Z" fill="#4ed074" />
      </svg>
    </div>
  );
}

const NAV = [
  { label: "Research", href: "#focus" },
  { label: "Pillars",  href: "#pillars" },
  { label: "Campus",   href: "#campus" },
  { label: "About",    href: "#" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen]         = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-500"
      style={{ background: WHITE, borderBottom: `1px solid ${scrolled ? LINE : "transparent"}` }}
    >
      <div className="max-w-[1080px] mx-auto px-6 sm:px-8 flex items-center justify-between h-[64px]">
        <a href="/" aria-label="MGX Home"><MGXLogo /></a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-[15px] transition-colors duration-200"
              style={{ color: MUTE }}
              onMouseEnter={(e) => ((e.target as HTMLElement).style.color = INK)}
              onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTE)}
            >
              {l.label}
            </a>
          ))}
          <a
            href="mailto:hello@mgx.africa"
            className="text-[15px] font-medium"
            style={{ color: INK }}
          >
            Get in touch
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 flex flex-col gap-[5px]"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block w-5 h-[1.5px] transition-all duration-200"
              style={{
                background: INK,
                opacity: i === 1 && open ? 0 : 1,
                transform:
                  i === 0 && open ? "rotate(45deg) translateY(6.5px)" :
                  i === 2 && open ? "rotate(-45deg) translateY(-6.5px)" :
                  "none",
              }}
            />
          ))}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t" style={{ borderColor: LINE, background: WHITE }}>
          <div className="max-w-[1080px] mx-auto px-6 py-5 flex flex-col gap-5">
            {[...NAV, { label: "Get in touch", href: "mailto:hello@mgx.africa" }].map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="text-[17px]"
                style={{ color: INK }}
                onClick={() => setOpen(false)}
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
