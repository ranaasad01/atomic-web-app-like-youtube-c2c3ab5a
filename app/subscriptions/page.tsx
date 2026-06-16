"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Bell, BellOff, CheckCircle, Play, Clock, Eye, Filter, Grid, List, ChevronRight, Sparkles, Users, Video } from 'lucide-react';
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
} from "@/lib/motion";
import { formatViews, formatSubscribers, timeAgo } from "@/lib/data";

// ─── Mock Data ────────────────────────────────────────────────────────────────

interface MockChannel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  subscribers: number;
  verified: boolean;
  newVideos: number;
  notificationsOn: boolean;
}

interface MockVideo {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  createdAt: string;
  channelName: string;
  channelAvatar: string;
  channelHandle: string;
  channelVerified: boolean;
  category: string;
}

const mockChannels: MockChannel[] = [
  {
    id: "ch1",
    name: "TechWithLena",
    handle: "@techwithLena",
    avatar: "/images/channel-avatar-tech-lena.jpg",
    subscribers: 1240000,
    verified: true,
    newVideos: 3,
    notificationsOn: true,
  },
  {
    id: "ch2",
    name: "CodeCraft",
    handle: "@codecraft",
    avatar: "/images/channel-avatar-codecraft.jpg",
    subscribers: 875000,
    verified: true,
    newVideos: 1,
    notificationsOn: false,
  },
  {
    id: "ch3",
    name: "GameSphere",
    handle: "@gamesphere",
    avatar: "/images/channel-avatar-gamesphere.jpg",
    subscribers: 3200000,
    verified: true,
    newVideos: 5,
    notificationsOn: true,
  },
  {
    id: "ch4",
    name: "CulinaryCanvas",
    handle: "@culinarycanvas",
    avatar: "/images/channel-avatar-culinary.jpg",
    subscribers: 420000,
    verified: false,
    newVideos: 2,
    notificationsOn: true,
  },
  {
    id: "ch5",
    name: "CosmosExplorer",
    handle: "@cosmosexplorer",
    avatar: "/images/channel-avatar-cosmos.jpg",
    subscribers: 980000,
    verified: true,
    newVideos: 0,
    notificationsOn: false,
  },
  {
    id: "ch6",
    name: "FitForge",
    handle: "@fitforge",
    avatar: "/images/channel-avatar-fitforge.jpg",
    subscribers: 560000,
    verified: false,
    newVideos: 4,
    notificationsOn: true,
  },
  {
    id: "ch7",
    name: "TravelDrift",
    handle: "@traveldrift",
    avatar: "/images/channel-avatar-traveldrift.jpg",
    subscribers: 1100000,
    verified: true,
    newVideos: 1,
    notificationsOn: false,
  },
  {
    id: "ch8",
    name: "MusicMosaic",
    handle: "@musicmosaic",
    avatar: "/images/channel-avatar-musicmosaic.jpg",
    subscribers: 2300000,
    verified: true,
    newVideos: 2,
    notificationsOn: true,
  },
];

