"use client";

import Link from "next/link";
import { Github, Linkedin, Twitter } from "./icons";

const socials = [
  { Icon: Github,   href: "https://github.com",   label: "GitHub" },
  { Icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { Icon: Twitter,  href: "https://twitter.com",  label: "Twitter" },
];

export default function Footer() {
  return (
    <footer
      className="pt-16 pb-8"
      style={{ borderTop: "1px solid rgba(var(--white-rgb),0.07)", background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top row */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-12">
          <div>
            <Link
              href="#"
              className="font-display font-bold text-2xl"
              style={{ color: "var(--text)", letterSpacing: "-0.02em" }}
            >
              Nardi<span className="gradient-text">.</span>
            </Link>
            <p className="text-sm mt-2 max-w-xs" style={{ color: "rgba(var(--text-rgb),0.3)" }}>
              Data Engineer &amp; AI Engineer building scalable, intelligent systems.
            </p>
          </div>

          {/* Social icons */}
          <div className="flex gap-3">
            {socials.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="w-10 h-10 rounded-xl flex items-center justify-center transition-all"
                style={{
                  background: "rgba(var(--white-rgb),0.05)",
                  border: "1px solid rgba(var(--white-rgb),0.08)",
                  color: "rgba(var(--text-rgb),0.4)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "var(--text)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--white-rgb),0.18)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.color = "rgba(var(--text-rgb),0.4)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(var(--white-rgb),0.08)";
                }}
              >
                <Icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom row */}
        <div
          className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8"
          style={{
            borderTop: "1px solid rgba(var(--white-rgb),0.07)",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            color: "rgba(var(--text-rgb),0.22)",
          }}
        >
          <p>© {new Date().getFullYear()} Nardi. All rights reserved.</p>
          <p>Built with Next.js · Tailwind CSS · Framer Motion</p>
        </div>
      </div>
    </footer>
  );
}
