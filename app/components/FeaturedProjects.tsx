"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import { Github } from "./icons";
import { getAll, COLLECTIONS, Project } from "../../lib/firestore";

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getAll<Project>(COLLECTIONS.PROJECTS);
        // Default to featured true for backward compatibility or if not specified
        setProjects(data.filter(p => p.featured !== false));
      } catch (err) {
        console.error("Failed to fetch featured projects:", err);
      }
    }
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section id="projects" className="py-16 md:py-28">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="mb-10 md:mb-16">
          <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
            style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#4f8ef7",textTransform:"uppercase",marginBottom:"1rem"}}>
            Featured Projects
          </motion.p>
          <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
            className="font-display font-bold" style={{fontSize:"clamp(28px,5vw,48px)",color:"var(--text)"}}>
            Selected <span className="gradient-text">Work.</span>
          </motion.h2>
        </div>

        <div className="space-y-5">
          {projects.map((p, i) => (
            <motion.div key={p.id || i} initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6,delay:0.1}}
              className="card-glow p-6 md:p-10 relative overflow-hidden group">
              {/* Hover gradient */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                style={{background:`radial-gradient(600px at 0% 50%, ${p.accent}10, transparent 60%)`}} />

              {/* Card Overlay Link */}
              {(p.liveUrl || p.sourceUrl) && (
                <a href={p.liveUrl || p.sourceUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-0">
                  <span className="sr-only">View {p.title}</span>
                </a>
              )}

              <div className="relative z-10 flex flex-col md:flex-row gap-6 md:gap-10 pointer-events-none">
                <div className="flex-1">
                  {/* Number + title row */}
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-display font-extrabold select-none leading-none"
                      style={{fontSize:"clamp(28px,6vw,52px)", color:`${p.accent}30`}}>{p.number}</span>
                    <h3 className="font-display font-bold leading-tight"
                      style={{fontSize:"clamp(17px,3vw,24px)", color:"var(--text)"}}>{p.title}</h3>
                  </div>

                  {/* Links */}
                  <div className="flex gap-4 mb-4 relative z-20 pointer-events-auto">
                    {p.liveUrl && (
                      <a href={p.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs transition-opacity hover:opacity-60"
                        style={{fontFamily:"var(--font-mono)",color:p.accent}}>
                        <ExternalLink className="w-3.5 h-3.5" /> Live Demo
                      </a>
                    )}
                    {p.sourceUrl && (
                      <a href={p.sourceUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 text-xs hover:opacity-70 transition-opacity"
                        style={{fontFamily:"var(--font-mono)",color:"var(--text-subtle)"}}>
                        <Github className="w-3.5 h-3.5" /> Source
                      </a>
                    )}
                  </div>

                  <p className="text-sm md:text-[15px] leading-[1.75] mb-4" style={{color:"var(--text-muted)"}}>{p.description}</p>

                  {/* Impact */}
                  {p.impact && (
                    <div className="flex flex-wrap items-center gap-2 px-3 py-2 rounded-lg mb-4 w-fit"
                      style={{background:"rgba(var(--white-rgb),0.04)", border:`1px solid ${p.accent}25`}}>
                      <span className="text-xs uppercase tracking-wider shrink-0" style={{fontFamily:"var(--font-mono)",color:p.accent}}>Impact</span>
                      <span className="text-xs md:text-sm" style={{color:"var(--text-muted)"}}>{p.impact}</span>
                    </div>
                  )}

                  {/* Tech */}
                  <div className="flex flex-wrap gap-2">
                    {p.tech?.map((t,ti)=>(
                      <span key={ti} className="tag">{t}</span>
                    ))}
                  </div>
                </div>
                
                {/* Image */}
                {p.imageUrl && (
                  <div className="w-full md:w-[400px] shrink-0">
                    <img src={p.imageUrl} alt={p.title} className="w-full h-auto rounded-xl border object-cover shadow-lg" style={{borderColor:"rgba(var(--white-rgb),0.1)", aspectRatio:"16/9"}} />
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
