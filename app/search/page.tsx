"use client";

import { useState, useMemo, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Search, SlidersHorizontal, X, CheckCircle, Eye, ThumbsUp, Clock, Filter } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { formatViews, timeAgo, type Video, type Channel } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

const mockChannels: Channel[] = [
  {
    id: "ch1",
    name: "TechWithTim",
    handle: "@techwithTim",
    avatar: "/images/channel-avatar-tech-tim.jpg",
    banner: "https://i.ytimg.com/vi/1HCXiazv5Xs/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDIuQFJj5iMJx5LxOewIynjb4RzLQ",
    subscribers: 2400000,
    videoCount: 312,
    description: "Programming tutorials and tech deep-dives.",
    joinedAt: "2018-03-10",
    verified: true,
  },
  {
    id: "ch2",
    name: "Linus Tech Tips",
    handle: "@linustechtips",
    avatar: "/images/channel-avatar-linus.jpg",
    banner: "/images/channel-banner-linus.jpg",
    subscribers: 15800000,
    videoCount: 6200,
    description: "Consumer tech reviews and builds.",
    joinedAt: "2008-11-24",
    verified: true,
  },
  {
    id: "ch3",
    name: "Fireship",
    handle: "@fireship",
    avatar: "/images/channel-avatar-fireship.jpg",
    banner: "/images/channel-banner-fireship.jpg",
    subscribers: 3100000,
    videoCount: 520,
    description: "High-intensity code tutorials in 100 seconds.",
    joinedAt: "2017-06-01",
    verified: true,
  },
  {
    id: "ch4",
    name: "Kurzgesagt",
    handle: "@kurzgesagt",
    avatar: "/images/channel-avatar-kurzgesagt.jpg",
    banner: "/images/channel-banner-kurzgesagt.jpg",
    subscribers: 21000000,
    videoCount: 180,
    description: "Science and philosophy animated.",
    joinedAt: "2013-07-09",
    verified: true,
  },
  {
    id: "ch5",
    name: "MrBeast Gaming",
    handle: "@mrbeastgaming",
    avatar: "/images/channel-avatar-mrbeast.jpg",
    banner: "/images/channel-banner-mrbeast.jpg",
    subscribers: 38000000,
    videoCount: 410,
    description: "Epic gaming challenges and competitions.",
    joinedAt: "2019-01-15",
    verified: true,
  },
  {
    id: "ch6",
    name: "Veritasium",
    handle: "@veritasium",
    avatar: "/images/channel-avatar-veritasium.jpg",
    banner: "/images/channel-banner-veritasium.jpg",
    subscribers: 14500000,
    videoCount: 290,
    description: "Science videos that make you think.",
    joinedAt: "2011-05-20",
    verified: true,
  },
  {
    id: "ch7",
    name: "Gordon Ramsay",
    handle: "@gordonramsay",
    avatar: "/images/channel-avatar-gordon.jpg",
    banner: "/images/channel-banner-gordon.jpg",
    subscribers: 19000000,
    videoCount: 1100,
    description: "World-class cooking from a Michelin-starred chef.",
    joinedAt: "2015-02-14",
    verified: true,
  },
  {
    id: "ch8",
    name: "Mark Rober",
    handle: "@markrober",
    avatar: "/images/channel-avatar-mark-rober.jpg",
    banner: "/images/channel-banner-mark-rober.jpg",
    subscribers: 26000000,
    videoCount: 95,
    description: "Engineering and science projects that blow your mind.",
    joinedAt: "2011-03-28",
    verified: true,
  },
];