const mockVideos: MockVideo[] = [
  {
    id: "v1",
    title: "Building a Full-Stack App with Next.js 14 and Prisma — Complete Guide",
    thumbnail: "https://i.ytimg.com/vi/zdUS_Dwje8Q/maxresdefault.jpg",
    duration: "42:18",
    views: 284000,
    createdAt: "2024-05-29T10:00:00Z",
    channelName: "TechWithLena",
    channelAvatar: "/images/channel-avatar-tech-lena.jpg",
    channelHandle: "@techwithLena",
    channelVerified: true,
    category: "Tech",
  },
  {
    id: "v2",
    title: "Elden Ring DLC — Every Secret Location You Missed",
    thumbnail: "/images/video-thumbnail-elden-ring-dlc.jpg",
    duration: "28:54",
    views: 1920000,
    createdAt: "2024-05-30T14:00:00Z",
    channelName: "GameSphere",
    channelAvatar: "/images/channel-avatar-gamesphere.jpg",
    channelHandle: "@gamesphere",
    channelVerified: true,
    category: "Gaming",
  },
  {
    id: "v3",
    title: "TypeScript Generics Explained — From Zero to Hero",
    thumbnail: "/images/video-thumbnail-typescript-generics.jpg",
    duration: "19:33",
    views: 143000,
    createdAt: "2024-05-28T08:00:00Z",
    channelName: "CodeCraft",
    channelAvatar: "/images/channel-avatar-codecraft.jpg",
    channelHandle: "@codecraft",
    channelVerified: true,
    category: "Tech",
  },
  {
    id: "v4",
    title: "Homemade Ramen from Scratch — 12-Hour Broth Recipe",
    thumbnail: "/images/video-thumbnail-homemade-ramen.jpg",
    duration: "35:07",
    views: 87000,
    createdAt: "2024-05-27T16:00:00Z",
    channelName: "CulinaryCanvas",
    channelAvatar: "/images/channel-avatar-culinary.jpg",
    channelHandle: "@culinarycanvas",
    channelVerified: false,
    category: "Cooking",
  },
  {
    id: "v5",
    title: "Morning Mobility Routine — 20 Minutes to Feel Amazing All Day",
    thumbnail: "/images/video-thumbnail-morning-mobility.jpg",
    duration: "21:45",
    views: 312000,
    createdAt: "2024-05-31T06:00:00Z",
    channelName: "FitForge",
    channelAvatar: "/images/channel-avatar-fitforge.jpg",
    channelHandle: "@fitforge",
    channelVerified: false,
    category: "Fitness",
  },
  {
    id: "v6",
    title: "Hidden Gems of Kyoto — Off the Beaten Path Travel Guide",
    thumbnail: "/images/video-thumbnail-kyoto-hidden-gems.jpg",
    duration: "24:12",
    views: 198000,
    createdAt: "2024-05-26T12:00:00Z",
    channelName: "TravelDrift",
    channelAvatar: "/images/channel-avatar-traveldrift.jpg",
    channelHandle: "@traveldrift",
    channelVerified: true,
    category: "Travel",
  },
  {
    id: "v7",
    title: "Lo-Fi Beats to Code & Study To — 3 Hour Mix",
    thumbnail: "/images/video-thumbnail-lofi-beats-mix.jpg",
    duration: "3:02:44",
    views: 4500000,
    createdAt: "2024-05-25T20:00:00Z",
    channelName: "MusicMosaic",
    channelAvatar: "/images/channel-avatar-musicmosaic.jpg",
    channelHandle: "@musicmosaic",
    channelVerified: true,
    category: "Music",
  },
  {
    id: "v8",
    title: "James Webb Telescope — New Images That Changed Everything",
    thumbnail: "/images/video-thumbnail-james-webb-images.jpg",
    duration: "16:58",
    views: 760000,
    createdAt: "2024-05-24T09:00:00Z",
    channelName: "CosmosExplorer",
    channelAvatar: "/images/channel-avatar-cosmos.jpg",
    channelHandle: "@cosmosexplorer",
    channelVerified: true,
    category: "Science",
  },
  {
    id: "v9",
    title: "React Server Components Deep Dive — What Actually Changed",
    thumbnail: "/images/video-thumbnail-react-server-components.jpg",
    duration: "31:22",
    views: 95000,
    createdAt: "2024-05-23T11:00:00Z",
    channelName: "TechWithLena",
    channelAvatar: "/images/channel-avatar-tech-lena.jpg",
    channelHandle: "@techwithLena",
    channelVerified: true,
    category: "Tech",
  },
  {
    id: "v10",
    title: "Top 10 Open World Games of 2024 — Ranked",
    thumbnail: "/images/video-thumbnail-open-world-games-2024.jpg",
    duration: "22:05",
    views: 2100000,
    createdAt: "2024-05-22T15:00:00Z",
    channelName: "GameSphere",
    channelAvatar: "/images/channel-avatar-gamesphere.jpg",
    channelHandle: "@gamesphere",
    channelVerified: true,
    category: "Gaming",
  },
  {
    id: "v11",
    title: "Perfect Sourdough Bread — Beginner's Complete Walkthrough",
    thumbnail: "/images/video-thumbnail-sourdough-bread.jpg",
    duration: "48:30",
    views: 134000,
    createdAt: "2024-05-21T08:00:00Z",
    channelName: "CulinaryCanvas",
    channelAvatar: "/images/channel-avatar-culinary.jpg",
    channelHandle: "@culinarycanvas",
    channelVerified: false,
    category: "Cooking",
  },
  {
    id: "v12",
    title: "Bali on a Budget — 2 Weeks for Under $1,000",
    thumbnail: "/images/video-thumbnail-bali-budget-travel.jpg",
    duration: "18:44",
    views: 445000,
    createdAt: "2024-05-20T13:00:00Z",
    channelName: "TravelDrift",
    channelAvatar: "/images/channel-avatar-traveldrift.jpg",
    channelHandle: "@traveldrift",
    channelVerified: true,
    category: "Travel",
  },
];

