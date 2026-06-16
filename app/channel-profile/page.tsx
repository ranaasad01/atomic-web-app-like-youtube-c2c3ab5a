"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Users, Eye, Heart, Bell, Share2, MoreVertical, CheckCircle, Video, ThumbsUp, MessageSquare, Calendar, TrendingUp, Star, Grid, List, Search, Filter, ChevronDown, ArrowUp } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { formatViews, formatSubscribers, timeAgo } from "@/lib/data";

// ─── Mock Channel Data ────────────────────────────────────────────────────────
const CHANNEL = {
  id: "ch_techvision",
  name: "TechVision Studio",
  handle: "@techvisionstudio",
  avatar: "https://s3-eu-west-1.amazonaws.com/tpd/logos/660db0e5de92174130c723cb/0x0.png",
  banner: "https://s3-eu-west-1.amazonaws.com/tpd/logos/660db0e5de92174130c723cb/0x0.png",
  subscribers: 2480000,
  videoCount: 312,
  totalViews: 148500000,
  totalLikes: 9200000,
  description:
    "Deep dives into software engineering, AI breakthroughs, and the future of technology. New videos every Tuesday and Friday. We break down complex topics so anyone can understand them.",
  joinedAt: "2019-03-15T00:00:00Z",
  verified: true,
  location: "San Francisco, CA",
  links: [
    { label: "Website", url: "https://techvisionstudio.com" },
    { label: "Twitter", url: "https://twitter.com/techvisionstudio" },
    { label: "GitHub", url: "https://github.com/techvisionstudio" },
  ],
};

const CHANNEL_VIDEOS = [
  {
    id: "v1",
    title: "GPT-5 Is Here — Everything You Need to Know",
    thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Logo_of_Twitter.svg/1280px-Logo_of_Twitter.svg.png",
    duration: "18:42",
    views: 3200000,
    likes: 187000,
    comments: 4200,
    createdAt: "2024-05-20T00:00:00Z",
    category: "Tech",
  },
  {
    id: "v2",
    title: "I Built a Full-Stack App in 24 Hours — Here's What Happened",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1400/1*t23KbQgD25w9A-cx3nRO2A.png",
    duration: "24:15",
    views: 1850000,
    likes: 112000,
    comments: 3100,
    createdAt: "2024-05-13T00:00:00Z",
    category: "Tech",
  },
  {
    id: "v3",
    title: "The Real Reason React is Still Winning in 2024",
    thumbnail: "https://framerusercontent.com/images/N0xefN2fE6CCF4G2YhAg5exTHX8.png",
    duration: "21:08",
    views: 2100000,
    likes: 145000,
    comments: 5800,
    createdAt: "2024-05-06T00:00:00Z",
    category: "Tech",
  },
  {
    id: "v4",
    title: "Rust vs Go: Which Should You Learn First?",
    thumbnail: "https://devathon.com/blog/wp-content/uploads/sites/2/2020/05/rust-vs-go-which-one-to-choose.png",
    duration: "16:33",
    views: 980000,
    likes: 67000,
    comments: 2900,
    createdAt: "2024-04-29T00:00:00Z",
    category: "Tech",
  },
  {
    id: "v5",
    title: "How I Optimized My Database Queries by 10x",
    thumbnail: "/images/database-query-optimization-tutorial.jpg",
    duration: "19:55",
    views: 760000,
    likes: 54000,
    comments: 1800,
    createdAt: "2024-04-22T00:00:00Z",
    category: "Education",
  },
  {
    id: "v6",
    title: "The Architecture Behind Netflix's Recommendation Engine",
    thumbnail: "/images/netflix-recommendation-engine-architecture.jpg",
    duration: "27:40",
    views: 1420000,
    likes: 98000,
    comments: 3400,
    createdAt: "2024-04-15T00:00:00Z",
    category: "Tech",
  },
  {
    id: "v7",
    title: "TypeScript 5.5 — Every New Feature Explained",
    thumbnail: "/images/typescript-55-new-features-explained.jpg",
    duration: "14:22",
    views: 640000,
    likes: 48000,
    comments: 1200,
    createdAt: "2024-04-08T00:00:00Z",
    category: "Tech",
  },
  {
    id: "v8",
    title: "Why I Switched from VS Code to Neovim (and Back)",
    thumbnail: "/images/vscode-neovim-editor-comparison.jpg",
    duration: "12:50",
    views: 890000,
    likes: 72000,
    comments: 6700,
    createdAt: "2024-04-01T00:00:00Z",
    category: "Tech",
  },
];

