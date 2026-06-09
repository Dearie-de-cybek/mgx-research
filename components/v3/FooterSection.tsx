"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const ease   = [0.23, 1, 0.32, 1] as const;
const WHITE  = "#ffffff";
const SNOW   = "#f5f5f7";
const INK    = "#1d1d1f";
const MUTE   = "#6e6e73";
const SILVER = "#a1a1a6";
const LINE   = "rgba(0,0,0,0.08)";
const GREEN  = "#4ed074";
const TEAL   = "#3fa9d9";

function MGXLogo() {
  return (
    <div className="flex items-baseline gap-[1px]">
      <span style={{ fontWeight: 600, fontSize: "18px", letterSpacing: "-0.02em", color: INK }}>MG</span>
      <svg viewBox="0 0 32 32" style={{ width: "0.65em", height: "0.65em", display: "inline-block", verticalAlign: "middle" }} aria-hidden>
        <path d="M4 4 L14 4 L20 14 L14 28 L4 28 L11 16 Z" fill={TEAL} />
        <path d="M28 4 L18 4 L12 14 L18 28 L28 28 L21 16 Z" fill={GREEN} />
      </svg>
    </div>
  );
}

const FOOTER_LINKS = {
  Explore: [
    { label: "Focus Areas", href: "#focus"   },
    { label: "Pillars",     href: "#pillars" },
    { label: "Campus",      href: "#campus"  },
    { label: "Contact",     href: "#contact" },
  ],
  Company: [
    { label: "About MGX",  href: "#" },
    { label: "Leadership",  href: "#" },
    { label: "Careers",     href: "#" },
    { label: "Press",       href: "#" },
  ],
  Connect: [
    { label: "LinkedIn",         href: "#"                       },
    { label: "X / Twitter",      href: "#"                       },
    { label: "hello@mgx.africa", href: "mailto:hello@mgx.africa" },
  ],
};

export default function FooterSection() {
  const ref    = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <>
      {/* CTA section */}
      <section id="contact" style={{ background: SNOW, padding: "clamp(100px,14vw,180px) 0" }}>
        <div ref={ref} className="max-w-[1080px] mx-auto px-6 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease }}
          >
            <span
              className="font-mono text-[11px] uppercase tracking-[0.22em] inline-flex items-center gap-3"
              style={{ color: SILVER }}
            >
              <span className="w-[5px] h-[5px] rounded-full" style={{ background: GREEN }} />
              Start a project
            </span>
            <h2
              className="font-serif mt-4"
              style={{
                fontWeight: 300,
                fontSize: "clamp(52px,7.5vw,120px)",
                lineHeight: 0.96,
                letterSpacing: "-0.038em",
                color: INK,
                maxWidth: "14ch",
              }}
            >
              Ready<br />to{" "}
              <em style={{ fontStyle: "italic", color: GREEN }}>begin?</em>
            </h2>

            <div
              className="mt-10 pt-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-8"
              style={{ borderTop: `1px solid ${LINE}` }}
            >
              <p className="text-[17px] leading-[1.72]" style={{ color: MUTE, maxWidth: "48ch" }}>
                We work with startups, enterprises, public institutions and academic partners.
                Tell us what you're solving.
              </p>
              <a
                href="mailto:hello@mgx.africa"
                className="shrink-0 text-[17px] font-medium transition-all duration-200"
                style={{
                  color: INK,
                  textDecoration: "underline",
                  textUnderlineOffset: "5px",
                  textDecorationColor: GREEN,
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.color = TEAL; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.color = INK; }}
              >
                hello@mgx.africa
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: WHITE, borderTop: `1px solid ${LINE}`, padding: "64px 0 32px" }}>
        <div className="max-w-[1080px] mx-auto px-6 sm:px-8">
          <div
            className="grid pb-12 gap-10"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: `1px solid ${LINE}` }}
          >
            <div>
              <MGXLogo />
              <p className="mt-4 text-[14px] leading-[1.65]" style={{ color: MUTE, maxWidth: "28ch" }}>
                Africa's premier ecosystem for research, technology, innovation and entrepreneurship.
              </p>
            </div>
            {Object.entries(FOOTER_LINKS).map(([section, links]) => (
              <div key={section}>
                <h4
                  className="font-mono text-[11px] uppercase tracking-[0.18em] mb-4"
                  style={{ color: SILVER }}
                >
                  {section}
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  {links.map((l) => (
                    <li key={l.label}>
                      <a
                        href={l.href}
                        className="text-[14px] transition-colors duration-200"
                        style={{ color: MUTE }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = TEAL)}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTE)}
                      >
                        {l.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div
            className="flex justify-between items-center flex-wrap gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.15em]"
            style={{ color: SILVER }}
          >
            <span>MGX · MexyGabriel 2026</span>
            <span>Enugu, Nigeria · mgx.africa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
