"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Share2, Download, Bell, Check, ChevronDown, ChevronRight, Eye, Clock, MoreVertical, Flag, Bookmark, Play, Pause, Volume2, VolumeX, Maximize, Settings, SkipForward, Heart, MessageSquare, Send, Search, Star } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import {
  formatViews,
  formatSubscribers,
  timeAgo,
  APP_NAME,
} from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MAIN_VIDEO = {
  id: "v1",
  title: "Building a Full-Stack App with Next.js 14 & TypeScript — Complete Guide",
  description: `In this comprehensive tutorial, we dive deep into building a production-ready full-stack application using Next.js 14's App Router, TypeScript, Tailwind CSS, and Prisma ORM.

What you'll learn:
• Setting up the Next.js 14 App Router with TypeScript
• Designing a scalable folder structure
• Building reusable server and client components
• Integrating Prisma with PostgreSQL for data persistence
• Implementing authentication with NextAuth.js
• Deploying to Vercel with CI/CD pipelines

This is the definitive guide for developers who want to ship real products with the modern React ecosystem. Whether you're a beginner or an experienced developer, this tutorial has something for everyone.

Links & Resources:
→ GitHub Repo: github.com/streamvibe/nextjs-fullstack
→ Starter Template: streamvibe.dev/templates
→ Discord Community: discord.gg/streamvibe`,
  thumbnail: "/images/nextjs-fullstack-tutorial.jpg",
  duration: "2:14:38",
  views: 2840000,
  likes: 94200,
  dislikes: 1100,
  tags: ["Next.js", "TypeScript", "Full Stack", "React", "Tutorial"],
  category: "tech",
  createdAt: "2024-04-10T00:00:00Z",
  channel: {
    id: "ch1",
    name: "CodeWithAlex",
    handle: "@codewithalex",
    avatar: "/images/channel-codewithalex-avatar.jpg",
    subscribers: 1240000,
    verified: true,
    description: "Weekly deep-dives into modern web development.",
  },
};

const COMMENTS = [
  {
    id: "c1",
    text: "This is hands-down the best Next.js tutorial I've ever watched. The way you explain the App Router is crystal clear. Subscribed immediately!",
    likes: 3420,
    createdAt: "2024-04-12T00:00:00Z",
    pinned: true,
    author: { id: "u1", name: "Sarah Mitchell", avatar: "/images/user-sarah-mitchell.jpg" },
    replies: [
      {
        id: "r1",
        text: "Totally agree! The section on server actions alone was worth the 2 hours.",
        likes: 812,
        createdAt: "2024-04-12T06:00:00Z",
        author: { id: "u2", name: "James Okafor", avatar: "/images/user-james-okafor.jpg" },
      },
      {
        id: "r2",
        text: "Same here. I've been struggling with the App Router for weeks and this cleared everything up.",
        likes: 540,
        createdAt: "2024-04-13T00:00:00Z",
        author: { id: "u3", name: "Priya Sharma", avatar: "/images/user-priya-sharma.jpg" },
      },
    ],
  },
  {
    id: "c2",
    text: "The Prisma integration section starting at 1:02:30 is pure gold. Bookmarked and sharing with my entire team.",
    likes: 1870,
    createdAt: "2024-04-11T00:00:00Z",
    pinned: false,
    author: { id: "u4", name: "Marcus Chen", avatar: "/images/user-marcus-chen.jpg" },
    replies: [],
  },
  {
    id: "c3",
    text: "I've watched this three times now. Each time I pick up something new. Alex is genuinely one of the best educators on the platform.",
    likes: 1240,
    createdAt: "2024-04-14T00:00:00Z",
    pinned: false,
    author: { id: "u5", name: "Elena Vasquez", avatar: "/images/user-elena-vasquez.jpg" },
    replies: [
      {
        id: "r3",
        text: "Three times? I'm on my second watch right now 😄",
        likes: 320,
        createdAt: "2024-04-14T08:00:00Z",
        author: { id: "u6", name: "Tom Nguyen", avatar: "/images/user-tom-nguyen.jpg" },
      },
    ],
  },
  {
    id: "c4",
    text: "Quick question — does this approach work with the Pages Router too, or is it strictly App Router only?",
    likes: 430,
    createdAt: "2024-04-15T00:00:00Z",
    pinned: false,
    author: { id: "u7", name: "Liam Patel", avatar: "/images/user-liam-patel.jpg" },
    replies: [],
  },
  {
    id: "c5",
    text: "The deployment section at the end saved me hours of debugging. My Vercel setup was completely wrong before this.",
    likes: 980,
    createdAt: "2024-04-16T00:00:00Z",
    pinned: false,
    author: { id: "u8", name: "Aisha Okonkwo", avatar: "/images/user-aisha-okonkwo.jpg" },
    replies: [],
  },
];

