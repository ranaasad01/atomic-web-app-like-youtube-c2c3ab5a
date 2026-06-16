"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, Check, Play, Eye, ThumbsUp, Calendar, Users, Video, Info, Share2, Flag, BarChart2, Clock } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import {
  formatViews,
  formatSubscribers,
  timeAgo,
  type Video as VideoType,
  type Channel as ChannelType,
} from "@/lib/data";

// ─── Mock Channel Data ────────────────────────────────────────────────────────
const mockChannel: ChannelType = {
  id: "ch-001",
  name: "TechVision Studio",
  handle: "@techvisionstudio",
  avatar: "https://s3-eu-west-1.amazonaws.com/tpd/logos/660db0e5de92174130c723cb/0x0.png",
  banner: "https://s3-eu-west-1.amazonaws.com/tpd/logos/660db0e5de92174130c723cb/0x0.png",
  subscribers: 1_240_000,
  videoCount: 312,
  description:
    "Welcome to TechVision Studio — your go-to destination for deep-dive tech reviews, cutting-edge AI breakdowns, and hands-on tutorials. We cover everything from the latest GPU releases to building your own neural networks from scratch. New videos every Tuesday and Friday. Join 1.2M curious minds who love technology as much as we do.",
  joinedAt: "2019-03-15T00:00:00Z",
  verified: true,
};

// ─── Mock Videos ─────────────────────────────────────────────────────────────
const mockVideos: VideoType[] = [
  {
    id: "v-001",
    title: "RTX 5090 Full Review: Is It Worth $2,000?",
    description: "We put the RTX 5090 through its paces in 4K, 8K, and ray-tracing benchmarks.",
    thumbnail: "/images/rtx-5090-gpu-review.jpg",
    videoUrl: "/watch/v-001",
    duration: "24:18",
    views: 3_800_000,
    likes: 142_000,
    dislikes: 3_200,
    tags: ["GPU", "RTX 5090", "Review"],
    category: "tech",
    createdAt: "2024-05-10T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-002",
    title: "Building a Local AI Assistant with Llama 3 — Full Tutorial",
    description: "Step-by-step guide to running Llama 3 locally on consumer hardware.",
    thumbnail: "/images/local-ai-llama3-tutorial.jpg",
    videoUrl: "/watch/v-002",
    duration: "41:05",
    views: 2_100_000,
    likes: 98_000,
    dislikes: 1_100,
    tags: ["AI", "Llama 3", "Tutorial"],
    category: "tech",
    createdAt: "2024-04-22T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-003",
    title: "Apple M4 MacBook Pro vs. Windows Ultrabooks — 2024 Showdown",
    description: "Which laptop ecosystem wins for developers and creators in 2024?",
    thumbnail: "/images/macbook-pro-m4-vs-windows.jpg",
    videoUrl: "/watch/v-003",
    duration: "33:47",
    views: 1_650_000,
    likes: 74_000,
    dislikes: 5_800,
    tags: ["MacBook", "Apple M4", "Laptop"],
    category: "tech",
    createdAt: "2024-04-05T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-004",
    title: "How Quantum Computing Will Break the Internet (And How We Fix It)",
    description: "Exploring post-quantum cryptography and what it means for everyday security.",
    thumbnail: "/images/quantum-computing-cryptography.jpg",
    videoUrl: "/watch/v-004",
    duration: "28:52",
    views: 980_000,
    likes: 61_000,
    dislikes: 900,
    tags: ["Quantum", "Security", "Cryptography"],
    category: "science",
    createdAt: "2024-03-18T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-005",
    title: "I Built a Smart Home for $300 — Here's What Happened",
    description: "Full smart home setup using open-source tools, Home Assistant, and cheap sensors.",
    thumbnail: "/images/smart-home-budget-setup.jpg",
    videoUrl: "/watch/v-005",
    duration: "19:34",
    views: 4_200_000,
    likes: 187_000,
    dislikes: 2_400,
    tags: ["Smart Home", "DIY", "Home Assistant"],
    category: "tech",
    createdAt: "2024-02-28T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-006",
    title: "The Truth About Solid-State Batteries in 2024",
    description: "Are solid-state batteries finally ready for EVs and consumer electronics?",
    thumbnail: "/images/solid-state-battery-2024.jpg",
    videoUrl: "/watch/v-006",
    duration: "22:11",
    views: 760_000,
    likes: 43_000,
    dislikes: 700,
    tags: ["Battery", "EV", "Science"],
    category: "science",
    createdAt: "2024-02-10T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-007",
    title: "Next.js 15 — Every New Feature Explained",
    description: "A complete walkthrough of Next.js 15's new features, from partial prerendering to improved caching.",
    thumbnail: "/images/nextjs-15-new-features.jpg",
    videoUrl: "/watch/v-007",
    duration: "37:29",
    views: 1_320_000,
    likes: 89_000,
    dislikes: 1_200,
    tags: ["Next.js", "Web Dev", "React"],
    category: "tech",
    createdAt: "2024-01-25T00:00:00Z",
    channel: mockChannel,
  },
  {
    id: "v-008",
    title: "Why I Switched from VS Code to Zed Editor",
    description: "After 6 months with Zed, here's my honest take on performance, extensions, and workflow.",
    thumbnail: "/images/zed-editor-vs-vscode.jpg",
    videoUrl: "/watch/v-008",
    duration: "15:43",
    views: 540_000,
    likes: 31_000,
    dislikes: 2_100,
    tags: ["Zed", "VS Code", "Editor"],
    category: "tech",
    createdAt: "2024-01-08T00:00:00Z",
    channel: mockChannel,
  },
];

