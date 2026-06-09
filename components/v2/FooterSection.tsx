"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;
const INK    = "#14110d";
const PAPER  = "#faf9f5";
const MUTE   = "#6b6760";
const GREEN  = "#4ed074";
const TEAL   = "#1a6680";
const LINE   = "rgba(20,17,13,0.10)";

function MGXLogo() {
  return (
    <div className="flex items-baseline gap-[1px]">
      <span className="font-display font-bold select-none" style={{ fontSize: "24px", letterSpacing: "-0.02em", color: INK }}>MG</span>
      <svg viewBox="0 0 32 32" style={{ width: "0.7em", height: "0.7em", display: "inline-block", verticalAlign: "middle" }} aria-hidden>
        <path d="M4 4 L14 4 L20 14 L14 28 L4 28 L11 16 Z" fill="#3fa9d9" />
        <path d="M28 4 L18 4 L12 14 L18 28 L28 28 L21 16 Z" fill="#4ed074" />
      </svg>
    </div>
  );
}

const footerLinks = {
  Explore:  [{ label: "Focus areas", href: "#focus" }, { label: "Pillars", href: "#pillars" }, { label: "Campus", href: "#campus" }, { label: "Contact", href: "#contact" }],
  Company:  [{ label: "About MGX", href: "#" }, { label: "Leadership", href: "#" }, { label: "Careers", href: "#" }, { label: "Press", href: "#" }],
  Connect:  [{ label: "LinkedIn", href: "#" }, { label: "X / Twitter", href: "#" }, { label: "Instagram", href: "#" }, { label: "hello@mgx.africa", href: "mailto:hello@mgx.africa" }],
};

export default function FooterSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });

  return (
    <>
      {/* ── CTA Band ── */}
      <section
        id="contact"
        style={{ padding: "clamp(100px,14vw,180px) 0", background: PAPER, position: "relative", overflow: "hidden", textAlign: "center" }}
      >
        {/* Green dot bg */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle, ${GREEN} 1.6px, transparent 1.8px)`,
            backgroundSize: "22px 22px",
            maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
            WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, black 0%, transparent 70%)",
            opacity: 0.45,
          }}
          aria-hidden
        />

        <div ref={ctaRef} className="max-w-[1320px] mx-auto px-5 sm:px-7 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
          >
            <span className="font-mono text-[11px] uppercase tracking-[0.26em] inline-flex items-center justify-center gap-3" style={{ color: INK }}>
              <span className="w-[7px] h-[7px] rounded-full" style={{ background: GREEN, boxShadow: "0 0 0 4px rgba(78,208,116,0.20)" }} />
              Start a project
            </span>

            <h2
              className="font-serif"
              style={{
                fontWeight: 400,
                fontSize: "clamp(48px,8vw,140px)",
                lineHeight: 0.94,
                letterSpacing: "-0.03em",
                color: INK,
                maxWidth: "14ch",
                margin: "22px auto 0",
              }}
            >
              Let&apos;s turn your{" "}
              <em style={{ fontStyle: "italic", color: TEAL }}>insight</em>
              <br />
              into measurable impact
              <span style={{ display: "inline-block", width: "0.12em", height: "0.12em", background: GREEN, borderRadius: "999px", verticalAlign: "baseline", marginLeft: "0.02em" }} />
            </h2>

            <p
              className="text-[17px] leading-[1.6] mt-8 mx-auto"
              style={{ color: MUTE, maxWidth: "50ch" }}
            >
              We work with startups, enterprises, public institutions and academic partners.
              Tell us what you&apos;re solving. We&apos;ll bring the research, the systems and the team to make it real.
            </p>

            <div className="flex gap-4 flex-wrap justify-center mt-10">
              <a
                href="mailto:hello@mgx.africa"
                className="inline-flex items-center gap-3 px-[22px] py-4 rounded-full font-medium text-sm transition-all duration-200"
                style={{ background: GREEN, color: INK }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 40px -16px rgba(78,208,116,0.55)"; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.transform = "none"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                hello@mgx.africa
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M2.5 7h9M8 3.5L11.5 7 8 10.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-3 px-[22px] py-4 rounded-full font-medium text-sm transition-all duration-200"
                style={{ border: `1px solid ${LINE}`, color: INK }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = INK; (e.currentTarget as HTMLElement).style.color = PAPER; (e.currentTarget as HTMLElement).style.borderColor = INK; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; (e.currentTarget as HTMLElement).style.color = INK; (e.currentTarget as HTMLElement).style.borderColor = LINE; }}
              >
                Download capabilities deck
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer style={{ background: PAPER, color: INK, padding: "72px 0 36px", borderTop: `1px solid ${LINE}` }}>
        <div className="max-w-[1320px] mx-auto px-5 sm:px-7">
          <div
            className="grid gap-10 pb-16"
            style={{ gridTemplateColumns: "2fr 1fr 1fr 1fr", borderBottom: `1px solid ${LINE}` }}
          >
            <div>
              <MGXLogo />
              <p className="mt-4 text-sm leading-[1.6]" style={{ color: MUTE, maxWidth: "32ch" }}>
                Africa&apos;s premier ecosystem for research, technology, innovation &amp; entrepreneurship.
              </p>
            </div>
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section}>
                <h4
                  className="font-mono text-[11px] uppercase tracking-[0.22em] mb-[18px]"
                  style={{ color: TEAL }}
                >
                  {section}
                </h4>
                <ul className="flex flex-col gap-[10px]">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-200"
                        style={{ color: MUTE }}
                        onMouseEnter={(e) => ((e.target as HTMLElement).style.color = INK)}
                        onMouseLeave={(e) => ((e.target as HTMLElement).style.color = MUTE)}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div
            className="flex justify-between items-center flex-wrap gap-4 pt-6 font-mono text-[11px] uppercase tracking-[0.18em]"
            style={{ color: MUTE }}
          >
            <span>MGX · MexyGabriel © 2026</span>
            <span>Enugu, Nigeria · www.mgx.africa</span>
          </div>
        </div>
      </footer>
    </>
  );
}
