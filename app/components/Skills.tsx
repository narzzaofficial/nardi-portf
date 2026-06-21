"use client";

import { motion } from "framer-motion";
import { Code2, Database, Bot } from "lucide-react";

const categories = [
  { title: "Web Development",  icon: Code2,    accent: "#4f8ef7", skills: ["React", "Next.js", "Tailwind CSS", "TypeScript", "Node.js", "FastAPI"] },
  { title: "Data Engineering", icon: Database, accent: "#8b5cf6", skills: ["BigQuery", "SQL", "ETL Pipelines", "Data Modeling", "Python", "Metabase"] },
  { title: "AI Development",   icon: Bot,      accent: "#34d399", skills: ["LangChain", "LangGraph", "LLM Integration", "RAG", "Prompt Engineering", "OpenAI API"] },
];

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#8b5cf6",textTransform:"uppercase",marginBottom:"1rem"}}>
            Core Skills
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(28px,5vw,48px)",color:"var(--text)"}}>
            My Tech <span className="gradient-text">Stack.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div key={i} initial={{opacity:0,y:24}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.12}}
              className="card-glow p-6">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border text-sm font-semibold mb-5"
                style={{background:`${cat.accent}15`,borderColor:`${cat.accent}30`,color:cat.accent}}>
                <cat.icon className="w-4 h-4" />
                {cat.title}
              </div>
              {/* On mobile: show as 2-column pill grid instead of list */}
              <div className="flex flex-wrap gap-2 md:hidden">
                {cat.skills.map((skill, si) => (
                  <span key={si} className="px-2.5 py-1 rounded-md text-xs"
                    style={{background:"rgba(var(--white-rgb),0.06)", border:"1px solid rgba(var(--white-rgb),0.1)", color:"var(--text-muted)"}}>
                    {skill}
                  </span>
                ))}
              </div>
              {/* On desktop: list style */}
              <ul className="hidden md:block space-y-2.5">
                {cat.skills.map((skill, si) => (
                  <li key={si} className="flex items-center gap-3 text-[15px]" style={{color:"var(--text-muted)"}}>
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{background:cat.accent,opacity:0.6}}></span>
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
