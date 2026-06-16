"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, Share2, Bell, ChevronDown, ChevronUp, Play, Pause, Volume2, VolumeX, Maximize, MoreHorizontal, Flag, Scissors, Download, Check, Eye } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { formatViews, timeAgo, formatSubscribers } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_VIDEO = {
  id: "v1",
  title: "Building a Full-Stack App with Next.js 14 & TypeScript — Complete Guide",
  description: `In this comprehensive tutorial, we dive deep into building a production-ready full-stack application using Next.js 14's App Router, TypeScript, Tailwind CSS, and Prisma ORM.

What you'll learn:
• Setting up a Next.js 14 project with TypeScript and Tailwind CSS
• Understanding the App Router and Server Components
• Building API routes with Route Handlers
• Database integration with Prisma and PostgreSQL
• Authentication with NextAuth.js
• Deploying to Vercel with CI/CD

This video is perfect for intermediate developers who want to level up their React and Next.js skills. We'll build a real-world project from scratch, covering everything from project setup to production deployment.

Chapters:
0:00 - Introduction
3:45 - Project Setup
12:30 - App Router Deep Dive
28:00 - Database & Prisma
45:15 - Authentication
1:02:00 - Deployment

Resources mentioned:
- Next.js Docs: https://nextjs.org/docs
- Prisma Docs: https://prisma.io/docs
- Tailwind CSS: https://tailwindcss.com`,
  thumbnail: "/images/nextjs-fullstack-tutorial.jpg",
  videoUrl: "",
  duration: "1:18:42",
  views: 2480000,
  likes: 94200,
  dislikes: 1800,
  tags: ["nextjs", "typescript", "fullstack", "webdev", "react"],
  category: "tech",
  createdAt: "2024-04-10T00:00:00Z",
  channel: {
    id: "ch1",
    name: "CodeCraft Studio",
    handle: "@codecraftstudio",
    avatar: "/images/channel-codecraft-avatar.jpg",
    banner: "/images/channel-codecraft-banner.jpg",
    subscribers: 1240000,
    videoCount: 312,
    description: "Premium web development tutorials for modern developers.",
    joinedAt: "2019-03-15T00:00:00Z",
    verified: true,
  },
};

const MOCK_COMMENTS = [
  {
    id: "c1",
    text: "This is hands-down the best Next.js tutorial I've ever watched. The way you explain Server Components vs Client Components finally clicked for me. Subscribed immediately!",
    likes: 3420,
    createdAt: "2024-04-12T00:00:00Z",
    author: { id: "u1", name: "Alex Rivera", avatar: "/images/avatar-alex-rivera.jpg" },
    replies: 48,
  },
  {
    id: "c2",
    text: "I've been struggling with Prisma migrations for weeks. Your explanation at 28:00 saved my project. Thank you so much for the detailed walkthrough!",
    likes: 1870,
    createdAt: "2024-04-13T00:00:00Z",
    author: { id: "u2", name: "Priya Sharma", avatar: "/images/avatar-priya-sharma.jpg" },
    replies: 22,
  },
  {
    id: "c3",
    text: "The authentication section is pure gold. NextAuth.js always felt like black magic to me but now I actually understand what's happening under the hood.",
    likes: 1240,
    createdAt: "2024-04-14T00:00:00Z",
    author: { id: "u3", name: "Marcus Chen", avatar: "/images/avatar-marcus-chen.jpg" },
    replies: 15,
  },
  {
    id: "c4",
    text: "Could you make a follow-up video on adding real-time features with WebSockets or Pusher? This tutorial is the perfect foundation for that!",
    likes: 892,
    createdAt: "2024-04-15T00:00:00Z",
    author: { id: "u4", name: "Sophie Laurent", avatar: "/images/avatar-sophie-laurent.jpg" },
    replies: 7,
  },
  {
    id: "c5",
    text: "Just finished following along and deployed my first full-stack app to Vercel. I can't believe how smooth the process was. This channel is a gem.",
    likes: 654,
    createdAt: "2024-04-16T00:00:00Z",
    author: { id: "u5", name: "Jordan Williams", avatar: "/images/avatar-jordan-williams.jpg" },
    replies: 11,
  },
  {
    id: "c6",
    text: "The chapter timestamps are incredibly helpful. I keep coming back to the Prisma section as a reference. Please keep making content like this!",
    likes: 421,
    createdAt: "2024-04-17T00:00:00Z",
    author: { id: "u6", name: "Kenji Tanaka", avatar: "/images/avatar-kenji-tanaka.jpg" },
    replies: 3,
  },
];

