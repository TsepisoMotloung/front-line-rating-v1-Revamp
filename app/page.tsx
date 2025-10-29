import Link from 'next/link';
import { Search, QrCode, Star, Shield, Users, TrendingUp } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="w-10 h-10" />
              <span className="text-xl font-bold text-neutral-900">Frontline Rating System</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-neutral-600 hover:text-neutral-900 font-medium"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-primary"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-neutral-900 mb-6">
              Rate Your Service Experience
            </h1>
            <p className="text-xl text-neutral-600 mb-12">
              Share your feedback and help us improve our service quality. Your opinion matters.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/rate"
                className="btn btn-primary btn-lg flex items-center space-x-2 w-full sm:w-auto"
              >
                <Search className="w-5 h-5" />
                <span>Search Agent</span>
              </Link>
              <Link
                href="/rate/scan"
                className="btn btn-outline btn-lg flex items-center space-x-2 w-full sm:w-auto"
              >
                <QrCode className="w-5 h-5" />
                <span>Scan QR Code</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              Why Your Feedback Matters
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Your ratings help us maintain high service standards and recognize outstanding performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 rounded-lg border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Quality Assurance
              </h3>
              <p className="text-neutral-600">
                Help us maintain and improve service quality through your valuable feedback
              </p>
            </div>

            <div className="text-center p-8 rounded-lg border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Recognition
              </h3>
              <p className="text-neutral-600">
                Outstanding agents are recognized and rewarded based on customer satisfaction
              </p>
            </div>

            <div className="text-center p-8 rounded-lg border border-neutral-200 hover:border-primary-200 hover:shadow-lg transition-all">
              <div className="w-16 h-16 bg-primary-50 rounded-full flex items-center justify-center mx-auto mb-6">
                <TrendingUp className="w-8 h-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Continuous Improvement
              </h3>
              <p className="text-neutral-600">
                Your feedback drives training and development to enhance service delivery
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-neutral-900 mb-4">
              How It Works
            </h2>
            <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
              Rating your service experience is quick and easy
            </p>
          </div>

          <div className="max-w-3xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  1
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Find Your Agent
                  </h3>
                  <p className="text-neutral-600">
                    Search for your agent by name or scan their QR code
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  2
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Rate the Service
                  </h3>
                  <p className="text-neutral-600">
                    Answer a few questions about your experience on a scale of 1-5
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  3
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                    Submit Feedback
                  </h3>
                  <p className="text-neutral-600">
                    Add optional comments and submit your rating anonymously or with your details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-12">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="/logo.png" alt="Frontline Rating" className="w-8 h-8" />
                <span className="text-lg font-bold">Frontline Rating</span>
              </div>
              <p className="text-neutral-400">
                Professional rating system for measuring and improving service quality
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-neutral-400">
                <li>
                  <Link href="/rate" className="hover:text-white transition-colors">
                    Rate Agent
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-white transition-colors">
                    Login
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-white transition-colors">
                    Register
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <p className="text-neutral-400">
                For support or inquiries, please contact your system administrator
              </p>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-12 pt-8 text-center text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}