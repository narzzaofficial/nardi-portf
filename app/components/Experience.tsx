"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { getAll, COLLECTIONS, Experience as ExpType } from "../../lib/firestore";

export default function Experience() {
  const [exps, setExps] = useState<ExpType[]>([]);

  useEffect(() => {
    async function fetchExperience() {
      try {
        const data = await getAll<ExpType>(COLLECTIONS.EXPERIENCE);
        setExps(data);
      } catch (err) {
        console.error("Failed to fetch experience:", err);
      }
    }
    fetchExperience();
  }, []);

  if (exps.length === 0) return null;

  return (
    <section id="experience" className="py-16 md:py-28">
      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#4f8ef7",textTransform:"uppercase",marginBottom:"1rem"}}>
            Experience
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(28px,5vw,48px)",color:"#eeeef2"}}>
            Work <span className="gradient-text">History.</span>
          </motion.h2>
        </div>

        <div className="space-y-4">
          {exps.map((e, i) => (
            <motion.div key={e.id || i} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{duration:0.55,delay:i*0.15}}
              className="card-glow p-6 md:p-8">
              <div className="flex flex-col gap-1 mb-1">
                <h3 className="font-display font-bold text-lg md:text-xl" style={{color:"#eeeef2"}}>{e.role}</h3>
                <span style={{fontFamily:"var(--font-mono)",fontSize:"11px",color:"rgba(238,238,242,0.3)",letterSpacing:"0.05em"}}>{e.period}</span>
              </div>
              <p className="font-medium text-sm mb-4" style={{color:"#4f8ef7"}}>{e.company}</p>
              <p className="text-sm md:text-[15px] leading-[1.75] mb-5" style={{color:"rgba(238,238,242,0.5)"}}>{e.description}</p>
              <div className="flex flex-wrap gap-2">
                {e.focus?.map((f,fi)=>(
                  <span key={fi} className="tag">{f}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
