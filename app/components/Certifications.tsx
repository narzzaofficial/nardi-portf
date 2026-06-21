"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { getAll, COLLECTIONS, Certification } from "../../lib/firestore";

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);

  useEffect(() => {
    async function fetchCerts() {
      try {
        const data = await getAll<Certification>(COLLECTIONS.CERTIFICATIONS);
        setCerts(data);
      } catch (err) {
        console.error("Failed to fetch certifications:", err);
      }
    }
    fetchCerts();
  }, []);

  if (certs.length === 0) return null;

  return (
    <section className="py-28 overflow-hidden" style={{background:"#111114"}}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#8b5cf6",textTransform:"uppercase",marginBottom:"1rem"}}>
            Certifications
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(32px,5vw,48px)",color:"#eeeef2"}}>
            Continuous <span className="gradient-text">Learning.</span>
          </motion.h2>
        </div>
      </div>

      {/* Slider */}
      <div className="relative flex overflow-hidden">
        {/* Edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{background:"linear-gradient(to right, #111114, transparent)"}} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{background:"linear-gradient(to left, #111114, transparent)"}} />

        <div className="flex gap-4 animate-scroll-left whitespace-nowrap px-4">
          {[...certs, ...certs, ...certs].map((c, i) => (
            <div key={i} className="inline-flex items-center gap-4 shrink-0 px-6 py-5 rounded-xl"
              style={{width:280, background:"#16161a", border:"1px solid rgba(255,255,255,0.07)"}}>
              {c.imageUrl ? (
                <div className="w-10 h-10 rounded-lg shrink-0 overflow-hidden border border-[rgba(255,255,255,0.1)]">
                  <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover" />
                </div>
              ) : (
                <div className="p-2.5 rounded-lg shrink-0" style={{background:"rgba(139,92,246,0.12)"}}>
                  <Award className="w-5 h-5" style={{color:"#8b5cf6"}} />
                </div>
              )}
              <div className="overflow-hidden">
                <h3 className="font-semibold text-sm truncate leading-snug" style={{color:"#eeeef2"}}>{c.title}</h3>
                <p className="text-xs mt-0.5" style={{fontFamily:"var(--font-mono)",color:"rgba(238,238,242,0.32)"}}>{c.issuer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
