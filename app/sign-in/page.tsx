"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Code2 as Github, Chrome } from 'lucide-react';
import { fadeInUp, fadeIn, staggerContainer, scaleIn } from "@/lib/motion";
import { APP_NAME } from "@/lib/data";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }
    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      if (email === "wrong@example.com") {
        setError("Invalid email or password. Please try again.");
      } else {
        setSuccess(true);
      }
    }, 1400);
  };

  return (
    <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-20">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#FF0000]/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-purple-900/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Logo */}
        <motion.div variants={fadeInUp} className="flex justify-center mb-8">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/40 group-hover:shadow-red-500/60 transition-all">
              <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
            <span className="text-white font-bold text-2xl tracking-tight">{APP_NAME}</span>
          </Link>
        </motion.div>

        {/* Card */}
        <motion.div
          variants={scaleIn}
          className="bg-[#181818] border border-white/8 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Card header */}
          <div className="px-8 pt-8 pb-6 border-b border-white/6">
            <motion.h1
              variants={fadeInUp}
              className="text-2xl font-bold text-white mb-1"
            >
              Welcome back
            </motion.h1>
            <motion.p variants={fadeInUp} className="text-white/50 text-sm">
              Sign in to your {APP_NAME} account to continue watching.
            </motion.p>
          </div>

          <div className="px-8 py-7">
            {/* Success state */}
            {success ? (
              <motion.div
                variants={fadeIn}
                initial="hidden"
                animate="visible"
                className="text-center py-6"
              >
                <div className="w-16 h-16 bg-green-500/15 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h2 className="text-white font-semibold text-lg mb-2">Signed in successfully!</h2>
                <p className="text-white/50 text-sm mb-6">Redirecting you to your feed…</p>
                <Link
                  href="/"
                  className="inline-flex items-center gap-2 bg-[#FF0000] hover:bg-[#cc0000] text-white font-semibold px-6 py-2.5 rounded-full transition-all text-sm"
                >
                  Go to Home <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ) : (
              <>
                {/* Social sign-in */}
                <motion.div variants={staggerContainer} className="flex flex-col gap-3 mb-6">
                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="flex items-center justify-center gap-3 w-full bg-[#272727] hover:bg-[#333] border border-white/10 hover:border-white/20 text-white text-sm font-medium py-3 rounded-xl transition-all"
                  >
                    <Chrome className="w-4 h-4 text-blue-400" />
                    Continue with Google
                  </motion.button>
                  <motion.button
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -1 }}
                    whileTap={{ scale: 0.98 }}
                    type="button"
                    className="flex items-center justify-center gap-3 w-full bg-[#272727] hover:bg-[#333] border border-white/10 hover:border-white/20 text-white text-sm font-medium py-3 rounded-xl transition-all"
                  >
                    <Github className="w-4 h-4" />
                    Continue with GitHub
                  </motion.button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={fadeIn} className="flex items-center gap-3 mb-6">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-white/30 text-xs uppercase tracking-widest">or</span>
                  <div className="flex-1 h-px bg-white/8" />
                </motion.div>

                {/* Form */}
                <motion.form
                  variants={staggerContainer}
                  onSubmit={handleSubmit}
                  className="space-y-4"
                >
                  {/* Email */}
                  <motion.div variants={fadeInUp}>
                    <label className="block text-white/70 text-xs font-medium mb-1.5 uppercase tracking-wide">
                      Email address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        autoComplete="email"
                        className="w-full bg-[#272727] border border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1e1e1e] rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
                      />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div variants={fadeInUp}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="text-white/70 text-xs font-medium uppercase tracking-wide">
                        Password
                      </label>
                      <Link
                        href="/forgot-password"
                        className="text-xs text-[#FF0000] hover:text-red-400 transition-colors"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        className="w-full bg-[#272727] border border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1e1e1e] rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-white/30 outline-none transition-all"
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
                  </motion.div>

                  {/* Remember me */}
                  <motion.div variants={fadeInUp} className="flex items-center gap-2.5">
                    <button
                      type="button"
                      onClick={() => setRememberMe((v) => !v)}
                      className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all flex-shrink-0 ${
                        rememberMe
                          ? "bg-[#FF0000] border-[#FF0000]"
                          : "bg-[#272727] border-white/20 hover:border-white/40"
                      }`}
                      aria-pressed={rememberMe}
                    >
                      {rememberMe && (
                        <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                    </button>
                    <span className="text-white/50 text-sm select-none">Remember me for 30 days</span>
                  </motion.div>

                  {/* Error */}
                  {error && (
                    <motion.div
                      variants={fadeIn}
                      initial="hidden"
                      animate="visible"
                      className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"
                    >
                      <svg className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
                      </svg>
                      <p className="text-red-400 text-sm">{error}</p>
                    </motion.div>
                  )}

                  {/* Submit */}
                  <motion.div variants={fadeInUp}>
                    <motion.button
                      whileHover={{ scale: 1.02, y: -1 }}
                      whileTap={{ scale: 0.98 }}
                      type="submit"
                      disabled={isLoading}
                      className="w-full bg-[#FF0000] hover:bg-[#cc0000] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-red-500/20 hover:shadow-red-500/40"
                    >
                      {isLoading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                          </svg>
                          Signing in…
                        </>
                      ) : (
                        <>
                          Sign In <ArrowRight className="w-4 h-4" />
                        </>
                      )}
                    </motion.button>
                  </motion.div>
                </motion.form>
              </>
            )}
          </div>

          {/* Card footer */}
          {!success && (
            <div className="px-8 py-5 bg-[#141414] border-t border-white/6 text-center">
              <p className="text-white/40 text-sm">
                Don&apos;t have an account?{" "}
                <Link
                  href="/signup"
                  className="text-[#FF0000] hover:text-red-400 font-medium transition-colors"
                >
                  Create one free
                </Link>
              </p>
            </div>
          )}
        </motion.div>

        {/* Trust badges */}
        {!success && (
          <motion.div
            variants={fadeInUp}
            className="mt-6 flex items-center justify-center gap-6 text-white/25 text-xs"
          >
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              Secure & encrypted
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              Privacy protected
            </span>
            <span className="w-px h-3 bg-white/10" />
            <span className="flex items-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              Instant access
            </span>
          </motion.div>
        )}
      </motion.div>
    </main>
  );
}