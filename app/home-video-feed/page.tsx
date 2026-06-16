"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Clock, Eye, ThumbsUp, Bell, Filter, TrendingUp, Flame, Sparkles, ChevronRight, CheckCircle } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import {
  VIDEO_CATEGORIES,
  formatViews,
  formatSubscribers,
  timeAgo,
  type Video,
  type Channel,
} from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const MOCK_CHANNELS: Channel[] = [
  {
    id: "ch1",
    name: "TechWithLena",
    handle: "@techwithLena",
    avatar: "/images/channel-avatar-tech-lena.jpg",
    banner: "/images/channel-banner-tech-lena.jpg",
    subscribers: 1_240_000,
    videoCount: 312,
    description: "Deep dives into software, hardware, and the future of tech.",
    joinedAt: "2019-03-15",
    verified: true,
  },
  {
    id: "ch2",
    name: "CosmicBeats",
    handle: "@cosmicbeats",
    avatar: "/images/channel-avatar-cosmic-beats.jpg",
    banner: "/images/channel-banner-cosmic-beats.jpg",
    subscribers: 3_800_000,
    videoCount: 540,
    description: "Lo-fi, ambient, and electronic music for every mood.",
    joinedAt: "2017-08-22",
    verified: true,
  },
  {
    id: "ch3",
    name: "GrillMasterJoe",
    handle: "@grillmasterjoe",
    avatar: "/images/channel-avatar-grill-joe.jpg",
    banner: "/images/channel-banner-grill-joe.jpg",
    subscribers: 890_000,
    videoCount: 198,
    description: "BBQ, smoking, and outdoor cooking done right.",
    joinedAt: "2020-05-10",
    verified: false,
  },
  {
    id: "ch4",
    name: "PixelProwler",
    handle: "@pixelprowler",
    avatar: "/images/channel-avatar-pixel-prowler.jpg",
    banner: "/images/channel-banner-pixel-prowler.jpg",
    subscribers: 5_100_000,
    videoCount: 820,
    description: "Gaming reviews, walkthroughs, and live streams.",
    joinedAt: "2016-11-01",
    verified: true,
  },
  {
    id: "ch5",
    name: "WanderWithMia",
    handle: "@wanderwithmia",
    avatar: "/images/channel-avatar-wander-mia.jpg",
    banner: "/images/channel-banner-wander-mia.jpg",
    subscribers: 2_300_000,
    videoCount: 410,
    description: "Solo travel, budget tips, and hidden gems worldwide.",
    joinedAt: "2018-07-19",
    verified: true,
  },
  {
    id: "ch6",
    name: "FitForge",
    handle: "@fitforge",
    avatar: "/images/channel-avatar-fit-forge.jpg",
    banner: "/images/channel-banner-fit-forge.jpg",
    subscribers: 670_000,
    videoCount: 155,
    description: "Science-backed fitness, nutrition, and recovery.",
    joinedAt: "2021-01-08",
    verified: false,
  },
  {
    id: "ch7",
    name: "NovaScienceHub",
    handle: "@novasciencehub",
    avatar: "/images/channel-avatar-nova-science.jpg",
    banner: "/images/channel-banner-nova-science.jpg",
    subscribers: 4_500_000,
    videoCount: 620,
    description: "Making complex science accessible and exciting.",
    joinedAt: "2015-04-30",
    verified: true,
  },
  {
    id: "ch8",
    name: "LaughTrack",
    handle: "@laughtrack",
    avatar: "/images/channel-avatar-laugh-track.jpg",
    banner: "/images/channel-banner-laugh-track.jpg",
    subscribers: 1_900_000,
    videoCount: 290,
    description: "Sketches, stand-up clips, and comedy shorts.",
    joinedAt: "2019-09-14",
    verified: true,
  },
];

