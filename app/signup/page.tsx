"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { Eye, EyeOff, Mail, Lock, User, Check, AlertCircle, ArrowRight, Code2 as Github, MessageCircle as Twitter } from 'lucide-react';
import { APP_NAME } from "@/lib/data";

const benefits = [
  "Upload unlimited videos to your channel",
  "Subscribe to your favorite creators",
  "Like, comment, and engage with content",
  "Get personalized video recommendations",
  "Create and manage playlists",
  "Access exclusive creator tools & analytics",
];

const socialProviders = [
  { id: "google", label: "Continue with Google", icon: null },
  { id: "github", label: "Continue with GitHub", icon: Github },
  { id: "twitter", label: "Continue with Twitter", icon: Twitter },
];

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="w-5 h-5" aria-hidden="true">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

function PasswordStrengthBar({ password }: { password: string }) {
  const getStrength = (pw: string): { score: number; label: string; color: string } => {
    if (pw.length === 0) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    if (pw.length >= 12) score++;

    if (score <= 1) return { score: 1, label: "Weak", color: "bg-red-500" };
    if (score === 2) return { score: 2, label: "Fair", color: "bg-orange-400" };
    if (score === 3) return { score: 3, label: "Good", color: "bg-yellow-400" };
    return { score: 4, label: "Strong", color: "bg-green-500" };
  };

  const { score, label, color } = getStrength(password);

  if (password.length === 0) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className={`h-1 flex-1 rounded-full transition-all duration-300 ${
              i <= score ? color : "bg-white/10"
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${score <= 1 ? "text-red-400" : score === 2 ? "text-orange-400" : score === 3 ? "text-yellow-400" : "text-green-400"}`}>
        {label} password
      </p>
    </div>
  );
}

