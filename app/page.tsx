"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Play, TrendingUp, Users, Upload, Star, Eye, Heart, Zap, Shield, Globe, ChevronRight, Clock, CheckCircle } from 'lucide-react';
import {
  APP_NAME,
  APP_TAGLINE,
  VIDEO_CATEGORIES,
  formatViews,
  timeAgo,
  type Video,
  type Channel,
} from "@/lib/data";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";

// ─── Inline mock data ─────────────────────────────────────────────────────────

const mockChannels: Channel[] = [
  {
    id: "ch1",
    name: "TechWithMarcus",
    handle: "@techwithmarcus",
    avatar: "https://i.ytimg.com/vi/1HCXiazv5Xs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDIuQFJj5iMJx5LxOewIynjb4RzLQ",
    banner: "https://i.ytimg.com/vi/1HCXiazv5Xs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDIuQFJj5iMJx5LxOewIynjb4RzLQ",
    subscribers: 1240000,
    videoCount: 312,
    description: "Deep dives into software, hardware, and the future of tech.",
    joinedAt: "2019-03-15",
    verified: true,
  },
  {
    id: "ch2",
    name: "CosmicSounds",
    handle: "@cosmicsounds",
    avatar: "https://cosmicsounds.org/cdn/shop/files/IMG_0575.jpg?v=1780242035&width=3840",
    banner: "https://cosmicsounds.org/cdn/shop/files/IMG_0575.jpg?v=1780242035&width=3840",
    subscribers: 890000,
    videoCount: 178,
    description: "Ambient, lo-fi, and electronic music for every mood.",
    joinedAt: "2020-07-22",
    verified: true,
  },
  {
    id: "ch3",
    name: "PixelArena",
    handle: "@pixelarena",
    avatar: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/36/71/df/pixel-run-vem-correr.jpg?w=1200&h=-1&s=1",
    banner: "https://dynamic-media-cdn.tripadvisor.com/media/photo-o/2c/36/71/df/pixel-run-vem-correr.jpg?w=1200&h=-1&s=1",
    subscribers: 2100000,
    videoCount: 540,
    description: "Gaming reviews, walkthroughs, and live tournaments.",
    joinedAt: "2018-11-01",
    verified: true,
  },
  {
    id: "ch4",
    name: "WildKitchen",
    handle: "@wildkitchen",
    avatar: "https://theluxereview.com/wp-content/uploads/2023/08/wild-kitchen-and-lake-view.jpg?w=1024",
    banner: "https://theluxereview.com/wp-content/uploads/2023/08/wild-kitchen-and-lake-view.jpg?w=1024",
    subscribers: 560000,
    videoCount: 220,
    description: "Bold recipes, street food adventures, and culinary science.",
    joinedAt: "2021-01-10",
    verified: false,
  },
];