const mockVideos: Video[] = [
  {
    id: "v1",
    title: "Next.js 14 Full Course — App Router, Server Actions & More",
    description:
      "Master Next.js 14 from scratch. We cover the App Router, Server Components, Server Actions, data fetching patterns, and deployment to Vercel. Perfect for developers who want to build production-ready React apps.",
    thumbnail: "/images/nextjs-14-full-course-tutorial.jpg",
    videoUrl: "/videos/nextjs-14.mp4",
    duration: "3:42:18",
    views: 1820000,
    likes: 64000,
    dislikes: 820,
    tags: ["nextjs", "react", "webdev", "tutorial"],
    category: "tech",
    createdAt: "2024-01-15",
    channel: mockChannels[0],
  },
  {
    id: "v2",
    title: "We Built the World's Most Powerful Gaming PC",
    description:
      "Linus and the team assembled an absolutely insane custom gaming rig with dual RTX 4090s, 256GB of DDR5 RAM, and a custom liquid cooling loop. Does it actually game better? Watch to find out.",
    thumbnail: "/images/worlds-most-powerful-gaming-pc-build.jpg",
    videoUrl: "/videos/gaming-pc.mp4",
    duration: "22:05",
    views: 9400000,
    likes: 312000,
    dislikes: 4200,
    tags: ["gaming", "pc", "hardware", "build"],
    category: "tech",
    createdAt: "2024-02-20",
    channel: mockChannels[1],
  },
  {
    id: "v3",
    title: "React in 100 Seconds",
    description:
      "React explained in 100 seconds. Learn the core concepts of the most popular JavaScript UI library — components, state, props, hooks — in the fastest way possible.",
    thumbnail: "/images/react-100-seconds-fireship.jpg",
    videoUrl: "/videos/react-100.mp4",
    duration: "2:28",
    views: 4200000,
    likes: 180000,
    dislikes: 1100,
    tags: ["react", "javascript", "webdev"],
    category: "tech",
    createdAt: "2023-11-05",
    channel: mockChannels[2],
  },
  {
    id: "v4",
    title: "The Fermi Paradox — Where Are All The Aliens?",
    description:
      "Are we alone in the universe? The Fermi Paradox asks why, given the billions of stars and planets, we haven't detected any signs of extraterrestrial life. We explore the most compelling theories.",
    thumbnail: "/images/fermi-paradox-aliens-universe-kurzgesagt.jpg",
    videoUrl: "/videos/fermi.mp4",
    duration: "9:58",
    views: 22000000,
    likes: 890000,
    dislikes: 9800,
    tags: ["science", "space", "aliens", "universe"],
    category: "science",
    createdAt: "2023-08-12",
    channel: mockChannels[3],
  },
  {
    id: "v5",
    title: "$1 vs $1,000,000 Gaming Setup Challenge",
    description:
      "I gave my friends $1 and $1,000,000 to build the ultimate gaming setup. The results were absolutely insane. Who won? Watch to find out — the ending will shock you.",
    thumbnail: "/images/gaming-setup-challenge-mrbeast.jpg",
    videoUrl: "/videos/gaming-setup.mp4",
    duration: "18:34",
    views: 48000000,
    likes: 2100000,
    dislikes: 28000,
    tags: ["gaming", "challenge", "mrbeast"],
    category: "gaming",
    createdAt: "2024-03-01",
    channel: mockChannels[4],
  },
  {
    id: "v6",
    title: "The Surprising Truth About Gravity",
    description:
      "Gravity isn't what you think it is. We dive deep into Einstein's general relativity, gravitational waves, and the mind-bending ways mass warps spacetime. Science has never been this fascinating.",
    thumbnail: "/images/truth-about-gravity-veritasium-science.jpg",
    videoUrl: "/videos/gravity.mp4",
    duration: "14:22",
    views: 8700000,
    likes: 340000,
    dislikes: 3100,
    tags: ["science", "physics", "gravity", "einstein"],
    category: "science",
    createdAt: "2024-01-28",
    channel: mockChannels[5],
  },
  {
    id: "v7",
    title: "Perfect Beef Wellington — Gordon Ramsay's Ultimate Recipe",
    description:
      "Gordon Ramsay walks you through his legendary Beef Wellington recipe step by step. From searing the tenderloin to the perfect golden pastry crust, this is the definitive guide to the dish.",
    thumbnail: "/images/beef-wellington-gordon-ramsay-recipe.jpg",
    videoUrl: "/videos/beef-wellington.mp4",
    duration: "11:47",
    views: 14000000,
    likes: 520000,
    dislikes: 5600,
    tags: ["cooking", "recipe", "beef", "gordon ramsay"],
    category: "cooking",
    createdAt: "2023-12-20",
    channel: mockChannels[6],
  },
  {
    id: "v8",
    title: "I Built a Squirrel Obstacle Course — The Backyard Scientist",
    description:
      "After months of engineering, I built the most elaborate squirrel obstacle course ever conceived. Featuring 10 stages, trap doors, and a zip line, this is engineering meets nature at its finest.",
    thumbnail: "/images/squirrel-obstacle-course-mark-rober-engineering.jpg",
    videoUrl: "/videos/squirrel.mp4",
    duration: "21:13",
    views: 31000000,
    likes: 1400000,
    dislikes: 12000,
    tags: ["engineering", "science", "funny", "squirrel"],
    category: "science",
    createdAt: "2023-10-08",
    channel: mockChannels[7],
  },
  {
    id: "v9",
    title: "TypeScript for Beginners — Complete 2024 Guide",
    description:
      "Learn TypeScript from zero to hero. This comprehensive guide covers types, interfaces, generics, decorators, and real-world patterns used in production codebases at top tech companies.",
    thumbnail: "/images/typescript-beginners-complete-guide-2024.jpg",
    videoUrl: "/videos/typescript.mp4",
    duration: "4:15:00",
    views: 980000,
    likes: 42000,
    dislikes: 510,
    tags: ["typescript", "javascript", "webdev", "tutorial"],
    category: "tech",
    createdAt: "2024-04-10",
    channel: mockChannels[0],
  },
  {
    id: "v10",
    title: "The Black Hole That Ate a Star — Live Footage",
    description:
      "Astronomers captured a tidal disruption event — a black hole tearing apart a star — in unprecedented detail. We break down what this means for our understanding of the cosmos.",
    thumbnail: "/images/black-hole-ate-star-astronomy-footage.jpg",
    videoUrl: "/videos/blackhole.mp4",
    duration: "8:44",
    views: 6200000,
    likes: 280000,
    dislikes: 2400,
    tags: ["science", "space", "black hole", "astronomy"],
    category: "science",
    createdAt: "2024-02-05",
    channel: mockChannels[3],
  },
  {
    id: "v11",
    title: "I Survived 100 Days in Minecraft Hardcore",
    description:
      "Starting with nothing, I had to survive 100 days in Minecraft Hardcore mode. One death and it's all over. Watch my journey from punching trees to defeating the Ender Dragon.",
    thumbnail: "/images/minecraft-100-days-hardcore-survival.jpg",
    videoUrl: "/videos/minecraft-100.mp4",
    duration: "1:02:44",
    views: 27000000,
    likes: 1100000,
    dislikes: 15000,
    tags: ["gaming", "minecraft", "survival", "challenge"],
    category: "gaming",
    createdAt: "2024-03-18",
    channel: mockChannels[4],
  },
  {
    id: "v12",
    title: "How to Make Ramen From Scratch — Restaurant Quality at Home",
    description:
      "Forget instant noodles. This is how to make authentic tonkotsu ramen from scratch — 18-hour pork bone broth, hand-pulled noodles, chashu pork, and perfectly marinated soft-boiled eggs.",
    thumbnail: "/images/homemade-ramen-from-scratch-tonkotsu-recipe.jpg",
    videoUrl: "/videos/ramen.mp4",
    duration: "28:55",
    views: 3800000,
    likes: 165000,
    dislikes: 1800,
    tags: ["cooking", "ramen", "japanese", "recipe"],
    category: "cooking",
    createdAt: "2024-01-05",
    channel: mockChannels[6],
  },
];

