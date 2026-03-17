"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const EXPERIENCES = [
  {
    role: "Founder's Office - Product & Growth",
    company: "Turia.in",
    duration: "Jan 2026 – Present",
    description: "Driving product and growth initiatives directly with the founders, combining tech skills with business strategy.",
    tags: ["Growth", "Product Management", "Strategy"],
  },
  {
    role: "Bartender & Experience Manager",
    company: "Naked and Famous",
    duration: "Mar 2026 – Present",
    description: "Managing operations and crafting experiences. Deepening my understanding of people, hospitality, and creating memorable nights.",
    tags: ["Hospitality", "Operations", "DJing"],
  },
  {
    role: "Growth Operations",
    company: "Dhiway",
    duration: "Sep 2025 – Jan 2026",
    description: "Led operational improvements and growth apprenticeships, utilizing technical skills including Rust for process optimization.",
    tags: ["Operations", "Rust", "Tech"],
  },
  {
    role: "Growth Manager",
    company: "Karbon Business",
    duration: "Sep 2024 – Sep 2025",
    description: "Led the AI Accountant Team growth. Drove massive user base surges via A/B testing and HubSpot CRM management.",
    tags: ["Marketing", "SaaS", "HubSpot"],
  }
];

export function WorkSection() {
  return (
    <section id="work" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">Experience</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EXPERIENCES.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="glassmorphism p-8 rounded-3xl flex flex-col justify-between group hover:bg-white/5 transition-colors"
            >
              <div>
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-2xl font-bold group-hover:text-primary transition-colors inline-flex items-center gap-2">
                    {exp.company}
                    <ArrowUpRight className="h-5 w-5 opacity-0 -translate-y-2 translate-x-2 group-hover:opacity-100 group-hover:text-secondary group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </h3>
                  <span className="text-sm text-muted-foreground font-mono">{exp.duration}</span>
                </div>
                <h4 className="text-lg font-medium text-white/80 mb-4">{exp.role}</h4>
                <p className="text-muted-foreground mb-8">
                  {exp.description}
                </p>
              </div>
              
              <div className="flex flex-wrap gap-2 mt-auto">
                {exp.tags.map(tag => (
                  <span key={tag} className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-xs font-medium text-secondary">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
