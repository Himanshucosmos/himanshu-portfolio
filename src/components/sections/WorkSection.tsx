"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

// Real public repos from GitHub (Himanshucosmos)
// Pre-populated from API — component also fetches live

interface Project {
  id: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  live: string | null;
  repo: string | null;
  color: string;
  glow: string;
  stars?: number;
  private?: boolean;
}

const STATIC_PROJECTS: Project[] = [
  {
    id: "01",
    name: "ai-native-news-reporting",
    title: "The Chronicle",
    subtitle: "AI-Native News Aggregator",
    description:
      "Autonomous AI news surface that fetches global RSS feeds, synthesizes them with algorithmic sentiment analysis, and serves a premium editorial digest — updating every 30 minutes without human intervention.",
    tags: ["TypeScript", "Next.js", "AI", "ISR"],
    live: "https://ai-native-news-reporting.vercel.app",
    repo: "https://github.com/Himanshucosmos/ai-native-news-reporting",
    color: "var(--primary)",
    glow: "rgba(255,69,0,0.25)",
  },
  {
    id: "02",
    name: "bundlebuild_",
    title: "BundleBuild",
    subtitle: "AI Resume + ATS Scorer",
    description:
      "A premium resume builder with built-in ATS scoring. AI-powered recommendations help job seekers craft tailored, machine-readable resumes that actually get past filters.",
    tags: ["JavaScript", "Next.js", "AI", "ATS"],
    live: "https://bundlebuild.vercel.app",
    repo: "https://github.com/Himanshucosmos/bundlebuild_",
    color: "var(--secondary)",
    glow: "rgba(0,212,212,0.25)",
  },
  {
    id: "03",
    name: "himanshu-portfolio",
    title: "Portfolio v1",
    subtitle: "Previous Portfolio Build",
    description:
      "Earlier iteration of my personal portfolio — the beginning of the design system and personal branding that evolved into this site.",
    tags: ["TypeScript", "Next.js", "Design"],
    live: "https://himanshu-portfolio-umber.vercel.app",
    repo: "https://github.com/Himanshucosmos/himanshu-portfolio",
    color: "var(--tertiary)",
    glow: "rgba(139,92,246,0.25)",
  },
];

// Vinland Saga Norse rune accent
function RuneAccent() {
  return (
    <div className="hidden md:flex flex-col items-center gap-1 absolute right-14 top-1/3 -translate-y-1/2 select-none pointer-events-none" aria-hidden>
      {["ᚦ","ᚢ","ᛁ","ᚾ","ᛞ"].map((r, i) => (
        <span key={i} className="font-noto-jp text-sm" style={{ color: "var(--gold)", opacity: 0.12 + i * 0.03 }}>
          {r}
        </span>
      ))}
    </div>
  );
}

