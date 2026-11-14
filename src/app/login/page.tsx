'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/context/AuthContext';
import { Lock, Mail, ArrowRight, CheckCircle2, HelpCircle } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [forgotSent, setForgotSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.error || 'Invalid email or password.');
    }
  };

  const handleForgotSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (forgotEmail.trim()) {
      setForgotSent(true);
      setTimeout(() => {
        setForgotSent(false);
        setForgotModalOpen(false);
        setForgotEmail('');
      }, 3000);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-ivory-100">
      <Header />

      <main className="flex-1 flex items-center justify-center p-4 sm:p-8">
        <div className="w-full max-w-md bg-white rounded-3xl p-8 sm:p-10 border border-taupe-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.04)] space-y-6">
          <div className="text-center space-y-2">
            <div className="relative w-40 h-12 mx-auto mb-2">
              <Image
                src="/images/Logo-01.png"
                alt="SHOKHORA"
                fill
                priority
                className="object-contain"
              />
            </div>
            <h1 className="text-2xl font-serif font-bold text-charcoal-950">Customer Sign In</h1>
            <p className="text-xs text-charcoal-500 max-w-xs mx-auto">
              Sign in to view your past orders, delivery tracking, and saved addresses.
            </p>
          </div>

          {error && (
            <div className="p-3.5 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-medium">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-charcoal-700 uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm focus:ring-2 focus:ring-charcoal-900 focus:outline-none transition-all"
                />
                <Mail className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-semibold text-charcoal-700 uppercase tracking-wider">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setForgotModalOpen(true)}
                  className="text-[11px] text-terracotta-600 hover:text-terracotta-700 hover:underline font-medium"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-3.5 py-2.5 rounded-xl border border-taupe-300 text-xs sm:text-sm focus:ring-2 focus:ring-charcoal-900 focus:outline-none transition-all"
                />
                <Lock className="w-4 h-4 text-charcoal-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 px-4 rounded-xl bg-charcoal-950 hover:bg-charcoal-900 text-white text-xs sm:text-sm font-semibold transition-all shadow-sm flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? 'Verifying...' : 'Sign In to My Account'}{' '}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Registration Link for Customers */}
          <div className="pt-4 border-t border-taupe-200 text-center">
            <p className="text-xs text-charcoal-600">
              Don&apos;t have a customer account?{' '}
              <Link
                href="/register"
                className="font-bold text-charcoal-900 hover:text-terracotta-600 underline transition-colors"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </main>

      {/* Forgot Password Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-charcoal-950/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 space-y-4 shadow-2xl border border-taupe-200 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-serif font-bold text-charcoal-950">Reset Password</h3>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-charcoal-400 hover:text-charcoal-700 text-sm font-semibold"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-charcoal-500 leading-relaxed">
              Enter the email address registered with your SHOKHORA customer account. We will send you instructions to reset your password.
            </p>

            {forgotSent ? (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-800 text-xs">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Password reset link has been dispatched to {forgotEmail}. Please check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleForgotSubmit} className="space-y-4">
                <input
                  type="email"
                  required
                  placeholder="Enter your customer email"
                  value={forgotEmail}
                  onChange={(e) => setForgotEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border border-taupe-300 text-xs focus:ring-2 focus:ring-charcoal-900 focus:outline-none"
                />
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(false)}
                    className="flex-1 py-2.5 rounded-xl border border-taupe-300 text-xs font-semibold text-charcoal-700 hover:bg-taupe-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-2.5 rounded-xl bg-charcoal-950 text-white text-xs font-semibold hover:bg-charcoal-900"
                  >
                    Send Reset Link
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
