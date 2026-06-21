"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Award, X } from "lucide-react";
import { getAll, COLLECTIONS, Certification } from "../../lib/firestore";

import Marquee from "react-fast-marquee";

export default function Certifications() {
  const [certs, setCerts] = useState<Certification[]>([]);
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

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
    <section className="py-28 overflow-hidden" style={{ background: "var(--bg-surface)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16">
          <motion.p initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}
            style={{ fontSize: "11px", fontFamily: "var(--font-mono)", letterSpacing: "0.2em", color: "#8b5cf6", textTransform: "uppercase", marginBottom: "1rem" }}>
            Certifications
          </motion.p>
          <motion.h2 initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.1 }}
            className="font-display font-bold" style={{ fontSize: "clamp(32px,5vw,48px)", color: "var(--text)" }}>
            Continuous <span className="gradient-text">Learning.</span>
          </motion.h2>
        </div>
      </div>

      {/* Slider */}
      <div className="relative flex overflow-hidden">
        {/* Edge masks */}
        <div className="absolute left-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, var(--bg-surface), transparent)" }} />
        <div className="absolute right-0 top-0 bottom-0 w-28 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, var(--bg-surface), transparent)" }} />

        <Marquee speed={30} pauseOnHover={true} gradient={false} className="py-4">
          {certs.map((c, i) => (
            <div key={i} className="flex flex-col shrink-0 rounded-xl overflow-hidden group transition-all duration-300 hover:border-[rgba(var(--white-rgb),0.15)] mx-4"
              style={{ width: 380, background: "var(--bg-card)", border: "1px solid rgba(var(--white-rgb),0.07)" }}>
              <div 
                className="w-full aspect-[29.7/21] relative border-b border-[rgba(var(--white-rgb),0.05)] overflow-hidden flex items-center justify-center cursor-pointer" 
                style={{ background: "rgba(0,0,0,0.3)" }}
                onClick={() => c.imageUrl && setSelectedImg(c.imageUrl)}
              >
                {c.imageUrl ? (
                  <img src={c.imageUrl} alt={c.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                ) : (
                  <Award className="w-12 h-12" style={{ color: "rgba(139,92,246,0.2)" }} />
                )}
              </div>
              <div className="p-5">
                <h3 className="font-semibold text-base truncate leading-snug" style={{ color: "var(--text)" }}>{c.title}</h3>
                <p className="text-xs mt-1.5" style={{ fontFamily: "var(--font-mono)", color: "#8b5cf6" }}>{c.issuer}</p>
              </div>
            </div>
          ))}
        </Marquee>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6"
            style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(8px)" }}
            onClick={() => setSelectedImg(null)}
          >
            <button 
              className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              onClick={() => setSelectedImg(null)}
            >
              <X className="w-6 h-6" />
            </button>
            <motion.img
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              src={selectedImg}
              alt="Certificate Fullscreen"
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