export function WorkSection() {
  const [hovered, setHovered] = useState<string | null>(null);
  const [projects, setProjects] = useState(STATIC_PROJECTS);

  // Fetch live GitHub repos to enrich descriptions/star counts
  useEffect(() => {
    fetch("https://api.github.com/users/Himanshucosmos/repos?type=public&sort=updated&per_page=20")
      .then(r => r.json())
      .then((repos: Array<{ name: string; stargazers_count: number; description: string | null }>) => {
        setProjects(prev => prev.map(p => {
          const match = repos.find((r) => r.name === p.name);
          if (match) {
            return {
              ...p,
              stars: match.stargazers_count,
              description: match.description || p.description,
            };
          }
          return p;
        }));
      })
      .catch(() => {}); // Silently fall back to static data
  }, []);

  return (
    <section id="work" className="relative py-32 overflow-hidden" style={{ background: "var(--background)" }}>
      {/* Norse rune column on right edge */}
      <RuneAccent />

      {/* Ambient blob */}
      <div className="blob" style={{ width: 500, height: 400, bottom: 0, right: 0,
        background: "radial-gradient(circle, var(--blob-2) 0%, transparent 70%)" }} aria-hidden />

      <div className="max-w-7xl mx-auto px-6">
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-4 mb-16"
        >
          <div className="h-px w-12" style={{ background: "var(--tertiary)" }} />
          <span className="font-space-mono text-xs tracking-[0.25em] uppercase" style={{ color: "var(--tertiary)" }}>
            Chapter 03 — Work
          </span>
        </motion.div>

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row justify-between items-start gap-8 mb-16"
        >
          <h2 className="font-oswald uppercase leading-none" style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
            <span className="block" style={{ color: "var(--fg-subtle)" }}>Selected</span>
            <span className="block" style={{ color: "var(--foreground)" }}>Projects.</span>
          </h2>
          <div className="md:max-w-xs self-end">
            <p className="font-space-mono text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
              Public repositories from GitHub + notable work. Each a different chapter of the same story.
            </p>
            <a
              href="https://github.com/Himanshucosmos"
              target="_blank"
              rel="noreferrer"
              className="font-space-mono text-xs uppercase tracking-widest mt-3 inline-flex items-center gap-2 transition-colors duration-300"
              style={{ color: "var(--fg-muted)" }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--secondary)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}
            >
              View GitHub →
            </a>
          </div>
        </motion.div>

        {/* Project rows */}
        <div className="border-t" style={{ borderColor: "var(--border)" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
              className="group relative border-b py-8 transition-all duration-300"
              style={{
                borderColor: hovered === project.id ? project.color : "var(--border)",
              }}
            >
              {/* Left color bar */}
              <div className="absolute left-0 top-0 bottom-0 w-[2px] transition-all duration-500"
                style={{ background: project.color, opacity: hovered === project.id ? 1 : 0 }} />

              {/* Row glow */}
              {hovered === project.id && (
                <div className="absolute inset-0 pointer-events-none"
                  style={{ background: `linear-gradient(90deg, ${project.glow} 0%, transparent 40%)`, opacity: 0.3 }} />
              )}

              <div className="grid grid-cols-12 gap-4 items-start pl-4">
                {/* Number */}
                <div className="col-span-1 hidden md:block">
                  <span className="font-oswald text-4xl font-bold transition-colors duration-300"
                    style={{ color: hovered === project.id ? project.color : "var(--border)" }}>
                    {project.id}
                  </span>
                </div>

                {/* Title + subtitle */}
                <div className="col-span-12 md:col-span-4">
                  <div className="flex items-center gap-2">
                    <h3 className="font-oswald text-xl uppercase tracking-wide" style={{ color: "var(--foreground)" }}>
                      {project.title}
                    </h3>
                  </div>
                  <p className="font-space-mono text-xs mt-1" style={{ color: "var(--fg-muted)" }}>{project.subtitle}</p>
                  {project.stars !== undefined && (
                    <p className="font-space-mono text-[10px] mt-1" style={{ color: "var(--gold)" }}>
                      ★ {project.stars}
                    </p>
                  )}
                </div>

                {/* Description + tags */}
                <div className="col-span-12 md:col-span-5">
                  <p className="font-space-mono text-xs leading-relaxed" style={{ color: "var(--fg-muted)" }}>
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {project.tags.map(tag => (
                      <span key={tag} className="tag" style={{ borderColor: hovered === project.id ? `${project.color}50` : "var(--border)" }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Links */}
                <div className="col-span-12 md:col-span-2 flex flex-col items-start md:items-end gap-2">
                  {project.live && (
                    <a href={project.live} target="_blank" rel="noreferrer"
                      className="font-space-mono text-xs uppercase tracking-widest flex items-center gap-1 transition-colors duration-300"
                      style={{ color: hovered === project.id ? project.color : "var(--fg-muted)" }}>
                      Live →
                    </a>
                  )}
                  {project.repo && (
                    <a href={project.repo} target="_blank" rel="noreferrer"
                      className="font-space-mono text-xs uppercase tracking-widest flex items-center gap-1 transition-colors duration-300"
                      style={{ color: "var(--fg-muted)" }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = "var(--secondary)"; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = "var(--fg-muted)"; }}>
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Vinland Saga / Norse inspirational line */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-16 border-t pt-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{ borderColor: "var(--border)" }}
        >
          <div className="flex items-center gap-4">
            <span className="font-noto-jp text-2xl" style={{ color: "var(--gold)", opacity: 0.5 }}>ᚦ</span>
            <p className="font-space-mono text-xs italic" style={{ color: "var(--fg-muted)" }}>
              &ldquo;A real warrior needs no sword.&rdquo; — <span style={{ color: "var(--gold)" }}>Thors, Vinland Saga</span>
            </p>
          </div>
          <a
            href="#contact"
            className="font-oswald uppercase tracking-widest text-sm border px-8 py-3 transition-all duration-300"
            style={{ borderColor: "var(--border)", color: "var(--fg-muted)" }}
            onMouseEnter={e => { const el = e.currentTarget; el.style.borderColor = "var(--primary)"; el.style.color = "var(--foreground)"; el.style.boxShadow = "0 0 20px rgba(255,69,0,0.2)"; }}
            onMouseLeave={e => { const el = e.currentTarget; el.style.borderColor = "var(--border)"; el.style.color = "var(--fg-muted)"; el.style.boxShadow = "none"; }}
          >
            Build Something Together
          </a>
        </motion.div>
      </div>
    </section>
  );
}
