'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Star, Mail, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ForgotPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to send reset email');
      }

      setIsSubmitted(true);
      toast.success('Password reset email sent!');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="w-12 h-12" />
              <span className="text-2xl font-bold text-neutral-900">Frontline Rating System</span>
            </Link>
          </div>

          <div className="card">
            <div className="card-body text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-10 h-10 text-green-600" />
              </div>

              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Check Your Email
              </h1>

              <p className="text-neutral-600 mb-6">
                We've sent a password reset link to <strong>{email}</strong>. 
                Please check your inbox and follow the instructions to reset your password.
              </p>

                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6 text-left text-sm text-primary-800">
                <p className="mb-2">Didn't receive the email?</p>
                <ul className="space-y-1 ml-4">
                  <li>• Check your spam or junk folder</li>
                  <li>• Make sure you entered the correct email address</li>
                  <li>• Wait a few minutes and try again</li>
                </ul>
              </div>

              <Link
                href="/auth/login"
                className="btn btn-primary w-full"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <img src="/logo.png" alt="Frontline Rating" className="w-12 h-12" />
            <span className="text-2xl font-bold text-neutral-900">Frontline Rating</span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 mt-4">Forgot Password?</h1>
          <p className="text-neutral-600 mt-2">
            Enter your email and we'll send you a reset link
          </p>
        </div>

        {/* Form */}
        <div className="card">
          <div className="card-body">
            {error && (
              <div className="alert alert-error mb-6 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="label">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input pl-10"
                    placeholder="you@example.com"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
          </div>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-6">
          <Link
            href="/auth/login"
            className="text-sm text-neutral-600 hover:text-neutral-900"
          >
            ← Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}