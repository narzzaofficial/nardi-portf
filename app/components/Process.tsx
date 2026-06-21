"use client";

import { motion } from "framer-motion";
import { Search, Cog, Rocket, BarChart3 } from "lucide-react";

const steps = [
  { icon:Search,    title:"Discovery",    desc:"Analyzing raw data sources and designing optimal schemas." },
  { icon:Cog,       title:"Engineering",  desc:"Building ETL pipelines with SQL, BigQuery, and Python." },
  { icon:Rocket,    title:"AI Layer",     desc:"Developing LLM agents and RAG systems for automation." },
  { icon:BarChart3, title:"Delivery",     desc:"Creating dashboards and web apps to expose insights." },
];

export default function Process() {
  return (
    <section className="py-16 md:py-28" style={{background:"var(--bg-surface)"}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16 text-center">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#4f8ef7",textTransform:"uppercase",marginBottom:"1rem"}}>
            How I Work
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(28px,5vw,48px)",color:"var(--text)"}}>
            My <span className="gradient-text">Process.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {steps.map((s, i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.12}}
              className="card-glow p-5 md:p-6 text-center">
              <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                style={{background:"rgba(79,142,247,0.1)",border:"1px solid rgba(79,142,247,0.2)"}}>
                <s.icon className="w-5 h-5" style={{color:"#4f8ef7"}} />
              </div>
              <h3 className="font-display font-semibold text-sm md:text-base mb-2" style={{color:"var(--text)"}}>{s.title}</h3>
              <p className="text-xs md:text-sm leading-relaxed" style={{color:"var(--text-muted)"}}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
