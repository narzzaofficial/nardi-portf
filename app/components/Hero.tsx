"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import { Github, Linkedin } from "./icons";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center pt-16 overflow-hidden">
      {/* Glow orbs */}
      <div className="absolute top-1/4 -left-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{background:"rgba(79,142,247,0.07)"}} />
      <div className="absolute bottom-1/4 -right-20 w-[400px] h-[400px] rounded-full blur-[100px] pointer-events-none" style={{background:"rgba(139,92,246,0.07)"}} />

      <div className="relative z-10 max-w-6xl mx-auto px-5 sm:px-6 lg:px-8 w-full py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.9 }}
            className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 mb-6"
            style={{background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)"}}
          >
            <span className="flex h-2 w-2 rounded-full bg-emerald-400 shrink-0" style={{boxShadow:"0 0 6px #34d399"}}></span>
            <span className="text-xs font-medium" style={{color:"rgba(238,238,242,0.6)", fontFamily:"var(--font-mono)", letterSpacing:"0.05em"}}>
              Available for Opportunities
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 2.0, ease: [0.21,0.47,0.32,0.98] }}
            className="font-display font-extrabold leading-[1.05] mb-5"
            style={{fontSize:"clamp(40px, 10vw, 88px)", letterSpacing:"-0.03em", color:"#eeeef2"}}
          >
            Hi, I'm{" "}
            <span className="gradient-text">Nardi.</span>
            <br />
            Data & AI
            <br />
            Engineer.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.15 }}
            className="text-base md:text-lg mb-8 max-w-lg leading-[1.75]"
            style={{color:"rgba(238,238,242,0.5)"}}
          >
            Building robust data systems, intelligent AI-powered tools, and seamless
            full-stack applications — transforming raw data into actionable insights.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 2.3 }}
            className="flex flex-col sm:flex-row gap-3"
          >
            <Link
              href="#projects"
              className="group inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{background:"#eeeef2", color:"#0d0d0f"}}
            >
              View My Work
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center justify-center px-6 py-3.5 rounded-xl font-semibold text-sm transition-all"
              style={{background:"rgba(255,255,255,0.06)", border:"1px solid rgba(255,255,255,0.1)", color:"#eeeef2"}}
              onMouseEnter={e=>(e.currentTarget.style.background="rgba(255,255,255,0.1)")}
              onMouseLeave={e=>(e.currentTarget.style.background="rgba(255,255,255,0.06)")}
            >
              Get in Touch <Mail className="ml-2 w-4 h-4" />
            </a>
          </motion.div>

          {/* Social */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 2.5 }}
            className="mt-10 flex items-center gap-4"
          >
            <span className="text-xs uppercase tracking-[0.2em]" style={{color:"rgba(238,238,242,0.22)", fontFamily:"var(--font-mono)"}}>Find me on</span>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-colors" style={{color:"rgba(238,238,242,0.35)"}}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="p-2 rounded-lg transition-colors" style={{color:"rgba(238,238,242,0.35)"}}>
              <Github className="w-5 h-5" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
