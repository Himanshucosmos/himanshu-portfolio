"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const NIGHT_SHIFT_DATA = [
  {
    title: "Mixology",
    japanese: "調奏",
    description: "Crafting experiences at Kitty Su and Knowhere. Bartending wasn't just a job—it was a deep dive into human psychology, learning to read the room and the people in it.",
    tags: ["Psychology", "Hospitality", "Speed", "Storytelling"],
    color: "var(--primary)",
    glow: "rgba(255, 69, 0, 0.2)"
  },
  {
    title: "DJing",
    japanese: "音色",
    description: "Curation as an art form. From lo-fi beats to high-energy club sets, I explore the synergy between rhythm and emotion, finding the common thread in every crowd.",
    tags: ["Music Theory", "Curation", "Performance", "Vinyl Culture"],
    color: "var(--secondary)",
    glow: "rgba(0, 212, 212, 0.2)"
  }
];

export function NightShiftSection() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  const fadeInView = (delay = 0) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.8, delay, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] }
  });

  return (
    <section id="night-shift" className="relative py-32 overflow-hidden bg-[#05040a]">
      {/* Noir Noise / Grain */}
      <div className="absolute inset-0 noise-overlay opacity-30 pointer-events-none" aria-hidden />
      
      {/* Neon Blobs */}
      <div className="absolute top-1/4 left-0 w-96 h-96 rounded-full bg-purple-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-teal-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12">
          
          {/* Left Side — Vertical Label & Intro */}
          <div className="md:w-1/3 flex gap-8">
            <motion.div {...fadeInView()} className="font-noto-jp text-5xl leading-tight" style={{ writingMode: "vertical-rl", color: "var(--fg-muted)", opacity: 0.4 }}>
              夜勤 <span className="text-sm tracking-widest font-space-mono ml-4 opacity-50 uppercase">The Night Shift</span>
            </motion.div>
            
            <motion.div {...fadeInView(0.1)} className="flex flex-col justify-end pb-8">
              <h2 className="font-oswald text-6xl uppercase leading-none mb-6 text-white">
                The <span style={{ color: "var(--primary)" }}>Noir</span> <br /> 
                <span className="text-outline-secondary">Duality.</span>
              </h2>
              <p className="font-space-mono text-sm leading-relaxed text-gray-400 max-w-xs">
                While the world sleeps, I explore the synergy between human psychology, 
                rhythm, and the art of curation. From the high-pressure environment of 
                Bangalore&apos;s top bars to the booth — this is the street-smart edge 
                that feeds my professional intuition.
              </p>
            </motion.div>
          </div>

          {/* Right Side — Interactive Cards */}
          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {NIGHT_SHIFT_DATA.map((item, i) => (
              <motion.div
                key={item.title}
                {...fadeInView(0.2 + i * 0.1)}
                onMouseEnter={() => setHoveredIdx(i)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group relative p-10 border transition-all duration-500 grad-border h-full flex flex-col justify-between"
                style={{ 
                  borderColor: hoveredIdx === i ? item.color : "rgba(255,255,255,0.05)",
                  background: hoveredIdx === i ? "rgba(255,255,255,0.02)" : "transparent"
                }}
              >
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <span className="font-oswald text-4xl uppercase text-white">{item.title}</span>
                    <span className="font-noto-jp text-2xl opacity-20 text-white">{item.japanese}</span>
                  </div>
                  <p className="font-space-mono text-xs leading-relaxed text-gray-400 mb-8">
                    {item.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-[10px] font-space-mono uppercase tracking-widest border border-white/10 text-gray-400">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Aesthetic Decor */}
                <div className="absolute bottom-4 right-4 opacity-10 font-noto-jp text-6xl pointer-events-none select-none text-white">
                  {item.japanese}
                </div>
                
                {hoveredIdx === i && (
                  <div className="absolute inset-0 pointer-events-none" style={{ background: `linear-gradient(135deg, ${item.glow} 0%, transparent 50%)` }} />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