const mockVideos: Video[] = [
  {
    id: "v1",
    title: "Building a Full-Stack App with Next.js 14 & Prisma in 2024",
    description: "Complete walkthrough of building a production-ready app.",
    thumbnail: "https://i.ytimg.com/vi/zdUS_Dwje8Q/maxresdefault.jpg",
    videoUrl: "/watch/v1",
    duration: "42:18",
    views: 1820000,
    likes: 94000,
    dislikes: 1200,
    tags: ["nextjs", "prisma", "fullstack"],
    category: "tech",
    createdAt: "2024-04-10",
    channel: mockChannels[0],
  },
  {
    id: "v2",
    title: "Lo-Fi Beats to Study & Relax — 3 Hour Mix",
    description: "Chill ambient beats curated for focus and relaxation.",
    thumbnail: "https://i.ytimg.com/vi/S-4hwfyK-XQ/maxresdefault.jpg",
    videoUrl: "/watch/v2",
    duration: "3:02:44",
    views: 5400000,
    likes: 210000,
    dislikes: 3100,
    tags: ["lofi", "music", "study"],
    category: "music",
    createdAt: "2024-03-28",
    channel: mockChannels[1],
  },
  {
    id: "v3",
    title: "Elden Ring Shadow of the Erdtree — Full Boss Rush",
    description: "Every boss in the DLC defeated back-to-back, no deaths.",
    thumbnail: "https://i.ytimg.com/vi/L6jCH4Ajjvs/maxresdefault.jpg",
    videoUrl: "/watch/v3",
    duration: "1:14:55",
    views: 3200000,
    likes: 178000,
    dislikes: 2400,
    tags: ["eldenring", "gaming", "bossfight"],
    category: "gaming",
    createdAt: "2024-05-02",
    channel: mockChannels[2],
  },
  {
    id: "v4",
    title: "Smash Burger Science: Why the Crust Changes Everything",
    description: "The Maillard reaction explained through the perfect burger.",
    thumbnail: "https://i.ytimg.com/vi/ICnOETKiGf8/sddefault.jpg",
    videoUrl: "/watch/v4",
    duration: "18:33",
    views: 920000,
    likes: 61000,
    dislikes: 800,
    tags: ["cooking", "burger", "food science"],
    category: "cooking",
    createdAt: "2024-04-22",
    channel: mockChannels[3],
  },
  {
    id: "v5",
    title: "How GPT-4o Actually Works — Explained Simply",
    description: "A clear, visual breakdown of multimodal AI architecture.",
    thumbnail: "https://picsum.photos/seed/f1d049744162/800/600",
    videoUrl: "/watch/v5",
    duration: "24:07",
    views: 2750000,
    likes: 132000,
    dislikes: 1900,
    tags: ["ai", "gpt4", "tech"],
    category: "tech",
    createdAt: "2024-05-15",
    channel: mockChannels[0],
  },
  {
    id: "v6",
    title: "Tokyo Street Food Tour — 12 Must-Try Dishes",
    description: "Exploring hidden gems and iconic bites across Tokyo.",
    thumbnail: "https://i.ytimg.com/vi/2xRMSA0-q-o/sddefault.jpg",
    videoUrl: "/watch/v6",
    duration: "31:49",
    views: 1430000,
    likes: 88000,
    dislikes: 1100,
    tags: ["travel", "food", "tokyo"],
    category: "travel",
    createdAt: "2024-04-05",
    channel: mockChannels[3],
  },
  {
    id: "v7",
    title: "Cyberpunk 2077 Phantom Liberty — Stealth Build Guide",
    description: "Max stealth, zero detection — the ultimate ghost playthrough.",
    thumbnail: "https://eip.gg/wp-content/uploads/2023/09/Cyberpunk-new-2.0-stealth-build-update-reflexes-perks.jpg",
    videoUrl: "/watch/v7",
    duration: "55:22",
    views: 2100000,
    likes: 115000,
    dislikes: 1700,
    tags: ["cyberpunk", "gaming", "guide"],
    category: "gaming",
    createdAt: "2024-03-18",
    channel: mockChannels[2],
  },
  {
    id: "v8",
    title: "Synthwave Sunrise — Original Composition",
    description: "An original synthwave track inspired by 80s retrofuturism.",
    thumbnail: "https://preview.redd.it/does-anyone-know-the-first-person-who-put-together-a-v0-q208tysvetrb1.png?auto=webp&s=257dad49a087e98a19331349bca688f7e32e8298",
    videoUrl: "/watch/v8",
    duration: "6:14",
    views: 680000,
    likes: 47000,
    dislikes: 420,
    tags: ["synthwave", "music", "original"],
    category: "music",
    createdAt: "2024-05-20",
    channel: mockChannels[1],
  },
];

const trendingVideos = mockVideos.slice(0, 4);
const featuredVideo = mockVideos[2];

const stats = [
  { label: "Active Creators", value: "2.4M+", icon: Users },
  { label: "Videos Uploaded", value: "180M+", icon: Upload },
  { label: "Monthly Views", value: "9.2B+", icon: Eye },
  { label: "Countries Reached", value: "195", icon: Globe },
];

