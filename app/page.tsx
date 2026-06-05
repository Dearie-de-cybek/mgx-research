import Header from "@/components/Header";

export default function Home() {
  return (
    <>
      <Header />

      {/* ── HERO (placeholder — 100vh) ────────────────────────────── */}
      <section
        className="relative flex items-center justify-center min-h-screen overflow-hidden"
        style={{ background: "oklch(97% 0.008 75)" }}
      >
        {/* Soft gradient blob */}
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div
            className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] rounded-full opacity-30 blur-[120px]"
            style={{ background: "oklch(85% 0.18 120)" }}
          />
          <div
            className="absolute bottom-[-5%] left-[-5%] w-[500px] h-[500px] rounded-full opacity-20 blur-[100px]"
            style={{ background: "oklch(78% 0.12 255)" }}
          />
        </div>

        <div className="relative text-center px-6 max-w-4xl mx-auto">
          <p
            className="font-mono text-xs uppercase tracking-[0.2em] mb-6"
            style={{ color: "oklch(52% 0.22 255)" }}
          >
            MGX Research
          </p>
          <h1
            className="font-pp font-semibold tracking-tight leading-[0.95] mb-6"
            style={{
              fontSize: "clamp(3.5rem, 9vw, 9rem)",
              color: "oklch(14% 0.012 260)",
              letterSpacing: "-0.04em",
            }}
          >
            From Insight
            <br />
            to Impact
          </h1>
          <p
            className="font-pp text-lg leading-relaxed max-w-xl mx-auto"
            style={{ color: "oklch(45% 0.01 260)" }}
          >
            Powering the next generation of tech-driven organizations across
            Africa and beyond.
          </p>

          <div className="flex items-center justify-center gap-3 mt-10">
            <a
              href="#services"
              className="px-6 py-3 rounded-full text-sm font-medium text-white transition-all duration-200 hover:opacity-90 active:scale-[0.97]"
              style={{ background: "oklch(14% 0.012 260)" }}
            >
              Explore Our Solutions
            </a>
            <a
              href="#campus"
              className="px-6 py-3 rounded-full text-sm font-medium transition-all duration-200 hover:bg-stone-100 active:scale-[0.97]"
              style={{
                color: "oklch(14% 0.012 260)",
                border: "1px solid oklch(88% 0.008 80)",
              }}
            >
              Visit MGX Campus
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
          <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-stone-500">
            Scroll
          </span>
          <div className="w-px h-8 bg-stone-400 animate-pulse" />
        </div>
      </section>

      {/* ── SPACER — gives scroll room to test side nav ──────────── */}
      <section
        className="min-h-screen flex items-center justify-center"
        style={{ background: "oklch(96% 0.008 75)" }}
      >
        <div className="text-center">
          <p className="font-mono text-xs text-stone-400 uppercase tracking-widest mb-3">
            Next section
          </p>
          <h2
            className="font-pp font-semibold tracking-tight"
            style={{
              fontSize: "clamp(2rem, 5vw, 5rem)",
              color: "oklch(14% 0.012 260)",
              letterSpacing: "-0.03em",
            }}
          >
            What We Do
          </h2>
        </div>
      </section>
    </>
  );
}