const RELATED_VIDEOS = [
  {
    id: "rv1",
    title: "React Server Components Explained — Everything You Need to Know",
    thumbnail: "/images/react-server-components-explained.jpg",
    duration: "38:22",
    views: 1560000,
    createdAt: "2024-03-20T00:00:00Z",
    channel: { name: "CodeWithAlex", handle: "@codewithalex", verified: true, avatar: "/images/channel-codewithalex-avatar.jpg" },
  },
  {
    id: "rv2",
    title: "Prisma ORM Crash Course — Database Made Easy",
    thumbnail: "/images/prisma-orm-crash-course.jpg",
    duration: "54:10",
    views: 890000,
    createdAt: "2024-02-14T00:00:00Z",
    channel: { name: "DBMaster", handle: "@dbmaster", verified: false, avatar: "/images/channel-dbmaster-avatar.jpg" },
  },
  {
    id: "rv3",
    title: "Tailwind CSS v4 — What's New & How to Migrate",
    thumbnail: "/images/tailwind-css-v4-whats-new.jpg",
    duration: "22:47",
    views: 2100000,
    createdAt: "2024-04-01T00:00:00Z",
    channel: { name: "StyleCraft", handle: "@stylecraft", verified: true, avatar: "/images/channel-stylecraft-avatar.jpg" },
  },
  {
    id: "rv4",
    title: "NextAuth.js v5 — Complete Authentication Setup",
    thumbnail: "/images/nextauth-v5-authentication.jpg",
    duration: "1:12:05",
    views: 740000,
    createdAt: "2024-03-05T00:00:00Z",
    channel: { name: "AuthPro", handle: "@authpro", verified: false, avatar: "/images/channel-authpro-avatar.jpg" },
  },
  {
    id: "rv5",
    title: "TypeScript Advanced Patterns for React Developers",
    thumbnail: "/images/typescript-advanced-patterns-react.jpg",
    duration: "47:33",
    views: 1230000,
    createdAt: "2024-01-28T00:00:00Z",
    channel: { name: "TypeMaster", handle: "@typemaster", verified: true, avatar: "/images/channel-typemaster-avatar.jpg" },
  },
  {
    id: "rv6",
    title: "Deploying Next.js to Vercel — Production Best Practices",
    thumbnail: "/images/deploying-nextjs-vercel-production.jpg",
    duration: "29:14",
    views: 560000,
    createdAt: "2024-04-08T00:00:00Z",
    channel: { name: "DeployDev", handle: "@deploydev", verified: false, avatar: "/images/channel-deploydev-avatar.jpg" },
  },
  {
    id: "rv7",
    title: "Zustand vs Redux Toolkit — State Management in 2024",
    thumbnail: "/images/zustand-vs-redux-state-management.jpg",
    duration: "33:58",
    views: 980000,
    createdAt: "2024-02-22T00:00:00Z",
    channel: { name: "StateFlow", handle: "@stateflow", verified: true, avatar: "/images/channel-stateflow-avatar.jpg" },
  },
];

