"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, Twitter } from "lucide-react";

export function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 relative border-t border-white/10 mt-10">
      <div className="absolute inset-x-0 bottom-0 h-[500px] w-full bg-primary/5 blur-[100px] pointer-events-none rounded-full" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-6 max-w-lg"
          >
            <h2 className="text-5xl md:text-7xl font-bold tracking-tight text-balance">
              Let&apos;s create something <span className="text-primary">together.</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Always open to discussing product design work or partnership opportunities.
            </p>
            <a 
              href="mailto:himanshu.resilience@gmail.com" 
              className="inline-flex items-center gap-2 text-2xl font-medium mt-4 group hover:text-primary transition-colors"
            >
              <Mail className="h-6 w-6 group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
              himanshu.resilience@gmail.com
            </a>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <a href="https://github.com/himanshucosmos" target="_blank" rel="noreferrer" className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
              <Github className="h-6 w-6" />
            </a>
            <a href="https://www.linkedin.com/in/himanshucosmos" target="_blank" rel="noreferrer" className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
              <Linkedin className="h-6 w-6" />
            </a>
            <a href="https://x.com/himanshucosmos" target="_blank" rel="noreferrer" className="p-4 rounded-full border border-white/10 hover:bg-white/5 transition-colors">
              <Twitter className="h-6 w-6" />
            </a>
          </motion.div>
        </div>
        
        <div className="mt-32 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-muted-foreground text-sm">
          <p>© {new Date().getFullYear()} Himanshu. All rights reserved.</p>
          <div className="mt-4 md:mt-0">
            <p>Designed and built with Next.js & Framer Motion.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