const FILTER_OPTIONS = ["All", "Today", "This Week", "Unwatched"] as const;
type FilterOption = (typeof FILTER_OPTIONS)[number];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ChannelPill({
  channel,
  onToggleNotification,
}: {
  channel: MockChannel;
  onToggleNotification: (id: string) => void;
}) {
  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -3, scale: 1.02 }}
      className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-[#1a1a1a] border border-white/8 hover:border-white/20 transition-all cursor-pointer group min-w-[90px]"
    >
      <Link href={`/channel`} className="flex flex-col items-center gap-2">
        <div className="relative">
          <img
            src={channel.avatar}
            alt={channel.name}
            className="w-14 h-14 rounded-full object-cover border-2 border-white/10 group-hover:border-[#FF0000]/50 transition-all"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(channel.name)}&background=272727&color=fff&size=56`;
            }}
          />
          {channel.newVideos > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF0000] rounded-full text-white text-[10px] font-bold flex items-center justify-center shadow-lg shadow-red-500/40">
              {channel.newVideos}
            </span>
          )}
          {channel.verified && (
            <span className="absolute -bottom-1 -right-1 w-4 h-4 bg-[#0F0F0F] rounded-full flex items-center justify-center">
              <CheckCircle className="w-3.5 h-3.5 text-[#FF0000]" />
            </span>
          )}
        </div>
        <span className="text-white/80 text-xs font-medium text-center leading-tight line-clamp-1 max-w-[80px]">
          {channel.name}
        </span>
        <span className="text-white/40 text-[10px]">
          {formatSubscribers(channel.subscribers)}
        </span>
      </Link>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => onToggleNotification(channel.id)}
        className={`p-1.5 rounded-full transition-all ${
          channel.notificationsOn
            ? "bg-[#FF0000]/20 text-[#FF0000]"
            : "bg-white/5 text-white/30 hover:text-white/60"
        }`}
        title={channel.notificationsOn ? "Mute notifications" : "Enable notifications"}
      >
        {channel.notificationsOn ? (
          <Bell className="w-3.5 h-3.5" />
        ) : (
          <BellOff className="w-3.5 h-3.5" />
        )}
      </motion.button>
    </motion.div>
  );
}

function VideoCard({
  video,
  layout,
}: {
  video: MockVideo;
  layout: "grid" | "list";
}) {
  if (layout === "list") {
    return (
      <motion.div
        variants={fadeInUp}
        whileHover={{ x: 4 }}
        className="flex gap-4 p-3 rounded-xl bg-[#1a1a1a] border border-white/8 hover:border-white/20 transition-all group"
      >
        <Link href={`/watch?v=${video.id}`} className="relative flex-shrink-0">
          <img
            src={video.thumbnail}
            alt={video.title}
            className="w-40 h-24 object-cover rounded-lg"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                "/images/video-placeholder.jpg";
            }}
          />
          <span className="absolute bottom-1.5 right-1.5 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
            {video.duration}
          </span>
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all rounded-lg flex items-center justify-center">
            <Play className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all drop-shadow-lg" />
          </div>
        </Link>
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <Link href={`/watch?v=${video.id}`}>
              <h3 className="text-white text-sm font-semibold line-clamp-2 hover:text-[#FF0000] transition-colors leading-snug">
                {video.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1.5 mt-1.5">
              <img
                src={video.channelAvatar}
                alt={video.channelName}
                className="w-4 h-4 rounded-full object-cover"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src =
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(video.channelName)}&background=272727&color=fff&size=16`;
                }}
              />
              <span className="text-white/50 text-xs">{video.channelName}</span>
              {video.channelVerified && (
                <CheckCircle className="w-3 h-3 text-white/40" />
              )}
            </div>
          </div>
          <div className="flex items-center gap-3 text-white/40 text-xs">
            <span className="flex items-center gap-1">
              <Eye className="w-3 h-3" />
              {formatViews(video.views)}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {timeAgo(video.createdAt)}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-white/5 text-white/30 text-[10px]">
              {video.category}
            </span>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      variants={scaleIn}
      whileHover={{ y: -4 }}
      className="group rounded-xl overflow-hidden bg-[#1a1a1a] border border-white/8 hover:border-white/20 transition-all"
    >
      <Link href={`/watch?v=${video.id}`} className="relative block">
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-full aspect-video object-cover"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src =
              "/images/video-placeholder.jpg";
          }}
        />
        <span className="absolute bottom-2 right-2 bg-black/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
          {video.duration}
        </span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-center justify-center">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileHover={{ scale: 1, opacity: 1 }}
            className="w-12 h-12 bg-[#FF0000] rounded-full flex items-center justify-center shadow-xl shadow-red-500/40 opacity-0 group-hover:opacity-100 transition-all"
          >
            <Play className="w-5 h-5 text-white ml-0.5" />
          </motion.div>
        </div>
      </Link>
      <div className="p-3">
        <div className="flex gap-2">
          <img
            src={video.channelAvatar}
            alt={video.channelName}
            className="w-8 h-8 rounded-full object-cover flex-shrink-0 mt-0.5"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).src =
                `https://ui-avatars.com/api/?name=${encodeURIComponent(video.channelName)}&background=272727&color=fff&size=32`;
            }}
          />
          <div className="min-w-0">
            <Link href={`/watch?v=${video.id}`}>
              <h3 className="text-white text-sm font-semibold line-clamp-2 hover:text-[#FF0000] transition-colors leading-snug">
                {video.title}
              </h3>
            </Link>
            <div className="flex items-center gap-1 mt-1">
              <span className="text-white/50 text-xs">{video.channelName}</span>
              {video.channelVerified && (
                <CheckCircle className="w-3 h-3 text-white/40" />
              )}
            </div>
            <div className="flex items-center gap-2 text-white/40 text-xs mt-0.5">
              <span>{formatViews(video.views)}</span>
              <span>·</span>
              <span>{timeAgo(video.createdAt)}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────

