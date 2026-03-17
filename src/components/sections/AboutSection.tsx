"use client";

import { motion } from "framer-motion";
import { GraduationCap, Headphones, TrendingUp } from "lucide-react";

export function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-4xl md:text-5xl font-bold tracking-tight"
          >
            A unique <br/><span className="text-white/50">trajectory.</span>
          </motion.h2>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="max-w-xl text-lg text-muted-foreground space-y-4"
          >
            <p>
              &quot;Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.&quot; — Steve Jobs
            </p>
            <p>
              I moved to Bangalore with a one-way ticket and blind faith. I funded my studies working night shifts and embraced failures as redirections. That journey led me from Science to Bartending, and now to driving Growth for innovative tech companies.
            </p>
          </motion.div>
        </div>

        {/* Bento Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 glassmorphism rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
          >
            <TrendingUp className="h-10 w-10 text-primary mb-6" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Growth & Operations</h3>
              <p className="text-muted-foreground">Expertise in Sales, Marketing, and Full-life Cycle Recruiting. Driving user acquisition and building GTM strategies from the ground up.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="glassmorphism rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
          >
            <Headphones className="h-10 w-10 text-secondary mb-6" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Hospitality & DJing</h3>
              <p className="text-muted-foreground">Bartender and aspiring DJ. Deeply curious about the intersection of people, music, and crafting unforgettable experiences.</p>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="glassmorphism rounded-3xl p-8 flex flex-col justify-between min-h-[300px]"
          >
            <GraduationCap className="h-10 w-10 text-primary mb-6" />
            <div>
              <h3 className="text-2xl font-semibold mb-2">Science & Tech</h3>
              <p className="text-muted-foreground">BSc in Physics, CS, Stats & Psych. Trained in Python Full Stack, with hands-on experience using Rust in operations.</p>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 glassmorphism rounded-3xl p-8 bg-gradient-to-br from-primary/10 to-transparent flex flex-col justify-center items-center text-center min-h-[300px]"
          >
            <h3 className="text-3xl font-bold mb-4">&quot;Saying no is saving time.&quot;</h3>
            <p className="text-muted-foreground mb-6">I value audacity and curiosity in every conversation.</p>
            <a href="#contact" className="border border-white/20 rounded-full px-6 py-3 hover:text-secondary hover:border-secondary/80 transition-colors">
              Still reading? Let&apos;s chat.
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