const PLAYLISTS = [
  {
    id: "pl1",
    title: "AI & Machine Learning Deep Dives",
    videoCount: 24,
    thumbnail: "/images/ai-machine-learning-playlist-cover.jpg",
    updatedAt: "2024-05-18T00:00:00Z",
  },
  {
    id: "pl2",
    title: "Full-Stack Development Masterclass",
    videoCount: 38,
    thumbnail: "/images/fullstack-development-masterclass-cover.jpg",
    updatedAt: "2024-05-10T00:00:00Z",
  },
  {
    id: "pl3",
    title: "System Design Interviews",
    videoCount: 16,
    thumbnail: "/images/system-design-interview-playlist.jpg",
    updatedAt: "2024-04-28T00:00:00Z",
  },
  {
    id: "pl4",
    title: "DevOps & Cloud Engineering",
    videoCount: 21,
    thumbnail: "/images/devops-cloud-engineering-playlist.jpg",
    updatedAt: "2024-04-14T00:00:00Z",
  },
];

const COMMUNITY_POSTS = [
  {
    id: "cp1",
    text: "🚀 Just finished recording the GPT-5 deep dive — dropping Tuesday! This one took 3 weeks of research. What questions do you want answered?",
    likes: 14200,
    comments: 892,
    createdAt: "2024-05-19T00:00:00Z",
    image: "/images/gpt5-recording-behind-scenes.jpg",
  },
  {
    id: "cp2",
    text: "Poll: What topic should I cover next?\n\n🔵 WebAssembly in 2024\n🟢 Bun vs Node.js deep dive\n🔴 Building your own LLM from scratch\n🟡 Kubernetes for developers",
    likes: 8900,
    comments: 1240,
    createdAt: "2024-05-14T00:00:00Z",
    image: null,
  },
  {
    id: "cp3",
    text: "Hit 2.4M subscribers today 🎉 Thank you all so much. Started this channel in my bedroom with a $50 mic. Never thought we'd get here. More big things coming!",
    likes: 32000,
    comments: 3100,
    createdAt: "2024-05-08T00:00:00Z",
    image: "/images/channel-milestone-celebration.jpg",
  },
];

const STATS = [
  {
    label: "Subscribers",
    value: 2480000,
    formatted: "2.48M",
    icon: Users,
    color: "from-violet-500 to-purple-600",
    change: "+12.4%",
    up: true,
  },
  {
    label: "Total Views",
    value: 148500000,
    formatted: "148.5M",
    icon: Eye,
    color: "from-blue-500 to-cyan-600",
    change: "+8.7%",
    up: true,
  },
  {
    label: "Total Likes",
    value: 9200000,
    formatted: "9.2M",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    change: "+15.2%",
    up: true,
  },
  {
    label: "Videos",
    value: 312,
    formatted: "312",
    icon: Video,
    color: "from-amber-500 to-orange-600",
    change: "+4 this month",
    up: true,
  },
];

const TABS = ["Videos", "Playlists", "Community", "About"] as const;
type Tab = (typeof TABS)[number];

