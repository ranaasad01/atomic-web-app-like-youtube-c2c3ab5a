"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Filter, X, Clock, Eye, ThumbsUp, CheckCircle, SlidersHorizontal, ChevronDown, Play, Calendar, TrendingUp, Grid, List } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import {
  VIDEO_CATEGORIES,
  formatViews,
  formatSubscribers,
  timeAgo,
  type Video,
  type Channel,
} from "@/lib/data";

// ─── Mock data ────────────────────────────────────────────────────────────────

const MOCK_CHANNELS: Channel[] = [
  {
    id: "ch1",
    name: "TechWithMarcus",
    handle: "@techwithmarcus",
    avatar: "https://i.ytimg.com/vi/1HCXiazv5Xs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDIuQFJj5iMJx5LxOewIynjb4RzLQ",
    banner: "https://i.ytimg.com/vi/1HCXiazv5Xs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDIuQFJj5iMJx5LxOewIynjb4RzLQ",
    subscribers: 1_240_000,
    videoCount: 312,
    description: "Deep dives into software engineering, AI, and the future of tech.",
    joinedAt: "2019-03-15",
    verified: true,
  },
  {
    id: "ch2",
    name: "CodeCraft Studio",
    handle: "@codecraftstudio",
    avatar: "/images/channel-avatar-codecraft.jpg",
    banner: "/images/channel-banner-code.jpg",
    subscribers: 890_000,
    videoCount: 198,
    description: "Practical tutorials for modern web development.",
    joinedAt: "2020-07-22",
    verified: true,
  },
  {
    id: "ch3",
    name: "NovaByte",
    handle: "@novabyte",
    avatar: "/images/channel-avatar-novabyte.jpg",
    banner: "/images/channel-banner-nova.jpg",
    subscribers: 430_000,
    videoCount: 87,
    description: "Cybersecurity, privacy, and open-source tools explained.",
    joinedAt: "2021-01-10",
    verified: false,
  },
];

