'use client';

import { useState, useRef, Suspense } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Mail, Lock, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import HCaptcha from '@hcaptcha/react-hcaptcha';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<any>(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleHcaptchaVerify = (token: string) => {
    setHcaptchaToken(token);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!hcaptchaToken) {
      setError('Please complete the hCaptcha verification');
      toast.error('Please complete the hCaptcha verification');
      return;
    }
    
    setIsLoading(true);

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        hcaptchaToken,
        redirect: false, // Handle redirect manually
      });

      if (result?.error) {
        setError(result.error);
        toast.error(result.error);
        hcaptchaRef.current?.resetCaptcha();
        setHcaptchaToken(null);
        setIsLoading(false);
      } else if (result?.ok) {
        toast.success('Login successful!');
        // Force a full page reload to /dashboard - this ensures session is properly loaded
        window.location.replace('/dashboard');
      }
    } catch (error: any) {
      setIsLoading(false);
      const errorMessage = error?.message || 'Login failed. Please try again.';
      setError(errorMessage);
      toast.error(errorMessage);
      hcaptchaRef.current?.resetCaptcha();
      setHcaptchaToken(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <Link href="/" className="inline-flex items-center justify-center space-x-2 mb-3 sm:mb-4 hover:opacity-80 transition-opacity">
            <img src="/logo.png" alt="Frontline Rating" className="h-10 w-[3.33rem] sm:h-12 sm:w-16" />
            <span className="text-xl sm:text-2xl font-bold text-neutral-900 hidden sm:inline">Service Feedback Platform</span>
          </Link>
          <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mt-3 sm:mt-4">Welcome Back</h1>
          <p className="text-sm sm:text-base text-neutral-600 mt-2">Sign in to your account to continue</p>
        </div>

        {/* Login Form */}
        <div className="card shadow-xl hover:shadow-2xl transition-shadow duration-300">
          <div className="card-body p-6 sm:p-8">
            {error && (
              <div className="alert alert-error mb-6 flex items-start space-x-2 animate-shake">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm sm:text-base">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              <div>
                <label htmlFor="email" className="label text-sm sm:text-base">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="input pl-9 sm:pl-10 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="user@example.com"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="label text-sm sm:text-base">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                  </div>
                  <input
                    id="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className="input pl-9 sm:pl-10 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs sm:text-sm">
                <div className="flex items-center">
                  <input
                    id="remember"
                    type="checkbox"
                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember" className="ml-2 block text-neutral-700 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
                <Link
                  href="/auth/forgot-password"
                  className="text-primary-600 hover:text-primary-700 font-medium transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="my-5 sm:my-6 flex justify-center">
                <HCaptcha
                  ref={hcaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                  onVerify={handleHcaptchaVerify}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !hcaptchaToken}
                className="btn btn-primary w-full shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-0.5 disabled:transform-none text-sm sm:text-base"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center space-x-2">
                    <span className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></span>
                    <span>Signing in...</span>
                  </span>
                ) : (
                  'Sign In'
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Register Link */}
        <p className="text-center mt-5 sm:mt-6 text-sm sm:text-base text-neutral-600">
          Don&apos;t have an account?{' '}
          <Link href="/auth/register" className="text-primary-600 hover:text-primary-700 font-medium transition-colors">
            Register here
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-3 sm:mt-4">
          <Link href="/" className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center space-x-1 group">
            <span className="group-hover:-translate-x-1 transition-transform">←</span>
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  );
}