"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useTheme } from "./ThemeProvider";

const navLinks = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

const MARQUEE_ITEMS = [
  "Growth & Operations",
  "Tech Builder",
  "Bartender",
  "DJ",
  "Bleach Fan",
  "Always Moving",
  "Nujabes Listener",
  "比満洲",
  "Curiosity Maxed",
];

function ThemeToggle() {
  const { theme, toggle } = useTheme();
  return (
    <button
      id="theme-toggle-btn"
      onClick={toggle}
      aria-label="Toggle theme"
      className="relative w-12 h-6 rounded-full border flex items-center transition-all duration-500"
      style={{
        borderColor: theme === "dark" ? "var(--secondary)" : "var(--primary)",
        background: "var(--surface)",
      }}
    >
      <span
        className="absolute w-4 h-4 rounded-full transition-all duration-500 flex items-center justify-center text-[8px]"
        style={{
          left: theme === "light" ? "calc(100% - 20px)" : "4px",
          background: theme === "dark" ? "var(--secondary)" : "var(--primary)",
          boxShadow: theme === "dark" ? "0 0 8px var(--secondary-glow)" : "0 0 8px var(--primary-glow)",
        }}
      >
        {theme === "dark" ? "☽" : "☀"}
      </span>
    </button>
  );
}

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Marquee tape above navbar */}
      <div
        className="fixed top-0 left-0 right-0 z-50 overflow-hidden h-6 flex items-center"
        style={{ background: "var(--primary)", opacity: scrolled ? 0.9 : 1 }}
      >
        <div className="marquee-track whitespace-nowrap select-none">
          {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
            <span key={i} className="font-oswald text-[10px] uppercase tracking-[0.25em] mr-6" style={{ color: "#fff" }}>
              {item} {i % 2 === 0 ? "⬥" : "◇"}
            </span>
          ))}
        </div>
      </div>

      {/* Main nav bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed top-6 left-0 right-0 z-50 transition-all duration-500"
        style={{
          background: scrolled ? "color-mix(in srgb, var(--background) 90%, transparent)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div
              className="w-8 h-8 flex items-center justify-center border transition-all duration-300"
              style={{ borderColor: "var(--primary)", background: "transparent" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "var(--primary)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <span className="font-noto-jp text-sm font-bold" style={{ color: "var(--primary)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "#fff"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}>
                日
              </span>
            </div>
            <span className="font-oswald text-sm tracking-[0.18em] uppercase" style={{ color: "var(--foreground)" }}>
              Himanshu
            </span>
          </Link>

          {/* Desktop */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <Link key={link.label} href={link.href}
                className="font-space-mono text-xs uppercase tracking-widest slash-line transition-colors duration-300"
                style={{ color: "var(--fg-muted)" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--secondary)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
              >
                {link.label}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href="mailto:himanshu.resilience@gmail.com"
              className="font-space-mono text-xs uppercase tracking-widest border px-4 py-2 transition-all duration-300"
              style={{ borderColor: "var(--primary)", color: "var(--primary)" }}
              onMouseEnter={e => { const el = e.currentTarget; el.style.background = "var(--primary)"; el.style.color = "#fff"; }}
              onMouseLeave={e => { const el = e.currentTarget; el.style.background = "transparent"; el.style.color = "var(--primary)"; }}
            >
              Hire Me
            </a>
          </div>

          {/* Mobile burger */}
          <div className="md:hidden flex items-center gap-4">
            <ThemeToggle />
            <button id="mobile-menu-toggle" onClick={() => setMenuOpen(!menuOpen)} className="flex flex-col gap-1.5 p-2">
              <motion.span animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }} className="block w-6 h-px" style={{ background: "var(--foreground)" }} />
              <motion.span animate={menuOpen ? { opacity: 0 } : { opacity: 1 }} className="block w-6 h-px" style={{ background: "var(--foreground)" }} />
              <motion.span animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }} className="block w-6 h-px" style={{ background: "var(--foreground)" }} />
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", duration: 0.35 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ background: "var(--background)" }}
          >
            {navLinks.map((link, i) => (
              <motion.div key={link.label} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}>
                <Link href={link.href} onClick={() => setMenuOpen(false)}
                  className="font-oswald text-5xl uppercase tracking-widest transition-colors"
                  style={{ color: "var(--foreground)" }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--primary)"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--foreground)"; }}
                >
                  {link.label}
                </Link>
              </motion.div>
            ))}
            <div className="katana-line w-32 mt-4" />
            <a href="mailto:himanshu.resilience@gmail.com"
              className="font-space-mono text-xs uppercase tracking-widest border px-6 py-3 transition-all"
              style={{ borderColor: "var(--primary)", color: "var(--primary)" }}>
              Hire Me
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
