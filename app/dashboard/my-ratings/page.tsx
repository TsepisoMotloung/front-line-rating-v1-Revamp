'use client'


import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { Star, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/DashboardLayout';
import { formatDistanceToNow } from 'date-fns';

interface Rating {
  id: string;
  isAnonymous: boolean;
  customerName?: string;
  agent: { name: string };
  department: { name: string };
  createdAt: string;
  feedbackText?: string;
  responses: Array<{
    id: string;
    score: number;
    question: { questionText: string };
  }>;
  isComplaint?: boolean;
  complaintStatus?: string;
  resolvedAt?: string;
}


export default function MyRatingsPage() {
  const { data: session } = useSession();
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    async function fetchRatings() {
      try {
        const response = await fetch(`/api/user/ratings?page=${page}`);
        const data = await response.json();
        if (response.ok) {
          setRatings(data.ratings);
          setTotalPages(data.pagination.pages);
        }
      } catch (error) {
        console.error('Error fetching ratings:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchRatings();
  }, [page]);

  const calculateAverageScore = (responses: { score: number }[]) => {
    if (!responses?.length) return 0;
    const sum = responses.reduce((acc, resp) => acc + resp.score, 0);
    return (sum / responses.length).toFixed(1);
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="p-6">
          <div className="animate-pulse">
            <div className="h-8 bg-neutral-200 rounded w-1/4 mb-6"></div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="mb-4 bg-white rounded-lg p-6 border border-neutral-200">
                <div className="h-4 bg-neutral-200 rounded w-1/3 mb-4"></div>
                <div className="h-4 bg-neutral-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
      <DashboardLayout>
        <div className="container-custom py-8">
          <div className="glass p-responsive rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              {session?.user?.role === 'AGENT' ? 'Ratings Received' : 'My Ratings'}
            </h1>
            {ratings.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                <p className="text-neutral-600">No ratings found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {ratings.map((rating) => (
                  <div key={rating.id} className="bg-white rounded-lg p-6 border border-neutral-200 hover:border-primary-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {session?.user?.role === 'AGENT'
                            ? `Rated by ${rating.isAnonymous ? 'Anonymous' : rating.customerName}`
                            : `Rating for ${rating.agent.name}`}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {rating.department.name} • {formatDistanceToNow(new Date(rating.createdAt))} ago
                        </p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                        <span className="font-medium">{calculateAverageScore(rating.responses)}</span>
                      </div>
                    </div>
                    {rating.feedbackText && (
                      <p className="text-neutral-600 text-sm mt-2 bg-neutral-50 p-3 rounded-md">
                        "{rating.feedbackText}"
                      </p>
                    )}
                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {rating.responses.map((response) => (
                          <div key={response.id} className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600">{response.question.questionText}</span>
                            <div className="flex items-center">
                              <Star className={`w-4 h-4 ${response.score >= 1 ? 'text-yellow-400 fill-yellow-400' : 'text-neutral-300'}`} />
                              <span className="text-sm font-medium ml-1">{response.score}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {rating.isComplaint && (
                      <div className="mt-4 pt-4 border-t border-neutral-100 flex items-center space-x-2 text-red-600">
                        <AlertCircle className="w-4 h-4" />
                        <span className="text-sm font-medium">
                          Complaint • {rating.complaintStatus}
                          {rating.resolvedAt && ` • Resolved on ${new Date(rating.resolvedAt).toLocaleDateString()}`}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {totalPages > 1 && (
              <div className="mt-6 flex justify-center space-x-2">
                <button
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                <button
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="px-4 py-2 border border-neutral-300 rounded-md text-sm font-medium text-neutral-700 hover:bg-neutral-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </DashboardLayout>
      <footer className="bg-neutral-900 text-white py-8 mt-16">
        <div className="container-custom text-center">
          <img src="/logo.png" alt="Frontline Rating" className="h-8 w-6 mx-auto mb-2" />
          <p className="text-neutral-400">&copy; {new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}