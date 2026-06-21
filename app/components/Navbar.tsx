"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

const navLinks = [
  { name: "About",      href: "#about" },
  { name: "Skills",     href: "#skills" },
  { name: "Projects",   href: "#projects" },
  { name: "Experience", href: "#experience" },
  { name: "Contact",    href: "#contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen]   = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navStyle = {
    background: scrolled ? "var(--nav-bg, rgba(var(--black-rgb),0.88))" : "transparent",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderBottom: scrolled
      ? "1px solid var(--nav-border, rgba(var(--white-rgb),0.07))"
      : "1px solid transparent",
    transition: "background 0.4s ease, border-color 0.4s ease",
  };

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 1.85 }}
      className="fixed top-0 w-full z-50 transition-all duration-500"
      style={navStyle}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="#" className="font-display font-bold text-xl" style={{color:"var(--text)", letterSpacing:"-0.02em"}}>
            Nardi<span className="gradient-text">.</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 nav-link"
              >
                {link.name}
              </Link>
            ))}
            <ThemeToggle />
            <a
              href="mailto:hello@example.com"
              className="ml-3 px-4 py-2 rounded-lg text-sm font-semibold transition-all hire-btn"
            >
              Hire Me
            </a>
          </nav>

          {/* Mobile toggle */}
          <div className="md:hidden flex items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-lg transition-colors text-muted hover:text-body"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="md:hidden border-b"
          style={{background:"var(--nav-bg-mobile, rgba(var(--black-rgb),0.97))", backdropFilter:"blur(20px)", borderColor:"var(--nav-border, rgba(var(--white-rgb),0.07))"}}
        >
          <div className="px-4 py-4 space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block px-4 py-2.5 rounded-lg text-sm font-medium transition-colors text-muted hover:text-body hover:bg-surface"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}
