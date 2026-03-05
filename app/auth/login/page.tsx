'use client';

import { useState, useRef, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import HCaptcha from '@hcaptcha/react-hcaptcha';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const validateForm = (): string | null => {
    if (!formData.email.trim()) {
      return 'Email address is required';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      return 'Please enter a valid email address';
    }
    if (!formData.password) {
      return 'Password is required';
    }
    if (formData.password.length < 1) {
      return 'Password is required';
    }
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    // Validate form
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      toast.error(validationError);
      return;
    }
    
    if (!hcaptchaToken) {
      setError('Please complete the captcha verification');
      toast.error('Please complete the captcha verification');
      return;
    }
    
    setIsLoading(true);

    try {
      // Let NextAuth handle authentication
      const callbackUrl = searchParams.get('callbackUrl') || '/dashboard';
      
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        hcaptchaToken,
        redirect: false, // Don't redirect automatically - we'll handle it
      });

      // Check for errors
      if (result?.error) {
        console.error('❌ Login error:', result.error);
        // Map NextAuth errors to user-friendly messages
        let friendlyError = result.error;
        
        if (result.error.includes('Invalid email or password')) {
          friendlyError = 'Incorrect email or password. Please try again.';
        } else if (result.error.includes('pending approval')) {
          friendlyError = 'Your account is pending admin approval. Please check back later.';
        } else if (result.error.includes('rejected')) {
          friendlyError = 'Your account has been rejected. Please contact support.';
        } else if (result.error.includes('Captcha')) {
          friendlyError = 'Captcha verification failed. Please try again.';
        }
        
        // Show error but don't navigate
        setError(friendlyError);
        toast.error(friendlyError);
        hcaptchaRef.current?.resetCaptcha();
        setHcaptchaToken(null);
        setIsLoading(false);
      } else if (result?.ok) {
        // Login successful - now navigate
        toast.success('Login successful! Redirecting...');
        router.push(callbackUrl);
      }
    } catch (error: any) {
      console.error('❌ Login exception:', error);
      setIsLoading(false);
      const errorMsg = error?.message || 'Login failed. Please try again.';
      setError(errorMsg);
      toast.error(errorMsg);
      hcaptchaRef.current?.resetCaptcha();
      setHcaptchaToken(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <div className="flex justify-center mb-4">
            <img src="/logo.png" alt="Frontline Rating" className="h-16 w-12" />
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-neutral-900 mb-2">
            Welcome Back
          </h1>
          <p className="text-neutral-600">Sign in to access your dashboard</p>
        </div>

        {/* Login Card */}
        <div className="glass p-6 sm:p-8 rounded-2xl shadow-lg animate-slide-up">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3 animate-shake">
              <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-800">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full pl-11 pr-4 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="you@example.com"
                  required
                  disabled={isLoading}
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400 w-5 h-5" />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pl-11 pr-12 py-3 border border-neutral-300 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* hCaptcha */}
            <div className="flex justify-center">
              <HCaptcha
                ref={hcaptchaRef}
                sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                onVerify={setHcaptchaToken}
                onExpire={() => setHcaptchaToken(null)}
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading || !hcaptchaToken}
              className="w-full btn btn-primary py-3 text-base font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 space-y-3 text-center text-sm">
            <Link
              href="/auth/forgot-password"
              className="text-primary-600 hover:text-primary-700 font-medium block"
            >
              Forgot your password?
            </Link>
            <div className="text-neutral-600">
              Don&apos;t have an account?{' '}
              <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium">
                Register here
              </Link>
            </div>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-sm text-neutral-500 mt-6">
          Secure service feedback platform
        </p>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <LoginForm />
    </Suspense>
  );
}
