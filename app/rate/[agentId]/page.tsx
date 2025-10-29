'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, User, Mail, Phone, FileText, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Question {
  id: string;
  questionText: string;
  order: number;
}

interface Agent {
  id: string;
  name: string;
  employeeId: string;
  department: {
    id: string;
    name: string;
  };
}

export default function RatingFormPage({ params }: { params: { agentId: string } }) {
  const router = useRouter();
  const [agent, setAgent] = useState<Agent | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    customerName: '',
    customerContact: '',
    policyNumber: '',
    isAnonymous: false,
    isComplaint: false,
    feedbackText: '',
  });

  const [responses, setResponses] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetchAgentAndQuestions();
  }, [params.agentId]);

  const fetchAgentAndQuestions = async () => {
    try {
      const [agentRes, questionsRes] = await Promise.all([
        fetch(`/api/agents/${params.agentId}`),
        fetch(`/api/agents/${params.agentId}/questions`),
      ]);

      if (agentRes.ok && questionsRes.ok) {
        const agentData = await agentRes.json();
        const questionsData = await questionsRes.json();
        setAgent(agentData);
        setQuestions(questionsData);
      } else {
        toast.error('Agent not found');
        router.push('/rate');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load rating form');
    } finally {
      setIsLoading(false);
    }
  };

  const handleRatingChange = (questionId: string, score: number) => {
    setResponses({ ...responses, [questionId]: score });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate responses
    if (questions.length > 0 && Object.keys(responses).length !== questions.length) {
      toast.error('Please answer all questions');
      return;
    }

    if (!formData.isAnonymous && !formData.customerName) {
      toast.error('Please provide your name or select anonymous');
      return;
    }

    setIsSubmitting(true);

    try {
      const payload = {
        agentId: params.agentId,
        customerName: formData.isAnonymous ? 'Anonymous' : formData.customerName,
        customerContact: formData.isAnonymous ? null : formData.customerContact,
        policyNumber: formData.policyNumber || null,
        isAnonymous: formData.isAnonymous,
        isComplaint: formData.isComplaint,
        feedbackText: formData.feedbackText || null,
        responses: Object.entries(responses).map(([questionId, score]) => ({
          questionId,
          score,
        })),
      };

      const response = await fetch('/api/ratings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit rating');
      }

      toast.success('Rating submitted successfully!');
      router.push('/rate/success');
    } catch (error: any) {
      console.error('Error submitting rating:', error);
      toast.error(error.message || 'Failed to submit rating');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
          <p className="text-neutral-600">Loading rating form...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return null;
  }

  const RatingStars = ({ questionId, currentRating }: { questionId: string; currentRating: number }) => {
    const [hoveredRating, setHoveredRating] = useState(0);

    return (
      <div className="flex items-center space-x-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            type="button"
            onClick={() => handleRatingChange(questionId, star)}
            onMouseEnter={() => setHoveredRating(star)}
            onMouseLeave={() => setHoveredRating(0)}
            className="focus:outline-none transition-transform hover:scale-110"
          >
            <Star
              className={`w-8 h-8 ${
                star <= (hoveredRating || currentRating)
                  ? 'text-yellow-500 fill-yellow-500'
                  : 'text-neutral-300'
              }`}
            />
          </button>
        ))}
        <span className="text-sm font-medium text-neutral-600 ml-2">
          {currentRating > 0 ? `${currentRating}/5` : 'Not rated'}
        </span>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="h-10 w-[3.33rem]" />
              <span className="text-xl font-bold text-neutral-900">Frontline Rating System</span>
            </Link>
            <Link href="/rate" className="text-neutral-600 hover:text-neutral-900">
              ← Back to Search
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-3xl mx-auto">
          {/* Agent Info Card */}
          <div className="card mb-8">
            <div className="card-body">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center">
                  <User className="w-8 h-8 text-primary-600" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">{agent.name}</h2>
                  <p className="text-neutral-600">{agent.department.name}</p>
                  <p className="text-sm text-neutral-500">Employee ID: {agent.employeeId}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rating Form */}
          <div className="card">
            <div className="card-header">
              <h3 className="text-xl font-semibold text-neutral-900">Rate Your Service Experience</h3>
              <p className="text-sm text-neutral-600 mt-1">
                Your feedback helps us improve our service quality
              </p>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Rating Questions */}
                {questions.length > 0 ? (
                  <div className="space-y-6">
                    <h4 className="font-semibold text-neutral-900 mb-4">Service Quality Questions</h4>
                    {questions.map((question) => (
                      <div key={question.id} className="p-4 bg-neutral-50 rounded-lg">
                        <p className="text-neutral-900 mb-4 font-medium">{question.questionText}</p>
                        <RatingStars
                          questionId={question.id}
                          currentRating={responses[question.id] || 0}
                        />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="alert alert-info">
                    <AlertCircle className="w-5 h-5" />
                    <span>No rating questions available for this department yet.</span>
                  </div>
                )}

                {/* Customer Information */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-neutral-900 mb-4">Your Information</h4>
                  
                  <div className="flex items-center mb-4">
                    <input
                      type="checkbox"
                      id="anonymous"
                      checked={formData.isAnonymous}
                      onChange={(e) => setFormData({ ...formData, isAnonymous: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                    />
                    <label htmlFor="anonymous" className="ml-2 text-sm text-neutral-700">
                      Submit anonymously
                    </label>
                  </div>

                  {!formData.isAnonymous && (
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="customerName" className="label">
                          Full Name *
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <User className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            id="customerName"
                            type="text"
                            required={!formData.isAnonymous}
                            value={formData.customerName}
                            onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                            className="input pl-10"
                            placeholder="John Doe"
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="customerContact" className="label">
                          Contact (Phone or Email)
                        </label>
                        <div className="relative">
                          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <Phone className="h-5 w-5 text-neutral-400" />
                          </div>
                          <input
                            id="customerContact"
                            type="text"
                            value={formData.customerContact}
                            onChange={(e) => setFormData({ ...formData, customerContact: e.target.value })}
                            className="input pl-10"
                            placeholder="+266 5000 0000 or email@example.com"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  <div className="mt-4">
                    <label htmlFor="policyNumber" className="label">
                      Policy Number (Optional)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FileText className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        id="policyNumber"
                        type="text"
                        value={formData.policyNumber}
                        onChange={(e) => setFormData({ ...formData, policyNumber: e.target.value })}
                        className="input pl-10"
                        placeholder="POL123456"
                      />
                    </div>
                  </div>
                </div>

                {/* Feedback */}
                <div className="border-t pt-6">
                  <h4 className="font-semibold text-neutral-900 mb-4">Additional Feedback</h4>
                  
                  <div>
                    <label htmlFor="feedback" className="label">
                      Comments (Optional)
                    </label>
                    <textarea
                      id="feedback"
                      rows={4}
                      value={formData.feedbackText}
                      onChange={(e) => setFormData({ ...formData, feedbackText: e.target.value })}
                      className="input"
                      placeholder="Share any additional thoughts about your experience..."
                    />
                  </div>

                  <div className="flex items-start mt-4">
                    <input
                      type="checkbox"
                      id="complaint"
                      checked={formData.isComplaint}
                      onChange={(e) => setFormData({ ...formData, isComplaint: e.target.checked })}
                      className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded mt-1"
                    />
                    <label htmlFor="complaint" className="ml-2 text-sm text-neutral-700">
                      Mark as complaint (This will be flagged for immediate attention)
                    </label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="border-t pt-6">
                  <button
                    type="submit"
                    disabled={isSubmitting || (questions.length > 0 && Object.keys(responses).length !== questions.length)}
                    className="btn btn-primary w-full btn-lg"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                  </button>
                  <p className="text-xs text-neutral-500 text-center mt-3">
                    By submitting, you agree that your feedback may be used to improve service quality
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}