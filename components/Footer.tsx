"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { APP_NAME, APP_TAGLINE } from "@/lib/data";
import { Code2 as Github, MessageCircle as Twitter, Briefcase as Linkedin } from 'lucide-react';

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Home", href: "/" },
      { label: "Subscriptions", href: "/subscriptions" },
      { label: "Upload Video", href: "/upload" },
      { label: "Search", href: "/search" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Sign In", href: "/signin" },
      { label: "Sign Up", href: "/signup" },
      { label: "My Channel", href: "/channel" },
      { label: "Settings", href: "/settings" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
      { label: "Press", href: "/press" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
      { label: "Cookie Policy", href: "/cookies" },
      { label: "Community Guidelines", href: "/guidelines" },
    ],
  },
];

const socialLinks = [
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Github, label: "GitHub", href: "https://github.com" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
];

export default function Footer() {
  return (
    <footer className="bg-[#0F0F0F] border-t border-white/8 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10"
        >
          {/* Brand column */}
          <motion.div variants={fadeInUp} className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-8 h-8 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg">{APP_NAME}</span>
            </Link>
            <p className="text-white/40 text-sm leading-relaxed mb-5">
              {APP_TAGLINE}. The platform for creators and viewers who demand more.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <motion.a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    whileHover={{ scale: 1.12, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-9 h-9 rounded-full bg-[#272727] border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/30 hover:bg-[#333] transition-all"
                  >
                    <Icon className="w-4 h-4" />
                  </motion.a>
                );
              })}
            </div>
          </motion.div>

          {/* Link columns */}
          {footerSections.map((section) => (
            <motion.div key={section.title} variants={fadeInUp}>
              <h3 className="text-white text-sm font-semibold mb-4 tracking-wide uppercase">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/45 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom bar */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} {APP_NAME}, Inc. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-white/25 text-xs">
            <span>Made with</span>
            <span className="text-[#FF0000] mx-0.5">♥</span>
            <span>for creators everywhere</span>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}