function StatsBar({ channels, videos }: { channels: MockChannel[]; videos: MockVideo[] }) {
  const totalNew = (channels ?? []).reduce((sum, c) => sum + (c.newVideos ?? 0), 0);
  const notifOn = (channels ?? []).filter((c) => c.notificationsOn).length;

  const stats = [
    {
      icon: Users,
      label: "Subscriptions",
      value: channels.length,
      color: "text-blue-400",
      bg: "bg-blue-400/10",
    },
    {
      icon: Video,
      label: "New Videos",
      value: totalNew,
      color: "text-[#FF0000]",
      bg: "bg-[#FF0000]/10",
    },
    {
      icon: Bell,
      label: "Notifications On",
      value: notifOn,
      color: "text-yellow-400",
      bg: "bg-yellow-400/10",
    },
    {
      icon: Sparkles,
      label: "Recommended",
      value: videos.length,
      color: "text-purple-400",
      bg: "bg-purple-400/10",
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8"
    >
      {stats.map((stat) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            variants={fadeInUp}
            className="flex items-center gap-3 p-4 rounded-xl bg-[#1a1a1a] border border-white/8"
          >
            <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center flex-shrink-0`}>
              <Icon className={`w-5 h-5 ${stat.color}`} />
            </div>
            <div>
              <p className="text-white font-bold text-xl leading-none">{stat.value}</p>
              <p className="text-white/40 text-xs mt-0.5">{stat.label}</p>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SubscriptionsPage() {
  const [channels, setChannels] = useState<MockChannel[]>(mockChannels);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("All");
  const [layout, setLayout] = useState<"grid" | "list">("grid");

  const toggleNotification = (id: string) => {
    setChannels((prev) =>
      prev.map((ch) =>
        ch.id === id ? { ...ch, notificationsOn: !ch.notificationsOn } : ch
      )
    );
  };

  const filteredVideos = (mockVideos ?? []).filter((video) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Today") {
      return video.createdAt >= "2024-05-31";
    }
    if (activeFilter === "This Week") {
      return video.createdAt >= "2024-05-25";
    }
    if (activeFilter === "Unwatched") {
      return video.views < 200000;
    }
    return true;
  });

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6">

        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <div className="flex items-center gap-3 mb-1">
            <div className="w-9 h-9 bg-[#FF0000]/15 rounded-xl flex items-center justify-center">
              <Bell className="w-5 h-5 text-[#FF0000]" />
            </div>
            <h1 className="text-white text-2xl md:text-3xl font-bold tracking-tight">
              Subscriptions
            </h1>
          </div>
          <p className="text-white/40 text-sm ml-12">
            Stay up to date with your favourite creators
          </p>
        </motion.div>

        {/* Stats Bar */}
        <StatsBar channels={channels} videos={mockVideos} />

        {/* Channels Scroll Row */}
        <motion.section
          variants={fadeIn}
          initial="hidden"
          animate="visible"
          className="mb-10"
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white font-semibold text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-white/50" />
              Your Channels
            </h2>
            <Link
              href="/channel"
              className="text-white/40 hover:text-[#FF0000] text-xs flex items-center gap-1 transition-colors"
            >
              Manage <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide"
            style={{ scrollbarWidth: "none" }}
          >
            {channels.map((channel) => (
              <ChannelPill
                key={channel.id}
                channel={channel}
                onToggleNotification={toggleNotification}
              />
            ))}
          </motion.div>
        </motion.section>

        {/* Latest Videos Section */}
        <section>
          {/* Section header with filters */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
            <h2 className="text-white font-semibold text-base flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#FF0000]" />
              Latest from Subscriptions
            </h2>

            <div className="flex items-center gap-2">
              {/* Filter pills */}
              <div className="flex items-center gap-1.5 bg-[#1a1a1a] border border-white/8 rounded-full p-1">
                <Filter className="w-3.5 h-3.5 text-white/30 ml-2" />
                {FILTER_OPTIONS.map((opt) => (
                  <motion.button
                    key={opt}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setActiveFilter(opt)}
                    className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeFilter === opt
                        ? "bg-[#FF0000] text-white shadow-lg shadow-red-500/30"
                        : "text-white/50 hover:text-white"
                    }`}
                  >
                    {opt}
                  </motion.button>
                ))}
              </div>

              {/* Layout toggle */}
              <div className="flex items-center bg-[#1a1a1a] border border-white/8 rounded-full p-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLayout("grid")}
                  className={`p-1.5 rounded-full transition-all ${
                    layout === "grid"
                      ? "bg-white/15 text-white"
                      : "text-white/30 hover:text-white"
                  }`}
                >
                  <Grid className="w-3.5 h-3.5" />
                </motion.button>
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setLayout("list")}
                  className={`p-1.5 rounded-full transition-all ${
                    layout === "list"
                      ? "bg-white/15 text-white"
                      : "text-white/30 hover:text-white"
                  }`}
                >
                  <List className="w-3.5 h-3.5" />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Video Grid / List */}
          <AnimatePresence mode="wait">
            {filteredVideos.length === 0 ? (
              <motion.div
                key="empty"
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                exit="hidden"
                className="flex flex-col items-center justify-center py-24 text-center"
              >
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-4">
                  <Video className="w-8 h-8 text-white/20" />
                </div>
                <p className="text-white/50 font-medium mb-1">No videos found</p>
                <p className="text-white/25 text-sm">
                  Try a different filter or check back later
                </p>
              </motion.div>
            ) : layout === "grid" ? (
              <motion.div
                key="grid"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
              >
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} layout="grid" />
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="list"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-col gap-3"
              >
                {filteredVideos.map((video) => (
                  <VideoCard key={video.id} video={video} layout="list" />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </section>

        {/* Manage Subscriptions CTA */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="mt-14 rounded-2xl bg-gradient-to-r from-[#FF0000]/15 via-[#1a1a1a] to-[#272727] border border-[#FF0000]/20 p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        >
          <div>
            <h3 className="text-white font-bold text-lg mb-1">
              Discover More Creators
            </h3>
            <p className="text-white/50 text-sm max-w-md">
              Explore trending channels across gaming, tech, music, travel, and more.
              Find your next favourite creator on StreamVibe.
            </p>
          </div>
          <Link href="/">
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="flex-shrink-0 px-6 py-3 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold rounded-full transition-colors shadow-lg shadow-red-500/30 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Explore StreamVibe
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </main>
  );
}