"use client";

import { motion } from "framer-motion";
import { Mail, MapPin } from "lucide-react";
import { Github, Linkedin } from "./icons";

export default function Contact() {
  return (
    <section id="contact" className="py-16 md:py-28 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] rounded-full blur-[100px] pointer-events-none"
        style={{background:"rgba(79,142,247,0.06)"}} />

      <div className="max-w-4xl mx-auto px-5 sm:px-6 lg:px-8 relative z-10">
        <motion.div initial={{opacity:0,y:32}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{duration:0.6}}
          className="card-glow p-7 sm:p-10 md:p-16 text-center">
          <p className="mb-5" style={{fontSize:"11px",fontFamily:"var(--font-mono)",letterSpacing:"0.2em",color:"#4f8ef7",textTransform:"uppercase"}}>
            Let's Talk
          </p>
          <h2 className="font-display font-extrabold mb-5 leading-[1.05]"
            style={{fontSize:"clamp(28px,6vw,60px)",color:"#eeeef2"}}>
            Got a project in mind?<br />
            <span className="gradient-text">Let's build it.</span>
          </h2>
          <p className="text-base mb-8 max-w-md mx-auto leading-relaxed"
            style={{color:"rgba(238,238,242,0.45)"}}>
            I'm open to new opportunities — full-time roles or collaboration. Reach out anytime!
          </p>

          <div className="flex items-center justify-center mb-10">
            <a href="mailto:hello@example.com"
              className="flex items-center gap-2.5 px-6 py-4 rounded-xl font-bold text-sm transition-all hover:opacity-90 active:scale-95"
              style={{background:"#eeeef2",color:"#0d0d0f"}}>
              <Mail className="w-4 h-4 shrink-0" />
              hello@example.com
            </a>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-5 pt-6"
            style={{borderTop:"1px solid rgba(255,255,255,0.07)"}}>
            {[
              { icon:Github,   href:"https://github.com",   label:"GitHub",   hoverColor:"#eeeef2" },
              { icon:Linkedin, href:"https://linkedin.com", label:"LinkedIn", hoverColor:"#4f8ef7" },
            ].map(({icon:Icon, href, label})=>(
              <a key={label} href={href} target="_blank" rel="noreferrer"
                className="flex items-center gap-2 text-sm font-medium transition-colors p-1"
                style={{color:"rgba(238,238,242,0.35)"}}>
                <Icon className="w-5 h-5" /> {label}
              </a>
            ))}
            <span className="flex items-center gap-1.5 text-sm" style={{color:"rgba(238,238,242,0.25)"}}>
              <MapPin className="w-4 h-4 shrink-0" /> Malaysia
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
