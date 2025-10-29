import Link from 'next/link';
import { Search, QrCode, Star, Shield, Users, TrendingUp, Sparkles, Award, CheckCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white overflow-hidden">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-lg border-b border-neutral-200/50 sticky top-0 z-50">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="h-10 w-[3.33rem]" />
              <span className="text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                Frontline Rating System
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-neutral-600 hover:text-neutral-900 font-medium transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-primary shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-10 w-20 h-20 border-4 border-primary-200 rounded-lg rotate-12 opacity-20"></div>
        <div className="absolute bottom-40 left-10 w-16 h-16 border-4 border-purple-200 rounded-full opacity-20"></div>
        <div className="absolute top-1/2 right-1/4 w-24 h-24 border-4 border-pink-200 rotate-45 opacity-20"></div>
        
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center">
            
            
            <h1 className="text-5xl lg:text-7xl font-bold text-neutral-900 mb-6 leading-tight">
              Rate Your Service
              <span className="block bg-gradient-to-r from-primary-600 text-primary-6000 to-primary-600 bg-clip-text text-transparent">
                Experience
              </span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-neutral-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Share your feedback and help us improve our service quality. Your opinion matters and drives positive change.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link
                href="/rate"
                className="btn btn-primary btn-lg flex items-center space-x-2 w-full sm:w-auto shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300"
              >
                <Search className="w-5 h-5" />
                <span>Search Agent</span>
              </Link>
              <Link
                href="/rate/scan"
                className="btn btn-outline btn-lg flex items-center space-x-2 w-full sm:w-auto hover:bg-neutral-50 hover:-translate-y-1 transition-all duration-300"
              >
                <QrCode className="w-5 h-5" />
                <span>Scan QR Code</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-8 mt-16 text-neutral-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium">100% Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-primary-600" />
                <span className="text-sm font-medium">Takes 2 Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-b from-white via-neutral-50 to-white relative">
        {/* Geometric Background */}
        <div className="absolute top-10 left-10 w-32 h-32 border border-neutral-200 rounded-lg rotate-12 opacity-30"></div>
        <div className="absolute bottom-10 right-10 w-40 h-40 border border-neutral-200 rotate-45 opacity-30"></div>
        
        <div className="container-custom relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
                The Difference You Make
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-neutral-900 mb-6">
              Why Your Feedback Matters
            </h2>
            <p className="text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto">
              Your ratings help us maintain high service standards and recognize outstanding performance
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative text-center p-10 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:rotate-6">
                  <Shield className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Quality Assurance
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Help us maintain and improve service quality through your valuable feedback
                </p>
              </div>
            </div>

            <div className="group relative text-center p-10 rounded-2xl bg-white border border-neutral-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:rotate-6">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Recognition
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Outstanding agents are recognized and rewarded based on customer satisfaction
                </p>
              </div>
            </div>

            <div className="group relative text-center p-10 rounded-2xl bg-white border border-neutral-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg shadow-pink-500/30 group-hover:shadow-xl group-hover:shadow-pink-500/40 transition-all duration-300 group-hover:rotate-6">
                  <TrendingUp className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-xl font-bold text-neutral-900 mb-3">
                  Continuous Improvement
                </h3>
                <p className="text-neutral-600 leading-relaxed">
                  Your feedback drives training and development to enhance service delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 lg:py-32 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 border-4 border-white rounded-full"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 border-4 border-white rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 border-4 border-white rounded-lg rotate-12"></div>
        </div>

        <div className="container-custom relative">
          <div className="text-center mb-16">
            <div className="inline-block mb-4">
              <span className="text-primary-100 font-semibold text-sm uppercase tracking-wider">
                Simple Process
              </span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
              How It Works
            </h2>
            <p className="text-lg lg:text-xl text-primary-100 max-w-2xl mx-auto">
              Rating your service experience is quick and easy
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 font-bold text-2xl shadow-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Find Your Agent
                  </h3>
                  <p className="text-primary-100 leading-relaxed text-lg">
                    Search for your agent by name or scan their QR code
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 font-bold text-2xl shadow-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Rate the Service
                  </h3>
                  <p className="text-primary-100 leading-relaxed text-lg">
                    Answer a few questions about your experience on a scale of 1-5
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-6 bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-primary-600 font-bold text-2xl shadow-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-3">
                    Submit Feedback
                  </h3>
                  <p className="text-primary-100 leading-relaxed text-lg">
                    Add optional comments and submit your rating anonymously or with your details
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-16 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative">
          <div className="grid md:grid-cols-3 gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-6">
                <img src="/logo.png" alt="Frontline Rating" className="h-10 w-[3.33rem]" />
                <span className="text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Frontline Rating
                </span>
              </div>
              <p className="text-neutral-400 leading-relaxed">
                Professional rating system for measuring and improving service quality
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Quick Links</h3>
              <ul className="space-y-3 text-neutral-400">
                <li>
                  <Link href="/rate" className="hover:text-primary-400 transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Rate Agent</span>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/login" className="hover:text-primary-400 transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Login</span>
                  </Link>
                </li>
                <li>
                  <Link href="/auth/register" className="hover:text-primary-400 transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Register</span>
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-6">Contact</h3>
              <p className="text-neutral-400 leading-relaxed">
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