const RECOMMENDED_VIDEOS = [
  {
    id: "r1",
    title: "React Server Components Explained — Everything You Need to Know",
    thumbnail: "/images/react-server-components-explained.jpg",
    duration: "32:15",
    views: 1820000,
    createdAt: "2024-03-20T00:00:00Z",
    channel: { name: "CodeCraft Studio", handle: "@codecraftstudio", verified: true, avatar: "/images/channel-codecraft-avatar.jpg" },
  },
  {
    id: "r2",
    title: "Tailwind CSS v4 — New Features & Migration Guide",
    thumbnail: "/images/tailwind-css-v4-features.jpg",
    duration: "24:08",
    views: 980000,
    createdAt: "2024-04-01T00:00:00Z",
    channel: { name: "UI Masters", handle: "@uimasters", verified: false, avatar: "/images/channel-uimasters-avatar.jpg" },
  },
  {
    id: "r3",
    title: "TypeScript 5.4 — What's New and Why It Matters",
    thumbnail: "/images/typescript-54-whats-new.jpg",
    duration: "18:55",
    views: 740000,
    createdAt: "2024-03-28T00:00:00Z",
    channel: { name: "TypeScript Weekly", handle: "@tsweekly", verified: true, avatar: "/images/channel-tsweekly-avatar.jpg" },
  },
  {
    id: "r4",
    title: "Prisma ORM Deep Dive — Relations, Migrations & Performance",
    thumbnail: "/images/prisma-orm-deep-dive.jpg",
    duration: "45:30",
    views: 560000,
    createdAt: "2024-02-14T00:00:00Z",
    channel: { name: "Database Decoded", handle: "@dbdecoded", verified: false, avatar: "/images/channel-dbdecoded-avatar.jpg" },
  },
  {
    id: "r5",
    title: "Deploying Next.js to Vercel — CI/CD, Edge Functions & Analytics",
    thumbnail: "/images/nextjs-vercel-deployment.jpg",
    duration: "28:44",
    views: 1100000,
    createdAt: "2024-03-05T00:00:00Z",
    channel: { name: "DevOps Simplified", handle: "@devopssimplified", verified: true, avatar: "/images/channel-devops-avatar.jpg" },
  },
  {
    id: "r6",
    title: "Authentication in 2024 — NextAuth vs Clerk vs Auth0 Compared",
    thumbnail: "/images/authentication-comparison-2024.jpg",
    duration: "38:12",
    views: 890000,
    createdAt: "2024-04-05T00:00:00Z",
    channel: { name: "Security First Dev", handle: "@securityfirstdev", verified: false, avatar: "/images/channel-securityfirst-avatar.jpg" },
  },
  {
    id: "r7",
    title: "tRPC + Next.js — End-to-End Type Safety Without GraphQL",
    thumbnail: "/images/trpc-nextjs-type-safety.jpg",
    duration: "52:20",
    views: 430000,
    createdAt: "2024-01-22T00:00:00Z",
    channel: { name: "CodeCraft Studio", handle: "@codecraftstudio", verified: true, avatar: "/images/channel-codecraft-avatar.jpg" },
  },
  {
    id: "r8",
    title: "CSS Grid vs Flexbox — When to Use Which (2024 Guide)",
    thumbnail: "/images/css-grid-vs-flexbox-guide.jpg",
    duration: "21:05",
    views: 2100000,
    createdAt: "2024-02-28T00:00:00Z",
    channel: { name: "UI Masters", handle: "@uimasters", verified: false, avatar: "/images/channel-uimasters-avatar.jpg" },
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoPlayer({ thumbnail }: { thumbnail: string }) {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (playing) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setPlaying(!playing);
    } else {
      setPlaying(!playing);
    }
  };

  const toggleMute = () => setMuted((m) => !m);

  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="relative w-full aspect-video bg-black rounded-xl overflow-hidden group shadow-2xl shadow-black/60"
    >
      {/* Thumbnail overlay when not playing */}
      {!playing && (
        <div className="absolute inset-0 z-10">
          <img
            src={thumbnail}
            alt="Video thumbnail"
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
      )}

      {/* Video element (hidden src — demo) */}
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted={muted}
        onTimeUpdate={() => {
          if (videoRef.current && videoRef.current.duration) {
            setProgress((videoRef.current.currentTime / videoRef.current.duration) * 100);
          }
        }}
        onEnded={() => setPlaying(false)}
      />

      {/* Play button overlay */}
      <motion.button
        onClick={togglePlay}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className={`absolute inset-0 z-20 flex items-center justify-center transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
        aria-label={playing ? "Pause" : "Play"}
      >
        <div className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center shadow-xl shadow-red-500/40">
          {playing ? (
            <Pause className="w-7 h-7 text-white" />
          ) : (
            <Play className="w-7 h-7 text-white ml-1" />
          )}
        </div>
      </motion.button>

      {/* Controls bar */}
      <div
        className={`absolute bottom-0 left-0 right-0 z-30 bg-gradient-to-t from-black/90 to-transparent px-4 pb-3 pt-8 transition-opacity duration-300 ${
          playing ? "opacity-0 group-hover:opacity-100" : "opacity-100"
        }`}
      >
        {/* Progress bar */}
        <div className="w-full h-1 bg-white/20 rounded-full mb-3 cursor-pointer relative">
          <div
            className="h-full bg-[#FF0000] rounded-full relative"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md" />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={togglePlay}
              className="text-white hover:text-[#FF0000] transition-colors"
              aria-label={playing ? "Pause" : "Play"}
            >
              {playing ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            <button
              onClick={toggleMute}
              className="text-white hover:text-[#FF0000] transition-colors"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            <span className="text-white/70 text-xs font-mono">
              {progress > 0 ? `${Math.floor((progress / 100) * 4722)}s` : "0:00"} / 1:18:42
            </span>
          </div>
          <button className="text-white hover:text-[#FF0000] transition-colors" aria-label="Fullscreen">
            <Maximize className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

function LikeBar({ likes, dislikes }: { likes: number; dislikes: number }) {
  const [userVote, setUserVote] = useState<"like" | "dislike" | null>(null);
  const total = likes + dislikes;
  const likePercent = total > 0 ? (likes / total) * 100 : 0;

  const handleLike = () => setUserVote((v) => (v === "like" ? null : "like"));
  const handleDislike = () => setUserVote((v) => (v === "dislike" ? null : "dislike"));

  const displayLikes = userVote === "like" ? likes + 1 : likes;

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleLike}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          userVote === "like"
            ? "bg-[#FF0000] text-white shadow-lg shadow-red-500/30"
            : "bg-[#272727] text-white/80 hover:bg-[#333] hover:text-white"
        }`}
      >
        <ThumbsUp className="w-4 h-4" />
        <span>{(displayLikes / 1000).toFixed(1)}K</span>
      </motion.button>

      <div className="w-px h-6 bg-white/10" />

      <motion.button
        onClick={handleDislike}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
          userVote === "dislike"
            ? "bg-[#272727] text-white border border-white/30"
            : "bg-[#272727] text-white/80 hover:bg-[#333] hover:text-white"
        }`}
      >
        <ThumbsDown className="w-4 h-4" />
      </motion.button>

      {/* Like ratio bar */}
      <div className="hidden sm:flex items-center gap-2 ml-2">
        <div className="w-24 h-1 bg-white/10 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#FF0000] rounded-full"
            style={{ width: `${likePercent}%` }}
          />
        </div>
        <span className="text-white/40 text-xs">{likePercent.toFixed(0)}%</span>
      </div>
    </div>
  );
}

function SubscribeButton({ subscribers }: { subscribers: number }) {
  const [subscribed, setSubscribed] = useState(false);
  const [notified, setNotified] = useState(false);

  const handleSubscribe = () => {
    setSubscribed((s) => !s);
    if (subscribed) setNotified(false);
  };

  const handleNotify = () => {
    if (subscribed) setNotified((n) => !n);
  };

  return (
    <div className="flex items-center gap-2">
      <motion.button
        onClick={handleSubscribe}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all ${
          subscribed
            ? "bg-[#272727] text-white/70 border border-white/15 hover:border-white/30"
            : "bg-[#FF0000] text-white shadow-lg shadow-red-500/30 hover:bg-red-600"
        }`}
      >
        {subscribed && <Check className="w-4 h-4" />}
        <span>{subscribed ? "Subscribed" : "Subscribe"}</span>
        <span className="text-xs opacity-70">
          {formatSubscribers(subscribers + (subscribed ? 1 : 0))}
        </span>
      </motion.button>

      {subscribed && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          onClick={handleNotify}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`p-2.5 rounded-full transition-all ${
            notified
              ? "bg-[#FF0000]/20 text-[#FF0000] border border-[#FF0000]/30"
              : "bg-[#272727] text-white/60 hover:text-white hover:bg-[#333]"
          }`}
          aria-label="Toggle notifications"
        >
          <Bell className="w-4 h-4" />
        </motion.button>
      )}
    </div>
  );
}

