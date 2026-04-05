"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const QUOTES = [
  // Bleach
  { text: "If I don't fight, I can't win.", source: "Ichigo Kurosaki — Bleach" },
  { text: "We fear that which we cannot see.", source: "Rukia Kuchiki — Bleach Ch. 95" },
  { text: "The blade was always there, waiting in the darkness.", source: "Zangetsu — Bleach Ch. 162" },
  { text: "Death and love are the two wings that bear the good man to heaven.", source: "Tite Kubo — BLEACH" },
  { text: "No matter what happens, I'll keep protecting what I have to protect.", source: "Ichigo Kurosaki — Bleach Ch. 420" },
  { text: "Admiration is the furthest thing from understanding.", source: "Sosuke Aizen — Bleach" },
  { text: "If you were to turn into a snake tomorrow and could only move by crawling along the ground, would I stop loving you?", source: "Gin Ichimaru — Bleach" },
  // Vinland Saga
  { text: "A real warrior needs no sword.", source: "Thors — Vinland Saga" },
  { text: "There's no such thing as an enemy. Love your enemy. That's the true warrior's path.", source: "Thors — Vinland Saga" },
  { text: "You have yet to know what a true warrior is.", source: "Thors — Vinland Saga" },
  { text: "I have no enemies anymore. There's no one I need to fight.", source: "Thorfinn — Vinland Saga" },
  { text: "War is hell. No glory, no honor — only pain and loss.", source: "Askeladd — Vinland Saga" },
  { text: "I'll find Vinland. A land with no slaves, no war — a place for a true beginning.", source: "Thorfinn — Vinland Saga" },
  // Samurai Champloo
  { text: "Those who are willing to die will survive and those who want to survive will die.", source: "Mugen — Samurai Champloo" },
  { text: "If I die before I reach my destination, there are no memories worth keeping.", source: "Jin — Samurai Champloo" },
  { text: "Don't live your life making excuses. Just run", source: "Mugen — Samurai Champloo" },
  { text: "The past makes you who you are. But it doesn't have to dictate who you'll become.", source: "Samurai Champloo" },
  // Mentality / LinkedIn
  { text: "FAFO: Find Around and Find Out.", source: "Mentality" },
  { text: "Making a dent into the Universe.", source: "Vision" },
  { text: "Triple Threat: Street smart, book smart, spiritual smart.", source: "Persona" },
];

const SYMBOLS = ["滅", "魂", "斬", "道", "刃", "霊", "剣", "心", "天", "無", "ᚦ", "ᚢ", "ᛏ", "ᚹ", "ᚱ", "間", "力"];

function AmbientBlobs() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden>
      {/* Primary orange — top left */}
      <div className="blob" style={{
        width: 600, height: 600, top: "-10%", left: "-10%",
        background: "radial-gradient(circle, var(--blob-1) 0%, transparent 70%)",
        animationDuration: "14s",
      }} />
      {/* Teal — bottom right */}
      <div className="blob" style={{
        width: 700, height: 700, bottom: "-15%", right: "-15%",
        background: "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)",
        animationDuration: "18s", animationDelay: "2s",
      }} />
      {/* Purple — center */}
      <div className="blob" style={{
        width: 500, height: 500, top: "30%", left: "40%",
        background: "radial-gradient(circle, var(--blob-3) 0%, transparent 70%)",
        animationDuration: "22s", animationDelay: "4s",
      }} />
      {/* Gold — top right */}
      <div className="blob" style={{
        width: 350, height: 350, top: "5%", right: "10%",
        background: "radial-gradient(circle, var(--gold-dim) 0%, transparent 70%)",
        animationDuration: "16s", animationDelay: "1s",
      }} />
    </div>
  );
}

function FloatingKanji() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none" aria-hidden>
      {SYMBOLS.map((char, i) => (
        <div
          key={i}
          className="absolute font-noto-jp"
          style={{
            fontSize: `${60 + (i % 4) * 30}px`,
            left: `${(i / SYMBOLS.length) * 92}%`,
            top: `${4 + (i % 6) * 15}%`,
            color: "var(--foreground)",
            opacity: 0.03,
            animation: `float-kanji ${5 + i * 1.2}s ease-in-out infinite`,
            animationDelay: `${i * 0.45}s`,
          }}
        >
          {char}
        </div>
      ))}
    </div>
  );
}

