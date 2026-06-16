"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  fadeInUp,
  fadeIn,
  staggerContainer,
  scaleIn,
  slideInLeft,
  slideInRight,
} from "@/lib/motion";
import { Play, Users, Star, Globe, Shield, Zap, Heart, Award, ArrowRight, CheckCircle, Eye, Upload } from 'lucide-react';
import { APP_NAME, APP_TAGLINE, APP_DESCRIPTION } from "@/lib/data";

const stats = [
  { label: "Monthly Active Users", value: "42M+", icon: Users },
  { label: "Videos Uploaded Daily", value: "180K+", icon: Upload },
  { label: "Hours Watched Daily", value: "9.4M+", icon: Eye },
  { label: "Countries Reached", value: "195", icon: Globe },
];

const values = [
  {
    icon: Heart,
    title: "Creator First",
    description:
      "We built StreamVibe for creators. Every feature, every policy, every decision starts with one question: does this help creators thrive? From fair monetization to powerful analytics, we put creators at the center.",
  },
  {
    icon: Shield,
    title: "Safe & Trustworthy",
    description:
      "A platform is only as good as the trust its community places in it. We invest heavily in content moderation, privacy protection, and transparent community guidelines so everyone feels safe.",
  },
  {
    icon: Zap,
    title: "Blazing Performance",
    description:
      "Nobody waits for buffering. Our global CDN delivers adaptive-bitrate streams to 195 countries with sub-second start times, even on mobile connections. Speed is a feature.",
  },
  {
    icon: Star,
    title: "Quality Over Quantity",
    description:
      "We surface great content through smart recommendations, not just viral noise. Our discovery algorithm rewards watch time, engagement, and originality — not clickbait.",
  },
];

const milestones = [
  {
    year: "2019",
    title: "Founded in San Francisco",
    description:
      "Three engineers frustrated with existing platforms built the first prototype of StreamVibe in a garage over a long weekend.",
  },
  {
    year: "2020",
    title: "Public Beta Launch",
    description:
      "StreamVibe opened to the public with 500 invited creators. Within 90 days, 50,000 videos had been uploaded and the waitlist hit 200K.",
  },
  {
    year: "2021",
    title: "Series A — $28M Raised",
    description:
      "Backed by leading venture firms, we expanded the engineering team, launched mobile apps, and introduced the Partner Monetization Program.",
  },
  {
    year: "2022",
    title: "10 Million Users",
    description:
      "StreamVibe crossed 10 million registered users and launched live streaming, community posts, and channel memberships.",
  },
  {
    year: "2023",
    title: "Global Expansion",
    description:
      "Localized into 28 languages, opened data centers in Europe and Asia-Pacific, and partnered with 12 major media studios for exclusive content.",
  },
  {
    year: "2024",
    title: "42 Million & Growing",
    description:
      "Today StreamVibe is one of the fastest-growing video platforms on the web, with 42M monthly active users and 180K videos uploaded every single day.",
  },
];

const team = [
  {
    name: "Aria Chen",
    role: "Co-founder & CEO",
    bio: "Former YouTube engineer. Obsessed with creator economics and platform fairness.",
    avatar: "/images/team-aria-chen-ceo.jpg",
    initials: "AC",
  },
  {
    name: "Marcus Webb",
    role: "Co-founder & CTO",
    bio: "Built video infrastructure at Netflix. Holds 7 patents in adaptive streaming.",
    avatar: "/images/team-marcus-webb-cto.jpg",
    initials: "MW",
  },
  {
    name: "Priya Nair",
    role: "Co-founder & CPO",
    bio: "Product lead at TikTok before StreamVibe. Passionate about discovery and recommendation.",
    avatar: "https://media.licdn.com/dms/image/v2/D5622AQE3NpM1FP01Yg/feedshare-shrink_800/B56Zf4pvKcGUAg-/0/1752223383746?e=2147483647&v=beta&t=C11dC6M36dpAKpcbBRMtusPrnkgE-cNJfHc93ZNpFoQ",
    initials: "PN",
  },
  {
    name: "Jordan Ellis",
    role: "VP of Creator Relations",
    bio: "Former full-time creator with 3M subscribers. Bridges the gap between platform and community.",
    avatar: "/images/team-jordan-ellis-creator.jpg",
    initials: "JE",
  },
  {
    name: "Sofia Reyes",
    role: "Head of Trust & Safety",
    bio: "10 years in content policy at major platforms. Believes safety and free expression aren't opposites.",
    avatar: "/images/team-sofia-reyes-safety.jpg",
    initials: "SR",
  },
  {
    name: "Kai Tanaka",
    role: "Head of Design",
    bio: "Award-winning product designer. Crafted StreamVibe's dark-mode-first visual language from day one.",
    avatar: "/images/team-kai-tanaka-design.jpg",
    initials: "KT",
  },
];

