'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Users, Star, ArrowLeft, AlertCircle, Search, User } from 'lucide-react';
import toast from 'react-hot-toast';
import DashboardLayout from '@/components/DashboardLayout';

interface Employee {
  id: string;
  name: string;
  email: string;
  role: string;
  departmentName?: string;
}

interface InternalRating {
  id: string;
  category: string;
  score: number;
  feedbackText?: string;
  isAnonymous: boolean;
  rater: { name: string; role: string };
  createdAt: string;
}

const RATING_CATEGORIES = [
  { id: 'professionalism', label: 'Professionalism', description: 'Professional conduct and attitude' },
  { id: 'teamwork', label: 'Teamwork', description: 'Collaboration and support for team' },
  { id: 'performance', label: 'Performance', description: 'Overall job performance' },
  { id: 'communication', label: 'Communication', description: 'Clarity and effectiveness in communication' },
  { id: 'reliability', label: 'Reliability', description: 'Dependability and consistency' },
];

export default function InternalRatingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // 1: Select, 2: Rate
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [employeeRatings, setEmployeeRatings] = useState<InternalRating[]>([]);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    searchEmployees();
  }, [searchQuery]);

  const searchEmployees = async () => {
    if (!searchQuery.trim()) {
      setEmployees([]);
      return;
    }

    try {
      setIsLoading(true);
      const response = await fetch(`/api/users/search?search=${encodeURIComponent(searchQuery)}`);
      if (!response.ok) {
        throw new Error('Failed to search employees');
      }
      const data = await response.json();
      setEmployees(data);
    } catch (err: any) {
      setError(err.message);
      toast.error('Failed to search employees');
    } finally {
      setIsLoading(false);
    }
  };

  const selectEmployee = async (employee: Employee) => {
    setSelectedEmployee(employee);
    setCurrentStep(2);
    setError('');
    setRatings({});
    setFeedback('');

    // Fetch existing ratings for this employee
    try {
      const response = await fetch(`/api/ratings/internal?ratedId=${employee.id}`);
      if (response.ok) {
        const data = await response.json();
        setEmployeeRatings(data);
      }
    } catch (err) {
      console.error('Error fetching ratings:', err);
    }
  };

  const handleRatingChange = (category: string, score: number) => {
    setRatings({
      ...ratings,
      [category]: score,
    });
  };

  const handleSubmit = async () => {
    if (Object.keys(ratings).length !== RATING_CATEGORIES.length) {
      setError('Please rate all categories');
      toast.error('Please rate all categories');
      return;
    }

    setIsSubmitting(true);
    try {
      // Submit each rating
      for (const category of RATING_CATEGORIES) {
        const response = await fetch('/api/ratings/internal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ratedId: selectedEmployee?.id,
            category: category.id,
            score: ratings[category.id],
            feedbackText: feedback,
            isAnonymous,
          }),
        });

        if (!response.ok) {
          throw new Error(`Failed to submit rating for ${category.label}`);
        }
      }

      toast.success('Rating submitted successfully!');
      setCurrentStep(1);
      setSelectedEmployee(null);
      setSearchQuery('');
      setRatings({});
      setFeedback('');
      setIsAnonymous(false);
    } catch (err: any) {
      setError(err.message);
      toast.error(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  // Check if user is authorized to rate (must be AGENT, HOD, or ADMIN)
  const userRole = session?.user?.role;
  const isAuthorized = userRole && ['AGENT', 'HOD', 'ADMIN'].includes(userRole);

  if (!isAuthorized) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto">
          <div className="alert alert-error flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>You are not authorized to submit internal ratings.</span>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <Link href="/dashboard" className="text-primary-600 hover:text-primary-700 flex items-center space-x-1">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>

        <div className="flex items-center space-x-4 mb-8">
          <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
            <Users className="w-6 h-6 text-primary-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Internal Ratings</h1>
            <p className="text-neutral-600">Rate your colleagues and team members</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-error mb-6 flex items-start space-x-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {/* Step 1: Search and Select Employee */}
        {currentStep === 1 && (
          <div className="card">
            <div className="card-body space-y-6">
              <div>
                <label htmlFor="search" className="label">
                  Search Employee
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-neutral-400" />
                  </div>
                  <input
                    id="search"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input pl-10"
                    placeholder="Search employee name or email..."
                  />
                </div>
              </div>

              {isLoading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-neutral-600 mt-2">Searching...</p>
                </div>
              ) : employees.length > 0 ? (
                <div className="space-y-3">
                  {employees.map((employee) => (
                    <button
                      key={employee.id}
                      onClick={() => selectEmployee(employee)}
                      className="w-full text-left p-4 border border-neutral-200 rounded-lg hover:border-primary-400 hover:bg-primary-50 transition-all flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-primary-600" />
                        </div>
                        <div>
                          <p className="font-medium text-neutral-900">{employee.name}</p>
                          <p className="text-sm text-neutral-600">{employee.email}</p>
                        </div>
                      </div>
                      <span className="text-xs font-medium px-2 py-1 bg-neutral-100 text-neutral-700 rounded">
                        {employee.role}
                      </span>
                    </button>
                  ))}
                </div>
              ) : searchQuery ? (
                <div className="text-center py-8">
                  <p className="text-neutral-600">No employees found matching your search</p>
                </div>
              ) : (
                <div className="text-center py-8">
                  <p className="text-neutral-600">Start typing to search for an employee</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Rating */}
        {currentStep === 2 && selectedEmployee && (
          <div className="space-y-6">
            <div className="card">
              <div className="card-body">
                <button
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedEmployee(null);
                  }}
                  className="text-primary-600 hover:text-primary-700 flex items-center space-x-1 mb-6"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Search</span>
                </button>

                <div className="flex items-center space-x-4 mb-6 pb-6 border-b border-neutral-200">
                  <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-neutral-900">{selectedEmployee.name}</p>
                    <p className="text-sm text-neutral-600">{selectedEmployee.email}</p>
                  </div>
                </div>

                <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                  Rate This Employee
                </h2>

                {/* Rating Categories */}
                <div className="space-y-8">
                  {RATING_CATEGORIES.map((category) => (
                    <div key={category.id}>
                      <div className="mb-3">
                        <p className="font-medium text-neutral-900">{category.label}</p>
                        <p className="text-sm text-neutral-600">{category.description}</p>
                      </div>
                      <div className="flex justify-between items-center">
                        {[1, 2, 3, 4, 5].map((score) => (
                          <button
                            key={score}
                            onClick={() => handleRatingChange(category.id, score)}
                            className={`flex flex-col items-center space-y-1 p-2 rounded-lg transition-all ${
                              ratings[category.id] === score
                                ? 'bg-primary-100 text-primary-600'
                                : 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200'
                            }`}
                          >
                            <Star
                              className="w-6 h-6"
                              fill={ratings[category.id] === score ? 'currentColor' : 'none'}
                            />
                            <span className="text-xs font-medium">{score}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Optional Feedback */}
                <div className="mt-8">
                  <label htmlFor="feedback" className="label">
                    Additional Comments (Optional)
                  </label>
                  <textarea
                    id="feedback"
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    className="input"
                    placeholder="Share specific feedback..."
                    rows={4}
                  />
                </div>

                {/* Anonymous Option */}
                <div className="flex items-center space-x-2 mt-6">
                  <input
                    id="isAnonymous"
                    type="checkbox"
                    checked={isAnonymous}
                    onChange={(e) => setIsAnonymous(e.target.checked)}
                    className="h-4 w-4 text-primary-600"
                  />
                  <label htmlFor="isAnonymous" className="text-sm text-neutral-700">
                    Submit this rating anonymously
                  </label>
                </div>

                <div className="flex space-x-4 mt-8">
                  <button
                    onClick={() => {
                      setCurrentStep(1);
                      setSelectedEmployee(null);
                    }}
                    className="btn btn-secondary flex-1"
                  >
                    Cancel
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

            {/* Recent Ratings for this Employee */}
            {employeeRatings.length > 0 && (
              <div className="card">
                <div className="card-body">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    Recent Ratings Received
                  </h3>
                  <div className="space-y-4">
                    {employeeRatings.slice(0, 3).map((rating) => (
                      <div key={rating.id} className="border-b border-neutral-200 pb-4 last:border-b-0 last:pb-0">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <p className="font-medium text-neutral-900">
                              {rating.isAnonymous ? 'Anonymous' : rating.rater.name}
                            </p>
                            <p className="text-sm text-neutral-600">{rating.category}</p>
                          </div>
                          <div className="flex items-center space-x-1 text-amber-500">
                            {[...Array(rating.score)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-current" />
                            ))}
                          </div>
                        </div>
                        {rating.feedbackText && (
                          <p className="text-sm text-neutral-600">{rating.feedbackText}</p>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
