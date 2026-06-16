"use client";

import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Upload, X, Check, AlertCircle, Image, FileVideo, ChevronDown, Plus, Eye, Lock, Globe, Clock, Tag, Info, Sparkles } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { VIDEO_CATEGORIES } from "@/lib/data";

type VisibilityOption = "public" | "unlisted" | "private" | "scheduled";

interface UploadFormState {
  title: string;
  description: string;
  category: string;
  tags: string;
  visibility: VisibilityOption;
  scheduledDate: string;
  scheduledTime: string;
  allowComments: boolean;
  allowRatings: boolean;
  madeForKids: boolean;
  ageRestricted: boolean;
  thumbnailPreview: string | null;
  videoFile: File | null;
  videoPreviewName: string;
  videoPreviewSize: string;
  uploadProgress: number;
  uploadState: "idle" | "uploading" | "processing" | "done" | "error";
}

const VISIBILITY_OPTIONS: {
  value: VisibilityOption;
  label: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    value: "public",
    label: "Public",
    description: "Anyone can search for and view",
    icon: Globe,
  },
  {
    value: "unlisted",
    label: "Unlisted",
    description: "Anyone with the link can view",
    icon: Eye,
  },
  {
    value: "private",
    label: "Private",
    description: "Only you can view",
    icon: Lock,
  },
  {
    value: "scheduled",
    label: "Scheduled",
    description: "Set a date and time to publish",
    icon: Clock,
  },
];

function formatBytes(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
}

const TIPS = [
  "Titles between 60–70 characters perform best in search results.",
  "Add at least 5 tags to help viewers discover your content.",
  "Thumbnails with faces and bright colors get 38% more clicks.",
  "Descriptions with timestamps improve watch time significantly.",
  "Uploading in 1080p or higher unlocks HD streaming for all viewers.",
];

