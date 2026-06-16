"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Bell, Lock, Eye, Palette, Globe, Shield, Trash2, Save, Camera, Check, AlertCircle, Mail, Smartphone, Monitor, Moon, Sun, Volume2, Download, Upload, ChevronRight } from 'lucide-react';
import { fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

// ─── Types ────────────────────────────────────────────────────────────────────
interface ToggleProps {
  enabled: boolean;
  onChange: (val: boolean) => void;
  label?: string;
}

// ─── Toggle Component ─────────────────────────────────────────────────────────
function Toggle({ enabled, onChange }: ToggleProps) {
  return (
    <button
      type="button"
      onClick={() => onChange(!enabled)}
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-[#FF0000]/50 ${
        enabled ? "bg-[#FF0000]" : "bg-[#3a3a3a]"
      }`}
      aria-pressed={enabled}
    >
      <span
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-md transition-transform duration-200 ${
          enabled ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

// ─── Section Wrapper ──────────────────────────────────────────────────────────
function SettingsSection({
  title,
  description,
  icon: Icon,
  children,
}: {
  title: string;
  description: string;
  icon: React.ElementType;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      variants={fadeInUp}
      className="bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden"
    >
      <div className="flex items-start gap-4 px-6 py-5 border-b border-white/8">
        <div className="w-10 h-10 rounded-xl bg-[#FF0000]/15 flex items-center justify-center flex-shrink-0">
          <Icon className="w-5 h-5 text-[#FF0000]" />
        </div>
        <div>
          <h2 className="text-white font-semibold text-base">{title}</h2>
          <p className="text-white/40 text-sm mt-0.5">{description}</p>
        </div>
      </div>
      <div className="px-6 py-5 space-y-5">{children}</div>
    </motion.div>
  );
}

// ─── Form Row ─────────────────────────────────────────────────────────────────
function FormRow({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
      <div className="sm:w-48 flex-shrink-0">
        <p className="text-white/80 text-sm font-medium">{label}</p>
        {hint && <p className="text-white/35 text-xs mt-0.5">{hint}</p>}
      </div>
      <div className="flex-1">{children}</div>
    </div>
  );
}

// ─── Toggle Row ───────────────────────────────────────────────────────────────
function ToggleRow({
  label,
  description,
  enabled,
  onChange,
}: {
  label: string;
  description: string;
  enabled: boolean;
  onChange: (val: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <div>
        <p className="text-white/80 text-sm font-medium">{label}</p>
        <p className="text-white/35 text-xs mt-0.5">{description}</p>
      </div>
      <Toggle enabled={enabled} onChange={onChange} />
    </div>
  );
}

// ─── Sidebar Nav ──────────────────────────────────────────────────────────────
const sidebarSections = [
  { id: "profile", label: "Profile", icon: User },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "privacy", label: "Privacy & Safety", icon: Shield },
  { id: "appearance", label: "Appearance", icon: Palette },
  { id: "playback", label: "Playback", icon: Monitor },
  { id: "language", label: "Language & Region", icon: Globe },
  { id: "security", label: "Security", icon: Lock },
  { id: "data", label: "Data & Storage", icon: Download },
  { id: "danger", label: "Danger Zone", icon: Trash2 },
];

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("profile");
  const [saved, setSaved] = useState(false);

  // Profile state
  const [displayName, setDisplayName] = useState("Alex Rivera");
  const [handle, setHandle] = useState("@alexrivera");
  const [email, setEmail] = useState("alex.rivera@email.com");
  const [bio, setBio] = useState(
    "Creator & tech enthusiast. Sharing tutorials, reviews, and behind-the-scenes content."
  );
  const [website, setWebsite] = useState("https://alexrivera.dev");
  const [location, setLocation] = useState("San Francisco, CA");

  // Notification state
  const [notifSubscriptions, setNotifSubscriptions] = useState(true);
  const [notifComments, setNotifComments] = useState(true);
  const [notifLikes, setNotifLikes] = useState(false);
  const [notifMentions, setNotifMentions] = useState(true);
  const [notifNewVideos, setNotifNewVideos] = useState(true);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifPush, setNotifPush] = useState(false);
  const [notifSMS, setNotifSMS] = useState(false);

  // Privacy state
  const [profilePublic, setProfilePublic] = useState(true);
  const [showSubscriptions, setShowSubscriptions] = useState(false);
  const [showLikedVideos, setShowLikedVideos] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [allowDMs, setAllowDMs] = useState(false);
  const [safeSearch, setSafeSearch] = useState(true);

  // Appearance state
  const [theme, setTheme] = useState<"dark" | "light" | "system">("dark");
  const [accentColor, setAccentColor] = useState("#FF0000");
  const [compactMode, setCompactMode] = useState(false);
  const [animationsEnabled, setAnimationsEnabled] = useState(true);

  // Playback state
  const [autoplay, setAutoplay] = useState(true);
  const [defaultQuality, setDefaultQuality] = useState("1080p");
  const [autoSubtitles, setAutoSubtitles] = useState(false);
  const [defaultSpeed, setDefaultSpeed] = useState("1");
  const [miniPlayerOnScroll, setMiniPlayerOnScroll] = useState(true);

  // Language state
  const [language, setLanguage] = useState("en-US");
  const [region, setRegion] = useState("US");
  const [contentLanguage, setContentLanguage] = useState("en");
  const [dateFormat, setDateFormat] = useState("MM/DD/YYYY");

  // Security state
  const [twoFactor, setTwoFactor] = useState(false);
  const [loginAlerts, setLoginAlerts] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Data state
  const [autoDeleteHistory, setAutoDeleteHistory] = useState(false);
  const [dataCollection, setDataCollection] = useState(true);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  const accentColors = [
    "#FF0000",
    "#FF6B35",
    "#F7C59F",
    "#EFEFD0",
    "#004E89",
    "#1A936F",
    "#C6B4CE",
    "#E84855",
  ];

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const inputClass =
    "w-full bg-[#272727] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 focus:bg-[#1f1f1f] transition-all";

  const selectClass =
    "w-full bg-[#272727] border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-[#FF0000]/60 transition-all appearance-none cursor-pointer";

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-14">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-8">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-2xl md:text-3xl font-bold text-white">Settings</h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your {APP_NAME} account preferences and privacy
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <motion.aside
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="lg:w-56 flex-shrink-0"
          >
            <div className="bg-[#1a1a1a] border border-white/8 rounded-2xl overflow-hidden sticky top-20">
              {sidebarSections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;
                return (
                  <motion.button
                    key={section.id}
                    variants={fadeInUp}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 2 }}
                    whileTap={{ scale: 0.98 }}
                    className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left border-b border-white/5 last:border-b-0 ${
                      isActive
                        ? "bg-[#FF0000]/15 text-[#FF0000]"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    <Icon className="w-4 h-4 flex-shrink-0" />
                    <span>{section.label}</span>
                    {isActive && (
                      <ChevronRight className="w-3.5 h-3.5 ml-auto" />
                    )}
                  </motion.button>
                );
              })}
            </div>
          </motion.aside>

          {/* Main Content */}
          <motion.main
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex-1 space-y-5"
          >
            {/* ── PROFILE ── */}
            {activeSection === "profile" && (
              <>
                <SettingsSection
                  title="Profile Information"
                  description="Update your public profile details"
                  icon={User}
                >
                  {/* Avatar */}
                  <div className="flex items-center gap-5 pb-5 border-b border-white/8">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#FF0000] to-[#ff6b35] flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-red-500/20">
                        AR
                      </div>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="absolute -bottom-1 -right-1 w-7 h-7 bg-[#FF0000] rounded-full flex items-center justify-center shadow-md"
                      >
                        <Camera className="w-3.5 h-3.5 text-white" />
                      </motion.button>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">Profile Photo</p>
                      <p className="text-white/40 text-xs mt-0.5">
                        JPG, PNG or GIF. Max 5MB.
                      </p>
                      <div className="flex gap-2 mt-2">
                        <button className="text-xs text-[#FF0000] hover:text-red-400 font-medium transition-colors">
                          Upload new
                        </button>
                        <span className="text-white/20">·</span>
                        <button className="text-xs text-white/40 hover:text-white/60 transition-colors">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <FormRow label="Display Name" hint="Shown on your channel">
                    <input
                      type="text"
                      value={displayName}
                      onChange={(e) => setDisplayName(e.target.value)}
                      className={inputClass}
                      placeholder="Your display name"
                    />
                  </FormRow>

                  <FormRow label="Handle" hint="Your unique @username">
                    <input
                      type="text"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className={inputClass}
                      placeholder="@yourhandle"
                    />
                  </FormRow>

                  <FormRow label="Email Address" hint="Used for account recovery">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={inputClass}
                      placeholder="you@email.com"
                    />
                  </FormRow>

                  <FormRow label="Bio" hint="Up to 500 characters">
                    <textarea
                      value={bio}
                      onChange={(e) => setBio(e.target.value)}
                      rows={3}
                      maxLength={500}
                      className={`${inputClass} resize-none`}
                      placeholder="Tell viewers about yourself…"
                    />
                    <p className="text-white/25 text-xs mt-1 text-right">
                      {bio.length}/500
                    </p>
                  </FormRow>

                  <FormRow label="Website">
                    <input
                      type="url"
                      value={website}
                      onChange={(e) => setWebsite(e.target.value)}
                      className={inputClass}
                      placeholder="https://yoursite.com"
                    />
                  </FormRow>

                  <FormRow label="Location">
                    <input
                      type="text"
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className={inputClass}
                      placeholder="City, Country"
                    />
                  </FormRow>
                </SettingsSection>
              </>
            )}

            {/* ── NOTIFICATIONS ── */}
            {activeSection === "notifications" && (
              <>
                <SettingsSection
                  title="Activity Notifications"
                  description="Choose what activity triggers a notification"
                  icon={Bell}
                >
                  <ToggleRow
                    label="New Subscribers"
                    description="When someone subscribes to your channel"
                    enabled={notifSubscriptions}
                    onChange={setNotifSubscriptions}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Comments on your videos"
                    description="When viewers leave comments on your content"
                    enabled={notifComments}
                    onChange={setNotifComments}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Likes & reactions"
                    description="When someone likes or reacts to your video"
                    enabled={notifLikes}
                    onChange={setNotifLikes}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Mentions"
                    description="When someone mentions you in a comment"
                    enabled={notifMentions}
                    onChange={setNotifMentions}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="New videos from subscriptions"
                    description="When channels you follow upload new content"
                    enabled={notifNewVideos}
                    onChange={setNotifNewVideos}
                  />
                </SettingsSection>

                <SettingsSection
                  title="Delivery Channels"
                  description="How you want to receive notifications"
                  icon={Mail}
                >
                  <div className="flex items-center gap-4 p-4 bg-[#272727] rounded-xl">
                    <Mail className="w-5 h-5 text-white/50" />
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium">Email</p>
                      <p className="text-white/35 text-xs">
                        Sent to {email}
                      </p>
                    </div>
                    <Toggle enabled={notifEmail} onChange={setNotifEmail} />
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#272727] rounded-xl">
                    <Bell className="w-5 h-5 text-white/50" />
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium">Push Notifications</p>
                      <p className="text-white/35 text-xs">Browser & mobile app</p>
                    </div>
                    <Toggle enabled={notifPush} onChange={setNotifPush} />
                  </div>
                  <div className="flex items-center gap-4 p-4 bg-[#272727] rounded-xl">
                    <Smartphone className="w-5 h-5 text-white/50" />
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-medium">SMS Alerts</p>
                      <p className="text-white/35 text-xs">Critical account alerts only</p>
                    </div>
                    <Toggle enabled={notifSMS} onChange={setNotifSMS} />
                  </div>
                </SettingsSection>
              </>
            )}

            {/* ── PRIVACY ── */}
            {activeSection === "privacy" && (
              <>
                <SettingsSection
                  title="Profile Visibility"
                  description="Control who can see your profile and activity"
                  icon={Eye}
                >
                  <ToggleRow
                    label="Public profile"
                    description="Anyone can view your channel and videos"
                    enabled={profilePublic}
                    onChange={setProfilePublic}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Show subscriptions"
                    description="Let others see which channels you follow"
                    enabled={showSubscriptions}
                    onChange={setShowSubscriptions}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Show liked videos"
                    description="Display your liked videos on your profile"
                    enabled={showLikedVideos}
                    onChange={setShowLikedVideos}
                  />
                </SettingsSection>

                <SettingsSection
                  title="Interaction Controls"
                  description="Manage how others can interact with you"
                  icon={Shield}
                >
                  <ToggleRow
                    label="Allow comments"
                    description="Viewers can comment on your videos"
                    enabled={allowComments}
                    onChange={setAllowComments}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Allow direct messages"
                    description="Other users can send you private messages"
                    enabled={allowDMs}
                    onChange={setAllowDMs}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Safe search"
                    description="Filter potentially sensitive content from results"
                    enabled={safeSearch}
                    onChange={setSafeSearch}
                  />
                </SettingsSection>
              </>
            )}

            {/* ── APPEARANCE ── */}
            {activeSection === "appearance" && (
              <>
                <SettingsSection
                  title="Theme"
                  description="Choose your preferred color scheme"
                  icon={Palette}
                >
                  <div className="grid grid-cols-3 gap-3">
                    {(
                      [
                        { id: "dark", label: "Dark", icon: Moon },
                        { id: "light", label: "Light", icon: Sun },
                        { id: "system", label: "System", icon: Monitor },
                      ] as const
                    ).map((t) => {
                      const Icon = t.icon;
                      return (
                        <motion.button
                          key={t.id}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.97 }}
                          onClick={() => setTheme(t.id)}
                          className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all ${
                            theme === t.id
                              ? "border-[#FF0000] bg-[#FF0000]/10 text-[#FF0000]"
                              : "border-white/10 bg-[#272727] text-white/50 hover:text-white hover:border-white/20"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                          <span className="text-xs font-medium">{t.label}</span>
                          {theme === t.id && (
                            <Check className="w-3.5 h-3.5" />
                          )}
                        </motion.button>
                      );
                    })}
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Accent Color"
                  description="Personalize your interface highlight color"
                  icon={Palette}
                >
                  <div className="flex flex-wrap gap-3">
                    {accentColors.map((color) => (
                      <motion.button
                        key={color}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setAccentColor(color)}
                        className={`w-9 h-9 rounded-full border-2 transition-all ${
                          accentColor === color
                            ? "border-white scale-110"
                            : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Accent color ${color}`}
                      >
                        {accentColor === color && (
                          <Check className="w-4 h-4 text-white mx-auto" />
                        )}
                      </motion.button>
                    ))}
                  </div>
                </SettingsSection>

                <SettingsSection
                  title="Display Options"
                  description="Adjust layout and animation preferences"
                  icon={Monitor}
                >
                  <ToggleRow
                    label="Compact mode"
                    description="Show more content with reduced spacing"
                    enabled={compactMode}
                    onChange={setCompactMode}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Enable animations"
                    description="Smooth transitions and motion effects"
                    enabled={animationsEnabled}
                    onChange={setAnimationsEnabled}
                  />
                </SettingsSection>
              </>
            )}

            {/* ── PLAYBACK ── */}
            {activeSection === "playback" && (
              <>
                <SettingsSection
                  title="Video Playback"
                  description="Customize how videos play on StreamVibe"
                  icon={Monitor}
                >
                  <ToggleRow
                    label="Autoplay next video"
                    description="Automatically play the next recommended video"
                    enabled={autoplay}
                    onChange={setAutoplay}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Auto-enable subtitles"
                    description="Show captions automatically when available"
                    enabled={autoSubtitles}
                    onChange={setAutoSubtitles}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Mini player on scroll"
                    description="Keep video playing in a small window while browsing"
                    enabled={miniPlayerOnScroll}
                    onChange={setMiniPlayerOnScroll}
                  />
                </SettingsSection>

                <SettingsSection
                  title="Default Quality & Speed"
                  description="Set your preferred video quality and playback speed"
                  icon={Volume2}
                >
                  <FormRow label="Default Quality" hint="Applied when loading videos">
                    <select
                      value={defaultQuality}
                      onChange={(e) => setDefaultQuality(e.target.value)}
                      className={selectClass}
                    >
                      <option value="auto">Auto (recommended)</option>
                      <option value="2160p">4K (2160p)</option>
                      <option value="1440p">1440p</option>
                      <option value="1080p">1080p HD</option>
                      <option value="720p">720p HD</option>
                      <option value="480p">480p</option>
                      <option value="360p">360p</option>
                    </select>
                  </FormRow>

                  <FormRow label="Playback Speed" hint="Default speed for all videos">
                    <select
                      value={defaultSpeed}
                      onChange={(e) => setDefaultSpeed(e.target.value)}
                      className={selectClass}
                    >
                      <option value="0.25">0.25×</option>
                      <option value="0.5">0.5×</option>
                      <option value="0.75">0.75×</option>
                      <option value="1">1× (Normal)</option>
                      <option value="1.25">1.25×</option>
                      <option value="1.5">1.5×</option>
                      <option value="1.75">1.75×</option>
                      <option value="2">2×</option>
                    </select>
                  </FormRow>
                </SettingsSection>
              </>
            )}

            {/* ── LANGUAGE ── */}
            {activeSection === "language" && (
              <SettingsSection
                title="Language & Region"
                description="Set your preferred language, region, and date format"
                icon={Globe}
              >
                <FormRow label="Interface Language" hint="Language for menus and UI">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className={selectClass}
                  >
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="es-ES">Español</option>
                    <option value="fr-FR">Français</option>
                    <option value="de-DE">Deutsch</option>
                    <option value="ja-JP">日本語</option>
                    <option value="ko-KR">한국어</option>
                    <option value="zh-CN">中文 (简体)</option>
                    <option value="pt-BR">Português (Brasil)</option>
                    <option value="ar-SA">العربية</option>
                  </select>
                </FormRow>

                <FormRow label="Region" hint="Affects trending and recommendations">
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className={selectClass}
                  >
                    <option value="US">United States</option>
                    <option value="GB">United Kingdom</option>
                    <option value="CA">Canada</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                    <option value="KR">South Korea</option>
                    <option value="IN">India</option>
                    <option value="BR">Brazil</option>
                  </select>
                </FormRow>

                <FormRow label="Content Language" hint="Preferred language for video content">
                  <select
                    value={contentLanguage}
                    onChange={(e) => setContentLanguage(e.target.value)}
                    className={selectClass}
                  >
                    <option value="en">English</option>
                    <option value="es">Spanish</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="ja">Japanese</option>
                    <option value="ko">Korean</option>
                    <option value="zh">Chinese</option>
                    <option value="pt">Portuguese</option>
                    <option value="any">Any language</option>
                  </select>
                </FormRow>

                <FormRow label="Date Format">
                  <select
                    value={dateFormat}
                    onChange={(e) => setDateFormat(e.target.value)}
                    className={selectClass}
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </FormRow>
              </SettingsSection>
            )}

            {/* ── SECURITY ── */}
            {activeSection === "security" && (
              <>
                <SettingsSection
                  title="Account Security"
                  description="Protect your account with additional security measures"
                  icon={Lock}
                >
                  <ToggleRow
                    label="Two-factor authentication"
                    description="Require a code from your phone when signing in"
                    enabled={twoFactor}
                    onChange={setTwoFactor}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Login alerts"
                    description="Get notified when a new device signs into your account"
                    enabled={loginAlerts}
                    onChange={setLoginAlerts}
                  />

                  {twoFactor && (
                    <motion.div
                      variants={scaleIn}
                      initial="hidden"
                      animate="visible"
                      className="mt-2 p-4 bg-[#FF0000]/10 border border-[#FF0000]/20 rounded-xl"
                    >
                      <div className="flex items-start gap-3">
                        <AlertCircle className="w-4 h-4 text-[#FF0000] mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-white/80 text-sm font-medium">
                            Set up authenticator app
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">
                            Scan the QR code with Google Authenticator or Authy to complete 2FA setup.
                          </p>
                          <button className="mt-2 text-xs text-[#FF0000] hover:text-red-400 font-medium transition-colors">
                            Open setup guide →
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </SettingsSection>

                <SettingsSection
                  title="Change Password"
                  description="Update your account password regularly for security"
                  icon={Lock}
                >
                  <FormRow label="Current Password">
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Enter current password"
                      autoComplete="current-password"
                    />
                  </FormRow>
                  <FormRow label="New Password" hint="At least 8 characters">
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Enter new password"
                      autoComplete="new-password"
                    />
                  </FormRow>
                  <FormRow label="Confirm Password">
                    <input
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={inputClass}
                      placeholder="Confirm new password"
                      autoComplete="new-password"
                    />
                  </FormRow>

                  {newPassword && confirmPassword && newPassword !== confirmPassword && (
                    <div className="flex items-center gap-2 text-red-400 text-xs">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Passwords do not match
                    </div>
                  )}

                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-5 py-2.5 bg-[#FF0000] hover:bg-red-600 text-white text-sm font-semibold rounded-xl transition-colors disabled:opacity-40"
                    disabled={!currentPassword || !newPassword || newPassword !== confirmPassword}
                  >
                    Update Password
                  </motion.button>
                </SettingsSection>
              </>
            )}

            {/* ── DATA ── */}
            {activeSection === "data" && (
              <>
                <SettingsSection
                  title="Watch History & Data"
                  description="Control how StreamVibe stores and uses your data"
                  icon={Download}
                >
                  <ToggleRow
                    label="Auto-delete watch history"
                    description="Automatically remove history older than 90 days"
                    enabled={autoDeleteHistory}
                    onChange={setAutoDeleteHistory}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Usage data collection"
                    description="Help improve StreamVibe by sharing anonymous usage data"
                    enabled={dataCollection}
                    onChange={setDataCollection}
                  />
                  <div className="border-t border-white/5" />
                  <ToggleRow
                    label="Personalized ads"
                    description="See ads based on your interests and watch history"
                    enabled={personalizedAds}
                    onChange={setPersonalizedAds}
                  />
                </SettingsSection>

                <SettingsSection
                  title="Export & Download"
                  description="Download a copy of your StreamVibe data"
                  icon={Upload}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {[
                      {
                        label: "Watch History",
                        desc: "All videos you've watched",
                        size: "~2.4 MB",
                      },
                      {
                        label: "Liked Videos",
                        desc: "Your liked video list",
                        size: "~0.8 MB",
                      },
                      {
                        label: "Comments",
                        desc: "All comments you've posted",
                        size: "~1.1 MB",
                      },
                      {
                        label: "Account Data",
                        desc: "Profile and settings info",
                        size: "~0.3 MB",
                      },
                    ].map((item) => (
                      <motion.div
                        key={item.label}
                        whileHover={{ scale: 1.01 }}
                        className="flex items-center justify-between p-4 bg-[#272727] rounded-xl border border-white/5"
                      >
                        <div>
                          <p className="text-white/80 text-sm font-medium">
                            {item.label}
                          </p>
                          <p className="text-white/35 text-xs mt-0.5">
                            {item.desc} · {item.size}
                          </p>
                        </div>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.95 }}
                          className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                        >
                          <Download className="w-4 h-4" />
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      className="w-full py-3 border border-white/10 rounded-xl text-white/60 hover:text-white hover:border-white/20 text-sm font-medium transition-all flex items-center justify-center gap-2"
                    >
                      <Download className="w-4 h-4" />
                      Download All Data (ZIP)
                    </motion.button>
                  </div>
                </SettingsSection>
              </>
            )}

            {/* ── DANGER ZONE ── */}
            {activeSection === "danger" && (
              <SettingsSection
                title="Danger Zone"
                description="Irreversible actions — proceed with caution"
                icon={Trash2}
              >
                <div className="space-y-4">
                  <div className="p-4 bg-yellow-500/5 border border-yellow-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-semibold">
                        Clear Watch History
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        Remove all videos from your watch history. This cannot be undone.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 bg-yellow-500/15 hover:bg-yellow-500/25 border border-yellow-500/30 text-yellow-400 text-sm font-medium rounded-xl transition-all flex-shrink-0"
                    >
                      Clear History
                    </motion.button>
                  </div>

                  <div className="p-4 bg-orange-500/5 border border-orange-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-semibold">
                        Deactivate Channel
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        Temporarily hide your channel and videos from public view.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 bg-orange-500/15 hover:bg-orange-500/25 border border-orange-500/30 text-orange-400 text-sm font-medium rounded-xl transition-all flex-shrink-0"
                    >
                      Deactivate
                    </motion.button>
                  </div>

                  <div className="p-4 bg-red-500/5 border border-red-500/20 rounded-xl flex flex-col sm:flex-row sm:items-center gap-4">
                    <div className="flex-1">
                      <p className="text-white/80 text-sm font-semibold">
                        Delete Account
                      </p>
                      <p className="text-white/40 text-xs mt-0.5">
                        Permanently delete your account, channel, and all uploaded videos. This action is irreversible.
                      </p>
                    </div>
                    <motion.button
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.97 }}
                      className="px-4 py-2 bg-red-500/15 hover:bg-red-500/25 border border-red-500/30 text-red-400 text-sm font-medium rounded-xl transition-all flex-shrink-0"
                    >
                      Delete Account
                    </motion.button>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-[#272727] rounded-xl">
                    <AlertCircle className="w-4 h-4 text-white/30 mt-0.5 flex-shrink-0" />
                    <p className="text-white/30 text-xs leading-relaxed">
                      Before deleting your account, consider downloading your data. Deleted accounts and content cannot be recovered. If you have an active channel with subscribers, they will be notified.
                    </p>
                  </div>
                </div>
              </SettingsSection>
            )}

            {/* ── Save Button (shown for most sections) ── */}
            {activeSection !== "danger" && activeSection !== "security" && (
              <motion.div
                variants={fadeInUp}
                className="flex items-center justify-between pt-2"
              >
                <p className="text-white/30 text-xs">
                  Changes are saved to your {APP_NAME} account
                </p>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSave}
                  className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-lg ${
                    saved
                      ? "bg-green-500 shadow-green-500/30 text-white"
                      : "bg-[#FF0000] hover:bg-red-600 shadow-red-500/30 text-white"
                  }`}
                >
                  {saved ? (
                    <>
                      <Check className="w-4 h-4" />
                      Saved!
                    </>
                  ) : (
                    <>
                      <Save className="w-4 h-4" />
                      Save Changes
                    </>
                  )}
                </motion.button>
              </motion.div>
            )}
          </motion.main>
        </div>
      </div>
    </div>
  );
}