"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const ease = [0.23, 1, 0.32, 1] as const;

const footerLinks = {
  Explore: [
    { label: "Our Focus", href: "#focus" },
    { label: "Research Pillars", href: "#pillars" },
    { label: "Products", href: "#products" },
    { label: "MGX Campus", href: "#campus" },
  ],
  Company: [
    { label: "About MGX", href: "#research" },
    { label: "Our Mandate", href: "#research" },
    { label: "MGX Campus", href: "#campus" },
    { label: "Est. 2017", href: "#" },
  ],
  Connect: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Book a Call", href: "#contact" },
    { label: "hello@mgx.africa", href: "mailto:hello@mgx.africa" },
  ],
};

function TwoBladeLogo() {
  return (
    <div className="flex items-center gap-2.5">
      <svg width="26" height="26" viewBox="0 0 28 28" fill="none" aria-hidden>
        <path d="M4 24L14 4L19 14L14 19Z" fill="#3fa9d9" />
        <path d="M14 19L19 14L24 24L14 19Z" fill="#5dd673" />
      </svg>
      <span
        className="font-display font-bold select-none"
        style={{ fontSize: "19px", letterSpacing: "0.07em", color: "#fff" }}
      >
        MGX
      </span>
    </div>
  );
}

export default function FooterSection() {
  const ctaRef = useRef<HTMLDivElement>(null);
  const ctaInView = useInView(ctaRef, { once: true, margin: "-80px" });
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <>
      {/* ── CTA Band ──────────────────────────────────────────── */}
      <section
        style={{
          background: "#0a2c46",
          padding: "clamp(80px, 10vw, 140px) 0",
          borderTop: "1px solid rgba(255,255,255,0.10)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Ambient glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "radial-gradient(800px 600px at 60% 60%, rgba(93,214,115,0.08), transparent 65%)",
          }}
        />

        <div ref={ctaRef} className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-10">
            <motion.div
              initial={{ opacity: 0, y: 28 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, ease }}
            >
              <div className="flex items-center gap-2.5 mb-7">
                <span className="w-7 h-[1px]" style={{ background: "#5dd673" }} />
                <span
                  className="font-mono text-[11px] uppercase tracking-[0.24em]"
                  style={{ color: "#5dd673" }}
                >
                  Work with MGX
                </span>
              </div>
              <h2
                className="font-display"
                style={{
                  fontWeight: 500,
                  fontSize: "clamp(36px, 5.5vw, 80px)",
                  lineHeight: 1.0,
                  letterSpacing: "-0.04em",
                  color: "#fff",
                  maxWidth: "20ch",
                }}
              >
                Let&apos;s turn your{" "}
                <span
                  className="font-serif italic"
                  style={{ color: "#5dd673", fontWeight: 400 }}
                >
                  insight
                </span>{" "}
                into measurable impact.
              </h2>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, ease, delay: 0.15 }}
              className="flex gap-4 flex-wrap shrink-0"
            >
              <a
                href="#contact"
                className="px-7 py-4 text-sm font-semibold rounded-full transition-all hover:-translate-y-0.5 active:scale-[0.97]"
                style={{ background: "#5dd673", color: "#061f33" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow =
                    "0 16px 40px -16px rgba(93,214,115,0.5)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "none";
                }}
              >
                Start a project
              </a>
              <a
                href="mailto:hello@mgx.africa"
                className="px-7 py-4 text-sm font-semibold rounded-full transition-all"
                style={{
                  color: "#fff",
                  border: "1px solid rgba(255,255,255,0.18)",
                  background: "rgba(255,255,255,0.04)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.08)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.04)";
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(255,255,255,0.18)";
                }}
              >
                hello@mgx.africa
              </a>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Footer ────────────────────────────────────────────── */}
      <footer
        id="contact"
        style={{
          background: "#061f33",
          borderTop: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        <div className="max-w-[1320px] mx-auto px-5 sm:px-8 lg:px-10 pt-16 pb-10">
          {/* Grid */}
          <div
            className="grid grid-cols-2 lg:grid-cols-[2fr_1fr_1fr_1fr] gap-x-8 gap-y-10 pb-12"
            style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
          >
            {/* Brand */}
            <div className="col-span-2 lg:col-span-1 flex flex-col gap-6">
              <a href="/">
                <TwoBladeLogo />
              </a>
              <p
                className="text-sm leading-[1.75]"
                style={{ color: "rgba(255,255,255,0.42)", maxWidth: "36ch" }}
              >
                Africa&apos;s premier ecosystem for research, technology,
                innovation, and entrepreneurship. From insight to impact.
              </p>
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.22em] mb-1.5"
                  style={{ color: "#5dd673" }}
                >
                  Location
                </p>
                <p className="text-sm" style={{ color: "rgba(255,255,255,0.45)" }}>
                  Enugu, Nigeria · Est. 2017
                </p>
              </div>

              {/* Newsletter */}
              <div>
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.22em] mb-3"
                  style={{ color: "#5dd673" }}
                >
                  Stay Updated
                </p>
                {submitted ? (
                  <p className="text-sm" style={{ color: "#5dd673" }}>
                    ✓ You&apos;re on the list.
                  </p>
                ) : (
                  <form onSubmit={handleSubmit} className="flex gap-2">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      required
                      className="flex-1 px-4 py-2.5 text-sm outline-none transition-all"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.10)",
                        color: "#fff",
                      }}
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 text-sm font-semibold transition-opacity hover:opacity-90"
                      style={{ background: "#5dd673", color: "#061f33" }}
                    >
                      →
                    </button>
                  </form>
                )}
              </div>
            </div>

            {/* Link columns */}
            {Object.entries(footerLinks).map(([section, links]) => (
              <div key={section} className="flex flex-col gap-4">
                <p
                  className="font-mono text-[10px] uppercase tracking-[0.24em]"
                  style={{ color: "#5dd673" }}
                >
                  {section}
                </p>
                <ul className="flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm transition-colors duration-150"
                        style={{ color: "rgba(255,255,255,0.42)" }}
                        onMouseEnter={(e) =>
                          ((e.target as HTMLElement).style.color = "#fff")
                        }
                        onMouseLeave={(e) =>
                          ((e.target as HTMLElement).style.color =
                            "rgba(255,255,255,0.42)")
                        }
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom bar */}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-7">
            <p
              className="font-mono text-[10px] uppercase tracking-[0.2em]"
              style={{ color: "rgba(255,255,255,0.2)" }}
            >
              © 2025 MexyGabriel (MGX). All rights reserved.
            </p>
            <div className="flex items-center gap-5">
              {["Privacy Policy", "Terms of Service"].map((label) => (
                <a
                  key={label}
                  href="#"
                  className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-150"
                  style={{ color: "rgba(255,255,255,0.2)" }}
                  onMouseEnter={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.45)")
                  }
                  onMouseLeave={(e) =>
                    ((e.target as HTMLElement).style.color =
                      "rgba(255,255,255,0.2)")
                  }
                >
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