const features = [
  {
    icon: Zap,
    title: "Instant Streaming",
    description:
      "Adaptive bitrate technology ensures your videos load instantly at the highest quality your connection supports — no buffering, no waiting.",
    color: "from-yellow-500/20 to-orange-500/10",
    iconColor: "text-yellow-400",
    border: "border-yellow-500/20",
  },
  {
    icon: Shield,
    title: "Creator Protection",
    description:
      "Advanced content ID, copyright management, and community moderation tools keep your work safe and your channel growing on your terms.",
    color: "from-blue-500/20 to-cyan-500/10",
    iconColor: "text-blue-400",
    border: "border-blue-500/20",
  },
  {
    icon: TrendingUp,
    title: "Smart Discovery",
    description:
      "Our recommendation engine surfaces your content to the right audience at the right time — driving organic growth without gaming the algorithm.",
    color: "from-green-500/20 to-emerald-500/10",
    iconColor: "text-green-400",
    border: "border-green-500/20",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Auto-translated captions, multi-language metadata, and a CDN spanning 6 continents put your content in front of viewers worldwide.",
    color: "from-purple-500/20 to-pink-500/10",
    iconColor: "text-purple-400",
    border: "border-purple-500/20",
  },
  {
    icon: Heart,
    title: "Community First",
    description:
      "Chapters, polls, super chats, and membership tiers give creators powerful tools to build loyal communities that go beyond the subscribe button.",
    color: "from-red-500/20 to-rose-500/10",
    iconColor: "text-red-400",
    border: "border-red-500/20",
  },
  {
    icon: Star,
    title: "Monetization Suite",
    description:
      "Ad revenue sharing, channel memberships, merchandise shelf, and direct fan funding — multiple income streams built right into the platform.",
    color: "from-amber-500/20 to-yellow-500/10",
    iconColor: "text-amber-400",
    border: "border-amber-500/20",
  },
];