const perks = [
  "Unlimited PTO & flexible remote work",
  "Competitive equity for every employee",
  "$3,000 annual learning & development budget",
  "Top-tier health, dental & vision coverage",
  "Monthly creator stipend — watch what you build",
  "Annual team retreats in inspiring locations",
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0F0F0F] text-white">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden pt-28 pb-24 px-4 md:px-6">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF0000]/10 rounded-full blur-[120px]" />
        </div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="relative max-w-4xl mx-auto text-center"
        >
          <motion.div variants={scaleIn} className="inline-flex items-center gap-2 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-full px-4 py-1.5 mb-6">
            <Play className="w-3.5 h-3.5 text-[#FF0000]" />
            <span className="text-[#FF0000] text-sm font-medium">Our Story</span>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 leading-tight"
          >
            Built for Creators,{" "}
            <span className="text-[#FF0000]">Loved by Viewers</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-white/60 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mb-10"
          >
            {APP_DESCRIPTION} We started with a simple belief: the internet deserves a video platform that actually respects the people who make it great.
          </motion.p>

          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              <Upload className="w-4 h-4" />
              Start Creating
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-6 py-3 rounded-full border border-white/10 transition-all"
            >
              <Play className="w-4 h-4" />
              Explore Videos
            </Link>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats ────────────────────────────────────────────────────────── */}
      <section className="py-16 px-4 md:px-6 border-y border-white/5 bg-[#141414]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                variants={scaleIn}
                whileHover={{ y: -4 }}
                className="flex flex-col items-center text-center gap-3"
              >
                <div className="w-12 h-12 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#FF0000]" />
                </div>
                <div className="text-3xl md:text-4xl font-extrabold text-white">{stat.value}</div>
                <div className="text-white/50 text-sm">{stat.label}</div>
              </motion.div>
            );
          })}
        </motion.div>
      </section>

      {/* ── Mission ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-widest mb-3 block">
              Our Mission
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
              Democratize video for every creator on Earth
            </h2>
            <p className="text-white/60 leading-relaxed mb-5">
              We believe anyone with a camera and a story deserves a global stage. StreamVibe removes the gatekeepers — no follower minimums to monetize, no opaque algorithms that punish small channels, no hidden fees eating into creator revenue.
            </p>
            <p className="text-white/60 leading-relaxed mb-8">
              Our monetization program pays out 70% of ad revenue directly to creators — the highest split in the industry. We also offer channel memberships, super chats, and merchandise integrations so creators can build sustainable businesses, not just viral moments.
            </p>
            <div className="flex flex-col gap-3">
              {["70% revenue share — highest in the industry", "No minimum subscriber threshold to monetize", "Real-time analytics with actionable insights", "Dedicated creator support team, 24/7"].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-[#FF0000] flex-shrink-0 mt-0.5" />
                  <span className="text-white/80 text-sm">{point}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-video bg-[#1a1a1a] border border-white/10 shadow-2xl shadow-black/60">
              <img
                src="/images/streamvibe-creator-studio-workspace.jpg"
                alt="Creator working in a professional studio setup"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-black/60 backdrop-blur-sm rounded-xl p-3 border border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FF0000] flex items-center justify-center flex-shrink-0">
                      <Play className="w-4 h-4 text-white" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-semibold">Creator Studio</div>
                      <div className="text-white/50 text-xs">Professional tools for every creator</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-4 -right-4 bg-[#FF0000] text-white text-xs font-bold px-3 py-1.5 rounded-full shadow-lg shadow-red-500/40"
            >
              70% Revenue Share
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6 bg-[#141414]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-14">
            <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-widest mb-3 block">
              What We Stand For
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Our Core Values</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {values.map((value) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  variants={fadeInUp}
                  whileHover={{ y: -6, scale: 1.02 }}
                  className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 hover:border-[#FF0000]/30 transition-all group"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#FF0000]/10 border border-[#FF0000]/20 flex items-center justify-center mb-4 group-hover:bg-[#FF0000]/20 transition-all">
                    <Icon className="w-5 h-5 text-[#FF0000]" />
                  </div>
                  <h3 className="text-white font-bold text-lg mb-2">{value.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{value.description}</p>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Timeline ─────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-4xl mx-auto"
        >
          <div className="text-center mb-14">
            <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-widest mb-3 block">
              How We Got Here
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Our Journey</h2>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="relative"
          >
            {/* Vertical line */}
            <div className="absolute left-[88px] md:left-1/2 top-0 bottom-0 w-px bg-white/10 -translate-x-1/2" />

            <div className="flex flex-col gap-10">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  variants={fadeInUp}
                  className={`relative flex items-start gap-6 md:gap-0 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Year pill — mobile left, desktop center */}
                  <div className="flex-shrink-0 w-[72px] md:w-1/2 flex md:justify-end md:pr-8">
                    <div className={`${index % 2 !== 0 ? "md:order-last md:pl-8 md:pr-0" : ""}`}>
                      <span className="inline-block bg-[#FF0000] text-white text-sm font-bold px-3 py-1 rounded-full">
                        {milestone.year}
                      </span>
                    </div>
                  </div>

                  {/* Dot */}
                  <div className="absolute left-[88px] md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#FF0000] border-2 border-[#0F0F0F] shadow-lg shadow-red-500/40 mt-1.5" />

                  {/* Content */}
                  <div className={`flex-1 md:w-1/2 ${index % 2 === 0 ? "md:pl-8" : "md:pr-8 md:text-right"}`}>
                    <div className="bg-[#1a1a1a] border border-white/8 rounded-xl p-5 hover:border-white/15 transition-all">
                      <h3 className="text-white font-bold mb-1">{milestone.title}</h3>
                      <p className="text-white/50 text-sm leading-relaxed">{milestone.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* ── Team ─────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6 bg-[#141414]">
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-6xl mx-auto"
        >
          <div className="text-center mb-14">
            <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-widest mb-3 block">
              The People Behind It
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold">Meet the Team</h2>
            <p className="text-white/50 mt-3 max-w-xl mx-auto">
              We're a team of 180+ people across 14 countries, united by a love of video and a belief that creators deserve better.
            </p>
          </div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {team.map((member) => (
              <motion.div
                key={member.name}
                variants={scaleIn}
                whileHover={{ y: -6 }}
                className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-6 hover:border-white/15 transition-all group"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 rounded-full overflow-hidden bg-[#272727] border-2 border-white/10 flex-shrink-0">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.currentTarget as HTMLImageElement;
                        target.style.display = "none";
                        const parent = target.parentElement;
                        if (parent) {
                          parent.classList.add("flex", "items-center", "justify-center", "bg-[#FF0000]/20");
                          const span = document.createElement("span");
                          span.className = "text-[#FF0000] font-bold text-lg";
                          span.textContent = member.initials;
                          parent.appendChild(span);
                        }
                      }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-bold">{member.name}</h3>
                    <p className="text-[#FF0000] text-sm font-medium">{member.role}</p>
                  </div>
                </div>
                <p className="text-white/50 text-sm leading-relaxed">{member.bio}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* ── Careers ──────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="text-[#FF0000] text-sm font-semibold uppercase tracking-widest mb-3 block">
              Join Us
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold mb-6 leading-tight">
              Help us build the future of video
            </h2>
            <p className="text-white/60 leading-relaxed mb-8">
              We're hiring engineers, designers, product managers, and creator advocates who are passionate about building tools that empower human creativity. Remote-first, globally distributed, and deeply mission-driven.
            </p>
            <Link
              href="/channel"
              className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-6 py-3 rounded-full transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50"
            >
              View Open Roles
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>

          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Award className="w-6 h-6 text-[#FF0000]" />
                <h3 className="text-white font-bold text-lg">Why StreamVibe?</h3>
              </div>
              <div className="flex flex-col gap-3">
                {perks.map((perk) => (
                  <div key={perk} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-[#FF0000] flex-shrink-0 mt-0.5" />
                    <span className="text-white/70 text-sm">{perk}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="py-24 px-4 md:px-6 bg-[#141414]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="max-w-3xl mx-auto text-center"
        >
          <motion.div
            variants={scaleIn}
            className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#FF0000]/10 border border-[#FF0000]/20 mb-6"
          >
            <Play className="w-8 h-8 text-[#FF0000]" />
          </motion.div>
          <motion.h2 variants={fadeInUp} className="text-3xl md:text-4xl font-extrabold mb-4">
            Ready to join {APP_NAME}?
          </motion.h2>
          <motion.p variants={fadeInUp} className="text-white/60 text-lg mb-10">
            {APP_TAGLINE}. Whether you're here to watch or create, there's a place for you on StreamVibe.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex flex-wrap justify-center gap-4">
            <Link
              href="/upload"
              className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-8 py-3.5 rounded-full transition-all shadow-lg shadow-red-500/30 hover:shadow-red-500/50 text-base"
            >
              <Upload className="w-4 h-4" />
              Start Uploading
            </Link>
            <Link
              href="/"
              className="inline-flex items-center gap-2 bg-white/10 hover:bg-white/15 text-white font-semibold px-8 py-3.5 rounded-full border border-white/10 transition-all text-base"
            >
              <Play className="w-4 h-4" />
              Browse Videos
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </main>
  );
}