export default function UploadPage() {
  const [form, setForm] = useState<UploadFormState>({
    title: "",
    description: "",
    category: "tech",
    tags: "",
    visibility: "public",
    scheduledDate: "",
    scheduledTime: "",
    allowComments: true,
    allowRatings: true,
    madeForKids: false,
    ageRestricted: false,
    thumbnailPreview: null,
    videoFile: null,
    videoPreviewName: "",
    videoPreviewSize: "",
    uploadProgress: 0,
    uploadState: "idle",
  });

  const [dragOver, setDragOver] = useState(false);
  const [thumbnailDragOver, setThumbnailDragOver] = useState(false);
  const [activeSection, setActiveSection] = useState<string>("details");
  const [tipIndex] = useState(0);
  const [visibilityOpen, setVisibilityOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");
  const [tagList, setTagList] = useState<string[]>([]);

  const videoInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);

  const updateForm = useCallback(
    <K extends keyof UploadFormState>(key: K, value: UploadFormState[K]) => {
      setForm((prev) => ({ ...prev, [key]: value }));
    },
    []
  );

  const simulateUpload = useCallback((file: File) => {
    updateForm("uploadState", "uploading");
    updateForm("uploadProgress", 0);
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.random() * 12 + 3;
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        updateForm("uploadProgress", 100);
        setTimeout(() => {
          updateForm("uploadState", "processing");
          setTimeout(() => {
            updateForm("uploadState", "done");
          }, 2000);
        }, 400);
      } else {
        updateForm("uploadProgress", Math.min(progress, 99));
      }
    }, 300);
  }, [updateForm]);

  const handleVideoFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("video/")) return;
      updateForm("videoFile", file);
      updateForm("videoPreviewName", file.name);
      updateForm("videoPreviewSize", formatBytes(file.size));
      if (!form.title) {
        const nameWithoutExt = file.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        updateForm("title", nameWithoutExt);
      }
      simulateUpload(file);
    },
    [form.title, simulateUpload, updateForm]
  );

  const handleVideoDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleVideoFile(file);
    },
    [handleVideoFile]
  );

  const handleThumbnailFile = useCallback(
    (file: File) => {
      if (!file.type.startsWith("image/")) return;
      const reader = new FileReader();
      reader.onload = (e) => {
        updateForm("thumbnailPreview", (e.target?.result as string) ?? null);
      };
      reader.readAsDataURL(file);
    },
    [updateForm]
  );

  const handleThumbnailDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setThumbnailDragOver(false);
      const file = e.dataTransfer.files?.[0];
      if (file) handleThumbnailFile(file);
    },
    [handleThumbnailFile]
  );

  const addTag = useCallback(() => {
    const trimmed = tagInput.trim().replace(/^#/, "");
    if (trimmed && !tagList.includes(trimmed) && tagList.length < 15) {
      setTagList((prev) => [...prev, trimmed]);
      setTagInput("");
    }
  }, [tagInput, tagList]);

  const removeTag = useCallback((tag: string) => {
    setTagList((prev) => prev.filter((t) => t !== tag));
  }, []);

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const sections = [
    { id: "details", label: "Details" },
    { id: "visibility", label: "Visibility" },
    { id: "settings", label: "Settings" },
  ];

  const selectedVisibility = VISIBILITY_OPTIONS.find(
    (o) => o.value === form.visibility
  ) ?? VISIBILITY_OPTIONS[0];

  return (
    <main className="min-h-screen bg-[#0F0F0F] pt-20 pb-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        {/* Page Header */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
            Upload Video
          </h1>
          <p className="text-white/50 text-base">
            Share your content with the StreamVibe community
          </p>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left column — main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Drop Zone */}
              <motion.div variants={scaleIn} initial="hidden" animate="visible">
                <AnimatePresence mode="wait">
                  {form.uploadState === "idle" ? (
                    <motion.div
                      key="dropzone"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onDragOver={(e) => {
                        e.preventDefault();
                        setDragOver(true);
                      }}
                      onDragLeave={() => setDragOver(false)}
                      onDrop={handleVideoDrop}
                      onClick={() => videoInputRef.current?.click()}
                      className={`relative border-2 border-dashed rounded-2xl p-12 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 ${
                        dragOver
                          ? "border-[#FF0000] bg-[#FF0000]/8 scale-[1.01]"
                          : "border-white/15 bg-[#1a1a1a] hover:border-white/30 hover:bg-[#222]"
                      }`}
                    >
                      <input
                        ref={videoInputRef}
                        type="file"
                        accept="video/*"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleVideoFile(file);
                        }}
                      />
                      <motion.div
                        animate={dragOver ? { scale: 1.15, rotate: 5 } : { scale: 1, rotate: 0 }}
                        transition={{ duration: 0.2 }}
                        className="w-20 h-20 rounded-2xl bg-[#FF0000]/15 border border-[#FF0000]/30 flex items-center justify-center mb-5"
                      >
                        <FileVideo className="w-10 h-10 text-[#FF0000]" />
                      </motion.div>
                      <p className="text-white text-xl font-semibold mb-2">
                        {dragOver ? "Drop your video here" : "Drag & drop your video"}
                      </p>
                      <p className="text-white/40 text-sm mb-6 text-center max-w-xs">
                        MP4, MOV, AVI, MKV, WebM supported. Up to 128 GB or 12 hours.
                      </p>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        className="bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-red-500/25"
                      >
                        Select File
                      </motion.button>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="progress"
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6"
                    >
                      <div className="flex items-start gap-4 mb-5">
                        <div className="w-12 h-12 rounded-xl bg-[#FF0000]/15 border border-[#FF0000]/30 flex items-center justify-center flex-shrink-0">
                          <FileVideo className="w-6 h-6 text-[#FF0000]" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-medium truncate">
                            {form.videoPreviewName || "video.mp4"}
                          </p>
                          <p className="text-white/40 text-sm">{form.videoPreviewSize}</p>
                        </div>
                        {form.uploadState === "done" && (
                          <div className="w-8 h-8 rounded-full bg-green-500/20 border border-green-500/40 flex items-center justify-center flex-shrink-0">
                            <Check className="w-4 h-4 text-green-400" />
                          </div>
                        )}
                        {form.uploadState === "error" && (
                          <div className="w-8 h-8 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center flex-shrink-0">
                            <AlertCircle className="w-4 h-4 text-red-400" />
                          </div>
                        )}
                      </div>

                      {/* Progress bar */}
                      {(form.uploadState === "uploading" ||
                        form.uploadState === "processing") && (
                        <div className="space-y-2">
                          <div className="flex justify-between text-xs text-white/50">
                            <span>
                              {form.uploadState === "uploading"
                                ? "Uploading…"
                                : "Processing…"}
                            </span>
                            <span>
                              {form.uploadState === "uploading"
                                ? `${Math.round(form.uploadProgress)}%`
                                : "Almost done"}
                            </span>
                          </div>
                          <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full bg-gradient-to-r from-[#FF0000] to-[#ff6b6b] rounded-full"
                              initial={{ width: 0 }}
                              animate={{
                                width:
                                  form.uploadState === "processing"
                                    ? "100%"
                                    : `${form.uploadProgress}%`,
                              }}
                              transition={{ duration: 0.3, ease: "easeOut" }}
                            />
                          </div>
                        </div>
                      )}

                      {form.uploadState === "done" && (
                        <div className="flex items-center gap-2 text-green-400 text-sm">
                          <Check className="w-4 h-4" />
                          <span>Upload complete — ready to publish</span>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Section Tabs */}
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="flex gap-1 bg-[#1a1a1a] border border-white/8 rounded-xl p-1"
              >
                {sections.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setActiveSection(s.id)}
                    className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                      activeSection === s.id
                        ? "bg-[#FF0000] text-white shadow-md shadow-red-500/20"
                        : "text-white/50 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </motion.div>

              {/* Details Section */}
              <AnimatePresence mode="wait">
                {activeSection === "details" && (
                  <motion.div
                    key="details"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-5"
                  >
                    {/* Title */}
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                        Title
                        <span className="text-[#FF0000]">*</span>
                      </label>
                      <input
                        type="text"
                        value={form.title}
                        onChange={(e) => updateForm("title", e.target.value)}
                        placeholder="Add a title that describes your video…"
                        maxLength={100}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 focus:bg-[#222] transition-all text-sm"
                      />
                      <div className="flex justify-end">
                        <span className="text-white/30 text-xs">
                          {form.title.length}/100
                        </span>
                      </div>
                    </motion.div>

                    {/* Description */}
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-white/70 text-sm font-medium">
                        Description
                      </label>
                      <textarea
                        value={form.description}
                        onChange={(e) => updateForm("description", e.target.value)}
                        placeholder="Tell viewers about your video. Include keywords, timestamps, and links to help people find your content…"
                        rows={6}
                        maxLength={5000}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-[#FF0000]/60 focus:bg-[#222] transition-all text-sm resize-none"
                      />
                      <div className="flex justify-end">
                        <span className="text-white/30 text-xs">
                          {form.description.length}/5000
                        </span>
                      </div>
                    </motion.div>

                    {/* Category */}
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-white/70 text-sm font-medium">
                        Category
                      </label>
                      <select
                        value={form.category}
                        onChange={(e) => updateForm("category", e.target.value)}
                        className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0000]/60 focus:bg-[#222] transition-all text-sm appearance-none cursor-pointer"
                      >
                        {VIDEO_CATEGORIES.filter((c) => c.id !== "all").map((cat) => (
                          <option key={cat.id} value={cat.id} className="bg-[#1a1a1a]">
                            {cat.label}
                          </option>
                        ))}
                      </select>
                    </motion.div>

                    {/* Tags */}
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                        <Tag className="w-3.5 h-3.5" />
                        Tags
                        <span className="text-white/30 text-xs font-normal ml-1">
                          ({tagList.length}/15)
                        </span>
                      </label>
                      <div className="bg-[#1a1a1a] border border-white/10 rounded-xl p-3 focus-within:border-[#FF0000]/60 transition-all">
                        {tagList.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-2">
                            {tagList.map((tag) => (
                              <motion.span
                                key={tag}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.8, opacity: 0 }}
                                className="flex items-center gap-1.5 bg-[#FF0000]/15 border border-[#FF0000]/30 text-[#FF0000] text-xs px-2.5 py-1 rounded-full"
                              >
                                #{tag}
                                <button
                                  type="button"
                                  onClick={() => removeTag(tag)}
                                  className="hover:text-white transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </motion.span>
                            ))}
                          </div>
                        )}
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={tagInput}
                            onChange={(e) => setTagInput(e.target.value)}
                            onKeyDown={handleTagKeyDown}
                            placeholder="Add a tag and press Enter…"
                            className="flex-1 bg-transparent text-white placeholder-white/30 text-sm focus:outline-none"
                          />
                          <button
                            type="button"
                            onClick={addTag}
                            className="text-white/40 hover:text-white transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </motion.div>

                    {/* Thumbnail */}
                    <motion.div variants={fadeInUp} className="space-y-2">
                      <label className="text-white/70 text-sm font-medium flex items-center gap-1.5">
                        <Image className="w-3.5 h-3.5" />
                        Thumbnail
                      </label>
                      <div
                        onDragOver={(e) => {
                          e.preventDefault();
                          setThumbnailDragOver(true);
                        }}
                        onDragLeave={() => setThumbnailDragOver(false)}
                        onDrop={handleThumbnailDrop}
                        onClick={() => thumbnailInputRef.current?.click()}
                        className={`relative border-2 border-dashed rounded-xl overflow-hidden cursor-pointer transition-all duration-300 ${
                          thumbnailDragOver
                            ? "border-[#FF0000] bg-[#FF0000]/8"
                            : "border-white/15 hover:border-white/30"
                        }`}
                        style={{ aspectRatio: "16/9", maxHeight: 220 }}
                      >
                        <input
                          ref={thumbnailInputRef}
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleThumbnailFile(file);
                          }}
                        />
                        {form.thumbnailPreview ? (
                          <>
                            <img
                              src={form.thumbnailPreview}
                              alt="Thumbnail preview"
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white text-sm font-medium">
                                Change thumbnail
                              </span>
                            </div>
                          </>
                        ) : (
                          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
                            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                              <Image className="w-6 h-6 text-white/40" />
                            </div>
                            <div className="text-center">
                              <p className="text-white/60 text-sm font-medium">
                                Upload thumbnail
                              </p>
                              <p className="text-white/30 text-xs mt-0.5">
                                JPG, PNG, GIF — 1280×720 recommended
                              </p>
                            </div>
                          </div>
                        )}
                      </div>
                    </motion.div>
                  </motion.div>
                )}

                {/* Visibility Section */}
                {activeSection === "visibility" && (
                  <motion.div
                    key="visibility"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-4"
                  >
                    <motion.p variants={fadeInUp} className="text-white/50 text-sm">
                      Choose who can see your video and when it goes live.
                    </motion.p>

                    {VISIBILITY_OPTIONS.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = form.visibility === opt.value;
                      return (
                        <motion.button
                          key={opt.value}
                          type="button"
                          variants={fadeInUp}
                          whileHover={{ scale: 1.01 }}
                          whileTap={{ scale: 0.99 }}
                          onClick={() => updateForm("visibility", opt.value)}
                          className={`w-full flex items-center gap-4 p-4 rounded-xl border transition-all text-left ${
                            isSelected
                              ? "border-[#FF0000]/60 bg-[#FF0000]/8"
                              : "border-white/10 bg-[#1a1a1a] hover:border-white/20 hover:bg-[#222]"
                          }`}
                        >
                          <div
                            className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? "bg-[#FF0000]/20 border border-[#FF0000]/40"
                                : "bg-white/5 border border-white/10"
                            }`}
                          >
                            <Icon
                              className={`w-5 h-5 ${
                                isSelected ? "text-[#FF0000]" : "text-white/50"
                              }`}
                            />
                          </div>
                          <div className="flex-1">
                            <p
                              className={`font-medium text-sm ${
                                isSelected ? "text-white" : "text-white/70"
                              }`}
                            >
                              {opt.label}
                            </p>
                            <p className="text-white/40 text-xs mt-0.5">
                              {opt.description}
                            </p>
                          </div>
                          <div
                            className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                              isSelected
                                ? "border-[#FF0000] bg-[#FF0000]"
                                : "border-white/20"
                            }`}
                          >
                            {isSelected && <Check className="w-3 h-3 text-white" />}
                          </div>
                        </motion.button>
                      );
                    })}

                    {/* Scheduled date/time */}
                    <AnimatePresence>
                      {form.visibility === "scheduled" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="grid grid-cols-2 gap-3 pt-2">
                            <div className="space-y-1.5">
                              <label className="text-white/50 text-xs">Date</label>
                              <input
                                type="date"
                                value={form.scheduledDate}
                                onChange={(e) =>
                                  updateForm("scheduledDate", e.target.value)
                                }
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                              />
                            </div>
                            <div className="space-y-1.5">
                              <label className="text-white/50 text-xs">Time</label>
                              <input
                                type="time"
                                value={form.scheduledTime}
                                onChange={(e) =>
                                  updateForm("scheduledTime", e.target.value)
                                }
                                className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-[#FF0000]/60 transition-all text-sm"
                              />
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                )}

                {/* Settings Section */}
                {activeSection === "settings" && (
                  <motion.div
                    key="settings"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -8 }}
                    className="space-y-4"
                  >
                    {[
                      {
                        key: "allowComments" as const,
                        label: "Allow Comments",
                        description:
                          "Viewers can leave comments on your video",
                      },
                      {
                        key: "allowRatings" as const,
                        label: "Show Likes & Dislikes",
                        description:
                          "Display the like and dislike count publicly",
                      },
                      {
                        key: "madeForKids" as const,
                        label: "Made for Kids",
                        description:
                          "This video is specifically created for children",
                      },
                      {
                        key: "ageRestricted" as const,
                        label: "Age Restricted (18+)",
                        description:
                          "Restrict this video to viewers 18 and older",
                      },
                    ].map((setting) => (
                      <motion.div
                        key={setting.key}
                        variants={fadeInUp}
                        className="flex items-center justify-between p-4 bg-[#1a1a1a] border border-white/10 rounded-xl"
                      >
                        <div>
                          <p className="text-white text-sm font-medium">
                            {setting.label}
                          </p>
                          <p className="text-white/40 text-xs mt-0.5">
                            {setting.description}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={() =>
                            updateForm(setting.key, !form[setting.key])
                          }
                          className={`relative w-11 h-6 rounded-full transition-all duration-300 flex-shrink-0 ${
                            form[setting.key] ? "bg-[#FF0000]" : "bg-white/15"
                          }`}
                        >
                          <motion.div
                            animate={{
                              x: form[setting.key] ? 20 : 2,
                            }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                          />
                        </button>
                      </motion.div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Right column — sidebar */}
            <div className="space-y-5">
              {/* Publish Card */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-5 sticky top-20"
              >
                <h2 className="text-white font-semibold text-base mb-4">
                  Publish
                </h2>

                {/* Status */}
                <div className="space-y-3 mb-5">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Status</span>
                    <span
                      className={`font-medium ${
                        form.uploadState === "done"
                          ? "text-green-400"
                          : form.uploadState === "error"
                          ? "text-red-400"
                          : form.uploadState === "idle"
                          ? "text-white/40"
                          : "text-yellow-400"
                      }`}
                    >
                      {form.uploadState === "idle"
                        ? "No file selected"
                        : form.uploadState === "uploading"
                        ? "Uploading…"
                        : form.uploadState === "processing"
                        ? "Processing…"
                        : form.uploadState === "done"
                        ? "Ready"
                        : "Error"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Visibility</span>
                    <span className="text-white font-medium capitalize">
                      {selectedVisibility.label}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Category</span>
                    <span className="text-white font-medium capitalize">
                      {VIDEO_CATEGORIES.find((c) => c.id === form.category)?.label ?? form.category}
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-white/50">Tags</span>
                    <span className="text-white font-medium">{tagList.length}</span>
                  </div>
                </div>

                <div className="h-px bg-white/8 mb-5" />

                {/* Checklist */}
                <div className="space-y-2.5 mb-5">
                  {[
                    { label: "Video uploaded", done: form.uploadState === "done" },
                    { label: "Title added", done: form.title.trim().length > 0 },
                    {
                      label: "Description added",
                      done: form.description.trim().length > 0,
                    },
                    { label: "Thumbnail set", done: !!form.thumbnailPreview },
                    { label: "Tags added", done: tagList.length >= 3 },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-2.5">
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                          item.done
                            ? "bg-green-500/20 border border-green-500/40"
                            : "bg-white/5 border border-white/15"
                        }`}
                      >
                        {item.done && (
                          <Check className="w-2.5 h-2.5 text-green-400" />
                        )}
                      </div>
                      <span
                        className={`text-xs ${
                          item.done ? "text-white/70" : "text-white/35"
                        }`}
                      >
                        {item.label}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Publish button */}
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  disabled={form.uploadState !== "done"}
                  className={`w-full py-3 rounded-xl font-semibold text-sm transition-all ${
                    form.uploadState === "done"
                      ? "bg-[#FF0000] hover:bg-[#cc0000] text-white shadow-lg shadow-red-500/25"
                      : "bg-white/8 text-white/30 cursor-not-allowed"
                  }`}
                >
                  {form.visibility === "scheduled"
                    ? "Schedule Video"
                    : "Publish Now"}
                </motion.button>

                {form.uploadState !== "done" && (
                  <p className="text-white/30 text-xs text-center mt-2">
                    Upload a video file to publish
                  </p>
                )}
              </motion.div>

              {/* Creator Tips */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.15 }}
                className="bg-gradient-to-br from-[#FF0000]/10 to-[#1a1a1a] border border-[#FF0000]/20 rounded-2xl p-5"
              >
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-[#FF0000]" />
                  <h3 className="text-white font-semibold text-sm">
                    Creator Tips
                  </h3>
                </div>
                <ul className="space-y-2.5">
                  {TIPS.map((tip, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#FF0000]/60 mt-1.5 flex-shrink-0" />
                      <p className="text-white/50 text-xs leading-relaxed">{tip}</p>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Info box */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.2 }}
                className="bg-[#1a1a1a] border border-white/8 rounded-2xl p-5"
              >
                <div className="flex items-start gap-3">
                  <Info className="w-4 h-4 text-white/40 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-white/60 text-xs leading-relaxed">
                      By uploading, you confirm that your content complies with
                      StreamVibe&apos;s{" "}
                      <a
                        href="/guidelines"
                        className="text-[#FF0000] hover:underline"
                      >
                        Community Guidelines
                      </a>{" "}
                      and{" "}
                      <a
                        href="/terms"
                        className="text-[#FF0000] hover:underline"
                      >
                        Terms of Service
                      </a>
                      . Do not upload content you do not own or have rights to.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
}