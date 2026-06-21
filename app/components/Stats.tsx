"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "1M+",  label: "Rows Processed" },
  { value: "10+",  label: "Pipelines Built" },
  { value: "5+",   label: "AI Models" },
  { value: "∞",   label: "Cups of Coffee" },
];

export default function Stats() {
  return (
    <section className="py-12 md:py-16" style={{background:"var(--bg-surface)"}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}>
              <div className="font-display font-extrabold gradient-text mb-1 md:mb-2 leading-none"
                style={{fontSize:"clamp(36px,8vw,60px)"}}>
                {stat.value}
              </div>
              <div className="text-xs uppercase tracking-[0.12em]"
                style={{fontFamily:"var(--font-mono)", color:"rgba(var(--text-rgb),0.38)"}}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