const CHAPTERS = [
  { time: "0:00", label: "Introduction & Project Overview" },
  { time: "8:45", label: "Setting Up Next.js 14 App Router" },
  { time: "22:10", label: "TypeScript Configuration & Types" },
  { time: "38:30", label: "Building Server Components" },
  { time: "55:00", label: "Client Components & Interactivity" },
  { time: "1:10:20", label: "Prisma ORM & Database Setup" },
  { time: "1:28:45", label: "NextAuth.js Authentication" },
  { time: "1:52:00", label: "API Routes & Server Actions" },
  { time: "2:05:30", label: "Deployment to Vercel" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(18);

  return (
    <div className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group shadow-2xl shadow-black/60">
      {/* Thumbnail */}
      <img
        src={MAIN_VIDEO.thumbnail}
        alt={MAIN_VIDEO.title}
        className="w-full h-full object-cover"
      />

      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Center play button */}
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setPlaying(!playing)}
        className="absolute inset-0 flex items-center justify-center"
      >
        <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 opacity-90 hover:opacity-100 transition-opacity">
          {playing ? (
            <Pause className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-1" />
          )}
        </div>
      </motion.button>

      {/* Duration badge */}
      <div className="absolute top-3 right-3 bg-black/80 text-white text-xs font-mono px-2 py-1 rounded">
        {MAIN_VIDEO.duration}
      </div>

      {/* Controls bar */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-3 pt-8 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer">
          <div
            className="h-full bg-[#FF0000] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow" />
          </div>
        </div>

        {/* Control buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setPlaying(!playing)}
              className="text-white hover:text-[#FF0000] transition-colors"
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button className="text-white hover:text-[#FF0000] transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMuted(!muted)}
              className="text-white hover:text-[#FF0000] transition-colors"
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <span className="text-white/70 text-xs font-mono">24:18 / {MAIN_VIDEO.duration}</span>
          </div>
          <div className="flex items-center gap-3">
            <button className="text-white hover:text-[#FF0000] transition-colors">
              <Settings className="w-5 h-5" />
            </button>
            <button className="text-white hover:text-[#FF0000] transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LikeButton({ count, type }: { count: number; type: "like" | "dislike" }) {
  const [active, setActive] = useState(false);
  const Icon = type === "like" ? ThumbsUp : ThumbsDown;
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setActive(!active)}
      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
        active
          ? "bg-[#FF0000]/20 border-[#FF0000]/50 text-[#FF0000]"
          : "bg-[#272727] border-white/10 text-white/80 hover:bg-[#333] hover:text-white"
      }`}
    >
      <Icon className="w-4 h-4" />
      <span>{active ? (type === "like" ? count + 1 : count + 1) : count >= 1000 ? `${(count / 1000).toFixed(1)}K` : count}</span>
    </motion.button>
  );
}

function CommentItem({
  comment,
}: {
  comment: (typeof COMMENTS)[0];
}) {
  const [showReplies, setShowReplies] = useState(false);
  const [liked, setLiked] = useState(false);

  return (
    <motion.div variants={fadeInUp} className="flex gap-3">
      <img
        src={comment.author.avatar}
        alt={comment.author.name}
        className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5 border border-white/10"
      />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1 flex-wrap">
          <span className="text-white text-sm font-semibold">{comment.author.name}</span>
          {comment.pinned && (
            <span className="text-[#FF0000] text-xs flex items-center gap-1">
              <Star className="w-3 h-3" /> Pinned
            </span>
          )}
          <span className="text-white/40 text-xs">{timeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-white/80 text-sm leading-relaxed mb-2">{comment.text}</p>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setLiked(!liked)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${liked ? "text-[#FF0000]" : "text-white/50 hover:text-white"}`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{liked ? comment.likes + 1 : comment.likes >= 1000 ? `${(comment.likes / 1000).toFixed(1)}K` : comment.likes}</span>
          </button>
          <button className="text-white/50 hover:text-white text-xs transition-colors">
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          <button className="text-white/50 hover:text-white text-xs font-medium transition-colors">
            Reply
          </button>
        </div>

        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-3">
            <button
              onClick={() => setShowReplies(!showReplies)}
              className="flex items-center gap-1.5 text-[#3ea6ff] text-sm font-medium hover:text-[#3ea6ff]/80 transition-colors"
            >
              <ChevronDown
                className={`w-4 h-4 transition-transform ${showReplies ? "rotate-180" : ""}`}
              />
              {showReplies ? "Hide" : `${comment.replies.length}`} {comment.replies.length === 1 ? "reply" : "replies"}
            </button>
            <AnimatePresence>
              {showReplies && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="mt-3 space-y-4 overflow-hidden"
                >
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-3">
                      <img
                        src={reply.author.avatar}
                        alt={reply.author.name}
                        className="w-7 h-7 rounded-full object-cover flex-shrink-0 border border-white/10"
                      />
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-white text-xs font-semibold">{reply.author.name}</span>
                          <span className="text-white/40 text-xs">{timeAgo(reply.createdAt)}</span>
                        </div>
                        <p className="text-white/75 text-sm leading-relaxed">{reply.text}</p>
                        <div className="flex items-center gap-3 mt-1.5">
                          <button className="flex items-center gap-1 text-white/50 hover:text-white text-xs transition-colors">
                            <ThumbsUp className="w-3 h-3" />
                            <span>{reply.likes >= 1000 ? `${(reply.likes / 1000).toFixed(1)}K` : reply.likes}</span>
                          </button>
                          <button className="text-white/50 hover:text-white text-xs transition-colors">
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </motion.div>
  );
}

function RelatedVideoCard({ video }: { video: (typeof RELATED_VIDEOS)[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ x: 4 }}
      className="flex gap-3 group cursor-pointer"
    >
      <Link href={`/watch-video-player-comments?v=${video.id}`} className="flex gap-3 w-full">
        <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-[#1a1a1a]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs font-mono px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors mb-1">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 mb-0.5">
            <span className="text-white/50 text-xs">{video.channel.name}</span>
            {video.channel.verified && (
              <Check className="w-3 h-3 text-white/40" />
            )}
          </div>
          <div className="flex items-center gap-1.5 text-white/40 text-xs">
            <span>{formatViews(video.views)}</span>
            <span>•</span>
            <span>{timeAgo(video.createdAt)}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function WatchPage() {
  const [subscribed, setSubscribed] = useState(false);
  const [commentText, setCommentText] = useState("");
  const [commentSort, setCommentSort] = useState<"top" | "new">("top");
  const [showDescription, setShowDescription] = useState(false);
  const [showChapters, setShowChapters] = useState(false);
  const [savedToPlaylist, setSavedToPlaylist] = useState(false);

  const sortedComments =
    commentSort === "top"
      ? [...COMMENTS].sort((a, b) => b.likes - a.likes)
      : [...COMMENTS].sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-14">
      {/* Hidden h1 for SEO/accessibility */}
      <h1 className="sr-only">Watch: {MAIN_VIDEO.title} — {APP_NAME}</h1>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* ── Left column: player + info + comments ── */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              animate="visible"
            >
              <VideoPlayer />
            </motion.div>

            {/* Video title */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-4"
            >
              <h2 className="text-white text-xl md:text-2xl font-bold leading-snug">
                {MAIN_VIDEO.title}
              </h2>
            </motion.div>

            {/* Meta row */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center gap-2 mt-2 text-white/50 text-sm"
            >
              <span className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                {formatViews(MAIN_VIDEO.views)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock className="w-4 h-4" />
                {timeAgo(MAIN_VIDEO.createdAt)}
              </span>
              <span>•</span>
              <span className="capitalize">{MAIN_VIDEO.category}</span>
            </motion.div>

            {/* Tags */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mt-3"
            >
              {MAIN_VIDEO.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 bg-[#272727] border border-white/10 rounded-full text-xs text-white/60 hover:text-white hover:border-white/30 cursor-pointer transition-all"
                >
                  #{tag}
                </span>
              ))}
            </motion.div>

            {/* Action bar */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-between gap-3 mt-4 pb-4 border-b border-white/8"
            >
              {/* Like / Dislike */}
              <div className="flex items-center gap-2">
                <LikeButton count={MAIN_VIDEO.likes} type="like" />
                <LikeButton count={MAIN_VIDEO.dislikes} type="dislike" />
              </div>

              {/* Share / Save / More */}
              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] border border-white/10 text-white/80 hover:bg-[#333] hover:text-white text-sm font-medium transition-all"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSavedToPlaylist(!savedToPlaylist)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${
                    savedToPlaylist
                      ? "bg-[#FF0000]/20 border-[#FF0000]/50 text-[#FF0000]"
                      : "bg-[#272727] border-white/10 text-white/80 hover:bg-[#333] hover:text-white"
                  }`}
                >
                  <Bookmark className="w-4 h-4" />
                  {savedToPlaylist ? "Saved" : "Save"}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] border border-white/10 text-white/80 hover:bg-[#333] hover:text-white text-sm font-medium transition-all"
                >
                  <Download className="w-4 h-4" />
                  Download
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-[#272727] border border-white/10 text-white/60 hover:text-white hover:bg-[#333] transition-all"
                >
                  <MoreVertical className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Channel info + subscribe */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap items-center justify-between gap-4 py-4 border-b border-white/8"
            >
              <Link href="/channel" className="flex items-center gap-3 group">
                <div className="relative">
                  <img
                    src={MAIN_VIDEO.channel.avatar}
                    alt={MAIN_VIDEO.channel.name}
                    className="w-11 h-11 rounded-full object-cover border-2 border-white/10 group-hover:border-[#FF0000]/50 transition-all"
                  />
                  {MAIN_VIDEO.channel.verified && (
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FF0000] rounded-full flex items-center justify-center">
                      <Check className="w-2.5 h-2.5 text-white" />
                    </div>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold text-sm group-hover:text-[#FF0000] transition-colors">
                      {MAIN_VIDEO.channel.name}
                    </span>
                  </div>
                  <span className="text-white/50 text-xs">
                    {formatSubscribers(MAIN_VIDEO.channel.subscribers)} subscribers
                  </span>
                </div>
              </Link>

              <div className="flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setSubscribed(!subscribed)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
                    subscribed
                      ? "bg-[#272727] border border-white/20 text-white/70 hover:bg-[#333]"
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
                {subscribed && (
                  <motion.button
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2.5 rounded-full bg-[#272727] border border-white/10 text-white/60 hover:text-white hover:bg-[#333] transition-all"
                  >
                    <Bell className="w-4 h-4" />
                  </motion.button>
                )}
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-4 bg-[#1a1a1a] rounded-xl p-4 border border-white/6"
            >
              <div
                className={`text-white/70 text-sm leading-relaxed whitespace-pre-line ${
                  showDescription ? "" : "line-clamp-3"
                }`}
              >
                {MAIN_VIDEO.description}
              </div>
              <button
                onClick={() => setShowDescription(!showDescription)}
                className="mt-2 text-white text-sm font-semibold hover:text-[#FF0000] transition-colors flex items-center gap-1"
              >
                {showDescription ? "Show less" : "Show more"}
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${showDescription ? "rotate-180" : ""}`}
                />
              </button>
            </motion.div>

            {/* Chapters */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-4 bg-[#1a1a1a] rounded-xl border border-white/6 overflow-hidden"
            >
              <button
                onClick={() => setShowChapters(!showChapters)}
                className="w-full flex items-center justify-between px-4 py-3 text-white font-semibold text-sm hover:bg-white/5 transition-colors"
              >
                <span className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#FF0000]" />
                  Chapters ({CHAPTERS.length})
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white/50 transition-transform ${showChapters ? "rotate-180" : ""}`}
                />
              </button>
              <AnimatePresence>
                {showChapters && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-4 pb-3 space-y-1">
                      {CHAPTERS.map((ch, i) => (
                        <motion.button
                          key={ch.time}
                          whileHover={{ x: 4 }}
                          className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-all hover:bg-white/8 ${
                            i === 2 ? "bg-[#FF0000]/15 border border-[#FF0000]/30" : ""
                          }`}
                        >
                          <span className="text-[#3ea6ff] font-mono text-xs w-12 text-left flex-shrink-0">
                            {ch.time}
                          </span>
                          <span className={`text-left ${i === 2 ? "text-white font-medium" : "text-white/70"}`}>
                            {ch.label}
                          </span>
                          {i === 2 && (
                            <span className="ml-auto text-[#FF0000] text-xs font-medium">Playing</span>
                          )}
                        </motion.button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Comments section */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-8"
            >
              {/* Comments header */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-white text-lg font-bold flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-[#FF0000]" />
                  {(COMMENTS.length * 47).toLocaleString()} Comments
                </h3>
                <div className="flex items-center gap-1 bg-[#1a1a1a] border border-white/10 rounded-full p-1">
                  {(["top", "new"] as const).map((sort) => (
                    <button
                      key={sort}
                      onClick={() => setCommentSort(sort)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                        commentSort === sort
                          ? "bg-[#FF0000] text-white"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {sort === "top" ? "Top" : "Newest"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Add comment */}
              <div className="flex gap-3 mb-8">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF0000] to-[#cc0000] flex items-center justify-center flex-shrink-0 text-white font-bold text-sm">
                  Y
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment…"
                    className="w-full bg-transparent border-b border-white/20 focus:border-[#FF0000] pb-2 text-sm text-white placeholder-white/30 focus:outline-none transition-colors"
                  />
                  {commentText.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center justify-end gap-2 mt-2"
                    >
                      <button
                        onClick={() => setCommentText("")}
                        className="px-4 py-1.5 rounded-full text-white/60 hover:text-white text-sm transition-colors"
                      >
                        Cancel
                      </button>
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setCommentText("")}
                        className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#FF0000] text-white text-sm font-medium hover:bg-[#cc0000] transition-colors"
                      >
                        <Send className="w-3.5 h-3.5" />
                        Comment
                      </motion.button>
                    </motion.div>
                  )}
                </div>
              </div>

              {/* Comment list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-6"
              >
                {sortedComments.map((comment) => (
                  <CommentItem key={comment.id} comment={comment} />
                ))}
              </motion.div>

              {/* Load more */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="mt-8 w-full py-3 rounded-xl border border-white/10 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 text-sm font-medium transition-all"
              >
                Load more comments
              </motion.button>
            </motion.div>
          </div>

          {/* ── Right column: related videos ── */}
          <div className="xl:w-96 flex-shrink-0">
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="sticky top-20"
            >
              {/* Up next label */}
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-white font-bold text-base flex items-center gap-2">
                  <ChevronRight className="w-4 h-4 text-[#FF0000]" />
                  Up Next
                </h3>
                <button className="text-white/50 hover:text-white text-xs transition-colors flex items-center gap-1">
                  Autoplay <span className="w-8 h-4 bg-[#FF0000] rounded-full inline-block ml-1 relative"><span className="absolute right-0.5 top-0.5 w-3 h-3 bg-white rounded-full" /></span>
                </button>
              </div>

              {/* Related video list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="space-y-4"
              >
                {RELATED_VIDEOS.map((video) => (
                  <RelatedVideoCard key={video.id} video={video} />
                ))}
              </motion.div>

              {/* Recommended channels */}
              <div className="mt-8">
                <h3 className="text-white font-bold text-sm mb-4 flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#FF0000]" />
                  Recommended Channels
                </h3>
                <motion.div
                  variants={staggerContainer}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  {[
                    { name: "TypeMaster", handle: "@typemaster", subs: 890000, avatar: "/images/channel-typemaster-avatar.jpg", verified: true },
                    { name: "DBMaster", handle: "@dbmaster", subs: 430000, avatar: "/images/channel-dbmaster-avatar.jpg", verified: false },
                    { name: "StyleCraft", handle: "@stylecraft", subs: 1100000, avatar: "/images/channel-stylecraft-avatar.jpg", verified: true },
                  ].map((ch) => (
                    <motion.div key={ch.handle} variants={fadeInUp}>
                      <Link
                        href="/channel"
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-all group"
                      >
                        <img
                          src={ch.avatar}
                          alt={ch.name}
                          className="w-10 h-10 rounded-full object-cover border border-white/10 group-hover:border-[#FF0000]/40 transition-all"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-1">
                            <span className="text-white text-sm font-medium group-hover:text-[#FF0000] transition-colors truncate">
                              {ch.name}
                            </span>
                            {ch.verified && <Check className="w-3 h-3 text-white/40 flex-shrink-0" />}
                          </div>
                          <span className="text-white/40 text-xs">{formatSubscribers(ch.subs)} subscribers</span>
                        </div>
                        <button className="px-3 py-1 rounded-full bg-[#272727] border border-white/10 text-white/70 text-xs font-medium hover:bg-[#FF0000] hover:border-[#FF0000] hover:text-white transition-all flex-shrink-0">
                          Subscribe
                        </button>
                      </Link>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  );
}