// ─── Sort Options ─────────────────────────────────────────────────────────────

type SortOption = "relevance" | "date" | "views" | "likes";

const sortOptions: { value: SortOption; label: string }[] = [
  { value: "relevance", label: "Relevance" },
  { value: "date", label: "Upload Date" },
  { value: "views", label: "View Count" },
  { value: "likes", label: "Most Liked" },
];

// ─── Helper ───────────────────────────────────────────────────────────────────

function matchesQuery(video: Video, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.toLowerCase();
  return (
    video.title.toLowerCase().includes(q) ||
    video.description.toLowerCase().includes(q) ||
    video.channel.name.toLowerCase().includes(q) ||
    video.tags.some((t) => t.toLowerCase().includes(q)) ||
    video.category.toLowerCase().includes(q)
  );
}

function sortVideos(videos: Video[], sort: SortOption): Video[] {
  const sorted = [...videos];
  if (sort === "date") {
    sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  } else if (sort === "views") {
    sorted.sort((a, b) => b.views - a.views);
  } else if (sort === "likes") {
    sorted.sort((a, b) => b.likes - a.likes);
  }
  return sorted;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function VideoResultCard({ video, index }: { video: Video; index: number }) {
  return (
    <motion.div
      variants={fadeInUp}
      custom={index}
      whileHover={{ x: 4 }}
      transition={{ duration: 0.2 }}
    >
      <Link
        href={`/watch?v=${video.id}`}
        className="group flex flex-col sm:flex-row gap-4 p-3 rounded-xl hover:bg-white/5 transition-colors duration-200"
      >
        {/* Thumbnail */}
        <div className="relative flex-shrink-0 w-full sm:w-64 md:w-80 aspect-video rounded-xl overflow-hidden bg-[#272727]">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='320' height='180' viewBox='0 0 320 180'%3E%3Crect width='320' height='180' fill='%23272727'/%3E%3Cpath d='M130 70 L200 90 L130 110 Z' fill='%23555'/%3E%3C/svg%3E";
            }}
          />
          {/* Duration badge */}
          <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-medium px-1.5 py-0.5 rounded">
            {video.duration}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <h3 className="text-white font-semibold text-base md:text-lg leading-snug line-clamp-2 group-hover:text-red-400 transition-colors">
            {video.title}
          </h3>

          {/* Meta row */}
          <div className="flex items-center gap-3 text-white/50 text-sm flex-wrap">
            <span className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              {formatViews(video.views)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {timeAgo(video.createdAt)}
            </span>
            <span className="flex items-center gap-1">
              <ThumbsUp className="w-3.5 h-3.5" />
              {(video.likes / 1000).toFixed(0)}K
            </span>
          </div>

          {/* Channel */}
          <div className="flex items-center gap-2">
            <img
              src={video.channel.avatar}
              alt={video.channel.name}
              className="w-6 h-6 rounded-full object-cover bg-[#333]"
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'%3E%3Ccircle cx='12' cy='12' r='12' fill='%23444'/%3E%3C/svg%3E";
              }}
            />
            <span className="text-white/60 text-sm font-medium hover:text-white transition-colors">
              {video.channel.name}
            </span>
            {video.channel.verified && (
              <CheckCircle className="w-3.5 h-3.5 text-white/40 flex-shrink-0" />
            )}
          </div>

          {/* Description snippet */}
          <p className="text-white/40 text-sm leading-relaxed line-clamp-2 hidden sm:block">
            {video.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-auto pt-1">
            {video.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="text-xs text-white/40 bg-white/5 border border-white/8 rounded-full px-2 py-0.5 hover:text-white/70 hover:border-white/20 transition-colors"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <motion.div
      variants={scaleIn}
      initial="hidden"
      animate="visible"
      className="flex flex-col items-center justify-center py-24 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-[#1a1a1a] border border-white/10 flex items-center justify-center mb-6">
        <Search className="w-9 h-9 text-white/20" />
      </div>
      <h2 className="text-white text-2xl font-bold mb-3">No results found</h2>
      <p className="text-white/50 text-base max-w-md leading-relaxed mb-6">
        {query.trim()
          ? `We couldn't find any videos matching "${query}". Try different keywords or check your spelling.`
          : "Enter a search term above to discover videos, channels, and more."}
      </p>
      <div className="flex flex-col gap-2 text-white/40 text-sm">
        <p className="font-medium text-white/60 mb-1">Suggestions:</p>
        <p>• Try more general keywords</p>
        <p>• Check for typos or misspellings</p>
        <p>• Search by channel name or category</p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

function SearchPageInner() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams?.get("q") ?? "";

  const [localQuery, setLocalQuery] = useState<string>(initialQuery);
  const [activeQuery, setActiveQuery] = useState<string>(initialQuery);
  const [sortBy, setSortBy] = useState<SortOption>("relevance");
  const [filterOpen, setFilterOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  const categories = [
    "all",
    "tech",
    "gaming",
    "science",
    "cooking",
    "music",
    "sports",
    "education",
  ];

  const filteredVideos = useMemo(() => {
    let results = mockVideos.filter((v) => matchesQuery(v, activeQuery));
    if (selectedCategory !== "all") {
      results = results.filter((v) => v.category === selectedCategory);
    }
    return sortVideos(results, sortBy);
  }, [activeQuery, sortBy, selectedCategory]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setActiveQuery(localQuery);
  };

  const clearSearch = () => {
    setLocalQuery("");
    setActiveQuery("");
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-20 pb-16">
      <div className="max-w-5xl mx-auto px-4 md:px-6">

        {/* ── Page Header ── */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-white text-2xl md:text-3xl font-bold mb-1">
            {activeQuery.trim()
              ? `Search results for "${activeQuery}"`
              : "Search Videos"}
          </h1>
          {activeQuery.trim() && (
            <p className="text-white/40 text-sm">
              {filteredVideos.length} result{filteredVideos.length !== 1 ? "s" : ""} found
            </p>
          )}
        </motion.div>

        {/* ── Search Bar ── */}
        <motion.form
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          onSubmit={handleSearch}
          className="flex items-center gap-3 mb-6"
        >
          <div className="relative flex-1 flex">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40 pointer-events-none">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={localQuery}
              onChange={(e) => setLocalQuery(e.target.value)}
              placeholder="Search videos, channels, tags…"
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-l-full pl-11 pr-10 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/50 focus:bg-[#1f1f1f] transition-all"
            />
            {localQuery && (
              <button
                type="button"
                onClick={clearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors flex-shrink-0 shadow-lg shadow-red-500/20"
          >
            Search
          </button>
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setFilterOpen((v) => !v)}
            className={`p-3 rounded-full border transition-all flex-shrink-0 ${
              filterOpen
                ? "bg-[#FF0000]/10 border-[#FF0000]/40 text-[#FF0000]"
                : "bg-[#1a1a1a] border-white/10 text-white/60 hover:text-white hover:border-white/30"
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" />
          </motion.button>
        </motion.form>

        {/* ── Filter / Sort Bar ── */}
        <AnimatePresence>
          {filterOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0, y: -8 }}
              animate={{ opacity: 1, height: "auto", y: 0 }}
              exit={{ opacity: 0, height: 0, y: -8 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="overflow-hidden mb-6"
            >
              <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 space-y-5">
                {/* Sort */}
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3 flex items-center gap-2">
                    <Filter className="w-3.5 h-3.5" />
                    Sort by
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {sortOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => setSortBy(opt.value)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                          sortBy === opt.value
                            ? "bg-[#FF0000] text-white shadow-lg shadow-red-500/20"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Category */}
                <div>
                  <p className="text-white/50 text-xs font-semibold uppercase tracking-wider mb-3">
                    Category
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-all ${
                          selectedCategory === cat
                            ? "bg-[#FF0000] text-white shadow-lg shadow-red-500/20"
                            : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Sort Pills (always visible) ── */}
        {!filterOpen && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
            className="flex items-center gap-2 mb-6 flex-wrap"
          >
            <span className="text-white/40 text-sm mr-1">Sort:</span>
            {sortOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setSortBy(opt.value)}
                className={`px-3.5 py-1 rounded-full text-sm font-medium transition-all ${
                  sortBy === opt.value
                    ? "bg-[#FF0000] text-white shadow-md shadow-red-500/20"
                    : "bg-white/5 text-white/60 hover:text-white hover:bg-white/10 border border-white/10"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </motion.div>
        )}

        {/* ── Divider ── */}
        <div className="border-t border-white/8 mb-6" />

        {/* ── Results ── */}
        <AnimatePresence mode="wait">
          {filteredVideos.length === 0 ? (
            <EmptyState key="empty" query={activeQuery} />
          ) : (
            <motion.div
              key={`results-${activeQuery}-${sortBy}-${selectedCategory}`}
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="flex flex-col gap-2"
            >
              {filteredVideos.map((video, index) => (
                <VideoResultCard key={video.id} video={video} index={index} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Load More (decorative) ── */}
        {filteredVideos.length > 0 && (
          <motion.div
            variants={fadeIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex justify-center mt-12"
          >
            <button
              type="button"
              className="px-8 py-3 rounded-full border border-white/15 text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 text-sm font-medium transition-all"
            >
              Load more results
            </button>
          </motion.div>
        )}
      </div>
    </main>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