export default function SignupPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: false,
    agreeMarketing: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = "Full name is required.";
    else if (formData.name.trim().length < 2) newErrors.name = "Name must be at least 2 characters.";

    if (!formData.email.trim()) newErrors.email = "Email address is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Please enter a valid email address.";

    if (!formData.password) newErrors.password = "Password is required.";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters.";

    if (!formData.confirmPassword) newErrors.confirmPassword = "Please confirm your password.";
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match.";

    if (!formData.agreeTerms)
      newErrors.agreeTerms = "You must agree to the Terms of Service to continue.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 1800);
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-20">
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-10 max-w-md w-full text-center shadow-2xl"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-10 h-10 text-green-400" />
          </motion.div>
          <h1 className="text-2xl font-bold text-white mb-3">Account Created!</h1>
          <p className="text-white/60 mb-2">
            Welcome to <span className="text-[#FF0000] font-semibold">{APP_NAME}</span>,{" "}
            {formData.name.split(" ")[0] ?? "there"}!
          </p>
          <p className="text-white/40 text-sm mb-8">
            We&apos;ve sent a confirmation email to{" "}
            <span className="text-white/70">{formData.email}</span>. Please verify your
            account to start uploading and engaging with content.
          </p>
          <Link
            href="/signin"
            className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-full transition-all shadow-lg shadow-red-500/30"
          >
            Sign In to Your Account
            <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0F0F0F] pt-14">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* ── Left panel: benefits ── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="hidden lg:block sticky top-24"
          >
            <motion.div variants={fadeInUp} className="mb-8">
              <Link href="/" className="inline-flex items-center gap-2 mb-8 group">
                <div className="w-9 h-9 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/30 group-hover:shadow-red-500/50 transition-all">
                  <svg viewBox="0 0 24 24" fill="white" className="w-5 h-5">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-xl">{APP_NAME}</span>
              </Link>
              <h1 className="text-4xl font-bold text-white leading-tight mb-4">
                Join the world&apos;s most vibrant{" "}
                <span className="text-[#FF0000]">creator community</span>
              </h1>
              <p className="text-white/50 text-lg leading-relaxed">
                Millions of creators and viewers connect every day on {APP_NAME}. Start
                your journey — it&apos;s completely free.
              </p>
            </motion.div>

            <motion.ul variants={staggerContainer} className="space-y-4 mb-10">
              {benefits.map((benefit, i) => (
                <motion.li
                  key={i}
                  variants={fadeInUp}
                  className="flex items-start gap-3"
                >
                  <div className="w-6 h-6 rounded-full bg-[#FF0000]/20 border border-[#FF0000]/40 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5 text-[#FF0000]" />
                  </div>
                  <span className="text-white/70 text-sm leading-relaxed">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div
              variants={fadeInUp}
              className="bg-gradient-to-br from-[#FF0000]/10 to-[#FF0000]/5 border border-[#FF0000]/20 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="flex -space-x-2">
                  {[
                    "/images/creator-avatar-gaming.jpg",
                    "/images/creator-avatar-music.jpg",
                    "/images/creator-avatar-tech.jpg",
                  ].map((src, i) => (
                    <img
                      key={i}
                      src={src}
                      alt="Creator"
                      className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] object-cover bg-[#272727]"
                    />
                  ))}
                </div>
                <span className="text-white/60 text-sm">+2.4M creators</span>
              </div>
              <p className="text-white/80 text-sm font-medium">
                &ldquo;{APP_NAME} gave my channel the audience I always dreamed of. The
                tools are incredible.&rdquo;
              </p>
              <p className="text-white/40 text-xs mt-2">— Alex Rivera, 1.2M subscribers</p>
            </motion.div>
          </motion.div>

          {/* ── Right panel: form ── */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="visible"
          >
            <div className="bg-[#1a1a1a] border border-white/10 rounded-2xl p-6 md:p-8 shadow-2xl shadow-black/50">
              <div className="mb-6 lg:hidden">
                <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
                <p className="text-white/50 text-sm">
                  Join {APP_NAME} — free forever for viewers, powerful for creators.
                </p>
              </div>
              <div className="hidden lg:block mb-6">
                <h2 className="text-2xl font-bold text-white mb-1">Create your account</h2>
                <p className="text-white/50 text-sm">
                  Free forever for viewers. Powerful tools for creators.
                </p>
              </div>

              {/* Social sign-up */}
              <div className="space-y-3 mb-6">
                {socialProviders.map((provider) => {
                  const Icon = provider.icon;
                  return (
                    <motion.button
                      key={provider.id}
                      type="button"
                      whileHover={{ scale: 1.01, y: -1 }}
                      whileTap={{ scale: 0.99 }}
                      className="w-full flex items-center justify-center gap-3 bg-[#272727] hover:bg-[#333] border border-white/10 hover:border-white/20 text-white text-sm font-medium py-3 rounded-xl transition-all"
                    >
                      {provider.id === "google" ? (
                        <GoogleIcon />
                      ) : Icon ? (
                        <Icon className="w-5 h-5" />
                      ) : null}
                      {provider.label}
                    </motion.button>
                  );
                })}
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-white/30 text-xs font-medium">or sign up with email</span>
                <div className="flex-1 h-px bg-white/10" />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Full name */}
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white/70 mb-1.5">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className={`w-full bg-[#272727] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
                        errors.name
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1f1f1f]"
                      }`}
                    />
                  </div>
                  {errors.name && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white/70 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className={`w-full bg-[#272727] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1f1f1f]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Password */}
                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-white/70 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="Min. 8 characters"
                      className={`w-full bg-[#272727] border rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
                        errors.password
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1f1f1f]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                      aria-label={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                  <PasswordStrengthBar password={formData.password} />
                  {errors.password && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.password}
                    </p>
                  )}
                </div>

                {/* Confirm password */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/70 mb-1.5">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Re-enter your password"
                      className={`w-full bg-[#272727] border rounded-xl pl-10 pr-12 py-3 text-sm text-white placeholder-white/30 focus:outline-none transition-all ${
                        errors.confirmPassword
                          ? "border-red-500/60 focus:border-red-500"
                          : formData.confirmPassword && formData.password === formData.confirmPassword
                          ? "border-green-500/50 focus:border-green-500/70"
                          : "border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1f1f1f]"
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword((v) => !v)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                      aria-label={showConfirmPassword ? "Hide password" : "Show password"}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                    {formData.confirmPassword && formData.password === formData.confirmPassword && (
                      <Check className="absolute right-10 top-1/2 -translate-y-1/2 w-4 h-4 text-green-400" />
                    )}
                  </div>
                  {errors.confirmPassword && (
                    <p className="mt-1.5 text-xs text-red-400 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.confirmPassword}
                    </p>
                  )}
                </div>

                {/* Checkboxes */}
                <div className="space-y-3 pt-1">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        name="agreeTerms"
                        checked={formData.agreeTerms}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          formData.agreeTerms
                            ? "bg-[#FF0000] border-[#FF0000]"
                            : errors.agreeTerms
                            ? "border-red-500/60 bg-transparent"
                            : "border-white/20 bg-transparent group-hover:border-white/40"
                        }`}
                      >
                        {formData.agreeTerms && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-sm text-white/60 leading-relaxed">
                      I agree to the{" "}
                      <Link href="/terms" className="text-[#FF0000] hover:underline">
                        Terms of Service
                      </Link>{" "}
                      and{" "}
                      <Link href="/privacy" className="text-[#FF0000] hover:underline">
                        Privacy Policy
                      </Link>
                      . I confirm I am at least 13 years old.
                    </span>
                  </label>
                  {errors.agreeTerms && (
                    <p className="text-xs text-red-400 flex items-center gap-1 pl-8">
                      <AlertCircle className="w-3 h-3" /> {errors.agreeTerms}
                    </p>
                  )}

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <div className="relative mt-0.5 flex-shrink-0">
                      <input
                        type="checkbox"
                        name="agreeMarketing"
                        checked={formData.agreeMarketing}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                          formData.agreeMarketing
                            ? "bg-[#FF0000] border-[#FF0000]"
                            : "border-white/20 bg-transparent group-hover:border-white/40"
                        }`}
                      >
                        {formData.agreeMarketing && <Check className="w-3 h-3 text-white" />}
                      </div>
                    </div>
                    <span className="text-sm text-white/60 leading-relaxed">
                      Send me creator tips, platform updates, and personalized recommendations.
                      (Optional)
                    </span>
                  </label>
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={isLoading}
                  whileHover={{ scale: isLoading ? 1 : 1.01, y: isLoading ? 0 : -1 }}
                  whileTap={{ scale: isLoading ? 1 : 0.99 }}
                  className="w-full bg-[#FF0000] hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3.5 rounded-xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 flex items-center justify-center gap-2 mt-2"
                >
                  {isLoading ? (
                    <>
                      <svg
                        className="animate-spin w-4 h-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v8H4z"
                        />
                      </svg>
                      Creating your account…
                    </>
                  ) : (
                    <>
                      Create Free Account
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </motion.button>
              </form>

              {/* Sign in link */}
              <p className="text-center text-sm text-white/40 mt-6">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-[#FF0000] hover:text-red-400 font-medium transition-colors"
                >
                  Sign in
                </Link>
              </p>
            </div>

            {/* Trust badges */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap items-center justify-center gap-4 text-white/30 text-xs"
            >
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500/70" /> Free forever
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500/70" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-green-500/70" /> Cancel anytime
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}