const SORT_OPTIONS = ["Newest", "Most Popular", "Oldest"] as const;
type SortOption = (typeof SORT_OPTIONS)[number];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoCard({
  video,
  view,
}: {
  video: (typeof CHANNEL_VIDEOS)[0];
  view: "grid" | "list";
}) {
  if (view === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ x: 4 }}
        className="flex gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer"
      >
        <div className="relative flex-shrink-0 w-40 h-24 rounded-lg overflow-hidden bg-[#272727]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='96' fill='%23272727'%3E%3Crect width='160' height='96'/%3E%3C/svg%3E";
            }}
          />
          <div className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-1.5">
            {video.title}
          </h3>
          <div className="flex items-center gap-3 text-white/40 text-xs">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.views)}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3 h-3" />
              {formatSubscribers(video.likes)}
            </span>
            <span className="flex items-center gap-1">
              <MessageSquare className="w-3 h-3" />
              {(video.comments ?? 0).toLocaleString()}
            </span>
            <span>{timeAgo(video.createdAt)}</span>
          </div>
        </div>
        <button className="flex-shrink-0 p-1.5 rounded-full text-white/30 hover:text-white hover:bg-white/10 transition-all opacity-0 group-hover:opacity-100">
          <MoreVertical className="w-4 h-4" />
        </button>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="group cursor-pointer"
    >
      <div className="relative rounded-xl overflow-hidden bg-[#272727] aspect-video mb-3">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' fill='%23272727'%3E%3Crect width='320' height='180'/%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileHover={{ opacity: 1, scale: 1 }}
            className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
          >
            <Play className="w-5 h-5 text-black fill-black ml-0.5" />
          </motion.div>
        </div>
        <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
          {video.duration}
        </div>
        <div className="absolute top-2 left-2 bg-[#FF0000]/90 text-white text-xs px-2 py-0.5 rounded-full font-medium">
          {video.category}
        </div>
      </div>
      <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-2">
        {video.title}
      </h3>
      <div className="flex items-center gap-2 text-white/40 text-xs flex-wrap">
        <span>{formatViews(video.views)}</span>
        <span>·</span>
        <span>{timeAgo(video.createdAt)}</span>
        <span>·</span>
        <span className="flex items-center gap-1">
          <ThumbsUp className="w-3 h-3" />
          {formatSubscribers(video.likes)}
        </span>
      </div>
    </motion.div>
  );
}

