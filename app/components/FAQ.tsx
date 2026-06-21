"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useState } from "react";

const faqs = [
  { question:"Are you currently looking for new opportunities?",   answer:"Yes, I am currently open to full-time roles in Data Engineering, AI Engineering, or Full-Stack Development." },
  { question:"What is your primary tech stack?",                   answer:"For data engineering I primarily use SQL (BigQuery/PostgreSQL) and Python. For AI I use LangChain/LangGraph and FastAPI. On the frontend I specialize in React, Next.js, and Tailwind CSS." },
  { question:"Do you prefer frontend or backend?",                 answer:"I enjoy full-stack development, but my passion lies in the backend — data pipelines and AI systems. However, I believe a great backend is only as good as the interface that exposes it, which is why I also invest heavily in frontend skills." },
  { question:"Where are you based and are you open to relocation?", answer:"I am currently based in Malaysia, but I am open to remote work globally or relocation depending on the opportunity." },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-28">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#4f8ef7",textTransform:"uppercase",marginBottom:"1rem"}}>
            FAQ
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(32px,5vw,48px)",color:"#eeeef2"}}>
            Quick <span className="gradient-text">Answers.</span>
          </motion.h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div key={i} initial={{opacity:0,y:10}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.3,delay:i*0.08}}
              className="card-glow overflow-hidden">
              <button onClick={()=>setOpen(open===i?null:i)}
                className="w-full flex items-center justify-between p-6 text-left focus:outline-none">
                <span className="font-display font-semibold text-base pr-4" style={{color:"#eeeef2"}}>{faq.question}</span>
                <span className="shrink-0" style={{color:"rgba(238,238,242,0.4)"}}>
                  {open===i ? <Minus className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </span>
              </button>
              <AnimatePresence>
                {open===i && (
                  <motion.div initial={{height:0,opacity:0}} animate={{height:"auto",opacity:1}} exit={{height:0,opacity:0}} transition={{duration:0.3}}>
                    <p className="px-6 pb-6 text-[15px] leading-[1.75]" style={{color:"rgba(238,238,242,0.52)"}}>{faq.answer}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
