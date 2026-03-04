'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Building2, Star, ArrowLeft, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  questionText: string;
  order: number;
}

export default function RateCompanyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [responses, setResponses] = useState<{ [key: string]: number }>({});
  
  const [customerInfo, setCustomerInfo] = useState({
    customerName: '',
    customerContact: '',
    policyNumber: '',
    isAnonymous: false,
    feedbackText: '',
  });

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setIsLoading(true);
      // Fetch company rating questions - these are generic questions for the company
      const response = await fetch('/api/questions?type=company');
      if (!response.ok) {
        throw new Error('Failed to fetch questions');
      }
      const data = await response.json();
      setQuestions(data);
      setError('');
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to load questions');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResponseChange = (questionId: string, score: number) => {
    setResponses({
      ...responses,
      [questionId]: score,
    });
  };

  const handleSubmit = async () => {
    if (Object.keys(responses).length !== questions.length) {
      setError('Please answer all questions');
      toast.error('Please answer all questions');
      return;
    }

    if (!customerInfo.customerName.trim() && !customerInfo.isAnonymous) {
      setError('Please enter your name or select anonymous');
      toast.error('Please enter your name or select anonymous');
      return;
    }

    setIsSubmitting(true);
    try {
      const payload = {
        ratingType: 'COMPANY',
        customerName: customerInfo.isAnonymous ? 'Anonymous' : customerInfo.customerName,
        customerContact: customerInfo.customerContact,
        policyNumber: customerInfo.policyNumber,
        isAnonymous: customerInfo.isAnonymous,
        feedbackText: customerInfo.feedbackText,
        responses: questions.map((q) => ({
          questionId: q.id,
          score: responses[q.id],
        })),
      };

      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error('Failed to submit rating');
      }

      toast.success('Thank you for rating Alliance Insurance!');
      // Redirect to success page
      window.location.href = '/rate/success?type=company';
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="text-neutral-600 mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="h-10 w-[3.33rem]" />
              <span className="text-xl font-bold text-neutral-900\">Service Feedback Platform</span>
            </Link>
            <div className="flex items-center space-x-2">
              <Link href="/rate" className="text-neutral-600 hover:text-neutral-900 flex items-center space-x-1">
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-primary-600" />
            </div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">
              Rate Alliance Insurance
            </h1>
            <p className="text-neutral-600">
              Help us improve our services by sharing your feedback
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="mb-8">
            <div className="flex justify-between mb-4">
              <div className={`flex-1 h-2 rounded-full mx-1 ${currentStep === 1 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
              <div className={`flex-1 h-2 rounded-full mx-1 ${currentStep === 2 ? 'bg-primary-600' : currentStep > 2 ? 'bg-primary-600' : 'bg-neutral-200'}`}></div>
            </div>
            <div className="text-sm text-neutral-600 text-center">
              Step {currentStep} of 2
            </div>
          </div>

          {error && (
            <div className="alert alert-error mb-6 flex items-start space-x-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}

          {/* Step 1: Customer Information */}
          {currentStep === 1 && (
            <div className="card">
              <div className="card-body space-y-6">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Your Information</h2>
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="customerName" className="label">
                        Full Name *
                      </label>
                      <input
                        id="customerName"
                        type="text"
                        value={customerInfo.customerName}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, customerName: e.target.value })}
                        className="input"
                        placeholder="Your name"
                        disabled={customerInfo.isAnonymous}
                      />
                    </div>

                    <div>
                      <label htmlFor="customerContact" className="label">
                        Contact Number *
                      </label>
                      <input
                        id="customerContact"
                        type="tel"
                        value={customerInfo.customerContact}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, customerContact: e.target.value })}
                        className="input"
                        placeholder="+266 5000 0000"
                      />
                    </div>

                    <div>
                      <label htmlFor="policyNumber" className="label">
                        Policy Number (Optional)
                      </label>
                      <input
                        id="policyNumber"
                        type="text"
                        value={customerInfo.policyNumber}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, policyNumber: e.target.value })}
                        className="input"
                        placeholder="Your policy number"
                      />
                    </div>

                    {/* <div className="flex items-center space-x-2">
                      <input
                        id="isAnonymous"
                        type="checkbox"
                        checked={customerInfo.isAnonymous}
                        onChange={(e) => setCustomerInfo({ ...customerInfo, isAnonymous: e.target.checked, customerName: '' })}
                        className="h-4 w-4 text-primary-600"
                      />
                      <label htmlFor="isAnonymous" className="text-sm text-neutral-700">
                        Submit this rating anonymously
                      </label>
                    </div> */}
                  </div>
                </div>

                <button
                  onClick={() => setCurrentStep(2)}
                  className="btn btn-primary w-full"
                >
                  Continue to Questions
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Rating Questions */}
          {currentStep === 2 && (
            <div className="card">
              <div className="card-body space-y-8">
                <div>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">Rate Your Experience</h2>

                  {questions.length > 0 ? (
                    <div className="space-y-8">
                      {questions.map((question, index) => (
                        <div key={question.id} className="border-b border-neutral-200 pb-8 last:border-b-0 last:pb-0">
                          <p className="font-medium text-neutral-900 mb-4">
                            {index + 1}. {question.questionText}
                          </p>
                          <div className="flex justify-between items-center">
                            {[1, 2, 3, 4, 5].map((score) => (
                              <button
                                key={score}
                                onClick={() => handleResponseChange(question.id, score)}
                                className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                                  responses[question.id] === score
                                    ? 'bg-primary-100 text-primary-600'
                                    : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                                }`}
                              >
                                <Star
                                  className="w-6 h-6"
                                  fill={responses[question.id] === score ? 'currentColor' : 'none'}
                                />
                                <span className="text-xs font-medium">{score}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-neutral-600">No questions available</p>
                  )}

                  {/* Optional Feedback */}
                  <div className="mt-8">
                    <label htmlFor="feedback" className="label">
                      Additional Comments (Optional)
                    </label>
                    <textarea
                      id="feedback"
                      value={customerInfo.feedbackText}
                      onChange={(e) => setCustomerInfo({ ...customerInfo, feedbackText: e.target.value })}
                      className="input"
                      placeholder="Share any additional feedback..."
                      rows={4}
                    />
                  </div>
                </div>

                <div className="flex space-x-4">
                  <button
                    onClick={() => setCurrentStep(1)}
                    className="btn btn-secondary flex-1"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                    className="btn btn-primary flex-1"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
