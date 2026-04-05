"use client";

import { motion } from "framer-motion";

const fadeInView = (delay = 0) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
});

const skills = [
  { category: "Growth", items: ["GTM Strategy", "User Acquisition", "Sales Pipeline", "Marketing Ops"], color: "var(--primary)" },
  { category: "Tech",   items: ["Python", "Next.js", "TypeScript", "Supabase", "Rust"],                color: "var(--secondary)" },
  { category: "Craft",  items: ["Bartending", "DJing", "Music Curation", "People Design"],            color: "var(--tertiary)" },
];

export function AboutSection() {
  return (
    <section id="about" className="relative py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Halftone accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full halftone opacity-20 pointer-events-none" aria-hidden />
      {/* Ambient blob */}
      <div className="blob" style={{ width: 300, height: 300, top: 0, left: 0,
        background: "radial-gradient(circle, var(--blob-1) 0%, transparent 70%)" }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6">

        {/* Section label */}
        <motion.div {...fadeInView()} className="flex items-center gap-4 mb-12">
          <div className="h-px w-12" style={{ background: "var(--secondary)" }} />
          <span className="font-space-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--secondary)" }}>
            Chapter 02 — About
          </span>
        </motion.div>

        {/* FULL-WIDTH heading — no grid here so it can't overflow */}
        <motion.div {...fadeInView(0.1)} className="mb-4">
          <h2 className="font-oswald uppercase leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            <span className="block" style={{ color: "var(--fg-subtle)" }}>A Unique</span>
            <span className="block" style={{ color: "var(--foreground)" }}>Trajectory.</span>
          </h2>
        </motion.div>

        <div className="katana-line w-full mb-12" />

        {/* Two-column: Japanese accent left, bio right */}
        <div className="grid md:grid-cols-2 gap-12 mb-20">
          {/* Left — Japanese accent + kanji */}
          <motion.div {...fadeInView(0.15)} className="flex flex-col gap-6">
            <div className="font-noto-jp text-4xl" style={{ color: "var(--secondary)", opacity: 0.3 }}>軌跡</div>
            <p className="font-space-mono text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              I moved to Bangalore with a one-way general ticket and blind faith. 
              Night shifts at top bars funded my studies at a tier-100 college, where 
              failing subjects became the redirection I needed to master Physics, 
              Computer Science, and the art of human psychology.
            </p>
            <p className="font-space-mono text-sm leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Today, I drive Founders Office strategy and Growth for innovative 
              companies, blending technical rigor with street-tested intuition.
            </p>
          </motion.div>

          {/* Right — Quote */}
          <motion.div {...fadeInView(0.2)} className="flex flex-col justify-center">
            <div className="border-l-2 pl-5" style={{ borderColor: "var(--primary)" }}>
              <p className="font-space-mono text-sm italic leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                &ldquo;Your work is going to fill a large part of your life, and the
                only way to be truly satisfied is to do what you believe is great work.&rdquo;
              </p>
              <cite className="font-oswald text-xs uppercase tracking-widest mt-3 block not-italic" style={{ color: "var(--primary)" }}>
                — Steve Jobs
              </cite>
            </div>
          </motion.div>
        </div>

        {/* Skill rows */}
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {skills.map((skill, i) => (
            <motion.div
              key={skill.category}
              {...fadeInView(0.1 * i)}
              className="group flex flex-col md:flex-row md:items-center gap-4 py-8 border-b transition-colors duration-300 cursor-default"
              style={{ borderColor: "var(--border)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = skill.color; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--border)"; }}
            >
              <div className="md:w-40 flex-shrink-0">
                <span
                  className="font-oswald text-2xl uppercase transition-colors duration-300"
                  style={{ color: "var(--fg-subtle)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = skill.color; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-subtle)"; }}
                >
                  {skill.category}
                </span>
              </div>
              <div className="flex flex-wrap gap-2 flex-1">
                {skill.items.map(item => <span key={item} className="tag">{item}</span>)}
              </div>
              <div
                className="text-xl flex-shrink-0 transition-colors duration-300"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = skill.color; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                →
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mentality Showcase */}
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[
            { t: "Street Smart", d: "Bar counters to DJ booths—hustling in Bangalore's nightlife taught me more about human psychology than any textbook.", c: "var(--primary)" },
            { t: "Book Smart",   d: "Physics & CS major. Engineering automated workflows for global auditors and scaling user bases by 20% through data.", c: "var(--secondary)" },
            { t: "Spiritual Smart", d: "Navigating chaos with stoicism. Finding pattern in the noise of growth, tech, and life.", c: "var(--tertiary)" }
          ].map((m, i) => (
            <motion.div key={m.t} {...fadeInView(0.1 * i)} className="p-8 border grad-border" style={{ borderColor: "var(--border)" }}>
              <div className="font-oswald text-xl uppercase mb-3" style={{ color: m.c }}>{m.t}</div>
              <p className="font-space-mono text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>{m.d}</p>
            </motion.div>
          ))}
        </div>

        {/* Philosophy / CTA card */}
        <motion.div
          {...fadeInView(0.3)}
          className="mt-20 relative border p-10 overflow-hidden grad-border"
          style={{ borderColor: "var(--border)" }}
        >
          <div
            className="absolute right-8 top-1/2 -translate-y-1/2 font-noto-jp text-8xl pointer-events-none select-none"
            style={{ color: "var(--primary)", opacity: 0.04 }}
            aria-hidden
          >
            無
          </div>
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-1">
              <h3 className="font-oswald text-3xl uppercase mb-2" style={{ color: "var(--foreground)" }}>
                &ldquo;Saying no is{" "}
                <span style={{ color: "var(--primary)", textShadow: "0 0 20px var(--primary-glow)" }}>
                  saving time.
                </span>&rdquo;
              </h3>
              <p className="font-space-mono text-xs tracking-widest" style={{ color: "var(--fg-muted)" }}>
                I value audacity and curiosity in every conversation.
              </p>
            </div>
            <a
              href="#contact"
              className="font-space-mono text-xs uppercase tracking-widest px-6 py-3 border flex-shrink-0 transition-all duration-300"
              style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--secondary)"; el.style.color = "var(--secondary)"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--fg-muted)"; }}
            >
              Still reading? Let&apos;s chat →
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
