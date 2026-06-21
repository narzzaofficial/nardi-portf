"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, ArrowRight } from "lucide-react";
import { getAll, COLLECTIONS, Article } from "../../lib/firestore";

export default function Articles() {
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function fetchArticles() {
      try {
        const data = await getAll<Article>(COLLECTIONS.ARTICLES);
        setArticles(data);
      } catch (err) {
        console.error("Failed to fetch articles:", err);
      }
    }
    fetchArticles();
  }, []);

  if (articles.length === 0) return null;

  return (
    <section className="py-16 md:py-28" style={{background:"var(--bg-surface)"}}>
      <div className="max-w-6xl mx-auto px-5 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 md:mb-12 gap-4">
          <div>
            <motion.p initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5}}
              style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#8b5cf6",textTransform:"uppercase",marginBottom:"1rem"}}>
              Writing
            </motion.p>
            <motion.h2 initial={{opacity:0,y:16}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:0.1}}
              className="font-display font-bold" style={{fontSize:"clamp(28px,5vw,48px)",color:"var(--text)"}}>
              Latest <span className="gradient-text">Thoughts.</span>
            </motion.h2>
          </div>
          <a href="#" className="flex items-center text-sm font-semibold shrink-0" style={{color:"rgba(var(--text-rgb),0.5)"}}>
            View all <ArrowRight className="ml-1.5 w-4 h-4" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 md:gap-6">
          {articles.map((a, i) => (
            <motion.article key={a.id || i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.5,delay:i*0.1}}
              className="group cursor-pointer">
              <div className="h-36 md:h-44 rounded-2xl mb-4 relative overflow-hidden flex items-end p-4"
                style={{
                  background: a.coverImageUrl ? `url(${a.coverImageUrl}) center/cover` : "var(--bg-card)", 
                  border:"1px solid rgba(var(--white-rgb),0.07)"
                }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{background:"linear-gradient(135deg,rgba(139,92,246,0.3),rgba(79,142,247,0.3))"}} />
                <span className="relative z-10 px-3 py-1 rounded-full text-xs font-semibold"
                  style={{background:"rgba(var(--black-rgb),0.85)", border:"1px solid rgba(var(--white-rgb),0.1)", color:"var(--text)"}}>
                  {a.tag}
                </span>
              </div>
              <div className="flex items-center gap-3 mb-2 text-xs"
                style={{fontFamily:"var(--font-mono)", color:"rgba(var(--text-rgb),0.35)"}}>
                <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {a.date}</span>
                <span>·</span>
                <span>{a.readTime}</span>
              </div>
              <h3 className="font-display font-bold text-base md:text-lg mb-2 leading-snug transition-colors group-hover:text-purple-400"
                style={{color:"var(--text)"}}>
                {a.title}
              </h3>
              <p className="text-sm leading-relaxed" style={{color:"rgba(var(--text-rgb),0.45)"}}>{a.excerpt}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