function PlaylistCard({ playlist }: { playlist: (typeof PLAYLISTS)[0] }) {
  return (
    <motion.div variants={scaleIn} whileHover={{ y: -4 }} className="group cursor-pointer">
      <div className="relative rounded-xl overflow-hidden bg-[#272727] aspect-video mb-3">
        <img
          src={playlist.thumbnail}
          alt={playlist.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' fill='%23272727'%3E%3Crect width='320' height='180'/%3E%3C/svg%3E";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2 text-white">
            <Play className="w-4 h-4 fill-white" />
            <span className="text-sm font-medium">{playlist.videoCount} videos</span>
          </div>
        </div>
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-lg">
          PLAYLIST
        </div>
      </div>
      <h3 className="text-white font-medium text-sm leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-1">
        {playlist.title}
      </h3>
      <p className="text-white/40 text-xs">Updated {timeAgo(playlist.updatedAt)}</p>
    </motion.div>
  );
}

function CommunityPost({ post }: { post: (typeof COMMUNITY_POSTS)[0] }) {
  const [liked, setLiked] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-5 hover:border-white/15 transition-all"
    >
      <div className="flex items-start gap-3 mb-4">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-[#272727] flex-shrink-0">
          <img
            src={CHANNEL.avatar}
            alt={CHANNEL.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' fill='%23272727'%3E%3Crect width='40' height='40'/%3E%3C/svg%3E";
            }}
          />
        </div>
        <div>
          <div className="flex items-center gap-1.5">
            <span className="text-white font-semibold text-sm">{CHANNEL.name}</span>
            {CHANNEL.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-[#FF0000] fill-[#FF0000]" />
            )}
          </div>
          <p className="text-white/40 text-xs">{timeAgo(post.createdAt)}</p>
        </div>
      </div>

      <p className="text-white/80 text-sm leading-relaxed whitespace-pre-line mb-4">
        {post.text}
      </p>

      {post.image && (
        <div className="rounded-xl overflow-hidden mb-4 aspect-video bg-[#272727]">
          <img
            src={post.image}
            alt="Community post"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='338' fill='%23272727'%3E%3Crect width='600' height='338'/%3E%3C/svg%3E";
            }}
          />
        </div>
      )}

      <div className="flex items-center gap-4 pt-3 border-t border-white/8">
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setLiked((p) => !p)}
          className={`flex items-center gap-1.5 text-sm transition-colors ${
            liked ? "text-[#FF0000]" : "text-white/50 hover:text-white"
          }`}
        >
          <ThumbsUp className={`w-4 h-4 ${liked ? "fill-[#FF0000]" : ""}`} />
          <span>{((post.likes ?? 0) + (liked ? 1 : 0)).toLocaleString()}</span>
        </motion.button>
        <button className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors">
          <MessageSquare className="w-4 h-4" />
          <span>{(post.comments ?? 0).toLocaleString()}</span>
        </button>
        <button className="flex items-center gap-1.5 text-sm text-white/50 hover:text-white transition-colors ml-auto">
          <Share2 className="w-4 h-4" />
          <span>Share</span>
        </button>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function ChannelProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("Videos");
  const [videoView, setVideoView] = useState<"grid" | "list">("grid");
  const [sortOption, setSortOption] = useState<SortOption>("Newest");
  const [subscribed, setSubscribed] = useState(false);
  const [notified, setNotified] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  const filteredVideos = (CHANNEL_VIDEOS ?? []).filter((v) =>
    v.title.toLowerCase().includes((searchQuery ?? "").toLowerCase())
  );

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* ── Banner ── */}
      <motion.div
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative w-full h-40 md:h-56 lg:h-64 bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] overflow-hidden"
      >
        <img
          src={CHANNEL.banner}
          alt={`${CHANNEL.name} banner`}
          className="w-full h-full object-cover opacity-70"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-transparent to-transparent" />
      </motion.div>

      {/* ── Channel Header ── */}
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col md:flex-row md:items-end gap-5 -mt-12 md:-mt-16 mb-8 relative z-10"
        >
          {/* Avatar */}
          <motion.div variants={scaleIn} className="flex-shrink-0">
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden border-4 border-[#0F0F0F] bg-[#272727] shadow-2xl shadow-black/60">
              <img
                src={CHANNEL.avatar}
                alt={CHANNEL.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='128' height='128' fill='%23272727'%3E%3Crect width='128' height='128'/%3E%3C/svg%3E";
                }}
              />
            </div>
          </motion.div>

          {/* Info */}
          <motion.div variants={fadeInUp} className="flex-1 min-w-0 pb-1">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                {CHANNEL.name}
              </h1>
              {CHANNEL.verified && (
                <CheckCircle className="w-5 h-5 text-[#FF0000] fill-[#FF0000] flex-shrink-0" />
              )}
            </div>
            <p className="text-white/50 text-sm mb-2">{CHANNEL.handle}</p>
            <div className="flex items-center gap-4 text-white/40 text-sm flex-wrap">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                {formatSubscribers(CHANNEL.subscribers)} subscribers
              </span>
              <span className="flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                {CHANNEL.videoCount} videos
              </span>
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Joined {timeAgo(CHANNEL.joinedAt)}
              </span>
            </div>
          </motion.div>

          {/* Actions */}
          <motion.div variants={slideInRight} className="flex items-center gap-3 flex-shrink-0">
            {subscribed && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setNotified((p) => !p)}
                className={`p-2.5 rounded-full border transition-all ${
                  notified
                    ? "bg-white/10 border-white/20 text-white"
                    : "border-white/15 text-white/50 hover:text-white hover:border-white/30"
                }`}
              >
                <Bell className={`w-4 h-4 ${notified ? "fill-white" : ""}`} />
              </motion.button>
            )}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setSubscribed((p) => !p)}
              className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all ${
                subscribed
                  ? "bg-[#272727] text-white border border-white/15 hover:bg-[#333]"
                  : "bg-[#FF0000] text-white hover:bg-[#cc0000] shadow-lg shadow-red-500/30"
              }`}
            >
              {subscribed ? "Subscribed" : "Subscribe"}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="p-2.5 rounded-full border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all"
            >
              <Share2 className="w-4 h-4" />
            </motion.button>
          </motion.div>
        </motion.div>

        {/* ── Stats Row ── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {STATS.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -3, scale: 1.02 }}
                className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-4 hover:border-white/15 transition-all"
              >
                <div className="flex items-start justify-between mb-3">
                  <div
                    className={`w-9 h-9 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center shadow-lg`}
                  >
                    <Icon className="w-4 h-4 text-white" />
                  </div>
                  <span
                    className={`text-xs font-medium flex items-center gap-0.5 ${
                      stat.up ? "text-emerald-400" : "text-rose-400"
                    }`}
                  >
                    <ArrowUp className="w-3 h-3" />
                    {stat.change}
                  </span>
                </div>
                <p className="text-2xl font-bold text-white mb-0.5">{stat.formatted}</p>
                <p className="text-white/40 text-xs">{stat.label}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* ── Tabs ── */}
        <div className="border-b border-white/8 mb-6">
          <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-5 py-3 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeTab === tab ? "text-white" : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div
                    layoutId="tab-indicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#FF0000] rounded-full"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ── Tab Content ── */}
        <AnimatePresence mode="wait">
          {/* VIDEOS TAB */}
          {activeTab === "Videos" && (
            <motion.div
              key="videos"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              {/* Toolbar */}
              <div className="flex items-center gap-3 mb-6 flex-wrap">
                <div className="relative flex-1 min-w-48 max-w-xs">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search videos…"
                    className="w-full bg-[#1a1a1a] border border-white/10 rounded-full pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 focus:outline-none focus:border-white/25 transition-all"
                  />
                </div>

                <div className="relative">
                  <button
                    onClick={() => setShowSortDropdown((p) => !p)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] border border-white/10 rounded-full text-sm text-white/70 hover:text-white hover:border-white/20 transition-all"
                  >
                    <Filter className="w-3.5 h-3.5" />
                    {sortOption}
                    <ChevronDown className="w-3.5 h-3.5" />
                  </button>
                  <AnimatePresence>
                    {showSortDropdown && (
                      <motion.div
                        initial={{ opacity: 0, y: 8, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 8, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute top-full mt-2 right-0 bg-[#1e1e1e] border border-white/10 rounded-xl overflow-hidden shadow-2xl shadow-black/60 z-20 min-w-36"
                      >
                        {SORT_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            onClick={() => {
                              setSortOption(opt);
                              setShowSortDropdown(false);
                            }}
                            className={`w-full text-left px-4 py-2.5 text-sm transition-colors ${
                              sortOption === opt
                                ? "text-[#FF0000] bg-[#FF0000]/10"
                                : "text-white/70 hover:text-white hover:bg-white/5"
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-1 bg-[#1a1a1a] border border-white/10 rounded-full p-1">
                  <button
                    onClick={() => setVideoView("grid")}
                    className={`p-1.5 rounded-full transition-all ${
                      videoView === "grid"
                        ? "bg-white/15 text-white"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    <Grid className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setVideoView("list")}
                    className={`p-1.5 rounded-full transition-all ${
                      videoView === "list"
                        ? "bg-white/15 text-white"
                        : "text-white/40 hover:text-white"
                    }`}
                  >
                    <List className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {filteredVideos.length === 0 ? (
                <div className="text-center py-16 text-white/30">
                  <Video className="w-12 h-12 mx-auto mb-3 opacity-30" />
                  <p>No videos match your search.</p>
                </div>
              ) : videoView === "grid" ? (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
                >
                  {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} view="grid" />
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  animate="visible"
                  className="flex flex-col divide-y divide-white/5"
                >
                  {filteredVideos.map((video) => (
                    <VideoCard key={video.id} video={video} view="list" />
                  ))}
                </motion.div>
              )}
            </motion.div>
          )}

          {/* PLAYLISTS TAB */}
          {activeTab === "Playlists" && (
            <motion.div
              key="playlists"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              >
                {PLAYLISTS.map((pl) => (
                  <PlaylistCard key={pl.id} playlist={pl} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* COMMUNITY TAB */}
          {activeTab === "Community" && (
            <motion.div
              key="community"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="max-w-2xl"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-4"
              >
                {COMMUNITY_POSTS.map((post) => (
                  <CommunityPost key={post.id} post={post} />
                ))}
              </motion.div>
            </motion.div>
          )}

          {/* ABOUT TAB */}
          {activeTab === "About" && (
            <motion.div
              key="about"
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              exit={{ opacity: 0 }}
              className="max-w-3xl"
            >
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
              >
                {/* Description */}
                <motion.div
                  variants={fadeInUp}
                  className="md:col-span-2 bg-[#1a1a1a] border border-white/8 rounded-2xl p-6"
                >
                  <h2 className="text-white font-semibold text-base mb-3">Description</h2>
                  <p className="text-white/60 text-sm leading-relaxed">
                    {CHANNEL.description}
                  </p>
                </motion.div>

                {/* Details */}
                <motion.div
                  variants={fadeInUp}
                  className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 flex flex-col gap-4"
                >
                  <h2 className="text-white font-semibold text-base">Details</h2>
                  <div className="flex flex-col gap-3 text-sm">
                    <div className="flex items-center gap-2 text-white/60">
                      <Calendar className="w-4 h-4 text-white/30 flex-shrink-0" />
                      <span>Joined {timeAgo(CHANNEL.joinedAt)}</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <Eye className="w-4 h-4 text-white/30 flex-shrink-0" />
                      <span>{(CHANNEL.totalViews ?? 0).toLocaleString()} total views</span>
                    </div>
                    <div className="flex items-center gap-2 text-white/60">
                      <TrendingUp className="w-4 h-4 text-white/30 flex-shrink-0" />
                      <span>{CHANNEL.location}</span>
                    </div>
                  </div>

                  <div className="border-t border-white/8 pt-4">
                    <h3 className="text-white/50 text-xs uppercase tracking-wide mb-3">Links</h3>
                    <div className="flex flex-col gap-2">
                      {(CHANNEL.links ?? []).map((link) => (
                        <a
                          key={link.label}
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#FF0000] hover:text-red-400 text-sm transition-colors truncate"
                        >
                          {link.label} ↗
                        </a>
                      ))}
                    </div>
                  </div>
                </motion.div>

                {/* Top Videos */}
                <motion.div
                  variants={fadeInUp}
                  className="md:col-span-3 bg-[#1a1a1a] border border-white/8 rounded-2xl p-6"
                >
                  <h2 className="text-white font-semibold text-base mb-4 flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-400" />
                    Top Performing Videos
                  </h2>
                  <div className="flex flex-col gap-3">
                    {CHANNEL_VIDEOS.slice(0, 4).map((video, idx) => (
                      <div
                        key={video.id}
                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/5 transition-all group cursor-pointer"
                      >
                        <span className="text-white/20 font-bold text-lg w-6 text-center flex-shrink-0">
                          {idx + 1}
                        </span>
                        <div className="w-20 h-12 rounded-lg overflow-hidden bg-[#272727] flex-shrink-0">
                          <img
                            src={video.thumbnail}
                            alt={video.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src =
                                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='48' fill='%23272727'%3E%3Crect width='80' height='48'/%3E%3C/svg%3E";
                            }}
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white text-sm font-medium line-clamp-1 group-hover:text-[#FF0000] transition-colors">
                            {video.title}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">{formatViews(video.views)}</p>
                        </div>
                        <div className="flex items-center gap-1 text-white/40 text-xs flex-shrink-0">
                          <ThumbsUp className="w-3 h-3" />
                          {formatSubscribers(video.likes)}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom padding */}
        <div className="h-16" />
      </div>
    </main>
  );
}