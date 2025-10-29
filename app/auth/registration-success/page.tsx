import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function RegistrationSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2">
            <img src="/logo.png" alt="Frontline Rating" className="h-12 w-16" />
            <span className="text-2xl font-bold text-neutral-900">Frontline Rating System</span>
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>

            <h1 className="text-2xl font-bold text-neutral-900 mb-4">
              Registration Successful!
            </h1>

            <p className="text-neutral-600 mb-6">
              Thank you for registering. Your account has been created and is pending approval from an administrator.
            </p>

            {/* What's Next Section */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-primary-900 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-primary-800">
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>An administrator will review your registration</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>You'll receive an email notification once your account is approved</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">•</span>
                  <span>After approval, you can log in using your credentials</span>
                </li>
              </ul>
            </div>

            <div className="space-y-3">
              <Link
                href="/"
                className="btn btn-primary w-full"
              >
                Back to Home
              </Link>
              <Link
                href="/auth/login"
                className="btn btn-secondary w-full"
              >
                Go to Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}