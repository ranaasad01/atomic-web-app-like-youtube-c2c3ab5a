"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";
import { Search, Clock, Eye, Heart, ArrowRight, Tag, BookOpen, TrendingUp, Star, ChevronRight } from 'lucide-react';

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  publishedAt: string;
  readTime: number;
  views: number;
  likes: number;
  featured: boolean;
  image: string;
  tags: string[];
}

const BLOG_CATEGORIES = [
  { id: "all", label: "All Posts" },
  { id: "creator-tips", label: "Creator Tips" },
  { id: "platform-updates", label: "Platform Updates" },
  { id: "community", label: "Community" },
  { id: "monetization", label: "Monetization" },
  { id: "tech", label: "Tech & Tools" },
  { id: "success-stories", label: "Success Stories" },
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: "1",
    title: "How to Grow Your Channel from 0 to 100K Subscribers in 2024",
    excerpt:
      "Discover the proven strategies top creators use to build massive audiences on StreamVibe. From content planning to thumbnail design, we cover it all.",
    content: "",
    category: "creator-tips",
    author: {
      name: "Maya Chen",
      avatar: "/images/author-maya-chen.jpg",
      role: "Head of Creator Success",
    },
    publishedAt: "2024-05-20",
    readTime: 8,
    views: 142000,
    likes: 3800,
    featured: true,
    image: "/images/blog-grow-channel-subscribers.jpg",
    tags: ["Growth", "Strategy", "Creators"],
  },
  {
    id: "2",
    title: "StreamVibe Studio 3.0: Everything You Need to Know",
    excerpt:
      "We've completely rebuilt our creator studio from the ground up. New analytics dashboard, AI-powered editing tools, and a redesigned upload experience.",
    content: "",
    category: "platform-updates",
    author: {
      name: "James Okafor",
      avatar: "/images/author-james-okafor.jpg",
      role: "Product Manager",
    },
    publishedAt: "2024-05-15",
    readTime: 5,
    views: 98000,
    likes: 2100,
    featured: true,
    image: "/images/blog-streamvibe-studio-update.jpg",
    tags: ["Product", "Studio", "Updates"],
  },
  {
    id: "3",
    title: "Monetization Unlocked: A Complete Guide to Earning on StreamVibe",
    excerpt:
      "From ad revenue to channel memberships and Super Thanks — learn every monetization tool available and how to maximize your earnings as a creator.",
    content: "",
    category: "monetization",
    author: {
      name: "Sofia Reyes",
      avatar: "/images/author-sofia-reyes.jpg",
      role: "Monetization Specialist",
    },
    publishedAt: "2024-05-10",
    readTime: 12,
    views: 210000,
    likes: 5600,
    featured: false,
    image: "/images/blog-monetization-guide-creators.jpg",
    tags: ["Monetization", "Revenue", "Tips"],
  },
  {
    id: "4",
    title: "The Algorithm Explained: How StreamVibe Recommends Videos",
    excerpt:
      "Ever wondered why some videos go viral while others don't? We're pulling back the curtain on how our recommendation engine works and what you can do to optimize for it.",
    content: "",
    category: "tech",
    author: {
      name: "Liam Park",
      avatar: "/images/author-liam-park.jpg",
      role: "Engineering Lead",
    },
    publishedAt: "2024-05-05",
    readTime: 10,
    views: 175000,
    likes: 4200,
    featured: false,
    image: "/images/blog-algorithm-recommendation-engine.jpg",
    tags: ["Algorithm", "Tech", "SEO"],
  },
  {
    id: "5",
    title: "Community Spotlight: The Creators Changing the Game in 2024",
    excerpt:
      "Meet the incredible creators who are pushing boundaries, building communities, and inspiring millions of viewers on StreamVibe this year.",
    content: "",
    category: "success-stories",
    author: {
      name: "Amara Diallo",
      avatar: "/images/author-amara-diallo.jpg",
      role: "Community Manager",
    },
    publishedAt: "2024-04-28",
    readTime: 6,
    views: 67000,
    likes: 1900,
    featured: false,
    image: "/images/blog-creator-spotlight-community.jpg",
    tags: ["Community", "Creators", "Spotlight"],
  },
  {
    id: "6",
    title: "Thumbnail Psychology: Why Viewers Click (and Why They Don't)",
    excerpt:
      "Your thumbnail is your first impression. Learn the color theory, composition rules, and psychological triggers that make thumbnails irresistible to click.",
    content: "",
    category: "creator-tips",
    author: {
      name: "Maya Chen",
      avatar: "/images/author-maya-chen.jpg",
      role: "Head of Creator Success",
    },
    publishedAt: "2024-04-20",
    readTime: 7,
    views: 134000,
    likes: 3300,
    featured: false,
    image: "/images/blog-thumbnail-design-psychology.jpg",
    tags: ["Design", "Thumbnails", "CTR"],
  },
  {
    id: "7",
    title: "Building a Loyal Community: Engagement Strategies That Actually Work",
    excerpt:
      "Subscribers are great, but a loyal community is priceless. Discover how top creators foster deep connections with their audiences through comments, live streams, and memberships.",
    content: "",
    category: "community",
    author: {
      name: "Amara Diallo",
      avatar: "/images/author-amara-diallo.jpg",
      role: "Community Manager",
    },
    publishedAt: "2024-04-12",
    readTime: 9,
    views: 89000,
    likes: 2700,
    featured: false,
    image: "/images/blog-community-engagement-strategies.jpg",
    tags: ["Community", "Engagement", "Growth"],
  },
  {
    id: "8",
    title: "StreamVibe Live: The Ultimate Guide to Live Streaming Success",
    excerpt:
      "Live streaming is one of the fastest-growing formats on the platform. From gear setup to audience interaction, here's everything you need to go live with confidence.",
    content: "",
    category: "creator-tips",
    author: {
      name: "James Okafor",
      avatar: "/images/author-james-okafor.jpg",
      role: "Product Manager",
    },
    publishedAt: "2024-04-05",
    readTime: 11,
    views: 112000,
    likes: 3100,
    featured: false,
    image: "/images/blog-live-streaming-guide-setup.jpg",
    tags: ["Live", "Streaming", "Tips"],
  },
];

