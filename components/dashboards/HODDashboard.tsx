'use client';

import { useEffect, useState } from 'react';
import { Users, Star, MessageSquare, TrendingUp, AlertCircle, CheckCircle } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

interface DashboardStats {
  totalRatings: number;
  averageRating: number;
  satisfactionPercentage: number;
  totalComplaints: number;
  openComplaints: number;
  resolvedComplaints: number;
  totalAgents: number;
  trendData: any[];
  agentPerformance: any[];
  recentComplaints: any[];
}

export default function HODDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/hod-stats');
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

  const COLORS = ['#dc2626', '#f59e0b', '#10b981', '#3b82f6'];

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
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Department Overview</h1>
          <p className="text-neutral-600 mt-2">
            Monitor your team's performance and customer satisfaction
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/questions" className="btn btn-outline">
            Manage Questions
          </Link>
          <Link href="/dashboard/reports" className="btn btn-primary">
            Generate Report
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <span className="text-sm font-medium text-blue-600">Active</span>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Team Members</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalAgents || 0}</p>
          <p className="text-xs text-neutral-500 mt-2">Agents in department</p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-purple-600" />
            </div>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Total Ratings</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalRatings || 0}</p>
          <p className="text-xs text-neutral-500 mt-2">
            Avg: <span className={`font-semibold ${getRatingColor(stats?.averageRating || 0)}`}>
              {stats?.averageRating?.toFixed(1) || '0.0'} / 5.0
            </span>
          </p>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-green-600" />
            </div>
            <span className="text-sm font-medium text-green-600">
              {stats?.satisfactionPercentage || 0}%
            </span>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Satisfaction Rate</h3>
          <div className="w-full bg-neutral-200 rounded-full h-2 mt-3">
            <div
              className="bg-green-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${stats?.satisfactionPercentage || 0}%` }}
            ></div>
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            <span className="text-sm font-medium text-primary-600">
              {stats?.openComplaints || 0} Open
            </span>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Complaints</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalComplaints || 0}</p>
          <p className="text-xs text-neutral-500 mt-2">
            {stats?.resolvedComplaints || 0} resolved
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Performance Trend Chart */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-neutral-900">Department Performance Trend</h2>
            <p className="text-sm text-neutral-600 mt-1">Average ratings over time</p>
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
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    dot={{ fill: '#3b82f6' }}
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

        {/* Agent Performance Comparison */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-neutral-900">Agent Performance</h2>
            <p className="text-sm text-neutral-600 mt-1">Compare team members</p>
          </div>
          <div className="card-body">
            {stats?.agentPerformance && stats.agentPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.agentPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 5]} />
                  <Tooltip />
                  <Bar dataKey="avgRating" fill="#dc2626" />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="text-center py-12 text-neutral-500">
                No performance data available yet
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Complaints */}
      <div className="card">
        <div className="card-header flex justify-between items-center">
          <div>
            <h2 className="text-lg font-semibold text-neutral-900">Recent Complaints</h2>
            <p className="text-sm text-neutral-600 mt-1">Issues that need attention</p>
          </div>
          <Link href="/dashboard/complaints" className="text-sm text-primary-600 hover:text-primary-700">
            View All →
          </Link>
        </div>
        <div className="card-body">
          {stats?.recentComplaints && stats.recentComplaints.length > 0 ? (
            <div className="space-y-4">
              {stats.recentComplaints.map((complaint: any, index: number) => (
                <div
                  key={index}
                  className="flex items-start justify-between p-4 border border-neutral-200 rounded-lg hover:border-primary-200 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="font-medium text-neutral-900">
                        {complaint.agentName}
                      </span>
                      {complaint.complaintStatus === 'OPEN' ? (
                        <span className="badge badge-danger text-xs">Open</span>
                      ) : (
                        <span className="badge badge-success text-xs">Resolved</span>
                      )}
                    </div>
                    <p className="text-sm text-neutral-600 mb-2">
                      <span className="font-medium">Customer:</span> {complaint.customerName}
                    </p>
                    <p className="text-sm text-neutral-600 mb-2">
                      {complaint.feedbackText || 'No details provided'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-neutral-500">
                      <span>Rating: {complaint.averageScore?.toFixed(1)}/5.0</span>
                      <span>•</span>
                      <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  {complaint.complaintStatus === 'OPEN' && (
                    <Link
                      href={`/dashboard/complaints/${complaint.id}`}
                      className="btn btn-sm btn-outline ml-4"
                    >
                      Resolve
                    </Link>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
              <p className="text-neutral-600">No complaints to review</p>
              <p className="text-sm text-neutral-500 mt-1">Great work, team!</p>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Link href="/dashboard/questions" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Manage Questions</h3>
            <p className="text-sm text-neutral-600">
              Create and edit rating questions for your department
            </p>
          </div>
        </Link>

        <Link href="/dashboard/ratings" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">View All Ratings</h3>
            <p className="text-sm text-neutral-600">
              Browse and analyze all department ratings
            </p>
          </div>
        </Link>

        <Link href="/dashboard/reports" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Generate Reports</h3>
            <p className="text-sm text-neutral-600">
              Export performance reports and analytics
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}