function CollapsibleDescription({ description }: { description: string }) {
  const [expanded, setExpanded] = useState(false);
  const preview = description.slice(0, 200);

  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#1a1a1a] rounded-xl p-4 mt-4"
    >
      <AnimatePresence initial={false}>
        <motion.p
          key={expanded ? "full" : "preview"}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-white/70 text-sm leading-relaxed whitespace-pre-line"
        >
          {expanded ? description : `${preview}…`}
        </motion.p>
      </AnimatePresence>
      <button
        onClick={() => setExpanded((e) => !e)}
        className="flex items-center gap-1 mt-3 text-white/50 hover:text-white text-sm font-medium transition-colors"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-4 h-4" /> Show less
          </>
        ) : (
          <>
            <ChevronDown className="w-4 h-4" /> Show more
          </>
        )}
      </button>
    </motion.div>
  );
}

function CommentItem({
  comment,
  index,
}: {
  comment: (typeof MOCK_COMMENTS)[0];
  index: number;
}) {
  const [liked, setLiked] = useState(false);
  const [showReplies, setShowReplies] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      className="flex gap-3 group"
    >
      <div className="flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF0000]/60 to-purple-600/60 overflow-hidden">
          <img
            src={comment.author.avatar}
            alt={comment.author.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-white text-sm font-semibold">{comment.author.name}</span>
          <span className="text-white/35 text-xs">{timeAgo(comment.createdAt)}</span>
        </div>
        <p className="text-white/75 text-sm leading-relaxed">{comment.text}</p>
        <div className="flex items-center gap-4 mt-2">
          <button
            onClick={() => setLiked((l) => !l)}
            className={`flex items-center gap-1.5 text-xs transition-colors ${
              liked ? "text-[#FF0000]" : "text-white/40 hover:text-white/70"
            }`}
          >
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>{(comment.likes + (liked ? 1 : 0)).toLocaleString()}</span>
          </button>
          <button className="text-white/40 hover:text-white/70 transition-colors">
            <ThumbsDown className="w-3.5 h-3.5" />
          </button>
          {comment.replies > 0 && (
            <button
              onClick={() => setShowReplies((s) => !s)}
              className="text-xs text-[#3ea6ff] hover:text-[#5bb8ff] font-medium transition-colors"
            >
              {showReplies ? "Hide" : `${comment.replies} replies`}
            </button>
          )}
        </div>
        {showReplies && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3 pl-4 border-l border-white/10 space-y-3"
          >
            <p className="text-white/40 text-xs italic">Replies are hidden in this demo.</p>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}

function RecommendedVideoCard({ video }: { video: (typeof RECOMMENDED_VIDEOS)[0] }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ x: 4 }}
      className="flex gap-3 group cursor-pointer"
    >
      <Link href={`/watch?v=${video.id}`} className="flex gap-3 w-full">
        <div className="relative flex-shrink-0 w-40 aspect-video rounded-lg overflow-hidden bg-[#272727]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
            }}
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1.5 py-0.5 rounded font-mono">
            {video.duration}
          </div>
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-white text-sm font-medium leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors">
            {video.title}
          </h3>
          <div className="flex items-center gap-1 mt-1.5">
            <span className="text-white/50 text-xs">{video.channel.name}</span>
            {video.channel.verified && (
              <Check className="w-3 h-3 text-white/40" />
            )}
          </div>
          <div className="flex items-center gap-1 mt-0.5 text-white/40 text-xs">
            <Eye className="w-3 h-3" />
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
  const video = MOCK_VIDEO;
  const [commentText, setCommentText] = useState("");
  const [comments, setComments] = useState(MOCK_COMMENTS);
  const [sortBy, setSortBy] = useState<"top" | "new">("top");
  const [shareTooltip, setShareTooltip] = useState(false);

  const handleShare = () => {
    setShareTooltip(true);
    setTimeout(() => setShareTooltip(false), 2000);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentText.trim()) return;
    const newComment = {
      id: `c${Date.now()}`,
      text: commentText.trim(),
      likes: 0,
      createdAt: "2024-06-01T00:00:00Z",
      author: { id: "me", name: "You", avatar: "/images/avatar-default.jpg" },
      replies: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    setCommentText("");
  };

  const sortedComments = [...comments].sort((a, b) => {
    if (sortBy === "top") return b.likes - a.likes;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-14">
      {/* Hidden h1 for accessibility/SEO */}
      <h1 className="sr-only">{video.title} — StreamVibe Watch</h1>

      <div className="max-w-[1600px] mx-auto px-4 md:px-6 py-6">
        <div className="flex flex-col xl:flex-row gap-6">
          {/* ── Left column: player + metadata + comments ── */}
          <div className="flex-1 min-w-0">
            {/* Video Player */}
            <VideoPlayer thumbnail={video.thumbnail} />

            {/* Video Title */}
            <motion.h2
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="text-white text-xl md:text-2xl font-bold mt-4 leading-snug"
            >
              {video.title}
            </motion.h2>

            {/* Metadata row */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-3"
            >
              {/* Views + date */}
              <motion.div variants={fadeIn} className="flex items-center gap-3 text-white/50 text-sm">
                <div className="flex items-center gap-1.5">
                  <Eye className="w-4 h-4" />
                  <span>{formatViews(video.views)}</span>
                </div>
                <span>•</span>
                <span>{timeAgo(video.createdAt)}</span>
                <span>•</span>
                <span className="capitalize text-[#FF0000]/80 font-medium">{video.category}</span>
              </motion.div>

              {/* Action buttons */}
              <motion.div variants={fadeIn} className="flex items-center gap-2 flex-wrap">
                <LikeBar likes={video.likes} dislikes={video.dislikes} />

                <div className="relative">
                  <motion.button
                    onClick={handleShare}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] text-white/80 hover:bg-[#333] hover:text-white text-sm font-medium transition-all"
                  >
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </motion.button>
                  <AnimatePresence>
                    {shareTooltip && (
                      <motion.div
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 8 }}
                        className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-[#333] text-white text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-xl"
                      >
                        Link copied!
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-full bg-[#272727] text-white/80 hover:bg-[#333] hover:text-white text-sm font-medium transition-all"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">Save</span>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="p-2 rounded-full bg-[#272727] text-white/60 hover:bg-[#333] hover:text-white transition-all"
                  aria-label="More options"
                >
                  <MoreHorizontal className="w-5 h-5" />
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-white/8 mt-4" />

            {/* Channel info + Subscribe */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 py-4"
            >
              <Link href="/channel" className="flex items-center gap-3 group">
                <div className="relative w-11 h-11 rounded-full overflow-hidden bg-gradient-to-br from-[#FF0000]/60 to-purple-600/60 flex-shrink-0">
                  <img
                    src={video.channel.avatar}
                    alt={video.channel.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-white font-semibold text-sm group-hover:text-[#FF0000] transition-colors">
                      {video.channel.name}
                    </span>
                    {video.channel.verified && (
                      <div className="w-4 h-4 bg-white/20 rounded-full flex items-center justify-center">
                        <Check className="w-2.5 h-2.5 text-white" />
                      </div>
                    )}
                  </div>
                  <span className="text-white/40 text-xs">
                    {formatSubscribers(video.channel.subscribers)} subscribers
                  </span>
                </div>
              </Link>
              <SubscribeButton subscribers={video.channel.subscribers} />
            </motion.div>

            {/* Collapsible Description */}
            <CollapsibleDescription description={video.description} />

            {/* Tags */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-wrap gap-2 mt-4"
            >
              {(video.tags ?? []).map((tag) => (
                <motion.span
                  key={tag}
                  variants={scaleIn}
                  className="px-3 py-1 bg-[#272727] text-[#3ea6ff] text-xs rounded-full hover:bg-[#333] cursor-pointer transition-colors"
                >
                  #{tag}
                </motion.span>
              ))}
            </motion.div>

            {/* Divider */}
            <div className="h-px bg-white/8 mt-6" />

            {/* ── Comments Section ── */}
            <motion.section
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="mt-6"
            >
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-white font-bold text-lg">
                  {comments.length.toLocaleString()} Comments
                </h2>
                <div className="flex items-center gap-1 bg-[#1a1a1a] rounded-full p-1">
                  {(["top", "new"] as const).map((s) => (
                    <button
                      key={s}
                      onClick={() => setSortBy(s)}
                      className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all capitalize ${
                        sortBy === s
                          ? "bg-[#FF0000] text-white shadow-md"
                          : "text-white/50 hover:text-white"
                      }`}
                    >
                      {s === "top" ? "Top" : "Newest"}
                    </button>
                  ))}
                </div>
              </div>

              {/* Comment input */}
              <form onSubmit={handleCommentSubmit} className="flex gap-3 mb-8">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#FF0000]/60 to-purple-600/60 flex-shrink-0 flex items-center justify-center text-white text-xs font-bold">
                  Y
                </div>
                <div className="flex-1">
                  <input
                    type="text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                    placeholder="Add a comment…"
                    className="w-full bg-transparent border-b border-white/15 focus:border-[#FF0000]/60 text-white text-sm py-2 placeholder-white/30 focus:outline-none transition-colors"
                  />
                  <AnimatePresence>
                    {commentText.length > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex justify-end gap-2 mt-2"
                      >
                        <button
                          type="button"
                          onClick={() => setCommentText("")}
                          className="px-4 py-1.5 rounded-full text-white/60 hover:text-white text-sm transition-colors"
                        >
                          Cancel
                        </button>
                        <motion.button
                          type="submit"
                          whileHover={{ scale: 1.04 }}
                          whileTap={{ scale: 0.96 }}
                          className="px-5 py-1.5 rounded-full bg-[#FF0000] text-white text-sm font-semibold hover:bg-red-600 transition-colors shadow-lg shadow-red-500/20"
                        >
                          Comment
                        </motion.button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </form>

              {/* Comment list */}
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-40px" }}
                className="space-y-6"
              >
                {sortedComments.map((comment, i) => (
                  <CommentItem key={comment.id} comment={comment} index={i} />
                ))}
              </motion.div>

              {/* Load more */}
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full mt-8 py-3 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all"
              >
                Load more comments
              </motion.button>
            </motion.section>
          </div>

          {/* ── Right column: Recommended Videos ── */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="xl:w-[380px] flex-shrink-0"
          >
            <motion.h2
              variants={fadeInUp}
              className="text-white font-semibold text-base mb-4"
            >
              Up Next
            </motion.h2>
            <div className="space-y-4">
              {RECOMMENDED_VIDEOS.map((vid) => (
                <RecommendedVideoCard key={vid.id} video={vid} />
              ))}
            </div>

            {/* Load more recommended */}
            <motion.button
              variants={fadeInUp}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full mt-6 py-2.5 rounded-xl border border-white/10 text-white/50 hover:text-white hover:border-white/25 text-sm font-medium transition-all"
            >
              Show more
            </motion.button>
          </motion.aside>
        </div>
      </div>
    </main>
  );
}