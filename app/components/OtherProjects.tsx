"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FolderGit2, ExternalLink } from "lucide-react";
import { getAll, COLLECTIONS, Project } from "../../lib/firestore";

export default function OtherProjects() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    async function fetchProjects() {
      try {
        const data = await getAll<Project>(COLLECTIONS.PROJECTS);
        setProjects(data.filter(p => p.featured === false));
      } catch (err) {
        console.error("Failed to fetch other projects:", err);
      }
    }
    fetchProjects();
  }, []);

  if (projects.length === 0) return null;

  return (
    <section className="py-12 md:py-16" style={{background:"var(--bg-surface)"}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="font-display font-bold text-xl md:text-2xl" style={{color:"var(--text)"}}>Other Notable Work</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
          {projects.map((p, i) => (
            <motion.div key={p.id || i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.08}}
              className="card-glow p-5 group hover:-translate-y-1 transition-transform duration-300 relative">
              
              {/* Card Overlay Link */}
              {(p.liveUrl || p.sourceUrl) && (
                <a href={p.liveUrl || p.sourceUrl} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-10">
                  <span className="sr-only">View {p.title}</span>
                </a>
              )}

              <div className="flex justify-between items-start mb-3 relative z-20 pointer-events-none">
                <FolderGit2 className="w-7 h-7" style={{color:"#4f8ef7"}} />
                {p.liveUrl || p.sourceUrl ? (
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--text-muted)] group-hover:text-[#4f8ef7]" />
                ) : null}
              </div>
              <h3 className="font-display font-bold text-base mb-2 group-hover:text-[#4f8ef7] transition-colors leading-snug relative z-20 pointer-events-none" style={{color:"var(--text)"}}>{p.title}</h3>
              <p className="text-sm mb-4 leading-relaxed" style={{color:"var(--text-muted)"}}>{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech?.map((t,ti)=>(
                  <span key={ti} style={{fontFamily:"var(--font-mono)",fontSize:"11px",color:"var(--text-muted)"}}>{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