const testimonials = [
  {
    id: "t1",
    name: "Priya Nair",
    handle: "@priyacodes",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    role: "Software Engineer & Educator",
    subscribers: "340K subscribers",
    quote:
      "StreamVibe's analytics are on another level. I can see exactly which moments viewers rewatch, which helps me make better tutorials every single week.",
    rating: 5,
  },
  {
    id: "t2",
    name: "Jordan Reeves",
    handle: "@jordanplays",
    avatar: "https://uploads.concordia.net/2019/08/20165220/Jordan_Reeves_BJR_Page.jpg",
    role: "Full-Time Gaming Creator",
    subscribers: "1.8M subscribers",
    quote:
      "I moved from another platform six months ago and my revenue tripled. The discovery algorithm actually rewards quality content — what a concept.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Amara Osei",
    handle: "@amaracooks",
    avatar: "https://www.stay4skill.com/_next/image?url=https%3A%2F%2Fwugqzhebdtnnuxlxtwlt.supabase.co%2Fstorage%2Fv1%2Fobject%2Fpublic%2Favatars%2Famara-osei.jpg&w=3840&q=75",
    role: "Food & Travel Vlogger",
    subscribers: "620K subscribers",
    quote:
      "The auto-caption translation opened up my channel to Spanish and Portuguese audiences overnight. I gained 80K subscribers in a single month.",
    rating: 5,
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoCard({ video, index }: { video: Video; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ y: -4, scale: 1.01 }}
      transition={{ duration: 0.25 }}
      className="group cursor-pointer"
    >
      <Link href={`/watch/${video.id}`}>
        <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] aspect-video mb-3 shadow-lg shadow-black/40">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='225' viewBox='0 0 400 225'%3E%3Crect width='400' height='225' fill='%23272727'/%3E%3Cpath d='M160 90 L240 112.5 L160 135 Z' fill='%23FF0000' opacity='0.7'/%3E%3C/svg%3E";
            }}
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
          {/* Play overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 shadow-xl"
            >
              <Play className="w-5 h-5 text-black fill-black ml-0.5" />
            </motion.div>
          </div>
        </div>
        <div className="flex gap-3">
          <img
            src={video.channel.avatar}
            alt={video.channel.name}
            className="w-9 h-9 rounded-full object-cover flex-shrink-0 mt-0.5"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='36' height='36' viewBox='0 0 36 36'%3E%3Ccircle cx='18' cy='18' r='18' fill='%23333'/%3E%3Ccircle cx='18' cy='14' r='6' fill='%23666'/%3E%3Cellipse cx='18' cy='30' rx='10' ry='7' fill='%23666'/%3E%3C/svg%3E";
            }}
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm font-semibold leading-snug line-clamp-2 group-hover:text-[#FF0000] transition-colors">
              {video.title}
            </h3>
            <p className="text-white/50 text-xs mt-1 flex items-center gap-1">
              {video.channel.name}
              {video.channel.verified && (
                <CheckCircle className="w-3 h-3 text-white/40 inline" />
              )}
            </p>
            <p className="text-white/40 text-xs mt-0.5">
              {formatViews(video.views)} · {timeAgo(video.createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function CategoryPill({
  label,
  active,
  onClick,
}: {
  label: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-all duration-200 ${
        active
          ? "bg-white text-black shadow-lg shadow-white/10"
          : "bg-[#272727] text-white/70 hover:bg-[#333] hover:text-white border border-white/10"
      }`}
    >
      {label}
    </motion.button>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredVideos =
    activeCategory === "all"
      ? mockVideos
      : mockVideos.filter((v) => v.category === activeCategory);

  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-20 pb-16 md:pt-28 md:pb-24">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[#FF0000]/10 rounded-full blur-[120px] opacity-60" />
          <div className="absolute top-20 left-1/4 w-[400px] h-[300px] bg-purple-600/8 rounded-full blur-[100px]" />
          <div className="absolute top-10 right-1/4 w-[350px] h-[250px] bg-blue-600/8 rounded-full blur-[100px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: copy */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeInUp} className="mb-5">
                <span className="inline-flex items-center gap-2 bg-[#FF0000]/15 border border-[#FF0000]/30 text-[#FF4444] text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Zap className="w-3.5 h-3.5" />
                  Now streaming in 4K HDR
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight mb-5"
              >
                Watch, Share &{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] via-[#FF4444] to-[#FF6B6B]">
                  Discover
                </span>{" "}
                Videos
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-white/60 text-lg leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0"
              >
                {APP_NAME} is the dark-mode video platform built for creators
                who demand more — better analytics, fairer monetization, and an
                algorithm that rewards quality.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start"
              >
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/search"
                    className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
                  >
                    <Play className="w-4 h-4 fill-white" />
                    Start Watching
                  </Link>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                >
                  <Link
                    href="/upload"
                    className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/15 text-white font-semibold px-6 py-3 rounded-full transition-all"
                  >
                    <Upload className="w-4 h-4" />
                    Upload a Video
                  </Link>
                </motion.div>
              </motion.div>

              {/* Mini stats */}
              <motion.div
                variants={fadeInUp}
                className="flex flex-wrap gap-6 mt-10 justify-center lg:justify-start"
              >
                {[
                  { label: "Creators", value: "2.4M+" },
                  { label: "Videos", value: "180M+" },
                  { label: "Monthly viewers", value: "9.2B+" },
                ].map((s) => (
                  <div key={s.label} className="text-center lg:text-left">
                    <div className="text-2xl font-bold text-white">
                      {s.value}
                    </div>
                    <div className="text-white/40 text-xs">{s.label}</div>
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right: featured video card */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate="visible"
              className="relative"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl shadow-black/60 border border-white/10 group cursor-pointer">
                <Link href={`/watch/${featuredVideo.id}`}>
                  <div className="aspect-video relative">
                    <img
                      src={featuredVideo.thumbnail}
                      alt={featuredVideo.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect width='800' height='450' fill='%23272727'/%3E%3Cpath d='M320 180 L480 225 L320 270 Z' fill='%23FF0000' opacity='0.8'/%3E%3C/svg%3E";
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    {/* Play button */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 bg-[#FF0000] rounded-full flex items-center justify-center shadow-2xl shadow-red-500/50"
                      >
                        <Play className="w-7 h-7 text-white fill-white ml-1" />
                      </motion.div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-xs font-medium px-2 py-1 rounded">
                      {featuredVideo.duration}
                    </div>
                    {/* Info overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="bg-[#FF0000] text-white text-xs font-bold px-2 py-0.5 rounded">
                          FEATURED
                        </span>
                        <span className="text-white/60 text-xs">
                          {featuredVideo.category.toUpperCase()}
                        </span>
                      </div>
                      <h2 className="text-white font-bold text-base leading-snug line-clamp-2">
                        {featuredVideo.title}
                      </h2>
                      <p className="text-white/60 text-xs mt-1">
                        {featuredVideo.channel.name} ·{" "}
                        {formatViews(featuredVideo.views)}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
              {/* Decorative glow behind card */}
              <div className="absolute -inset-4 bg-[#FF0000]/10 rounded-3xl blur-2xl -z-10" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TRENDING VIDEOS ───────────────────────────────────────────────── */}
      <section className="py-14 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <div className="w-1 h-6 bg-[#FF0000] rounded-full" />
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#FF0000]" />
              Trending Now
            </h2>
          </div>
          <Link
            href="/search"
            className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            See all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {trendingVideos.map((video, i) => (
            <VideoCard key={video.id} video={video} index={i} />
          ))}
        </motion.div>
      </section>

      {/* ── CATEGORY BROWSE ───────────────────────────────────────────────── */}
      <section className="py-14 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="w-1 h-6 bg-[#FF0000] rounded-full" />
              <h2 className="text-xl font-bold text-white">Browse by Category</h2>
            </div>
            <p className="text-white/40 text-sm ml-4">
              Filter through {mockVideos.length} videos across{" "}
              {VIDEO_CATEGORIES.length - 1} categories
            </p>
          </motion.div>

          {/* Category pills */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap gap-2 mb-8"
          >
            {VIDEO_CATEGORIES.map((cat) => (
              <CategoryPill
                key={cat.id}
                label={cat.label}
                active={activeCategory === cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
              />
            ))}
          </motion.div>

          {/* Video grid */}
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
          >
            {(filteredVideos.length > 0 ? filteredVideos : mockVideos).map(
              (video, i) => (
                <VideoCard key={video.id} video={video} index={i} />
              )
            )}
          </motion.div>

          {filteredVideos.length === 0 && (
            <motion.div
              variants={fadeIn}
              initial="hidden"
              animate="visible"
              className="text-center py-16 text-white/40"
            >
              <Play className="w-12 h-12 mx-auto mb-3 opacity-30" />
              <p className="text-lg font-medium">No videos in this category yet</p>
              <p className="text-sm mt-1">Check back soon or explore another category</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* ── PLATFORM STATS ────────────────────────────────────────────────── */}
      <section className="py-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF0000]/5 via-transparent to-purple-600/5" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  variants={scaleIn}
                  whileHover={{ y: -4 }}
                  className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 text-center shadow-lg shadow-black/30"
                >
                  <div className="w-12 h-12 bg-[#FF0000]/15 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-[#FF0000]" />
                  </div>
                  <div className="text-3xl font-extrabold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/40 text-sm">{stat.label}</div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ──────────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="inline-flex items-center gap-2 bg-[#FF0000]/15 border border-[#FF0000]/30 text-[#FF4444] text-xs font-semibold px-3 py-1.5 rounded-full">
                <Star className="w-3.5 h-3.5" />
                Why creators choose StreamVibe
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            >
              Everything you need to{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF6B6B]">
                grow
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/50 text-lg max-w-2xl mx-auto"
            >
              From upload to monetization, StreamVibe gives creators the tools
              to build an audience and a business — without the algorithm
              working against them.
            </motion.p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  variants={fadeInUp}
                  whileHover={{ y: -5, scale: 1.01 }}
                  className={`bg-gradient-to-br ${feature.color} border ${feature.border} rounded-2xl p-6 shadow-lg shadow-black/20 transition-all duration-300`}
                >
                  <div
                    className={`w-11 h-11 rounded-xl bg-black/30 flex items-center justify-center mb-4 ${feature.iconColor}`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-white/55 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ── TOP CHANNELS ──────────────────────────────────────────────────── */}
      <section className="py-16 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-6 bg-[#FF0000] rounded-full" />
              <h2 className="text-xl font-bold text-white">Top Channels</h2>
            </div>
            <p className="text-white/40 text-sm ml-4">
              Creators you should be watching right now
            </p>
          </div>
          <Link
            href="/subscriptions"
            className="text-white/50 hover:text-white text-sm flex items-center gap-1 transition-colors"
          >
            Browse all <ChevronRight className="w-4 h-4" />
          </Link>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {mockChannels.map((channel) => (
            <motion.div
              key={channel.id}
              variants={scaleIn}
              whileHover={{ y: -5 }}
              className="bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden shadow-lg shadow-black/30 group"
            >
              <Link href="/channel">
                {/* Banner */}
                <div className="h-20 bg-gradient-to-br from-[#272727] to-[#1a1a1a] relative overflow-hidden">
                  <img
                    src={channel.banner}
                    alt={`${channel.name} banner`}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-300"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).style.display =
                        "none";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a]/80 to-transparent" />
                </div>
                {/* Avatar + info */}
                <div className="px-4 pb-5 -mt-6 relative">
                  <div className="flex items-end justify-between mb-3">
                    <img
                      src={channel.avatar}
                      alt={channel.name}
                      className="w-14 h-14 rounded-full border-2 border-[#1a1a1a] object-cover shadow-lg"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src =
                          "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='56' height='56' viewBox='0 0 56 56'%3E%3Ccircle cx='28' cy='28' r='28' fill='%23333'/%3E%3Ccircle cx='28' cy='22' r='9' fill='%23666'/%3E%3Cellipse cx='28' cy='46' rx='15' ry='11' fill='%23666'/%3E%3C/svg%3E";
                      }}
                    />
                    {channel.verified && (
                      <CheckCircle className="w-4 h-4 text-blue-400 mb-1" />
                    )}
                  </div>
                  <h3 className="text-white font-bold text-sm group-hover:text-[#FF0000] transition-colors">
                    {channel.name}
                  </h3>
                  <p className="text-white/40 text-xs mb-2">{channel.handle}</p>
                  <p className="text-white/55 text-xs leading-relaxed line-clamp-2 mb-3">
                    {channel.description}
                  </p>
                  <div className="flex items-center justify-between text-xs text-white/40">
                    <span className="flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {channel.subscribers >= 1_000_000
                        ? `${(channel.subscribers / 1_000_000).toFixed(1)}M`
                        : `${(channel.subscribers / 1_000).toFixed(0)}K`}{" "}
                      subs
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {channel.videoCount} videos
                    </span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ── TESTIMONIALS ──────────────────────────────────────────────────── */}
      <section className="py-16 bg-[#111111]">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="text-center mb-12"
          >
            <motion.div variants={fadeInUp} className="mb-3">
              <span className="inline-flex items-center gap-2 bg-white/8 border border-white/12 text-white/70 text-xs font-semibold px-3 py-1.5 rounded-full">
                <Heart className="w-3.5 h-3.5 text-red-400" />
                Loved by creators worldwide
              </span>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-4xl font-extrabold text-white mb-4"
            >
              Creators are thriving on{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF6B6B]">
                StreamVibe
              </span>
            </motion.h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((t) => (
              <motion.div
                key={t.id}
                variants={fadeInUp}
                whileHover={{ y: -5 }}
                className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 shadow-lg shadow-black/30"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 text-yellow-400 fill-yellow-400"
                    />
                  ))}
                </div>
                <p className="text-white/75 text-sm leading-relaxed mb-5 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-10 h-10 rounded-full object-cover border border-white/10"
                    onError={(e) => {
                      (e.currentTarget as HTMLImageElement).src =
                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='20' fill='%23333'/%3E%3Ccircle cx='20' cy='16' r='7' fill='%23666'/%3E%3Cellipse cx='20' cy='34' rx='12' ry='9' fill='%23666'/%3E%3C/svg%3E";
                    }}
                  />
                  <div>
                    <div className="text-white font-semibold text-sm flex items-center gap-1">
                      {t.name}
                      <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                    </div>
                    <div className="text-white/40 text-xs">{t.role}</div>
                    <div className="text-[#FF4444] text-xs font-medium">
                      {t.subscribers}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA BANNER ────────────────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-br from-[#FF0000]/15 via-[#0F0F0F] to-purple-900/15" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#FF0000]/10 rounded-full blur-[100px]" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 md:px-6 text-center">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <motion.div variants={scaleIn} className="mb-5">
              <div className="w-16 h-16 bg-[#FF0000] rounded-2xl flex items-center justify-center mx-auto shadow-2xl shadow-red-500/40">
                <Play className="w-8 h-8 text-white fill-white ml-1" />
              </div>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="text-3xl md:text-5xl font-extrabold text-white mb-5 leading-tight"
            >
              Ready to share your story
              <br />
              with the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF6B6B]">
                world?
              </span>
            </motion.h2>
            <motion.p
              variants={fadeInUp}
              className="text-white/55 text-lg mb-8 max-w-xl mx-auto"
            >
              Join 2.4 million creators already building their audience on
              StreamVibe. Upload your first video free — no credit card
              required.
            </motion.p>
            <motion.div
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/upload"
                  className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-bold px-8 py-4 rounded-full transition-all shadow-xl shadow-red-500/30 hover:shadow-red-500/50 text-base"
                >
                  <Upload className="w-5 h-5" />
                  Start Creating for Free
                </Link>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 border border-white/20 text-white font-bold px-8 py-4 rounded-full transition-all text-base"
                >
                  <Eye className="w-5 h-5" />
                  Explore Videos
                </Link>
              </motion.div>
            </motion.div>
            <motion.p
              variants={fadeIn}
              className="text-white/30 text-xs mt-6 flex items-center justify-center gap-2"
            >
              <CheckCircle className="w-3.5 h-3.5 text-green-400" />
              Free forever plan · No credit card · Cancel anytime
            </motion.p>
          </motion.div>
        </div>
      </section>
    </main>
  );
}