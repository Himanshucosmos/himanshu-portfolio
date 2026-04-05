"use client";

import { motion } from "framer-motion";

const socials = [
  { label: "GitHub",      href: "https://github.com/Himanshucosmos",                       handle: "@Himanshucosmos" },
  { label: "X / Twitter", href: "https://x.com/himanshucosmos",                            handle: "@himanshucosmos" },
  { label: "LinkedIn",    href: "https://www.linkedin.com/in/himanshucosmos/",             handle: "himanshucosmos" },
];

export function ContactSection() {
  return (
    <section id="contact" className="relative py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Big kanji BG */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none" aria-hidden>
        <span className="font-noto-jp leading-none" style={{ fontSize: "20rem", color: "var(--foreground)", opacity: 0.025 }}>絆</span>
      </div>
      {/* Blob accent */}
      <div className="blob" style={{ width: 400, height: 400, bottom: 0, right: "20%",
        background: "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)" }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Section label */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          className="flex items-center gap-4 mb-16">
          <div className="h-px w-12" style={{ background: "var(--gold)" }} />
          <span className="font-space-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--gold)" }}>
            Chapter 04 — Contact
          </span>
        </motion.div>

        {/* Giant headline */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }} className="mb-16">
          <h2 className="font-oswald uppercase leading-none tracking-tight" style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}>
            <span className="block" style={{ color: "var(--foreground)" }}>Let&apos;s</span>
            <span className="block" style={{ color: "var(--fg-subtle)" }}>Make</span>
            <span className="block text-outline-primary">Something.</span>
          </h2>
        </motion.div>

        <div className="katana-line mb-16" />

        <div className="grid md:grid-cols-2 gap-16">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <p className="font-space-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--fg-muted)" }}>Primary Contact</p>
            <a href="mailto:himanshu.resilience@gmail.com"
              className="group flex items-center gap-4 font-oswald text-2xl uppercase transition-colors duration-300"
              style={{ color: "var(--foreground)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
            >
              <span>himanshu.resilience</span>
              <span style={{ color: "var(--fg-muted)" }}>@gmail.com</span>
              <span className="transition-transform duration-300 group-hover:translate-x-2">→</span>
            </a>

            <div className="mt-12 space-y-1">
              <p className="font-space-mono text-xs tracking-widest uppercase mb-4" style={{ color: "var(--fg-muted)" }}>Socials</p>
              {socials.map(s => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                  className="group flex items-center justify-between border-b py-4 transition-colors duration-300"
                  style={{ borderColor: "var(--border)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderBottomColor = "var(--border)"; }}
                >
                  <span className="font-oswald uppercase text-xl transition-colors duration-300"
                    style={{ color: "var(--fg-subtle)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-subtle)"; }}>
                    {s.label}
                  </span>
                  <span className="font-space-mono text-xs transition-colors duration-300"
                    style={{ color: "var(--fg-muted)" }}
                    onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                    onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}>
                    {s.handle}
                  </span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — availability card */}
          <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col gap-8">
            <div className="border p-8 relative transition-all duration-500 grad-border" style={{ borderColor: "var(--border)", background: "var(--surface)" }}>
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "var(--secondary)" }} />
                <span className="font-space-mono text-xs uppercase tracking-widest" style={{ color: "var(--secondary)" }}>
                  Open
                </span>
              </div>

              <div className="mt-8">
                <h3 className="font-oswald text-3xl uppercase mb-4" style={{ color: "var(--foreground)" }}>Available for</h3>
                <ul className="space-y-3 font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>
                  {[
                    "Full-time Growth / Operations roles",
                    "Fractional GTM consulting",
                    "Tech project collaboration",
                    "DJ gigs & music events",
                    "Just a great conversation",
                  ].map(item => (
                    <li key={item} className="flex items-start gap-3">
                      <span className="mt-0.5 flex-shrink-0" style={{ color: "var(--primary)" }}>—</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-6 border-t" style={{ borderColor: "var(--border)" }}>
                <a href="mailto:himanshu.resilience@gmail.com" id="contact-hire-btn"
                  className="group inline-flex items-center gap-3 font-space-mono text-xs uppercase tracking-widest px-6 py-3 transition-all duration-300"
                  style={{ background: "var(--primary)", color: "#fff" }}
                  onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--secondary)"; }}
                  onMouseLeave={e => { const el = e.currentTarget; el.style.background = "var(--primary)"; }}
                >
                  <span>Send a Message</span>
                  <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
                </a>
              </div>
            </div>

            <div className="flex items-center gap-3 font-space-mono text-xs uppercase tracking-widest" style={{ color: "var(--fg-muted)" }}>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" style={{ color: "var(--primary)" }}>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" />
                <circle cx="12" cy="12" r="4" fill="currentColor" />
              </svg>
              India — Open to Remote / Relocate
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-24 pt-8 border-t"
          style={{ borderColor: "var(--border)" }}>
          <div className="font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>
            © 2026 Himanshu — All rights reserved
          </div>
          <div className="flex items-center gap-2 font-space-mono text-xs" style={{ color: "var(--fg-muted)" }}>
            <span className="font-noto-jp">比満洲</span>
            <span>— Built with passion & Next.js</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
