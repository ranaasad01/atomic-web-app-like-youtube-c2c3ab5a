"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, AlertCircle, Check } from 'lucide-react';
import { APP_NAME } from "@/lib/data";
import { scaleIn, fadeInUp, staggerContainer } from "@/lib/motion";

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
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  );
}

interface FormState {
  email: string;
  password: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function SignInPage() {
  const [form, setForm] = useState<FormState>({ email: "", password: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  function validate(): FormErrors {
    const errs: FormErrors = {};
    if (!form.email.trim()) {
      errs.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      errs.email = "Please enter a valid email address.";
    }
    if (!form.password) {
      errs.password = "Password is required.";
    } else if (form.password.length < 6) {
      errs.password = "Password must be at least 6 characters.";
    }
    return errs;
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setLoading(true);
    // Simulate async sign-in
    setTimeout(() => {
      setLoading(false);
      // Mock: only accept a demo account
      if (form.email === "demo@streamvibe.com" && form.password === "password123") {
        setSuccess(true);
      } else {
        setErrors({ general: "Invalid email or password. Try demo@streamvibe.com / password123" });
      }
    }, 1400);
  }

  function handleGoogleSignIn() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setErrors({ general: "Google OAuth is not connected in this demo." });
    }, 900);
  }

  return (
    <main className="min-h-screen bg-[#0F0F0F] flex items-center justify-center px-4 py-20">
      {/* Background glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF0000]/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="relative w-full max-w-md"
      >
        {/* Card */}
        <motion.div
          variants={scaleIn}
          className="bg-[#181818] border border-white/8 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
        >
          {/* Top accent bar */}
          <div className="h-1 w-full bg-gradient-to-r from-[#FF0000] via-[#ff4444] to-[#FF0000]/30" />

          <div className="px-8 py-10">
            {/* Logo + heading */}
            <motion.div variants={fadeInUp} className="flex flex-col items-center mb-8">
              <Link href="/" className="flex items-center gap-2.5 mb-6 group">
                <div className="w-10 h-10 bg-[#FF0000] rounded-xl flex items-center justify-center shadow-lg shadow-red-500/40 group-hover:shadow-red-500/60 transition-all">
                  <svg viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
                <span className="text-white font-bold text-2xl tracking-tight">{APP_NAME}</span>
              </Link>
              <h1 className="text-white text-2xl font-bold tracking-tight mb-1">
                Welcome back
              </h1>
              <p className="text-white/40 text-sm text-center">
                Sign in to your account to continue watching
              </p>
            </motion.div>

            {/* Success state */}
            {success ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex flex-col items-center gap-4 py-6"
              >
                <div className="w-16 h-16 rounded-full bg-green-500/15 border border-green-500/30 flex items-center justify-center">
                  <Check className="w-8 h-8 text-green-400" />
                </div>
                <p className="text-white font-semibold text-lg">Signed in successfully!</p>
                <p className="text-white/40 text-sm text-center">
                  Redirecting you to your feed…
                </p>
                <Link
                  href="/"
                  className="mt-2 px-6 py-2.5 bg-[#FF0000] hover:bg-[#cc0000] text-white text-sm font-semibold rounded-full transition-all"
                >
                  Go to Home
                </Link>
              </motion.div>
            ) : (
              <motion.form
                variants={staggerContainer}
                onSubmit={handleSubmit}
                noValidate
                className="space-y-5"
              >
                {/* General error */}
                {errors.general && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-2.5 bg-red-500/10 border border-red-500/25 rounded-xl px-4 py-3"
                  >
                    <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                    <p className="text-red-400 text-sm leading-relaxed">{errors.general}</p>
                  </motion.div>
                )}

                {/* Email field */}
                <motion.div variants={fadeInUp} className="space-y-1.5">
                  <label htmlFor="email" className="block text-white/70 text-sm font-medium">
                    Email address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={`w-full bg-[#272727] border rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all ${
                        errors.email
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1e1e1e]"
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs flex items-center gap-1.5 mt-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.email}
                    </motion.p>
                  )}
                </motion.div>

                {/* Password field */}
                <motion.div variants={fadeInUp} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="block text-white/70 text-sm font-medium">
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
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30 pointer-events-none" />
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      value={form.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className={`w-full bg-[#272727] border rounded-xl pl-10 pr-11 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-all ${
                        errors.password
                          ? "border-red-500/60 focus:border-red-500"
                          : "border-white/10 focus:border-[#FF0000]/60 focus:bg-[#1e1e1e]"
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
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-xs flex items-center gap-1.5 mt-1"
                    >
                      <AlertCircle className="w-3 h-3" />
                      {errors.password}
                    </motion.p>
                  )}
                </motion.div>

                {/* Submit button */}
                <motion.div variants={fadeInUp}>
                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-[#FF0000] hover:bg-[#cc0000] disabled:opacity-60 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-all shadow-lg shadow-red-500/20 hover:shadow-red-500/30 flex items-center justify-center gap-2"
                  >
                    {loading ? (
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
                        Signing in…
                      </>
                    ) : (
                      "Sign In"
                    )}
                  </motion.button>
                </motion.div>

                {/* Divider */}
                <motion.div variants={fadeInUp} className="flex items-center gap-3 my-2">
                  <div className="flex-1 h-px bg-white/10" />
                  <span className="text-white/30 text-xs font-medium uppercase tracking-widest">
                    or
                  </span>
                  <div className="flex-1 h-px bg-white/10" />
                </motion.div>

                {/* Google OAuth button */}
                <motion.div variants={fadeInUp}>
                  <motion.button
                    type="button"
                    onClick={handleGoogleSignIn}
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="w-full bg-[#272727] hover:bg-[#333] disabled:opacity-60 disabled:cursor-not-allowed border border-white/10 hover:border-white/20 text-white font-medium py-3 rounded-xl transition-all flex items-center justify-center gap-3"
                  >
                    <GoogleIcon />
                    Continue with Google
                  </motion.button>
                </motion.div>

                {/* Sign up link */}
                <motion.p
                  variants={fadeInUp}
                  className="text-center text-white/40 text-sm pt-1"
                >
                  Don&apos;t have an account?{" "}
                  <Link
                    href="/signup"
                    className="text-[#FF0000] hover:text-red-400 font-medium transition-colors"
                  >
                    Sign up for free
                  </Link>
                </motion.p>
              </motion.form>
            )}
          </div>
        </motion.div>

        {/* Demo hint */}
        <motion.div
          variants={fadeInUp}
          className="mt-5 text-center"
        >
          <p className="text-white/20 text-xs">
            Demo credentials:{" "}
            <span className="text-white/40 font-mono">demo@streamvibe.com</span>{" "}
            /{" "}
            <span className="text-white/40 font-mono">password123</span>
          </p>
        </motion.div>
      </motion.div>
    </main>
  );
}