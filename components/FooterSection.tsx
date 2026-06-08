"use client";

import { useState } from "react";

const footerLinks = {
  Company: [
    { label: "About MGX", href: "#research" },
    { label: "MGX Campus", href: "#campus" },
    { label: "Our Services", href: "#services" },
    { label: "Products", href: "#products" },
  ],
  Services: [
    { label: "Intelligence Systems", href: "#services" },
    { label: "Security & Resilience", href: "#services" },
    { label: "Automation & Robotics", href: "#services" },
    { label: "Digital Infrastructure", href: "#services" },
  ],
  Connect: [
    { label: "LinkedIn", href: "#" },
    { label: "Instagram", href: "#" },
    { label: "Book a Call", href: "#contact" },
    { label: "hello@mgx.africa", href: "mailto:hello@mgx.africa" },
  ],
};

function MGXLogo() {
  return (
    <span
      className="font-display font-black select-none"
      style={{ fontSize: "24px", letterSpacing: "0.08em" }}
    >
      <span style={{ color: "#FFFFFF" }}>MG</span>
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

export default function FooterSection() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) { setSubmitted(true); setEmail(""); }
  };

  return (
    <footer
      id="contact"
      style={{ background: "#0C0E12", borderTop: "1px solid rgba(255,255,255,0.06)" }}
    >
      <div
        className="max-w-[1280px] mx-auto
                   px-5 sm:px-8 md:px-12 lg:px-20
                   pt-16 sm:pt-20 md:pt-24 pb-10 sm:pb-12"
      >
        {/* Top row */}
        <div className="grid grid-cols-2 lg:grid-cols-5
                        gap-x-6 sm:gap-x-10 gap-y-10 lg:gap-x-16
                        pb-12 sm:pb-16"
          style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
        >
          {/* Brand col — spans both cols on mobile */}
          <div className="col-span-2 lg:col-span-2 flex flex-col gap-6">
            <a href="/">
              <MGXLogo />
            </a>
            <p
              className="text-[15px] leading-[1.75]"
              style={{ color: "rgba(255,255,255,0.45)", maxWidth: "38ch" }}
            >
              Africa's premier ecosystem for research, technology, innovation,
              and entrepreneurship. From insight to impact.
            </p>

            {/* Location */}
            <div className="flex flex-col gap-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                Location
              </p>
              <p className="text-[14px]" style={{ color: "rgba(255,255,255,0.5)" }}>
                Enugu, Nigeria · www.mgx.africa
              </p>
            </div>

            {/* Newsletter */}
            <div className="mt-2">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] mb-3" style={{ color: "rgba(255,255,255,0.28)" }}>
                Stay Updated
              </p>
              {submitted ? (
                <p className="text-[14px]" style={{ color: "#2CBF68" }}>
                  ✓ You're on the list.
                </p>
              ) : (
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 px-4 py-2.5 text-[14px] rounded-md outline-none transition-all"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      color: "#FFFFFF",
                    }}
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 text-[14px] font-semibold text-white rounded-md hover:opacity-90 transition-opacity"
                    style={{ background: "#0B6B82" }}
                  >
                    →
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([section, links]) => (
            <div key={section} className="flex flex-col gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.22em]" style={{ color: "rgba(255,255,255,0.28)" }}>
                {section}
              </p>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] transition-colors duration-150"
                      style={{ color: "rgba(255,255,255,0.5)" }}
                      onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "#FFFFFF")}
                      onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 pt-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "rgba(255,255,255,0.22)" }}>
            © 2025 MexyGabriel (MGX). All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            {["Privacy Policy", "Terms of Service"].map((label) => (
              <a
                key={label}
                href="#"
                className="font-mono text-[10px] uppercase tracking-[0.15em] transition-colors duration-150"
                style={{ color: "rgba(255,255,255,0.22)" }}
                onMouseEnter={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.5)")}
                onMouseLeave={(e) => ((e.target as HTMLElement).style.color = "rgba(255,255,255,0.22)")}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
