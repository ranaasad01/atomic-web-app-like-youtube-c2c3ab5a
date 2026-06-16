"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Bell, Upload, User, Home, Star, Settings } from 'lucide-react';
import { APP_NAME } from "@/lib/data";

const navItems = [
  { label: "Home", href: "/", icon: Home },
  { label: "Subscriptions", href: "/subscriptions", icon: Star },
  { label: "Upload", href: "/upload", icon: Upload },
  { label: "Channel", href: "/channel", icon: User },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -64, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0F0F0F]/95 backdrop-blur-md shadow-lg shadow-black/40 border-b border-white/5"
            : "bg-[#0F0F0F]"
        }`}
      >
        <div className="flex items-center justify-between px-4 md:px-6 h-14 gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0 group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2"
            >
              <div className="w-8 h-8 bg-[#FF0000] rounded-lg flex items-center justify-center shadow-lg shadow-red-500/30">
                <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
              <span className="text-white font-bold text-lg tracking-tight hidden sm:block">
                {APP_NAME}
              </span>
            </motion.div>
          </Link>

          {/* Search bar */}
          <form
            onSubmit={handleSearch}
            className="flex-1 max-w-xl hidden md:flex items-center"
          >
            <div className="relative w-full flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search videos, channels, tags…"
                className="w-full bg-[#272727] border border-white/10 rounded-l-full px-5 py-2 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF0000]/60 focus:bg-[#1a1a1a] transition-all"
              />
              <button
                type="submit"
                className="bg-[#272727] border border-l-0 border-white/10 rounded-r-full px-5 py-2 text-white/60 hover:text-white hover:bg-[#3a3a3a] transition-all"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Right actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            {/* Mobile search */}
            <Link
              href="/search"
              className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
            >
              <Search className="w-5 h-5" />
            </Link>

            {/* Upload */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/upload"
                className="hidden sm:flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/20 text-sm text-white/80 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all"
              >
                <Upload className="w-4 h-4" />
                <span>Upload</span>
              </Link>
            </motion.div>

            {/* Notifications */}
            <button className="p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FF0000] rounded-full" />
            </button>

            {/* Sign In */}
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/signin"
                className="flex items-center gap-2 px-4 py-1.5 bg-[#FF0000] hover:bg-red-600 text-white text-sm font-medium rounded-full transition-all shadow-lg shadow-red-500/20"
              >
                <User className="w-4 h-4" />
                <span className="hidden sm:block">Sign In</span>
              </Link>
            </motion.div>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden p-2 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-all"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop nav pills */}
        <div className="hidden md:flex items-center gap-1 px-6 pb-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    active
                      ? "bg-white text-[#0F0F0F]"
                      : "text-white/60 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {item.label}
                </motion.div>
              </Link>
            );
          })}
        </div>
      </motion.header>

      {/* Mobile menu drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="fixed top-0 left-0 bottom-0 z-50 w-72 bg-[#0F0F0F] border-r border-white/10 flex flex-col md:hidden"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 h-14 border-b border-white/10">
                <Link href="/" className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#FF0000] rounded-lg flex items-center justify-center">
                    <svg viewBox="0 0 24 24" fill="white" className="w-4 h-4">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                  <span className="text-white font-bold">{APP_NAME}</span>
                </Link>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-1.5 rounded-full text-white/60 hover:text-white hover:bg-white/10 transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile search */}
              <form onSubmit={handleSearch} className="px-4 py-3 border-b border-white/10">
                <div className="flex items-center bg-[#272727] rounded-full px-4 py-2 gap-2">
                  <Search className="w-4 h-4 text-white/40" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search…"
                    className="bg-transparent text-sm text-white placeholder-white/40 focus:outline-none flex-1"
                  />
                </div>
              </form>

              {/* Nav links */}
              <div className="flex-1 overflow-y-auto py-3">
                {navItems.map((item, i) => {
                  const Icon = item.icon;
                  const active = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.06, duration: 0.3 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center gap-3 px-5 py-3 text-sm font-medium transition-all ${
                          active
                            ? "text-white bg-white/10 border-r-2 border-[#FF0000]"
                            : "text-white/60 hover:text-white hover:bg-white/5"
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        {item.label}
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              {/* Drawer footer */}
              <div className="px-4 py-4 border-t border-white/10">
                <Link
                  href="/signin"
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#FF0000] hover:bg-red-600 text-white text-sm font-medium rounded-full transition-all"
                >
                  <User className="w-4 h-4" />
                  Sign In to StreamVibe
                </Link>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      {/* Spacer for fixed header */}
      <div className="h-[88px]" />
    </>
  );
}