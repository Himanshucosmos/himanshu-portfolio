"use client";

import { motion } from "framer-motion";
import { ArrowDownRight } from "lucide-react";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      {/* Background gradients */}
      <div className="absolute inset-0 bg-background" />
      <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] opacity-70" />
      <div className="absolute top-1/2 right-1/4 translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/10 rounded-full blur-[120px] opacity-70" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-start gap-6"
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 py-1.5 px-3 text-sm font-medium backdrop-blur-sm"
          >
            <span className="flex h-2 w-2 rounded-full bg-secondary mr-2 animate-pulse"></span>
            Making a dent in the Universe 🌌
          </motion.div>

          <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter text-balance">
            <span className="block text-white/50">Growth &</span>
            <span className="block text-primary">Operations.</span>
          </h1>

          <p className="max-w-2xl text-lg md:text-xl text-muted-foreground mt-4 font-sans">
            Hi, I&apos;m Himanshu. I specialize in full-time Growth roles while balancing part-time Tech, Bartending, and DJing. I bring a blend of audacity, curiosity, and resilience to every project.
          </p>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mt-8 flex gap-4"
          >
            <a href="#work" className="group inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground px-8 py-4 text-sm font-medium transition-all hover:bg-primary/90 hover:scale-105 active:scale-95">
              View Experience
              <ArrowDownRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:translate-y-1" />
            </a>
            <a href="#about" className="group inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-sm font-medium transition-all hover:text-secondary hover:border-secondary/50 hover:scale-105 active:scale-95 backdrop-blur-sm">
              Read my story
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative scroll indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent via-muted-foreground to-transparent animate-pulse" />
      </motion.div>
    </section>
  );
}
