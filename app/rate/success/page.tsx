import Link from 'next/link';
import { CheckCircle, Star, Home } from 'lucide-react';

export default function RatingSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="w-10 h-10" />
              <span className="text-xl font-bold text-neutral-900">Frontline Rating System</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Success Message */}
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          <div className="card">
            <div className="card-body text-center py-12">
              <div className="w-20 h-20 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12 text-primary-600" />
              </div>

              <h1 className="text-3xl font-bold text-neutral-900 mb-4">
                Thank You for Your Feedback!
              </h1>

              <p className="text-lg text-neutral-600 mb-8">
                Your rating has been successfully submitted. We appreciate you taking the time to share your experience with us.
              </p>

              <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8 text-left">
                <h4 className="font-semibold text-primary-900 mb-4">What happens next?</h4>
                <ul className="space-y-3 text-primary-800">
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your feedback will be reviewed by our quality team</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>The agent will be notified of your rating</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>If you marked this as a complaint, it will be prioritized for resolution</span>
                  </li>
                  <li className="flex items-start">
                    <span className="mr-2">•</span>
                    <span>Your input helps us improve our service quality</span>
                  </li>
                </ul>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="btn btn-primary flex items-center justify-center">
                  <Home className="w-5 h-5 mr-2" />
                  Back to Home
                </Link>
                <Link href="/rate" className="btn btn-secondary flex items-center justify-center">
                  <Star className="w-5 h-5 mr-2" />
                  Rate Another Agent
                </Link>
              </div>

              <div className="mt-8 pt-8 border-t border-neutral-200">
                <p className="text-sm text-neutral-500">
                  Need to contact us? Visit our support page or speak with any of our agents.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}