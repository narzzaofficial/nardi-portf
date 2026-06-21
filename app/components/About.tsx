"use client";

import { motion } from "framer-motion";
import { Terminal, Database, BrainCircuit } from "lucide-react";

const cards = [
  { icon: Database, title: "Data Engineering", desc: "BigQuery, SQL, ETL, pipelines at scale", accent: "#4f8ef7" },
  { icon: BrainCircuit, title: "AI Integration", desc: "LLMs, LangChain, RAG systems", accent: "#8b5cf6" },
  { icon: Terminal, title: "Web Development", desc: "React, Next.js, full-stack APIs", accent: "#34d399" },
];

const T = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.55, delay: i * 0.12, ease: [0.21, 0.47, 0.32, 0.98] as const },
  }),
};

export default function About() {
  return (
    <section id="about" className="py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-10 md:gap-16 items-center">
          {/* Text */}
          <div>
            <motion.p custom={0} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={T}
              style={{ fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.2em", color: "#4f8ef7", textTransform: "uppercase", marginBottom: "1rem" }}>
              About Me
            </motion.p>
            <motion.h2 custom={1} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={T}
              className="font-display font-bold mb-6"
              style={{ fontSize: "clamp(28px,5vw,48px)", lineHeight: 1.1, color: "var(--text)" }}>
              I build systems that{" "}
              <span className="gradient-text">think.</span>
            </motion.h2>

            {[
              "I am a highly motivated Data Engineer with strong capabilities in building scalable data systems, interactive dashboards, and AI-powered tools.",
              "My expertise lies at the intersection of data engineering and artificial intelligence - integrating LLMs, building automation workflows, and developing full-stack applications that solve real business problems.",
              "Whether it's writing complex SQL pipelines in BigQuery, orchestrating agentic workflows with LangGraph, or building a sleek React interface, I'm driven by making data accessible and actionable.",
            ].map((para, i) => (
              <motion.p key={i} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={T}
                className="mb-4 leading-[1.8] text-sm md:text-[15px]"
                style={{ color: "var(--text-muted)" }}>
                {para}
              </motion.p>
            ))}
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {cards.map((item, i) => (
              <motion.div key={i} custom={i + 2} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={T}
                className={`card-glow p-5 md:p-6 ${i === 2 ? "sm:col-span-2" : ""}`}>
                <div className="w-10 h-10 rounded-lg flex items-center justify-center mb-4"
                  style={{ background: `${item.accent}15` }}>
                  <item.icon className="w-5 h-5" style={{ color: item.accent }} />
                </div>
                <h3 className="font-display font-semibold text-base mb-1.5" style={{ color: "var(--text)" }}>{item.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