// ─── Utility helpers ──────────────────────────────────────────────────────────

function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}K`;
  return `${views}`;
}

function formatDate(dateStr: string): string {
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];
  const parts = dateStr.split("-");
  const year = parseInt(parts[0] ?? "2024", 10);
  const month = parseInt(parts[1] ?? "1", 10) - 1;
  const day = parseInt(parts[2] ?? "1", 10);
  return `${months[month] ?? "Jan"} ${day}, ${year}`;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] border border-white/8 group cursor-pointer"
    >
      <Link href={`/blog/${post.id}`} className="block">
        <div className="relative h-56 md:h-72 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0F0F0F] via-[#0F0F0F]/40 to-transparent" />
          <div className="absolute top-4 left-4">
            <span className="bg-[#FF0000] text-white text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Featured
            </span>
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[#FF0000] text-xs font-medium uppercase tracking-wide">
              {BLOG_CATEGORIES.find((c) => c.id === post.category)?.label ?? post.category}
            </span>
            <span className="text-white/20">•</span>
            <span className="text-white/40 text-xs">{formatDate(post.publishedAt)}</span>
          </div>
          <h2 className="text-white text-xl font-bold leading-snug mb-3 group-hover:text-[#FF4444] transition-colors">
            {post.title}
          </h2>
          <p className="text-white/50 text-sm leading-relaxed mb-4 line-clamp-2">
            {post.excerpt}
          </p>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-7 h-7 rounded-full object-cover bg-[#272727]"
              />
              <span className="text-white/60 text-xs">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-white/40 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                {formatViews(post.views)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

function PostCard({ post }: { post: BlogPost }) {
  return (
    <motion.article
      variants={fadeInUp}
      whileHover={{ y: -3 }}
      className="flex flex-col sm:flex-row gap-4 bg-[#1a1a1a] border border-white/8 rounded-xl overflow-hidden group cursor-pointer hover:border-white/16 transition-colors"
    >
      <Link href={`/blog/${post.id}`} className="flex flex-col sm:flex-row gap-4 w-full">
        <div className="relative w-full sm:w-44 h-40 sm:h-auto flex-shrink-0 overflow-hidden">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="p-4 flex flex-col justify-between flex-1">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-[#FF0000] text-xs font-medium uppercase tracking-wide">
                {BLOG_CATEGORIES.find((c) => c.id === post.category)?.label ?? post.category}
              </span>
              <span className="text-white/20">•</span>
              <span className="text-white/40 text-xs">{formatDate(post.publishedAt)}</span>
            </div>
            <h3 className="text-white font-semibold text-base leading-snug mb-2 group-hover:text-[#FF4444] transition-colors line-clamp-2">
              {post.title}
            </h3>
            <p className="text-white/45 text-sm leading-relaxed line-clamp-2">
              {post.excerpt}
            </p>
          </div>
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-2">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-6 h-6 rounded-full object-cover bg-[#272727]"
              />
              <span className="text-white/50 text-xs">{post.author.name}</span>
            </div>
            <div className="flex items-center gap-3 text-white/35 text-xs">
              <span className="flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readTime} min
              </span>
              <span className="flex items-center gap-1">
                <Heart className="w-3 h-3" />
                {formatViews(post.likes)}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.article>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPosts = BLOG_POSTS.filter((p) => p.featured);
  const filteredPosts = BLOG_POSTS.filter((post) => {
    const matchesCategory = activeCategory === "all" || post.category === activeCategory;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      q === "" ||
      post.title.toLowerCase().includes(q) ||
      post.excerpt.toLowerCase().includes(q) ||
      (post.tags ?? []).some((t) => t.toLowerCase().includes(q));
    return matchesCategory && matchesSearch && !post.featured;
  });

  const trendingPosts = [...BLOG_POSTS]
    .sort((a, b) => b.views - a.views)
    .slice(0, 4);

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-14">
      {/* ── Hero Banner ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        animate="visible"
        className="relative overflow-hidden bg-gradient-to-br from-[#1a0a0a] via-[#0F0F0F] to-[#0a0a1a] border-b border-white/6 py-16 md:py-24"
      >
        {/* Background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#FF0000]/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-4 md:px-6 text-center">
          <motion.div variants={fadeInUp} className="flex items-center justify-center gap-2 mb-4">
            <BookOpen className="w-5 h-5 text-[#FF0000]" />
            <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-widest">
              {APP_NAME} Blog
            </span>
          </motion.div>
          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold text-white mb-5 leading-tight"
          >
            Insights for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FF0000] to-[#FF6B6B]">
              Creators & Viewers
            </span>
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-white/50 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Tips, platform updates, success stories, and deep dives into the world of online video — straight from the StreamVibe team.
          </motion.p>

          {/* Search */}
          <motion.div variants={fadeInUp} className="max-w-lg mx-auto">
            <div className="relative flex items-center">
              <Search className="absolute left-4 w-5 h-5 text-white/30 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search articles, tips, updates…"
                className="w-full bg-[#1a1a1a] border border-white/10 rounded-full pl-12 pr-5 py-3.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/50 focus:bg-[#222] transition-all text-sm"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* ── Category Filter ── */}
      <motion.section
        variants={fadeIn}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="sticky top-14 z-30 bg-[#0F0F0F]/95 backdrop-blur-md border-b border-white/6"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="flex items-center gap-2 overflow-x-auto py-3 scrollbar-hide">
            {BLOG_CATEGORIES.map((cat) => (
              <motion.button
                key={cat.id}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => setActiveCategory(cat.id)}
                className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? "bg-[#FF0000] text-white shadow-lg shadow-red-500/30"
                    : "bg-[#1a1a1a] text-white/60 hover:text-white hover:bg-[#272727] border border-white/8"
                }`}
              >
                {cat.label}
              </motion.button>
            ))}
          </div>
        </div>
      </motion.section>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2 space-y-12">
            {/* Featured Posts */}
            {activeCategory === "all" && searchQuery === "" && featuredPosts.length > 0 && (
              <motion.section
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-60px" }}
              >
                <motion.div variants={fadeInUp} className="flex items-center gap-2 mb-6">
                  <Star className="w-5 h-5 text-[#FF0000]" />
                  <h2 className="text-white text-xl font-bold">Featured Articles</h2>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {featuredPosts.map((post) => (
                    <FeaturedCard key={post.id} post={post} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* All / Filtered Posts */}
            <motion.section
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
            >
              <motion.div variants={fadeInUp} className="flex items-center justify-between mb-6">
                <h2 className="text-white text-xl font-bold">
                  {activeCategory === "all" && searchQuery === ""
                    ? "Latest Articles"
                    : searchQuery !== ""
                    ? `Results for "${searchQuery}"`
                    : BLOG_CATEGORIES.find((c) => c.id === activeCategory)?.label ?? "Articles"}
                </h2>
                <span className="text-white/40 text-sm">
                  {filteredPosts.length} article{filteredPosts.length !== 1 ? "s" : ""}
                </span>
              </motion.div>

              {filteredPosts.length > 0 ? (
                <div className="space-y-4">
                  {filteredPosts.map((post) => (
                    <PostCard key={post.id} post={post} />
                  ))}
                </div>
              ) : (
                <motion.div
                  variants={fadeInUp}
                  className="text-center py-16 bg-[#1a1a1a] rounded-2xl border border-white/6"
                >
                  <BookOpen className="w-12 h-12 text-white/20 mx-auto mb-4" />
                  <p className="text-white/40 text-lg font-medium mb-2">No articles found</p>
                  <p className="text-white/25 text-sm">
                    Try a different category or search term.
                  </p>
                  <button
                    onClick={() => { setActiveCategory("all"); setSearchQuery(""); }}
                    className="mt-5 px-5 py-2 bg-[#FF0000] text-white rounded-full text-sm font-medium hover:bg-[#cc0000] transition-colors"
                  >
                    Clear filters
                  </button>
                </motion.div>
              )}
            </motion.section>

            {/* Newsletter CTA */}
            <motion.section
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#FF0000]/20 via-[#1a1a1a] to-[#1a1a1a] border border-[#FF0000]/20 p-8 md:p-10"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#FF0000]/10 rounded-full blur-[80px] pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-3">
                  <Star className="w-5 h-5 text-[#FF0000]" />
                  <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-wide">
                    Newsletter
                  </span>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Stay in the loop
                </h3>
                <p className="text-white/50 text-sm mb-6 max-w-md">
                  Get the latest creator tips, platform updates, and success stories delivered to your inbox every week. No spam, ever.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="flex-1 bg-[#0F0F0F] border border-white/10 rounded-full px-5 py-2.5 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/50 transition-all text-sm"
                    defaultValue=""
                    onChange={() => {}}
                  />
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    className="bg-[#FF0000] text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-[#cc0000] transition-colors flex items-center gap-2 justify-center"
                  >
                    Subscribe
                    <ArrowRight className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>
            </motion.section>
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-8">
            {/* Trending */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <TrendingUp className="w-5 h-5 text-[#FF0000]" />
                <h3 className="text-white font-bold text-base">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {trendingPosts.map((post, idx) => (
                  <motion.div
                    key={post.id}
                    whileHover={{ x: 3 }}
                    className="group"
                  >
                    <Link href={`/blog/${post.id}`} className="flex gap-3 items-start">
                      <span className="text-[#FF0000] font-extrabold text-lg leading-none mt-0.5 w-5 flex-shrink-0">
                        {idx + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-white/80 text-sm font-medium leading-snug group-hover:text-white transition-colors line-clamp-2 mb-1">
                          {post.title}
                        </p>
                        <div className="flex items-center gap-2 text-white/35 text-xs">
                          <Eye className="w-3 h-3" />
                          <span>{formatViews(post.views)} views</span>
                          <span>·</span>
                          <Clock className="w-3 h-3" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                    </Link>
                    {idx < trendingPosts.length - 1 && (
                      <div className="mt-4 border-b border-white/6" />
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Popular Tags */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6"
            >
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-5 h-5 text-[#FF0000]" />
                <h3 className="text-white font-bold text-base">Popular Tags</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {[
                  "Growth", "Strategy", "Creators", "Monetization", "Algorithm",
                  "Live", "Thumbnails", "Community", "SEO", "Tech", "Studio", "Tips",
                ].map((tag) => (
                  <motion.button
                    key={tag}
                    whileHover={{ scale: 1.06 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSearchQuery(tag)}
                    className="px-3 py-1.5 bg-[#272727] border border-white/8 rounded-full text-white/60 text-xs hover:text-white hover:border-[#FF0000]/40 hover:bg-[#FF0000]/10 transition-all"
                  >
                    #{tag}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            {/* Authors */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold text-base mb-5">Meet the Authors</h3>
              <div className="space-y-4">
                {[
                  { name: "Maya Chen", role: "Head of Creator Success", avatar: "/images/author-maya-chen.jpg", posts: 12 },
                  { name: "James Okafor", role: "Product Manager", avatar: "/images/author-james-okafor.jpg", posts: 9 },
                  { name: "Sofia Reyes", role: "Monetization Specialist", avatar: "/images/author-sofia-reyes.jpg", posts: 7 },
                  { name: "Amara Diallo", role: "Community Manager", avatar: "/images/author-amara-diallo.jpg", posts: 11 },
                ].map((author) => (
                  <div key={author.name} className="flex items-center gap-3">
                    <img
                      src={author.avatar}
                      alt={author.name}
                      className="w-10 h-10 rounded-full object-cover bg-[#272727] flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-medium truncate">{author.name}</p>
                      <p className="text-white/40 text-xs truncate">{author.role}</p>
                    </div>
                    <span className="text-white/30 text-xs flex-shrink-0">{author.posts} posts</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              className="bg-gradient-to-br from-[#FF0000]/15 to-[#1a1a1a] border border-[#FF0000]/20 rounded-2xl p-6"
            >
              <h3 className="text-white font-bold text-base mb-4">Start Creating</h3>
              <p className="text-white/45 text-sm mb-5 leading-relaxed">
                Ready to share your story with the world? Upload your first video today.
              </p>
              <Link href="/upload">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center justify-center gap-2 bg-[#FF0000] text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-[#cc0000] transition-colors"
                >
                  Upload a Video
                  <ChevronRight className="w-4 h-4" />
                </motion.div>
              </Link>
            </motion.div>
          </aside>
        </div>
      </div>
    </main>
  );
}