const MOCK_VIDEOS: Video[] = [
  {
    id: "v1",
    title: "I Built a Full-Stack App in 24 Hours — Here's What Happened",
    description: "A wild ride through Next.js, Supabase, and Vercel. Watch me struggle and succeed.",
    thumbnail: "https://miro.medium.com/v2/resize:fit:1400/1*t23KbQgD25w9A-cx3nRO2A.png",
    videoUrl: "/watch?v=v1",
    duration: "18:42",
    views: 2_340_000,
    likes: 87_400,
    dislikes: 1_200,
    tags: ["coding", "nextjs", "challenge"],
    category: "tech",
    createdAt: "2024-05-10",
    channel: MOCK_CHANNELS[0],
  },
  {
    id: "v2",
    title: "Midnight Rain — 3 Hours of Lo-Fi Beats to Study & Relax",
    description: "Chill lo-fi hip hop radio for late nights, study sessions, and deep focus.",
    thumbnail: "/images/video-thumbnail-lofi-midnight-rain.jpg",
    videoUrl: "/watch?v=v2",
    duration: "3:02:15",
    views: 14_800_000,
    likes: 412_000,
    dislikes: 3_100,
    tags: ["lofi", "study", "chill"],
    category: "music",
    createdAt: "2024-04-01",
    channel: MOCK_CHANNELS[1],
  },
  {
    id: "v3",
    title: "Perfect Brisket Every Time — The 12-Hour Smoke Method",
    description: "My foolproof method for competition-level brisket at home. Rub, smoke, rest.",
    thumbnail: "/images/video-thumbnail-brisket-smoke.jpg",
    videoUrl: "/watch?v=v3",
    duration: "24:08",
    views: 980_000,
    likes: 54_200,
    dislikes: 800,
    tags: ["bbq", "brisket", "cooking"],
    category: "cooking",
    createdAt: "2024-05-18",
    channel: MOCK_CHANNELS[2],
  },
  {
    id: "v4",
    title: "Elden Ring Shadow of the Erdtree — Full Boss Rush (No Deaths)",
    description: "Every boss in the DLC back-to-back, no deaths, no summons. Pure skill.",
    thumbnail: "/images/video-thumbnail-elden-ring-dlc.jpg",
    videoUrl: "/watch?v=v4",
    duration: "4:11:33",
    views: 8_700_000,
    likes: 320_000,
    dislikes: 5_400,
    tags: ["gaming", "eldenring", "challenge"],
    category: "gaming",
    createdAt: "2024-05-25",
    channel: MOCK_CHANNELS[3],
  },
  {
    id: "v5",
    title: "48 Hours in Kyoto on $50 — Budget Japan Travel Guide",
    description: "Temples, street food, and hidden alleys. Japan doesn't have to break the bank.",
    thumbnail: "/images/video-thumbnail-kyoto-budget-travel.jpg",
    videoUrl: "/watch?v=v5",
    duration: "22:17",
    views: 3_100_000,
    likes: 118_000,
    dislikes: 2_100,
    tags: ["travel", "japan", "budget"],
    category: "travel",
    createdAt: "2024-05-05",
    channel: MOCK_CHANNELS[4],
  },
  {
    id: "v6",
    title: "The Science of Muscle Growth — What Actually Works",
    description: "Hypertrophy research decoded. Progressive overload, volume, frequency — the truth.",
    thumbnail: "/images/video-thumbnail-muscle-growth-science.jpg",
    videoUrl: "/watch?v=v6",
    duration: "16:54",
    views: 1_450_000,
    likes: 72_300,
    dislikes: 1_800,
    tags: ["fitness", "muscle", "science"],
    category: "fitness",
    createdAt: "2024-05-20",
    channel: MOCK_CHANNELS[5],
  },
  {
    id: "v7",
    title: "Black Holes Explained — From Singularity to Hawking Radiation",
    description: "Everything you wanted to know about black holes but were afraid to ask.",
    thumbnail: "/images/video-thumbnail-black-holes-explained.jpg",
    videoUrl: "/watch?v=v7",
    duration: "28:39",
    views: 6_200_000,
    likes: 245_000,
    dislikes: 4_200,
    tags: ["science", "space", "physics"],
    category: "science",
    createdAt: "2024-04-15",
    channel: MOCK_CHANNELS[6],
  },
  {
    id: "v8",
    title: "When the WiFi Goes Out — A Comedy Sketch",
    description: "A dramatic retelling of the most catastrophic event in modern history.",
    thumbnail: "/images/video-thumbnail-wifi-comedy-sketch.jpg",
    videoUrl: "/watch?v=v8",
    duration: "7:22",
    views: 4_800_000,
    likes: 198_000,
    dislikes: 2_900,
    tags: ["comedy", "sketch", "relatable"],
    category: "comedy",
    createdAt: "2024-05-28",
    channel: MOCK_CHANNELS[7],
  },
  {
    id: "v9",
    title: "TypeScript 5.5 — Every New Feature Explained with Examples",
    description: "Inferred type predicates, isolated declarations, and more. Let's dig in.",
    thumbnail: "/images/video-thumbnail-typescript-55-features.jpg",
    videoUrl: "/watch?v=v9",
    duration: "31:05",
    views: 890_000,
    likes: 41_000,
    dislikes: 600,
    tags: ["typescript", "coding", "webdev"],
    category: "tech",
    createdAt: "2024-05-22",
    channel: MOCK_CHANNELS[0],
  },
  {
    id: "v10",
    title: "Synthwave Drive — 2 Hours of Retro Electronic Music",
    description: "Neon lights, open roads, and pure 80s-inspired synth. Perfect for late nights.",
    thumbnail: "/images/video-thumbnail-synthwave-drive.jpg",
    videoUrl: "/watch?v=v10",
    duration: "2:04:48",
    views: 7_300_000,
    likes: 280_000,
    dislikes: 3_800,
    tags: ["synthwave", "electronic", "retro"],
    category: "music",
    createdAt: "2024-03-20",
    channel: MOCK_CHANNELS[1],
  },
  {
    id: "v11",
    title: "Homemade Ramen from Scratch — 18-Hour Tonkotsu Broth",
    description: "The most rewarding bowl of ramen you'll ever make. Worth every minute.",
    thumbnail: "/images/video-thumbnail-homemade-ramen.jpg",
    videoUrl: "/watch?v=v11",
    duration: "35:14",
    views: 2_100_000,
    likes: 95_000,
    dislikes: 1_400,
    tags: ["ramen", "japanese", "cooking"],
    category: "cooking",
    createdAt: "2024-05-12",
    channel: MOCK_CHANNELS[2],
  },
  {
    id: "v12",
    title: "Top 10 Indie Games You Missed in 2024",
    description: "Hidden gems that flew under the radar. Your next obsession is on this list.",
    thumbnail: "/images/video-thumbnail-indie-games-2024.jpg",
    videoUrl: "/watch?v=v12",
    duration: "19:47",
    views: 1_600_000,
    likes: 68_000,
    dislikes: 1_100,
    tags: ["gaming", "indie", "recommendations"],
    category: "gaming",
    createdAt: "2024-05-30",
    channel: MOCK_CHANNELS[3],
  },
  {
    id: "v13",
    title: "Solo Female Travel in Morocco — What No One Tells You",
    description: "Medinas, mountains, and the Sahara. My honest experience traveling alone.",
    thumbnail: "/images/video-thumbnail-morocco-solo-travel.jpg",
    videoUrl: "/watch?v=v13",
    duration: "26:33",
    views: 1_900_000,
    likes: 84_000,
    dislikes: 2_300,
    tags: ["travel", "morocco", "solo"],
    category: "travel",
    createdAt: "2024-04-28",
    channel: MOCK_CHANNELS[4],
  },
  {
    id: "v14",
    title: "30-Day Calisthenics Transformation — Before & After",
    description: "No gym, no equipment, just bodyweight. Here's what 30 days actually does.",
    thumbnail: "/images/video-thumbnail-calisthenics-transformation.jpg",
    videoUrl: "/watch?v=v14",
    duration: "14:22",
    views: 3_400_000,
    likes: 142_000,
    dislikes: 3_200,
    tags: ["fitness", "calisthenics", "transformation"],
    category: "fitness",
    createdAt: "2024-05-01",
    channel: MOCK_CHANNELS[5],
  },
  {
    id: "v15",
    title: "Quantum Computing in 2024 — Are We There Yet?",
    description: "IBM, Google, and the race to quantum advantage. What the breakthroughs mean.",
    thumbnail: "/images/video-thumbnail-quantum-computing-2024.jpg",
    videoUrl: "/watch?v=v15",
    duration: "23:11",
    views: 2_800_000,
    likes: 109_000,
    dislikes: 2_700,
    tags: ["science", "quantum", "technology"],
    category: "science",
    createdAt: "2024-05-08",
    channel: MOCK_CHANNELS[6],
  },
  {
    id: "v16",
    title: "Job Interview Gone Wrong — Office Comedy",
    description: "Everything that could go wrong in a job interview, does. Painfully relatable.",
    thumbnail: "/images/video-thumbnail-job-interview-comedy.jpg",
    videoUrl: "/watch?v=v16",
    duration: "9:58",
    views: 6_100_000,
    likes: 231_000,
    dislikes: 4_100,
    tags: ["comedy", "office", "relatable"],
    category: "comedy",
    createdAt: "2024-05-15",
    channel: MOCK_CHANNELS[7],
  },
];

