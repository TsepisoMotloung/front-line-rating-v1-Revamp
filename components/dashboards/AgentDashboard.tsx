'use client';

import { useEffect, useState } from 'react';
import { Star, MessageSquare, TrendingUp, Award } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface DashboardStats {
  totalRatings: number;
  averageRating: number;
  satisfactionPercentage: number;
  totalComplaints: number;
  recentRatings: any[];
  trendData: any[];
}

export default function AgentDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/agent-stats');
      if (response.ok) {
        const data = await response.json();
        setStats(data);
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    if (rating >= 2) return 'text-orange-500';
    return 'text-primary-600';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-neutral-900">My Performance</h1>
        <p className="text-neutral-600 mt-2">
          Track your ratings and customer feedback
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Total Ratings</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalRatings || 0}</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Award className="w-6 h-6 text-green-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Average Rating</h3>
          <p className={`text-3xl font-bold ${getRatingColor(stats?.averageRating || 0)}`}>
            {stats?.averageRating?.toFixed(1) || '0.0'} / 5.0
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Satisfaction</h3>
          <p className="text-3xl font-bold text-neutral-900">
            {stats?.satisfactionPercentage || 0}%
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Complaints</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalComplaints || 0}</p>
        </div>
      </div>

      {/* Performance Trend Chart */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Performance Trend</h2>
        </div>
        <div className="card-body">
          {stats?.trendData && stats.trendData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={stats.trendData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis domain={[0, 5]} />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={{ fill: '#dc2626' }}
                />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              No trend data available yet
            </div>
          )}
        </div>
      </div>

      {/* Recent Ratings */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Recent Ratings</h2>
        </div>
        <div className="card-body">
          {stats?.recentRatings && stats.recentRatings.length > 0 ? (
            <div className="space-y-4">
              {stats.recentRatings.map((rating: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-neutral-900">
                        {rating.customerName}
                      </span>
                      {rating.isComplaint && (
                        <span className="badge badge-danger text-xs">Complaint</span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">
                      {rating.feedbackText || 'No feedback provided'}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {new Date(rating.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                  <div className="ml-4 flex items-center">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                    <span className="font-semibold text-lg">
                      {rating.averageScore?.toFixed(1)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              No ratings yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}