const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "Building a Full-Stack App with Next.js 14 and Supabase",
    description:
      "In this comprehensive tutorial, we build a production-ready full-stack application using Next.js 14 App Router, Supabase for the database, and Tailwind CSS for styling.",
    thumbnail: "/images/video-thumbnail-nextjs-supabase.jpg",
    videoUrl: "/watch/v1",
    duration: "1:24:38",
    views: 2_840_000,
    likes: 94_200,
    dislikes: 1_100,
    tags: ["nextjs", "supabase", "fullstack", "tutorial"],
    category: "tech",
    createdAt: "2024-04-10",
    channel: MOCK_CHANNELS[0],
  },
  {
    id: "v2",
    title: "TypeScript Generics Explained — From Zero to Hero",
    description:
      "Master TypeScript generics with real-world examples. We cover constraints, conditional types, mapped types, and utility types in depth.",
    thumbnail: "/images/video-thumbnail-typescript-generics.jpg",
    videoUrl: "/watch/v2",
    duration: "42:15",
    views: 1_560_000,
    likes: 61_800,
    dislikes: 720,
    tags: ["typescript", "generics", "programming"],
    category: "tech",
    createdAt: "2024-03-28",
    channel: MOCK_CHANNELS[1],
  },
  {
    id: "v3",
    title: "React Server Components: The Complete Guide (2024)",
    description:
      "Everything you need to know about React Server Components — how they work, when to use them, and how they change the way we build apps.",
    thumbnail: "/images/video-thumbnail-react-server-components.jpg",
    videoUrl: "/watch/v3",
    duration: "58:02",
    views: 3_120_000,
    likes: 112_400,
    dislikes: 2_300,
    tags: ["react", "server-components", "nextjs"],
    category: "tech",
    createdAt: "2024-02-14",
    channel: MOCK_CHANNELS[0],
  },
  {
    id: "v4",
    title: "How I Hacked My Own Network (Legally) — Penetration Testing 101",
    description:
      "A beginner-friendly walkthrough of ethical hacking techniques using Kali Linux, Nmap, and Metasploit on a home lab setup.",
    thumbnail: "/images/video-thumbnail-pentest-home-lab.jpg",
    videoUrl: "/watch/v4",
    duration: "1:08:44",
    views: 987_000,
    likes: 43_600,
    dislikes: 890,
    tags: ["hacking", "cybersecurity", "kali", "pentest"],
    category: "tech",
    createdAt: "2024-01-30",
    channel: MOCK_CHANNELS[2],
  },
  {
    id: "v5",
    title: "CSS Grid vs Flexbox — When to Use Which (With Real Examples)",
    description:
      "Stop guessing which layout system to use. This video breaks down CSS Grid and Flexbox with practical, real-world examples and decision frameworks.",
    thumbnail: "/images/video-thumbnail-css-grid-flexbox.jpg",
    videoUrl: "/watch/v5",
    duration: "28:50",
    views: 2_100_000,
    likes: 78_900,
    dislikes: 1_400,
    tags: ["css", "grid", "flexbox", "webdev"],
    category: "tech",
    createdAt: "2024-05-01",
    channel: MOCK_CHANNELS[1],
  },
  {
    id: "v6",
    title: "AI Tools Every Developer Should Know in 2024",
    description:
      "From GitHub Copilot to Claude and beyond — a curated tour of the AI tools that are genuinely changing how developers write, debug, and ship code.",
    thumbnail: "/images/video-thumbnail-ai-dev-tools-2024.jpg",
    videoUrl: "/watch/v6",
    duration: "35:17",
    views: 4_500_000,
    likes: 198_000,
    dislikes: 4_200,
    tags: ["ai", "developer-tools", "copilot", "productivity"],
    category: "tech",
    createdAt: "2024-05-15",
    channel: MOCK_CHANNELS[0],
  },
  {
    id: "v7",
    title: "Open Source Security Audit: What I Found in 5 Popular npm Packages",
    description:
      "I audited five widely-used npm packages for security vulnerabilities. The results were surprising — and a little alarming.",
    thumbnail: "/images/video-thumbnail-npm-security-audit.jpg",
    videoUrl: "/watch/v7",
    duration: "51:33",
    views: 670_000,
    likes: 29_100,
    dislikes: 540,
    tags: ["security", "npm", "open-source", "audit"],
    category: "tech",
    createdAt: "2024-04-22",
    channel: MOCK_CHANNELS[2],
  },
  {
    id: "v8",
    title: "Tailwind CSS v4 — Everything That's Changing",
    description:
      "A first look at Tailwind CSS v4: the new engine, zero-config setup, CSS-first configuration, and what it means for your existing projects.",
    thumbnail: "/images/video-thumbnail-tailwind-v4.jpg",
    videoUrl: "/watch/v8",
    duration: "22:08",
    views: 1_890_000,
    likes: 82_300,
    dislikes: 1_900,
    tags: ["tailwind", "css", "webdev", "v4"],
    category: "tech",
    createdAt: "2024-05-20",
    channel: MOCK_CHANNELS[1],
  },
];

// ─── Filter options ───────────────────────────────────────────────────────────

const SORT_OPTIONS = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Upload Date" },
  { value: "views", label: "View Count" },
  { value: "rating", label: "Rating" },
];

const DURATION_OPTIONS = [
  { value: "any", label: "Any Duration" },
  { value: "short", label: "Under 4 min" },
  { value: "medium", label: "4–20 min" },
  { value: "long", label: "Over 20 min" },
];