const TRENDING_VIDEOS = MOCK_VIDEOS.slice(0, 4);
const SUBSCRIBED_CHANNELS = MOCK_CHANNELS.slice(0, 5);

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoCard({ video, index = 0 }: { video: Video; index?: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group cursor-pointer"
    >
      <Link href={`/watch?v=${video.id}`} className="block">
        {/* Thumbnail */}
        <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] aspect-video mb-3">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23272727'/%3E%3Cpath d='M160 90 L240 112.5 L160 135 Z' fill='%23444'/%3E%3C/svg%3E";
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
                <motion.div
                  initial={{ scale: 0.7 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.7 }}
                  className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center shadow-xl"
                >
                  <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Info */}
        <div className="flex gap-3">
          {/* Channel avatar */}
          <Link
            href={`/channel`}
            onClick={(e) => e.stopPropagation()}
            className="flex-shrink-0"
          >
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-9 h-9 rounded-full object-cover bg-[#272727] ring-2 ring-transparent hover:ring-[#FF0000]/50 transition-all"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Crect width='36' height='36' fill='%23333' rx='18'/%3E%3Ccircle cx='18' cy='14' r='6' fill='%23555'/%3E%3Cellipse cx='18' cy='30' rx='10' ry='7' fill='%23555'/%3E%3C/svg%3E";
              }}
            />
          </Link>

          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-white/90 transition-colors mb-1">
              {video.title}
            </h3>
            <Link
              href="/channel"
              onClick={(e) => e.stopPropagation()}
              className="flex items-center gap-1 text-white/50 text-xs hover:text-white/80 transition-colors mb-0.5"
            >
              <span>{video.channel.name}</span>
              {video.channel.verified && (
                <CheckCircle className="w-3 h-3 text-white/40" />
              )}
            </Link>
            <div className="flex items-center gap-1.5 text-white/40 text-xs">
              <span>{formatViews(video.views)}</span>
              <span>•</span>
              <span>{timeAgo(video.createdAt)}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function TrendingCard({ video, rank }: { video: Video; rank: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
      className="group"
    >
      <Link href={`/watch?v=${video.id}`} className="flex gap-4 items-start">
        {/* Rank */}
        <div className="flex-shrink-0 w-8 text-center">
          <span
            className={`text-2xl font-black leading-none ${
              rank === 1
                ? "text-[#FF0000]"
                : rank === 2
                ? "text-orange-400"
                : rank === 3
                ? "text-yellow-400"
                : "text-white/20"
            }`}
          >
            {rank}
          </span>
        </div>

        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-36 aspect-video rounded-lg overflow-hidden bg-[#1a1a1a]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-400"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='144' height='81' viewBox='0 0 144 81'%3E%3Crect width='144' height='81' fill='%23272727'/%3E%3Cpath d='M57 32 L87 40.5 L57 49 Z' fill='%23444'/%3E%3C/svg%3E";
            }}
          />
          <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded">
            {video.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="text-white text-sm font-semibold line-clamp-2 group-hover:text-white/90 transition-colors mb-1 leading-snug">
            {video.title}
          </h4>
          <p className="text-white/50 text-xs mb-1">{video.channel.name}</p>
          <div className="flex items-center gap-1.5 text-white/35 text-xs">
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

function ChannelPill({ channel }: { channel: Channel }) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.97 }}
      className="flex-shrink-0"
    >
      <Link
        href="/channel"
        className="flex flex-col items-center gap-2 group"
      >
        <div className="relative">
          <img
            src={channel.avatar}
            alt={channel.name}
            className="w-14 h-14 rounded-full object-cover bg-[#272727] ring-2 ring-transparent group-hover:ring-[#FF0000] transition-all duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Crect width='56' height='56' fill='%23333' rx='28'/%3E%3Ccircle cx='28' cy='22' r='9' fill='%23555'/%3E%3Cellipse cx='28' cy='46' rx='15' ry='10' fill='%23555'/%3E%3C/svg%3E";
            }}
          />
          {channel.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-[#FF0000] rounded-full flex items-center justify-center">
              <CheckCircle className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>
        <div className="text-center">
          <p className="text-white text-xs font-medium truncate max-w-[72px] group-hover:text-[#FF0000] transition-colors">
            {channel.name}
          </p>
          <p className="text-white/40 text-xs">
            {formatSubscribers(channel.subscribers)}
          </p>
        </div>
      </Link>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HomeVideoFeedPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [sortBy, setSortBy] = useState<"recent" | "popular" | "trending">("recent");

  const filteredVideos = useMemo(() => {
    let videos = [...MOCK_VIDEOS];
    if (activeCategory !== "all") {
      videos = videos.filter((v) => v.category === activeCategory);
    }
    if (sortBy === "popular") {
      videos.sort((a, b) => b.views - a.views);
    } else if (sortBy === "trending") {
      videos.sort((a, b) => b.likes - a.likes);
    } else {
      videos.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );
    }
    return videos;
  }, [activeCategory, sortBy]);

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-14">
      {/* ── Hero Banner ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0a] via-[#0F0F0F] to-[#0a0a1a] border-b border-white/5"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(255,0,0,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.08),transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-14">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
          >
            <motion.div variants={fadeInUp}>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-2 h-2 bg-[#FF0000] rounded-full animate-pulse" />
                <span className="text-[#FF0000] text-xs font-semibold uppercase tracking-widest">
                  Live Feed
                </span>
              </div>
              <h1 className="text-3xl md:text-4xl font-black text-white leading-tight mb-2">
                Your Video Feed
              </h1>
              <p className="text-white/50 text-base max-w-md">
                Fresh content from creators you love — curated, trending, and
                ready to watch.
              </p>
            </motion.div>

            {/* Subscribed channels strip */}
            <motion.div variants={fadeInUp} className="flex flex-col gap-2">
              <p className="text-white/40 text-xs font-medium uppercase tracking-wider">
                Subscriptions
              </p>
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex items-center gap-4"
              >
                {SUBSCRIBED_CHANNELS.map((ch) => (
                  <ChannelPill key={ch.id} channel={ch} />
                ))}
                <motion.div variants={scaleIn} className="flex-shrink-0">
                  <Link
                    href="/subscriptions"
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className="w-14 h-14 rounded-full bg-[#272727] border border-white/10 flex items-center justify-center group-hover:border-[#FF0000]/50 group-hover:bg-[#1a1a1a] transition-all">
                      <ChevronRight className="w-5 h-5 text-white/40 group-hover:text-[#FF0000] transition-colors" />
                    </div>
                    <p className="text-white/40 text-xs group-hover:text-white/70 transition-colors">
                      See all
                    </p>
                  </Link>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="flex flex-col xl:flex-row gap-8">
          {/* ── Main Feed ── */}
          <div className="flex-1 min-w-0">
            {/* Category Filter */}
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="mb-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide flex-1">
                  {VIDEO_CATEGORIES.map((cat) => (
                    <motion.button
                      key={cat.id}
                      whileHover={{ scale: 1.04 }}
                      whileTap={{ scale: 0.96 }}
                      onClick={() => setActiveCategory(cat.slug)}
                      className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                        activeCategory === cat.slug
                          ? "bg-white text-black shadow-lg shadow-white/10"
                          : "bg-[#272727] text-white/70 hover:bg-[#333] hover:text-white border border-white/5"
                      }`}
                    >
                      {cat.label}
                    </motion.button>
                  ))}
                </div>

                {/* Sort */}
                <div className="flex-shrink-0 flex items-center gap-2 bg-[#1a1a1a] border border-white/8 rounded-xl px-3 py-2">
                  <Filter className="w-3.5 h-3.5 text-white/40" />
                  <select
                    value={sortBy}
                    onChange={(e) =>
                      setSortBy(e.target.value as "recent" | "popular" | "trending")
                    }
                    className="bg-transparent text-white/70 text-xs focus:outline-none cursor-pointer"
                  >
                    <option value="recent">Recent</option>
                    <option value="popular">Most Viewed</option>
                    <option value="trending">Most Liked</option>
                  </select>
                </div>
              </div>

              {/* Active filter indicator */}
              {activeCategory !== "all" && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 text-sm text-white/50"
                >
                  <span>
                    Showing{" "}
                    <span className="text-white font-medium">
                      {filteredVideos.length}
                    </span>{" "}
                    videos in{" "}
                    <span className="text-[#FF0000] font-medium capitalize">
                      {activeCategory}
                    </span>
                  </span>
                  <button
                    onClick={() => setActiveCategory("all")}
                    className="text-white/30 hover:text-white/70 transition-colors text-xs underline"
                  >
                    Clear
                  </button>
                </motion.div>
              )}
            </motion.div>

            {/* Video Grid */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory + sortBy}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-5 gap-y-8"
              >
                {filteredVideos.length > 0 ? (
                  filteredVideos.map((video, i) => (
                    <VideoCard key={video.id} video={video} index={i} />
                  ))
                ) : (
                  <motion.div
                    variants={fadeIn}
                    className="col-span-full flex flex-col items-center justify-center py-20 text-center"
                  >
                    <div className="w-16 h-16 bg-[#1a1a1a] rounded-full flex items-center justify-center mb-4">
                      <Play className="w-7 h-7 text-white/20" />
                    </div>
                    <p className="text-white/40 text-lg font-medium mb-2">
                      No videos found
                    </p>
                    <p className="text-white/25 text-sm">
                      Try a different category or check back later.
                    </p>
                    <button
                      onClick={() => setActiveCategory("all")}
                      className="mt-4 px-5 py-2 bg-[#FF0000] text-white text-sm font-medium rounded-full hover:bg-[#cc0000] transition-colors"
                    >
                      Show all videos
                    </button>
                  </motion.div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Load more */}
            {filteredVideos.length > 0 && (
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="mt-12 flex justify-center"
              >
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="px-8 py-3 bg-[#272727] border border-white/10 text-white/70 hover:text-white hover:bg-[#333] hover:border-white/20 rounded-full text-sm font-medium transition-all"
                >
                  Load more videos
                </motion.button>
              </motion.div>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="xl:w-80 flex-shrink-0 space-y-8">
            {/* Trending Now */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="flex items-center justify-between mb-5">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#FF0000]/15 rounded-lg flex items-center justify-center">
                    <Flame className="w-4 h-4 text-[#FF0000]" />
                  </div>
                  <h2 className="text-white font-bold text-base">Trending Now</h2>
                </div>
                <Link
                  href="/search?sort=trending"
                  className="text-[#FF0000] text-xs font-medium hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  See all <ChevronRight className="w-3 h-3" />
                </Link>
              </div>

              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="space-y-5"
              >
                {TRENDING_VIDEOS.map((video, i) => (
                  <TrendingCard key={video.id} video={video} rank={i + 1} />
                ))}
              </motion.div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Stats Strip */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-indigo-500/15 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-indigo-400" />
                </div>
                <h2 className="text-white font-bold text-base">Platform Stats</h2>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { label: "Videos", value: "2.4M+", icon: Play },
                  { label: "Creators", value: "180K+", icon: Sparkles },
                  { label: "Daily Views", value: "48M+", icon: Eye },
                  { label: "Subscribers", value: "9.2M+", icon: Bell },
                ].map((stat) => {
                  const Icon = stat.icon;
                  return (
                    <motion.div
                      key={stat.label}
                      whileHover={{ scale: 1.03 }}
                      className="bg-[#1a1a1a] border border-white/6 rounded-xl p-4 flex flex-col gap-2"
                    >
                      <Icon className="w-4 h-4 text-white/30" />
                      <div>
                        <p className="text-white font-bold text-lg leading-none">
                          {stat.value}
                        </p>
                        <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Upload CTA */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF0000]/20 via-[#1a0a0a] to-[#0F0F0F] border border-[#FF0000]/20 p-6"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-[#FF0000]/10 rounded-full blur-2xl" />
              <div className="relative">
                <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center mb-4 shadow-lg shadow-red-500/30">
                  <Play className="w-5 h-5 text-white fill-white ml-0.5" />
                </div>
                <h3 className="text-white font-bold text-base mb-1.5">
                  Start Creating
                </h3>
                <p className="text-white/50 text-sm mb-4 leading-relaxed">
                  Share your story with millions of viewers on StreamVibe.
                </p>
                <Link href="/upload">
                  <motion.span
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm font-semibold rounded-full transition-colors shadow-lg shadow-red-500/25"
                  >
                    Upload Video
                    <ChevronRight className="w-4 h-4" />
                  </motion.span>
                </Link>
              </div>
            </motion.div>

            {/* Divider */}
            <div className="border-t border-white/5" />

            {/* Recently Liked */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="w-7 h-7 bg-pink-500/15 rounded-lg flex items-center justify-center">
                  <ThumbsUp className="w-4 h-4 text-pink-400" />
                </div>
                <h2 className="text-white font-bold text-base">Recently Liked</h2>
              </div>

              <div className="space-y-3">
                {MOCK_VIDEOS.slice(4, 8).map((video) => (
                  <motion.div
                    key={video.id}
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Link
                      href={`/watch?v=${video.id}`}
                      className="flex gap-3 group"
                    >
                      <div className="relative flex-shrink-0 w-24 aspect-video rounded-lg overflow-hidden bg-[#1a1a1a]">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src =
                              "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='54' viewBox='0 0 96 54'%3E%3Crect width='96' height='54' fill='%23272727'/%3E%3Cpath d='M38 21 L58 27 L38 33 Z' fill='%23444'/%3E%3C/svg%3E";
                          }}
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-1 rounded text-[10px]">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-xs font-medium line-clamp-2 group-hover:text-white/80 transition-colors leading-snug mb-1">
                          {video.title}
                        </p>
                        <p className="text-white/40 text-xs">{video.channel.name}</p>
                        <div className="flex items-center gap-1 text-white/30 text-xs mt-0.5">
                          <Clock className="w-2.5 h-2.5" />
                          <span>{timeAgo(video.createdAt)}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
}