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
              <img src="/logo.png" alt="Alliance Insurance" className="h-8 w-[2.67rem] sm:h-10 sm:w-[3.33rem]" />
              <span className="text-base sm:text-xl font-bold bg-gradient-to-r from-primary-600 to-primary-800 bg-clip-text text-transparent">
                <span className="hidden sm:inline">Service Feedback Platform</span>
                <span className="sm:hidden">Feedback Platform</span>
              </span>
            </div>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Link
                href="/auth/login"
                className="text-sm sm:text-base text-neutral-600 hover:text-neutral-900 font-medium transition-colors px-2 sm:px-0"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="btn btn-primary text-sm sm:text-base px-3 py-1.5 sm:px-4 sm:py-2 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 transition-all"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-12 sm:py-20 lg:py-32 overflow-hidden">
        {/* Geometric Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 left-0 w-48 sm:w-96 h-48 sm:h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
          <div className="absolute top-0 right-0 w-48 sm:w-96 h-48 sm:h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-48 sm:w-96 h-48 sm:h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
        </div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-10 w-12 sm:w-20 h-12 sm:h-20 border-2 sm:border-4 border-primary-200 rounded-lg rotate-12 opacity-20 hidden sm:block"></div>
        <div className="absolute bottom-40 left-10 w-10 sm:w-16 h-10 sm:h-16 border-2 sm:border-4 border-purple-200 rounded-full opacity-20 hidden sm:block"></div>
        <div className="absolute top-1/2 right-1/4 w-16 sm:w-24 h-16 sm:h-24 border-2 sm:border-4 border-pink-200 rotate-45 opacity-20 hidden sm:block"></div>
        
        <div className="container-custom relative">
          <div className="max-w-4xl mx-auto text-center px-4">
            
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold text-neutral-900 mb-4 sm:mb-6 leading-tight">
              
              <span className="block bg-gradient-to-r from-primary-600 text-primary-6000 to-primary-600 bg-clip-text text-transparent">
                Share Your Service Experience
              </span>
            </h1>
            
            <p className="text-base sm:text-xl lg:text-2xl text-neutral-600 mb-8 sm:mb-12 max-w-3xl mx-auto leading-relaxed">
              Rate our agents, employees, or alliance insurance service. Your valuable feedback helps us deliver excellence and recognize outstanding performance.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
              <Link
                href="/rate"
                className="btn btn-primary btn-lg flex items-center justify-center space-x-2 w-full sm:w-auto shadow-xl shadow-primary-500/30 hover:shadow-2xl hover:shadow-primary-500/40 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <Search className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-sm sm:text-base">Rate an Agent or Employee</span>
              </Link>
              <Link
                href="/rate/alliance"
                className="btn btn-outline btn-lg flex items-center justify-center space-x-2 w-full sm:w-auto hover:bg-neutral-50 hover:-translate-y-1 transition-all duration-300 text-center"
              >
                <Star className="w-4 sm:w-5 h-4 sm:h-5" />
                <span className="text-sm sm:text-base">Rate Alliance Insurance</span>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-10 sm:mt-16 text-neutral-600">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium">100% Anonymous</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium">Secure & Private</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 sm:w-5 h-4 sm:h-5 text-primary-600" />
                <span className="text-xs sm:text-sm font-medium">Takes 2 Minutes</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-b from-white via-neutral-50 to-white relative">
        {/* Geometric Background */}
        <div className="absolute top-10 left-10 w-20 sm:w-32 h-20 sm:h-32 border border-neutral-200 rounded-lg rotate-12 opacity-30 hidden sm:block"></div>
        <div className="absolute bottom-10 right-10 w-24 sm:w-40 h-24 sm:h-40 border border-neutral-200 rotate-45 opacity-30 hidden sm:block"></div>
        
        <div className="container-custom relative px-4">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-primary-600 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                The Difference You Make
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Your Feedback Powers Excellence
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-neutral-600 max-w-2xl mx-auto">
              Rate our team members and alliance insurance service to help us maintain the highest standards and recognize excellence
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
            <div className="group relative text-center p-6 sm:p-10 rounded-2xl bg-white border border-neutral-200 hover:border-primary-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-primary-500 to-primary-700 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-primary-500/30 group-hover:shadow-xl group-hover:shadow-primary-500/40 transition-all duration-300 group-hover:rotate-6">
                  <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3">
                  Quality Assurance
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  Rate agents, employees, and alliance insurance service to help us maintain the highest standards and improve continuously
                </p>
              </div>
            </div>

            <div className="group relative text-center p-6 sm:p-10 rounded-2xl bg-white border border-neutral-200 hover:border-purple-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-purple-700 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-purple-500/30 group-hover:shadow-xl group-hover:shadow-purple-500/40 transition-all duration-300 group-hover:rotate-6">
                  <Award className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3">
                  Team Recognition
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  Exceptional agents and employees are recognized and rewarded based on your ratings and feedback
                </p>
              </div>
            </div>

            <div className="group relative text-center p-6 sm:p-10 rounded-2xl bg-white border border-neutral-200 hover:border-pink-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 sm:col-span-2 md:col-span-1">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-50 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-pink-500 to-pink-700 rounded-2xl flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-lg shadow-pink-500/30 group-hover:shadow-xl group-hover:shadow-pink-500/40 transition-all duration-300 group-hover:rotate-6">
                  <TrendingUp className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-neutral-900 mb-2 sm:mb-3">
                  Continuous Improvement
                </h3>
                <p className="text-sm sm:text-base text-neutral-600 leading-relaxed">
                  Your feedback drives training and development to enhance service delivery
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 sm:py-20 lg:py-32 bg-gradient-to-br from-primary-600 to-primary-800 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-10 sm:top-20 left-10 sm:left-20 w-32 sm:w-64 h-32 sm:h-64 border-2 sm:border-4 border-white rounded-full"></div>
          <div className="absolute bottom-10 sm:bottom-20 right-10 sm:right-20 w-40 sm:w-80 h-40 sm:h-80 border-2 sm:border-4 border-white rotate-45"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 sm:w-96 h-48 sm:h-96 border-2 sm:border-4 border-white rounded-lg rotate-12 hidden sm:block"></div>
        </div>

        <div className="container-custom relative px-4">
          <div className="text-center mb-10 sm:mb-16">
            <div className="inline-block mb-3 sm:mb-4">
              <span className="text-primary-100 font-semibold text-xs sm:text-sm uppercase tracking-wider">
                Simple Process
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6">
              Simple and Quick
            </h2>
            <p className="text-base sm:text-lg lg:text-xl text-primary-100 max-w-2xl mx-auto">
              Share your feedback in just a few minutes
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="space-y-4 sm:space-y-8">
              <div className="flex items-start space-x-4 sm:space-x-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-600 font-bold text-xl sm:text-2xl shadow-xl">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    Choose What to Rate
                  </h3>
                  <p className="text-sm sm:text-lg text-primary-100 leading-relaxed">
                    Select to rate an Agent, Employee, or Alliance Insurance
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 sm:space-x-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-600 font-bold text-xl sm:text-2xl shadow-xl">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    Provide Your Feedback
                  </h3>
                  <p className="text-sm sm:text-lg text-primary-100 leading-relaxed">
                    Answer a few questions about your experience on a scale of 1-5 stars
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 sm:space-x-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-600 font-bold text-xl sm:text-2xl shadow-xl">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    Share Comments & Submit
                  </h3>
                  <p className="text-sm sm:text-lg text-primary-100 leading-relaxed">
                    Add detailed comments and submit your rating anonymously
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4 sm:space-x-6 bg-white/10 backdrop-blur-sm rounded-xl sm:rounded-2xl p-4 sm:p-8 border border-white/20 hover:bg-white/15 transition-all duration-300">
                <div className="flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 bg-white rounded-xl sm:rounded-2xl flex items-center justify-center text-primary-600 font-bold text-xl sm:text-2xl shadow-xl">
                  4
                </div>
                <div className="flex-1">
                  <h3 className="text-lg sm:text-xl font-bold text-white mb-2 sm:mb-3">
                    We Take Action
                  </h3>
                  <p className="text-sm sm:text-lg text-primary-100 leading-relaxed">
                    Your feedback helps recognize top performers and drive service improvements
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-neutral-900 text-white py-10 sm:py-16 relative overflow-hidden">
        {/* Geometric Background */}
        <div className="absolute bottom-0 left-0 w-48 sm:w-64 h-48 sm:h-64 bg-primary-600/10 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-48 sm:w-64 h-48 sm:h-64 bg-purple-600/10 rounded-full blur-3xl"></div>
        
        <div className="container-custom relative px-4">
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <img src="/logo.png" alt="Alliance Insurance" className="h-8 w-[2.67rem] sm:h-10 sm:w-[3.33rem]" />
                <span className="text-lg sm:text-xl font-bold bg-gradient-to-r from-primary-400 to-primary-600 bg-clip-text text-transparent">
                  Alliance Insurance
                </span>
              </div>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed">
                Comprehensive service feedback platform for measuring and improving insurance service excellence
              </p>
            </div>

            <div>
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3 text-sm sm:text-base text-neutral-400">
                <li>
                  <Link href="/rate" className="hover:text-primary-400 transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Rate an Agent or Employee</span>
                  </Link>
                </li>
                <li>
                  <Link href="/rate/alliance" className="hover:text-primary-400 transition-colors inline-flex items-center group">
                    <span className="group-hover:translate-x-1 transition-transform">Rate Alliance Insurance</span>
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

            <div className="sm:col-span-2 md:col-span-1">
              <h3 className="font-bold text-base sm:text-lg mb-4 sm:mb-6">Contact</h3>
              <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-4">
                Need help or want to reach Alliance Insurance directly? Use one of the options below.
              </p>
              <div className="flex flex-col gap-3">
                <a
                  href="https://wa.me/26662005600"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-sm font-medium text-emerald-300 hover:bg-emerald-500/20 transition-colors"
                >
                  WhatsApp us
                </a>
                <a
                  href="https://www.facebook.com/AllianceInsuranceLS"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center rounded-lg border border-primary-500/30 bg-primary-500/10 px-4 py-2 text-sm font-medium text-primary-300 hover:bg-primary-500/20 transition-colors"
                >
                  Visit our Facebook page
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-neutral-800 mt-8 sm:mt-12 pt-6 sm:pt-8 text-center text-xs sm:text-base text-neutral-400">
            <p>&copy; {new Date().getFullYear()} Service Feedback Platform - Alliance Insurance. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}