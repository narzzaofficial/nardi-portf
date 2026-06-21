"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";
import { getAll, COLLECTIONS, Testimonial } from "../../lib/firestore";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    async function fetchTestimonials() {
      try {
        const data = await getAll<Testimonial>(COLLECTIONS.TESTIMONIALS);
        setTestimonials(data);
      } catch (err) {
        console.error("Failed to fetch testimonials:", err);
      }
    }
    fetchTestimonials();
  }, []);

  if (testimonials.length === 0) return null;

  return (
    <section className="py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#4f8ef7",textTransform:"uppercase",marginBottom:"1rem"}}>
            Testimonials
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(28px,5vw,48px)",color:"#eeeef2"}}>
            What People <span className="gradient-text">Say.</span>
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div key={t.id || i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}
              className="card-glow p-6 md:p-8 relative">
              <Quote className="absolute top-5 right-5 w-7 h-7" style={{color:"rgba(255,255,255,0.04)"}} />
              <p className="text-sm leading-[1.8] mb-6" style={{color:"rgba(238,238,242,0.55)"}}>"{t.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0"
                  style={{background:"linear-gradient(135deg,#4f8ef7,#8b5cf6)",color:"#fff"}}>
                  {t.author.charAt(0)}
                </div>
                <div>
                  <h4 className="font-semibold text-sm" style={{color:"#eeeef2"}}>{t.author}</h4>
                  <p className="text-xs" style={{color:"rgba(238,238,242,0.4)"}}>{t.role}, {t.company}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