const UPLOAD_DATE_OPTIONS = [
  { value: "any", label: "Any Time" },
  { value: "hour", label: "Last Hour" },
  { value: "today", label: "Today" },
  { value: "week", label: "This Week" },
  { value: "month", label: "This Month" },
  { value: "year", label: "This Year" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoCardList({ video }: { video: Video }) {
  return (
    <motion.div variants={fadeInUp} whileHover={{ x: 4 }} className="group">
      <Link href={`/watch/${video.id}`} className="flex gap-4 md:gap-5">
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-40 sm:w-52 md:w-64 aspect-video rounded-xl overflow-hidden bg-[#272727]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23272727'/%3E%3Cpath d='M140 70l50 20-50 20z' fill='%23555'/%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="w-10 h-10 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="w-5 h-5 text-white fill-white ml-0.5" />
            </motion.div>
          </div>
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-white font-semibold text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-2">
            {video.title}
          </h3>
          <div className="flex items-center gap-2 text-white/50 text-xs mb-2">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.views)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              {timeAgo(video.createdAt)}
            </span>
          </div>
          <Link
            href={`/channel/${video.channel.id}`}
            onClick={(e) => e.stopPropagation()}
            className="flex items-center gap-2 mb-3 group/ch w-fit"
          >
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-5 h-5 rounded-full object-cover bg-[#333]"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 20 20'%3E%3Ccircle cx='10' cy='10' r='10' fill='%23444'/%3E%3C/svg%3E";
              }}
            />
            <span className="text-white/60 text-xs group-hover/ch:text-white transition-colors flex items-center gap-1">
              {video.channel.name}
              {video.channel.verified && (
                <CheckCircle className="w-3 h-3 text-[#FF0000]" />
              )}
            </span>
          </Link>
          <p className="text-white/40 text-xs leading-relaxed line-clamp-2 hidden sm:block">
            {video.description}
          </p>
          <div className="flex items-center gap-3 mt-2">
            <span className="flex items-center gap-1 text-white/40 text-xs">
              <ThumbsUp className="w-3 h-3" />
              {(video.likes / 1000).toFixed(0)}K
            </span>
            <span className="px-2 py-0.5 rounded-full bg-[#272727] text-white/50 text-xs capitalize">
              {video.category}
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function VideoCardGrid({ video }: { video: Video }) {
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -4 }} className="group">
      <Link href={`/watch/${video.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative aspect-video rounded-xl overflow-hidden bg-[#272727] mb-3">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23272727'/%3E%3Cpath d='M140 70l50 20-50 20z' fill='%23555'/%3E%3C/svg%3E";
            }}
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Play className="w-6 h-6 text-white fill-white ml-0.5" />
            </motion.div>
          </div>
          <span className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
        </div>

        {/* Info */}
        <div className="flex gap-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-8 h-8 rounded-full object-cover bg-[#333] flex-shrink-0 mt-0.5"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='32' height='32' viewBox='0 0 32 32'%3E%3Ccircle cx='16' cy='16' r='16' fill='%23444'/%3E%3C/svg%3E";
            }}
          />
          <div className="min-w-0">
            <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-1">
              {video.title}
            </h3>
            <p className="text-white/50 text-xs flex items-center gap-1 mb-0.5">
              {video.channel.name}
              {video.channel.verified && (
                <CheckCircle className="w-3 h-3 text-[#FF0000]" />
              )}
            </p>
            <p className="text-white/40 text-xs">
              {formatViews(video.views)} • {timeAgo(video.createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ChannelCard({ channel }: { channel: Channel }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ y: -2 }}
      className="flex items-center gap-4 p-4 rounded-2xl bg-[#1a1a1a] border border-white/8 hover:border-white/20 transition-all group"
    >
      <img
        src={channel.avatar}
        alt={channel.name}
        className="w-16 h-16 rounded-full object-cover bg-[#333] flex-shrink-0"
        onError={(e) => {
          (e.currentTarget as HTMLImageElement).src =
            "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='64' height='64' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23444'/%3E%3C/svg%3E";
        }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5 mb-0.5">
          <h3 className="text-white font-semibold text-sm group-hover:text-[#FF0000] transition-colors">
            {channel.name}
          </h3>
          {channel.verified && <CheckCircle className="w-4 h-4 text-[#FF0000]" />}
        </div>
        <p className="text-white/50 text-xs mb-1">{channel.handle}</p>
        <p className="text-white/40 text-xs">
          {formatSubscribers(channel.subscribers)} subscribers • {channel.videoCount} videos
        </p>
        <p className="text-white/30 text-xs mt-1 line-clamp-1">{channel.description}</p>
      </div>
      <Link
        href={`/channel/${channel.id}`}
        className="flex-shrink-0 px-4 py-1.5 rounded-full bg-white text-black text-xs font-semibold hover:bg-white/90 transition-all"
      >
        View
      </Link>
    </motion.div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function SearchResultsPage() {
  const [query, setQuery] = useState("next.js tutorial");
  const [inputValue, setInputValue] = useState("next.js tutorial");
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState("relevance");
  const [duration, setDuration] = useState("any");
  const [uploadDate, setUploadDate] = useState("any");
  const [viewMode, setViewMode] = useState<"list" | "grid">("list");
  const [showFilters, setShowFilters] = useState(false);
  const [activeTab, setActiveTab] = useState<"videos" | "channels">("videos");

  const filteredVideos = useMemo(() => {
    let results = [...MOCK_VIDEOS];

    if (activeCategory !== "all") {
      results = results.filter((v) => v.category === activeCategory);
    }

    if (duration === "short") {
      results = results.filter((v) => {
        const parts = v.duration.split(":").map(Number);
        const totalSec = parts.length === 3
          ? (parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0)
          : (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
        return totalSec < 240;
      });
    } else if (duration === "medium") {
      results = results.filter((v) => {
        const parts = v.duration.split(":").map(Number);
        const totalSec = parts.length === 3
          ? (parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0)
          : (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
        return totalSec >= 240 && totalSec <= 1200;
      });
    } else if (duration === "long") {
      results = results.filter((v) => {
        const parts = v.duration.split(":").map(Number);
        const totalSec = parts.length === 3
          ? (parts[0] ?? 0) * 3600 + (parts[1] ?? 0) * 60 + (parts[2] ?? 0)
          : (parts[0] ?? 0) * 60 + (parts[1] ?? 0);
        return totalSec > 1200;
      });
    }

    if (sortBy === "views") {
      results.sort((a, b) => b.views - a.views);
    } else if (sortBy === "rating") {
      results.sort((a, b) => b.likes - a.likes);
    } else if (sortBy === "date") {
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }

    return results;
  }, [activeCategory, sortBy, duration]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setQuery(inputValue.trim());
    }
  };

  const clearFilters = () => {
    setActiveCategory("all");
    setSortBy("relevance");
    setDuration("any");
    setUploadDate("any");
  };

  const hasActiveFilters =
    activeCategory !== "all" ||
    sortBy !== "relevance" ||
    duration !== "any" ||
    uploadDate !== "any";

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-14">
      {/* Search bar hero */}
      <div className="bg-[#141414] border-b border-white/8 px-4 md:px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1 flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Search videos, channels, tags…"
                className="w-full bg-[#272727] border border-white/10 rounded-l-full px-5 py-3 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#FF0000]/60 focus:bg-[#1e1e1e] transition-all"
              />
              {inputValue && (
                <button
                  type="button"
                  onClick={() => setInputValue("")}
                  className="absolute right-14 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="bg-[#272727] border border-l-0 border-white/10 rounded-r-full px-6 py-3 text-white/60 hover:text-white hover:bg-[#3a3a3a] transition-all"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
            <motion.button
              type="button"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => setShowFilters((p) => !p)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border text-sm font-medium transition-all ${
                showFilters || hasActiveFilters
                  ? "bg-[#FF0000] border-[#FF0000] text-white"
                  : "bg-[#272727] border-white/10 text-white/70 hover:text-white hover:border-white/30"
              }`}
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden sm:inline">Filters</span>
              {hasActiveFilters && (
                <span className="w-5 h-5 rounded-full bg-white text-[#FF0000] text-xs font-bold flex items-center justify-center">
                  !
                </span>
              )}
            </motion.button>
          </form>
        </div>
      </div>

      {/* Filter panel */}
      <AnimatePresence>
        {showFilters && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="overflow-hidden bg-[#141414] border-b border-white/8"
          >
            <div className="max-w-4xl mx-auto px-4 md:px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4">
              {/* Sort */}
              <div>
                <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">
                  Sort By
                </label>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full appearance-none bg-[#272727] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF0000]/60 transition-all cursor-pointer"
                  >
                    {SORT_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Duration */}
              <div>
                <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">
                  Duration
                </label>
                <div className="relative">
                  <select
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full appearance-none bg-[#272727] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF0000]/60 transition-all cursor-pointer"
                  >
                    {DURATION_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {/* Upload date */}
              <div>
                <label className="block text-white/50 text-xs font-medium mb-2 uppercase tracking-wide">
                  Upload Date
                </label>
                <div className="relative">
                  <select
                    value={uploadDate}
                    onChange={(e) => setUploadDate(e.target.value)}
                    className="w-full appearance-none bg-[#272727] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF0000]/60 transition-all cursor-pointer"
                  >
                    {UPLOAD_DATE_OPTIONS.map((o) => (
                      <option key={o.value} value={o.value}>
                        {o.label}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40 pointer-events-none" />
                </div>
              </div>

              {hasActiveFilters && (
                <div className="sm:col-span-3 flex justify-end">
                  <button
                    onClick={clearFilters}
                    className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
                  >
                    <X className="w-4 h-4" />
                    Clear all filters
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Category pills */}
      <div className="border-b border-white/8 bg-[#0F0F0F] sticky top-14 z-30">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex gap-2 overflow-x-auto py-3 scrollbar-hide">
            {VIDEO_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                onClick={() => setActiveCategory(cat.slug)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.slug
                    ? "bg-white text-black"
                    : "bg-[#272727] text-white/70 hover:bg-[#333] hover:text-white"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6">
        {/* Results header */}
        <motion.div
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="flex items-center justify-between mb-6 flex-wrap gap-3"
        >
          <div>
            <h1 className="text-white text-xl font-bold">
              Results for{" "}
              <span className="text-[#FF0000]">&ldquo;{query}&rdquo;</span>
            </h1>
            <p className="text-white/40 text-sm mt-0.5">
              {filteredVideos.length} videos • {MOCK_CHANNELS.length} channels found
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Tab switcher */}
            <div className="flex rounded-xl bg-[#1a1a1a] border border-white/8 p-1 gap-1">
              <button
                onClick={() => setActiveTab("videos")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "videos"
                    ? "bg-[#FF0000] text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Videos
              </button>
              <button
                onClick={() => setActiveTab("channels")}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                  activeTab === "channels"
                    ? "bg-[#FF0000] text-white"
                    : "text-white/50 hover:text-white"
                }`}
              >
                Channels
              </button>
            </div>

            {/* View mode (only for videos) */}
            {activeTab === "videos" && (
              <div className="flex rounded-xl bg-[#1a1a1a] border border-white/8 p-1 gap-1">
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "list"
                      ? "bg-[#272727] text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <List className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-1.5 rounded-lg transition-all ${
                    viewMode === "grid"
                      ? "bg-[#272727] text-white"
                      : "text-white/40 hover:text-white"
                  }`}
                >
                  <Grid className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Trending badge */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="flex items-center gap-2 mb-5 px-4 py-2.5 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 w-fit"
        >
          <TrendingUp className="w-4 h-4 text-[#FF0000]" />
          <span className="text-[#FF0000] text-sm font-medium">
            Trending in Tech this week
          </span>
        </motion.div>

        {/* Videos tab */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              {filteredVideos.length === 0 ? (
                <motion.div
                  variants={fadeInUp}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col items-center justify-center py-24 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-[#1a1a1a] flex items-center justify-center mb-5">
                    <Search className="w-9 h-9 text-white/20" />
                  </div>
                  <h2 className="text-white text-xl font-semibold mb-2">
                    No results found
                  </h2>
                  <p className="text-white/40 text-sm max-w-sm">
                    Try adjusting your filters or search with different keywords.
                  </p>
                  <button
                    onClick={clearFilters}
                    className="mt-5 px-5 py-2 rounded-full bg-[#FF0000] text-white text-sm font-medium hover:bg-[#cc0000] transition-all"
                  >
                    Clear Filters
                  </button>
                </motion.div>
              ) : viewMode === "list" ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col gap-6"
                >
                  {filteredVideos.map((video) => (
                    <VideoCardList key={video.id} video={video} />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredVideos.map((video) => (
                    <VideoCardGrid key={video.id} video={video} />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Channels tab */}
          {activeTab === "channels" && (
            <motion.div
              key="channels"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {MOCK_CHANNELS.map((channel) => (
                  <ChannelCard key={channel.id} channel={channel} />
                ))}
              </motion.div>

              {/* Related searches */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-10"
              >
                <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                  <Search className="w-4 h-4 text-[#FF0000]" />
                  Related Searches
                </h2>
                <div className="flex flex-wrap gap-2">
                  {[
                    "next.js 14 tutorial",
                    "react server components",
                    "typescript advanced",
                    "tailwind css tips",
                    "web development 2024",
                    "javascript frameworks",
                    "node.js backend",
                    "full stack developer",
                  ].map((term) => (
                    <motion.button
                      key={term}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.97 }}
                      onClick={() => {
                        setInputValue(term);
                        setQuery(term);
                      }}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#1a1a1a] border border-white/8 text-white/60 text-sm hover:text-white hover:border-white/20 transition-all"
                    >
                      <Search className="w-3 h-3" />
                      {term}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Load more */}
        {activeTab === "videos" && filteredVideos.length > 0 && (
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3 rounded-full bg-[#1a1a1a] border border-white/10 text-white/70 hover:text-white hover:border-white/30 text-sm font-medium transition-all flex items-center gap-2"
            >
              <Clock className="w-4 h-4" />
              Load More Results
            </motion.button>
          </motion.div>
        )}
      </div>
    </div>
  );
}