function FloatingUniverseText() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none z-0" aria-hidden>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.05, 0.02, 0.05, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 font-oswald text-[15vw] uppercase text-center leading-none whitespace-nowrap"
        style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
      >
        Making a dent into <br /> the Universe
      </motion.div>
    </div>
  );
}

function QuoteRotator() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(p => (p + 1) % QUOTES.length), 5000);
    return () => clearInterval(t);
  }, []);
  const q = QUOTES[idx];
  return (
    <div className="relative overflow-hidden min-h-[60px] flex flex-col justify-center max-w-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
          transition={{ duration: 0.5 }}
          className="space-y-1"
        >
          <div className="flex items-start gap-2">
            <span className="font-noto-jp text-xl flex-shrink-0 mt-0.5" style={{ color: "var(--secondary)" }}>&ldquo;</span>
            <p className="font-space-mono text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{q.text}</p>
          </div>
          <p className="font-space-mono text-[10px] tracking-widest uppercase pl-6" style={{ color: "var(--tertiary)" }}>
            — {q.source}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

function CanvasSlash() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);

    type L = { x: number; y: number; len: number; angle: number; life: number; maxLife: number; color: string };
    const lines: L[] = [];
    // Use CSS variables for colors dynamically
    const COLORS = ["255,69,0", "0,212,212", "139,92,246"];
    let frame = 0;

    const spawn = () => lines.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height * 0.75,
      len: 120 + Math.random() * 180,
      angle: (Math.random() > 0.5 ? 1 : -1) * (0.15 + Math.random() * 0.3),
      life: 0, maxLife: 28,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    });

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      if (frame % 65 === 0) spawn();
      for (let i = lines.length - 1; i >= 0; i--) {
        const l = lines[i];
        l.life++;
        const p = l.life / l.maxLife;
        const a = Math.sin(p * Math.PI) * 0.2;
        const ex = l.x + Math.cos(l.angle) * l.len * p;
        const ey = l.y + Math.sin(l.angle) * l.len * p;
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${l.color},${a})`;
        ctx.lineWidth = 1.5;
        ctx.moveTo(l.x, l.y); ctx.lineTo(ex, ey); ctx.stroke();
        ctx.beginPath();
        ctx.strokeStyle = `rgba(${l.color},${a * 0.25})`;
        ctx.lineWidth = 5;
        ctx.moveTo(l.x, l.y); ctx.lineTo(ex, ey); ctx.stroke();
        if (l.life >= l.maxLife) lines.splice(i, 1);
      }
      frame++;
      requestAnimationFrame(tick);
    };
    const raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener("resize", resize); cancelAnimationFrame(raf); };
  }, []);
  return <canvas ref={ref} className="absolute inset-0 pointer-events-none z-0" aria-hidden />;
}

const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.35 } } };
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.23, 1, 0.32, 1] as [number,number,number,number] } },
};

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden" style={{ background: "var(--background)" }}>
      <AmbientBlobs />
      <FloatingUniverseText />
      <FloatingKanji />
      <CanvasSlash />

      {/* Right vertical rail */}
      <div className="absolute right-0 top-0 bottom-0 w-px pointer-events-none" aria-hidden
        style={{ background: "linear-gradient(180deg, transparent, var(--primary) 35%, var(--secondary) 65%, transparent)" }} />

      {/* Episode label right */}
      <div className="absolute top-28 right-8 font-space-mono text-xs pointer-events-none select-none"
        style={{ color: "var(--fg-muted)", writingMode: "vertical-rl", letterSpacing: "0.2em" }}>
        PORTFOLIO / 001 / 2026
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-24">
        <motion.div variants={stagger} initial="hidden" animate="show" className="flex flex-col gap-5">

          {/* Chapter label */}
          <motion.div variants={fadeUp} className="flex items-center gap-3">
            <div className="h-px w-10" style={{ background: "var(--primary)" }} />
            <span className="font-space-mono text-xs tracking-[0.22em] uppercase" style={{ color: "var(--primary)" }}>
              — Chapter 01 / Founders Office
            </span>
          </motion.div>

          {/* MEGA HEADING */}
          <motion.div variants={fadeUp}>
            <h1 className="font-oswald uppercase leading-none" style={{ fontSize: "clamp(3.5rem, 11vw, 9rem)" }}>
              <span className="block" style={{ color: "var(--primary)", textShadow: "0 0 40px var(--primary-glow)" }}>
                Growth
              </span>
              <span className="block opacity-60" style={{ color: "var(--fg-subtle)", lineHeight: 0.9 }}>&amp;</span>
              <span className="block text-outline-secondary" style={{ lineHeight: 0.9, opacity: 0.8 }}>
                Ops.
              </span>
            </h1>
          </motion.div>

          {/* Japanese + Quote + Bio */}
          <motion.div variants={fadeUp} className="flex items-start gap-8 mt-2">
            <div className="hidden md:block flex-shrink-0">
              <div className="font-noto-jp text-xl leading-loose" style={{ writingMode: "vertical-rl", color: "var(--fg-muted)", opacity: 0.35 }}>
                比満洲の軌跡
              </div>
            </div>
            <div className="space-y-4">
              <QuoteRotator />
              <p className="font-space-mono text-xs leading-relaxed max-w-xs" style={{ color: "var(--fg-muted)" }}>
                Hi — I&apos;m <span style={{ color: "var(--foreground)" }}>Himanshu</span>. A <span style={{ color: "var(--primary)" }}>Triple Threat</span> (Street/Book/Spiritual smart). Founders Office, Growth specialist, tech builder, bartender, DJ.
              </p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "var(--secondary)" }} />
                <span className="font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>Open to opportunities</span>
              </div>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div variants={fadeUp} className="flex flex-wrap items-center gap-4 mt-6">
            <a id="hero-view-work-btn" href="#work"
              className="group relative font-oswald uppercase tracking-widest text-sm px-8 py-3 overflow-hidden transition-all duration-300"
              style={{ background: "var(--primary)", color: "#fff", boxShadow: "0 0 24px var(--primary-glow)" }}
            >
              <span className="relative z-10">View Work →</span>
            </a>
            <a id="hero-about-btn" href="#about"
              className="font-space-mono text-xs uppercase tracking-widest px-6 py-3 border transition-all duration-300"
              style={{ borderColor: "var(--secondary)", color: "var(--secondary)", boxShadow: "0 0 12px var(--secondary-glow)" }}
            >
              My Story
            </a>
            <a id="hero-blog-btn" href="/blog"
              className="font-space-mono text-xs uppercase tracking-widest transition-colors duration-300"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--gold)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
            >
              → Blog
            </a>
          </motion.div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8, duration: 1 }}
          className="mt-20 pt-10 border-t flex flex-wrap gap-12"
          style={{ borderColor: "var(--border)" }}
        >
          {[
            { v: "4+", l: "Yrs in Growth", c: "var(--primary)", g: "var(--primary-glow)" },
            { v: "5+", l: "Industries",    c: "var(--secondary)", g: "var(--secondary-glow)" },
            { v: "∞",  l: "Curiosity",     c: "var(--tertiary)",  g: "var(--tertiary-dim)" },
          ].map(s => (
            <div key={s.l}>
              <div className="font-oswald text-4xl" style={{ color: s.c, textShadow: `0 0 20px ${s.g}` }}>{s.v}</div>
              <div className="font-space-mono text-xs uppercase tracking-widest mt-1" style={{ color: "var(--fg-muted)" }}>{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-space-mono text-xs tracking-widest uppercase" style={{ color: "var(--fg-muted)" }}>Scroll</span>
        <div className="w-px h-10" style={{ background: "linear-gradient(180deg, var(--primary), var(--secondary))" }} />
      </motion.div>
    </section>
  );
}
