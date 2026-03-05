'use client';

import { useState, useEffect, useCallback } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import DashboardLayout from '@/components/DashboardLayout';
import { Star, Search, Calendar, User, MessageSquare, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Rating {
  id: string;
  ratingType: string;
  agentId?: string;
  agent?: {
    name: string;
    employeeId?: string;
  };
  departmentId?: string;
  department?: {
    name: string;
  };
  customerName: string;
  customerContact?: string;
  policyNumber?: string;
  isAnonymous: boolean;
  isComplaint: boolean;
  complaintStatus?: string;
  feedbackText?: string;
  createdAt: string;
  responses: Array<{
    score: number;
    question: {
      questionText: string;
    };
  }>;
}

export default function RatingsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [filteredRatings, setFilteredRatings] = useState<Rating[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingTypeFilter, setRatingTypeFilter] = useState('ALL');
  const [complaintFilter, setComplaintFilter] = useState('ALL');
  const [selectedRating, setSelectedRating] = useState<Rating | null>(null);

  const fetchRatings = useCallback(async () => {
    try {
      setIsLoading(true);
      const params = new URLSearchParams();

      // Apply role-based access control
      if (session?.user.role === 'HOD' && session.user.departmentId) {
        params.append('departmentId', session.user.departmentId);
      } else if (session?.user.role === 'EMPLOYEE' || session?.user.role === 'AGENT') {
        params.append('agentId', session.user.id);
      }
      // Admins can see all ratings (no filters)

      const response = await fetch(`/api/ratings?${params}`);
      if (response.ok) {
        const data = await response.json();
        const ratingsArray = Array.isArray(data.ratings) ? data.ratings : data;
        setRatings(ratingsArray);
      } else {
        toast.error('Failed to fetch ratings');
      }
    } catch (error) {
      console.error('Error fetching ratings:', error);
      toast.error('Failed to load ratings');
    } finally {
      setIsLoading(false);
    }
  }, [session?.user]);

  const filterRatings = () => {
    let filtered = ratings;

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(r =>
        r.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.feedbackText?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.agent?.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Rating type filter
    if (ratingTypeFilter !== 'ALL') {
      filtered = filtered.filter(r => r.ratingType === ratingTypeFilter);
    }

    // Complaint filter
    if (complaintFilter !== 'ALL') {
      if (complaintFilter === 'COMPLAINTS') {
        filtered = filtered.filter(r => r.isComplaint);
      } else if (complaintFilter === 'RATINGS') {
        filtered = filtered.filter(r => !r.isComplaint);
      }
    }

    setFilteredRatings(filtered);
  };

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (session?.user) {
      fetchRatings();
    }
  }, [session?.user, fetchRatings]);

  useEffect(() => {
    filterRatings();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery, ratingTypeFilter, complaintFilter, ratings]);

  const getAverageScore = (responses: Array<{ score: number; question: { questionText: string } }>) => {
    if (responses.length === 0) return '0';
    const sum = responses.reduce((acc, r) => acc + r.score, 0);
    return (sum / responses.length).toFixed(1);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    if (rating >= 2) return 'text-orange-500';
    return 'text-red-600';
  };

  if (status === 'loading' || isLoading) {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">All Ratings</h1>
          <p className="text-neutral-600 mt-2">
            {session?.user.role === 'HOD' && "View ratings from your department and your own ratings"}
            {session?.user.role === 'EMPLOYEE' && "View your own ratings"}
            {session?.user.role === 'AGENT' && "View your own ratings"}
            {session?.user.role === 'ADMIN' && "View all ratings in the system"}
          </p>
        </div>

        <div className="card">
          <div className="card-body">
            <div className="space-y-4 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative md:col-span-2">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search by customer, agent, or feedback..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <select
                  value={ratingTypeFilter}
                  onChange={(e) => setRatingTypeFilter(e.target.value)}
                  className="px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="ALL">All Types</option>
                  <option value="AGENT">Agent Ratings</option>
                  <option value="ALLIANCE">Alliance Ratings</option>
                  <option value="COMPANY">Company Ratings</option>
                  <option value="EMPLOYEE">Employee Ratings</option>
                </select>
              </div>

              <select
                value={complaintFilter}
                onChange={(e) => setComplaintFilter(e.target.value)}
                className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              >
                <option value="ALL">All Items</option>
                <option value="RATINGS">Ratings Only</option>
                <option value="COMPLAINTS">Complaints Only</option>
              </select>
            </div>

            {filteredRatings.length > 0 ? (
              <div className="space-y-4">
                {filteredRatings.map((rating) => (
                  <div
                    key={rating.id}
                    className="border border-neutral-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => setSelectedRating(rating)}
                  >
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-start gap-3 mb-2">
                          <div className="flex-1">
                            <h3 className="font-semibold text-neutral-900">{rating.customerName}</h3>
                            <div className="flex flex-wrap gap-2 mt-1">
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                {rating.ratingType}
                              </span>
                              {rating.isComplaint && (
                                <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded">
                                  Complaint - {rating.complaintStatus}
                                </span>
                              )}
                              {rating.isAnonymous && (
                                <span className="text-xs bg-gray-100 text-gray-800 px-2 py-1 rounded">
                                  Anonymous
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-neutral-600 mt-3">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{rating.agent?.name || 'N/A'}</span>
                          </div>
                          {rating.department && (
                            <div className="flex items-center gap-2">
                              <MessageSquare className="w-4 h-4" />
                              <span>{rating.department.name}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(rating.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>

                        {rating.feedbackText && (
                          <p className="text-sm text-neutral-600 mt-3 line-clamp-2">
                            {rating.feedbackText}
                          </p>
                        )}
                      </div>

                      <div className="flex flex-col items-end gap-2">
                        <div className="flex items-center gap-2">
                          <span className={`text-2xl font-bold ${getRatingColor(parseFloat(getAverageScore(rating.responses)))}`}>
                            {getAverageScore(rating.responses)}
                          </span>
                          <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedRating(rating);
                          }}
                          className="text-sm text-primary-600 hover:text-primary-700"
                        >
                          View Details →
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <AlertCircle className="w-12 h-12 text-neutral-300 mx-auto mb-4" />
                <p className="text-neutral-500">No ratings found</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Rating Details Modal */}
      {selectedRating && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200 sticky top-0 bg-white">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">{selectedRating.customerName}</h2>
                  <p className="text-neutral-600 text-sm mt-1">{selectedRating.ratingType} Rating</p>
                </div>
                <button
                  onClick={() => setSelectedRating(null)}
                  className="text-neutral-400 hover:text-neutral-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Average Rating</p>
                  <p className={`text-2xl font-bold ${getRatingColor(parseFloat(getAverageScore(selectedRating.responses)))}`}>
                    {getAverageScore(selectedRating.responses)}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-neutral-600 mb-1">Date</p>
                  <p className="font-semibold text-sm">
                    {new Date(selectedRating.createdAt).toLocaleDateString()}
                  </p>
                </div>
                {selectedRating.agent && (
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Agent</p>
                    <p className="font-semibold text-sm">{selectedRating.agent.name}</p>
                  </div>
                )}
                {selectedRating.department && (
                  <div>
                    <p className="text-xs text-neutral-600 mb-1">Department</p>
                    <p className="font-semibold text-sm">{selectedRating.department.name}</p>
                  </div>
                )}
              </div>

              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Responses</h3>
                <div className="space-y-3">
                  {selectedRating.responses.map((response, idx) => (
                    <div key={idx} className="border border-neutral-200 rounded-lg p-3">
                      <div className="flex justify-between items-start mb-2">
                        <p className="text-sm font-medium text-neutral-900">
                          {response.question.questionText}
                        </p>
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-primary-600">{response.score}</span>
                          <span className="text-xs text-neutral-500">/5</span>
                        </div>
                      </div>
                      <div className="w-full bg-neutral-200 rounded-full h-2">
                        <div
                          className="bg-primary-600 h-2 rounded-full"
                          style={{ width: `${(response.score / 5) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {selectedRating.feedbackText && (
                <div>
                  <h3 className="font-semibold text-neutral-900 mb-2">Feedback</h3>
                  <p className="text-neutral-700 text-sm bg-neutral-50 p-4 rounded-lg">
                    {selectedRating.feedbackText}
                  </p>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-neutral-200">
                <button
                  onClick={() => setSelectedRating(null)}
                  className="flex-1 btn btn-secondary"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
