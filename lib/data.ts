// ─── Brand constants ──────────────────────────────────────────────────────────
export const APP_NAME = "StreamVibe";
export const APP_TAGLINE = "Watch, Share & Discover Videos";
export const APP_DESCRIPTION =
  "StreamVibe is a dark-mode video sharing platform where creators and viewers connect through compelling content.";

// ─── Navigation ───────────────────────────────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  icon?: string;
}

export const navLinks: NavLink[] = [
  { label: "Home", href: "/" },
  { label: "Subscriptions", href: "/subscriptions" },
  { label: "Upload", href: "/upload" },
  { label: "Search", href: "/search" },
  { label: "Channel", href: "/channel" },
  { label: "Sign In", href: "/signin" },
];

// ─── Shared TypeScript types ──────────────────────────────────────────────────
export interface Video {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  videoUrl: string;
  duration: string;
  views: number;
  likes: number;
  dislikes: number;
  tags: string[];
  category: string;
  createdAt: string;
  channel: Channel;
}

export interface Channel {
  id: string;
  name: string;
  handle: string;
  avatar: string;
  banner: string;
  subscribers: number;
  videoCount: number;
  description: string;
  joinedAt: string;
  verified: boolean;
}

export interface Comment {
  id: string;
  text: string;
  likes: number;
  createdAt: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  channelId?: string;
}

export interface Category {
  id: string;
  label: string;
  slug: string;
}

// ─── Video categories ─────────────────────────────────────────────────────────
export const VIDEO_CATEGORIES: Category[] = [
  { id: "all", label: "All", slug: "all" },
  { id: "gaming", label: "Gaming", slug: "gaming" },
  { id: "music", label: "Music", slug: "music" },
  { id: "tech", label: "Tech", slug: "tech" },
  { id: "science", label: "Science", slug: "science" },
  { id: "sports", label: "Sports", slug: "sports" },
  { id: "cooking", label: "Cooking", slug: "cooking" },
  { id: "travel", label: "Travel", slug: "travel" },
  { id: "education", label: "Education", slug: "education" },
  { id: "comedy", label: "Comedy", slug: "comedy" },
  { id: "news", label: "News", slug: "news" },
  { id: "fitness", label: "Fitness", slug: "fitness" },
];

// ─── Utility helpers ──────────────────────────────────────────────────────────
export function formatViews(views: number): string {
  if (views >= 1_000_000) return `${(views / 1_000_000).toFixed(1)}M views`;
  if (views >= 1_000) return `${(views / 1_000).toFixed(0)}K views`;
  return `${views} views`;
}

export function formatSubscribers(count: number): string {
  if (count >= 1_000_000) return `${(count / 1_000_000).toFixed(1)}M`;
  if (count >= 1_000) return `${(count / 1_000).toFixed(0)}K`;
  return `${count}`;
}

export function timeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date("2024-06-01T00:00:00Z");
  const diffMs = now.getTime() - date.getTime();
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  if (diffDays < 1) return "Today";
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  const diffWeeks = Math.floor(diffDays / 7);
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  const diffMonths = Math.floor(diffDays / 30);
  if (diffMonths < 12) return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  const diffYears = Math.floor(diffDays / 365);
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}