"use client";

import { useEffect, useState } from "react";
import { getAll, COLLECTIONS } from "../../lib/firestore";
import { FolderKanban, Briefcase, Award, MessageSquareQuote, FileText } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const [stats, setStats] = useState([
    { label: "Projects", count: 0, icon: FolderKanban, href: "/admin/projects", color: "#4f8ef7" },
    { label: "Experience", count: 0, icon: Briefcase, href: "/admin/experience", color: "#8b5cf6" },
    { label: "Certifications", count: 0, icon: Award, href: "/admin/certifications", color: "#34d399" },
    { label: "Testimonials", count: 0, icon: MessageSquareQuote, href: "/admin/testimonials", color: "#f59e0b" },
    { label: "Articles", count: 0, icon: FileText, href: "/admin/articles", color: "#ec4899" },
  ]);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [projects, experience, certs, testimonials, articles] = await Promise.all([
          getAll(COLLECTIONS.PROJECTS),
          getAll(COLLECTIONS.EXPERIENCE),
          getAll(COLLECTIONS.CERTIFICATIONS),
          getAll(COLLECTIONS.TESTIMONIALS),
          getAll(COLLECTIONS.ARTICLES),
        ]);

        setStats(prev => prev.map(s => {
          if (s.label === "Projects") return { ...s, count: projects.length };
          if (s.label === "Experience") return { ...s, count: experience.length };
          if (s.label === "Certifications") return { ...s, count: certs.length };
          if (s.label === "Testimonials") return { ...s, count: testimonials.length };
          if (s.label === "Articles") return { ...s, count: articles.length };
          return s;
        }));
      } catch (err) {
        console.error("Failed to fetch stats", err);
      }
    }
    fetchStats();
  }, []);

  return (
    <div>
      <h1 className="font-display font-bold text-3xl mb-2">Overview</h1>
      <p className="text-[rgba(238,238,242,0.5)] mb-10">Welcome back. Here's what's currently on your portfolio.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Link key={s.label} href={s.href}>
            <motion.div 
              initial={{opacity: 0, y: 10}}
              animate={{opacity: 1, y: 0}}
              transition={{delay: i * 0.05}}
              className="admin-panel p-6 group cursor-pointer transition-transform hover:-translate-y-1"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="p-3 rounded-xl" style={{background: `${s.color}15`}}>
                  <s.icon className="w-6 h-6" style={{color: s.color}} />
                </div>
                <span className="font-display font-extrabold text-4xl text-[rgba(238,238,242,0.1)] group-hover:text-[rgba(238,238,242,0.2)] transition-colors">
                  {s.count}
                </span>
              </div>
              <h3 className="font-display font-bold text-lg">{s.label}</h3>
              <p className="text-sm text-[rgba(238,238,242,0.4)] mt-1">Manage items &rarr;</p>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}