// ─── Channel Stats ────────────────────────────────────────────────────────────
const channelStats = [
  { label: "Subscribers", value: "1.24M", icon: Users },
  { label: "Total Videos", value: "312", icon: Video },
  { label: "Total Views", value: "284M", icon: Eye },
  { label: "Total Likes", value: "9.8M", icon: ThumbsUp },
];

// ─── VideoCard Component (inline) ────────────────────────────────────────────
function VideoCard({ video, index }: { video: VideoType; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group cursor-pointer"
    >
      <Link href={`/watch/${video.id}`}>
        {/* Thumbnail */}
        <div className="relative rounded-xl overflow-hidden aspect-video bg-[#1a1a1a] mb-3">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23272727'/%3E%3Cpath d='M160 90 L240 112.5 L160 135 Z' fill='%23FF0000' opacity='0.7'/%3E%3C/svg%3E";
            }}
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
          {/* Play overlay */}
          <AnimatePresence>
            {hovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 bg-black/30 flex items-center justify-center"
              >
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border border-white/30">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="flex gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-1">
              {video.title}
            </h3>
            <div className="flex items-center gap-2 text-white/50 text-xs">
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(video.views)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {timeAgo(video.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function ChannelPage() {
  const [activeTab, setActiveTab] = useState<"videos" | "about">("videos");
  const [subscribed, setSubscribed] = useState(false);
  const [notified, setNotified] = useState(false);

  const channel = mockChannel;

  const handleSubscribe = () => {
    setSubscribed((prev) => !prev);
    if (subscribed) setNotified(false);
  };

  const handleNotify = () => {
    if (subscribed) setNotified((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-[#0F0F0F] text-white">
      {/* ── Banner ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative w-full h-40 sm:h-52 md:h-64 overflow-hidden bg-[#1a1a1a]"
      >
        <img
          src={channel.banner}
          alt={`${channel.name} banner`}
          className="w-full h-full object-cover"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-transparent" />
      </motion.div>

      {/* ── Channel Header ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row items-start sm:items-end gap-5 -mt-12 sm:-mt-16 mb-8 relative z-10"
        >
          {/* Avatar */}
          <motion.div variants={scaleIn} className="flex-shrink-0">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full border-4 border-[#0F0F0F] overflow-hidden bg-[#272727] shadow-2xl shadow-black/60">
              <img
                src={channel.avatar}
                alt={channel.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  const el = e.target as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.style.background =
                      "linear-gradient(135deg, #FF0000 0%, #cc0000 100%)";
                    parent.innerHTML = `<span style="color:white;font-size:2.5rem;font-weight:700;display:flex;align-items:center;justify-content:center;height:100%">${(channel.name ?? "?").charAt(0)}</span>`;
                  }
                }}
              />
            </div>
          </motion.div>

          {/* Channel info */}
          <motion.div variants={slideInLeft} className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1">
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                {channel.name}
              </h1>
              {channel.verified && (
                <span
                  title="Verified"
                  className="w-5 h-5 rounded-full bg-white flex items-center justify-center flex-shrink-0"
                >
                  <Check className="w-3 h-3 text-[#0F0F0F]" strokeWidth={3} />
                </span>
              )}
            </div>
            <p className="text-white/50 text-sm mb-1">{channel.handle}</p>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-white/40 text-sm">
              <span>{formatSubscribers(channel.subscribers)} subscribers</span>
              <span>•</span>
              <span>{channel.videoCount} videos</span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div
            variants={slideInRight}
            className="flex items-center gap-2 flex-shrink-0 pb-1"
          >
            {/* Notify bell (only visible when subscribed) */}
            <AnimatePresence>
              {subscribed && (
                <motion.button
                  key="bell"
                  initial={{ opacity: 0, scale: 0.7 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.7 }}
                  transition={{ duration: 0.25 }}
                  onClick={handleNotify}
                  title={notified ? "Turn off notifications" : "Turn on notifications"}
                  className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                    notified
                      ? "bg-white/15 border-white/30 text-white"
                      : "bg-[#272727] border-white/10 text-white/60 hover:text-white hover:bg-[#333]"
                  }`}
                >
                  <Bell className={`w-4 h-4 ${notified ? "fill-white" : ""}`} />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Subscribe button */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={handleSubscribe}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-300 ${
                subscribed
                  ? "bg-[#272727] border border-white/15 text-white hover:bg-[#333] hover:border-white/25"
                  : "bg-[#FF0000] text-white hover:bg-[#cc0000] shadow-lg shadow-red-500/30"
              }`}
            >
              {subscribed ? (
                <>
                  <Check className="w-4 h-4" />
                  Subscribed
                </>
              ) : (
                "Subscribe"
              )}
            </motion.button>

            {/* Share */}
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="w-10 h-10 rounded-full bg-[#272727] border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-[#333] transition-all"
              title="Share channel"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Tabs ── */}
        <div className="border-b border-white/10 mb-8">
          <div className="flex gap-1">
            {(["videos", "about"] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-3 text-sm font-semibold capitalize transition-colors ${
                  activeTab === tab
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab === "videos" ? "Videos" : "About"}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000] rounded-full"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {activeTab === "videos" && (
            <motion.div
              key="videos"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 pb-16"
              >
                {mockVideos.map((video, index) => (
                  <VideoCard key={video.id} video={video} index={index} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {activeTab === "about" && (
            <motion.div
              key="about"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0, y: 8, transition: { duration: 0.2 } }}
              className="pb-16"
            >
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Description */}
                <motion.div
                  variants={slideInLeft}
                  initial="hidden"
                  animate="visible"
                  className="lg:col-span-2"
                >
                  <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 mb-6">
                    <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <Info className="w-5 h-5 text-[#FF0000]" />
                      About this channel
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed whitespace-pre-line">
                      {channel.description}
                    </p>
                  </div>

                  {/* Topics */}
                  <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
                    <h2 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
                      <Flag className="w-5 h-5 text-[#FF0000]" />
                      Topics we cover
                    </h2>
                    <div className="flex flex-wrap gap-2">
                      {[
                        "GPU Reviews",
                        "AI & Machine Learning",
                        "Web Development",
                        "Cybersecurity",
                        "Smart Home",
                        "Quantum Computing",
                        "Apple Ecosystem",
                        "Linux",
                        "Open Source",
                        "DIY Tech",
                        "Productivity",
                        "Programming Tutorials",
                      ].map((topic) => (
                        <span
                          key={topic}
                          className="px-3 py-1.5 bg-[#272727] border border-white/10 rounded-full text-white/70 text-xs font-medium hover:border-[#FF0000]/40 hover:text-white transition-all cursor-default"
                        >
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Stats sidebar */}
                <motion.div
                  variants={slideInRight}
                  initial="hidden"
                  animate="visible"
                  className="space-y-4"
                >
                  {/* Stat cards */}
                  <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
                    <h2 className="text-white font-semibold text-lg mb-5 flex items-center gap-2">
                      <BarChart2 className="w-5 h-5 text-[#FF0000]" />
                      Channel Stats
                    </h2>
                    <div className="space-y-4">
                      {channelStats.map((stat) => {
                        const Icon = stat.icon;
                        return (
                          <div
                            key={stat.label}
                            className="flex items-center justify-between"
                          >
                            <div className="flex items-center gap-2.5 text-white/60 text-sm">
                              <div className="w-8 h-8 rounded-lg bg-[#272727] flex items-center justify-center">
                                <Icon className="w-4 h-4 text-[#FF0000]" />
                              </div>
                              {stat.label}
                            </div>
                            <span className="text-white font-bold text-sm">
                              {stat.value}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Joined date */}
                  <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
                    <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-[#FF0000]" />
                      Channel Details
                    </h2>
                    <div className="space-y-3 text-sm">
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Joined</span>
                        <span className="text-white/80">March 2019</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Country</span>
                        <span className="text-white/80">United States</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Upload schedule</span>
                        <span className="text-white/80">Tue & Fri</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-white/50">Language</span>
                        <span className="text-white/80">English</span>
                      </div>
                    </div>
                  </div>

                  {/* Social links */}
                  <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6">
                    <h2 className="text-white font-semibold text-base mb-4">
                      Links
                    </h2>
                    <div className="space-y-2.5">
                      {[
                        { label: "Official Website", url: "techvisionstudio.com" },
                        { label: "Twitter / X", url: "@techvisionstudio" },
                        { label: "Discord Server", url: "discord.gg/techvision" },
                        { label: "Newsletter", url: "techvision.substack.com" },
                      ].map((link) => (
                        <div
                          key={link.label}
                          className="flex items-center justify-between group cursor-pointer"
                        >
                          <span className="text-white/50 text-sm">{link.label}</span>
                          <span className="text-[#FF0000] text-sm group-hover:underline truncate max-w-[140px]">
                            {link.url}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}