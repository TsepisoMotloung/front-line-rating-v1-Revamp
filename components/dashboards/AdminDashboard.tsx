'use client';

import { useEffect, useState } from 'react';
import { Users, Building2, Star, MessageSquare, TrendingUp, AlertCircle, UserCheck, UserX } from 'lucide-react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Link from 'next/link';

interface DashboardStats {
  totalUsers: number;
  pendingApprovals: number;
  totalDepartments: number;
  totalRatings: number;
  averageRating: number;
  satisfactionPercentage: number;
  totalComplaints: number;
  openComplaints: number;
  trendData: any[];
  departmentPerformance: any[];
  topPerformers: any[];
  pendingUsers: any[];
  recentActivity: any[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch('/api/dashboard/admin-stats');
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

  const COLORS = ['#dc2626', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6'];

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
          <h1 className="text-3xl font-bold text-neutral-900">System Overview</h1>
          <p className="text-neutral-600 mt-2">
            Monitor overall system performance and manage users
          </p>
        </div>
        <div className="flex gap-3">
          <Link href="/dashboard/users" className="btn btn-outline">
            Manage Users
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
            {stats?.pendingApprovals! > 0 && (
              <span className="badge badge-warning text-xs">
                {stats?.pendingApprovals} Pending
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Total Users</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalUsers || 0}</p>
          <Link href="/dashboard/users" className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block">
            View all users →
          </Link>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <span className="text-sm font-medium text-purple-600">Active</span>
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Departments</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalDepartments || 0}</p>
          <Link href="/dashboard/departments" className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Manage departments →
          </Link>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
              <Star className="w-6 h-6 text-green-600" />
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
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            {stats?.openComplaints! > 0 && (
              <span className="badge badge-danger text-xs">
                {stats?.openComplaints} Open
              </span>
            )}
          </div>
          <h3 className="text-sm font-medium text-neutral-600 mb-1">Complaints</h3>
          <p className="text-3xl font-bold text-neutral-900">{stats?.totalComplaints || 0}</p>
          <Link href="/dashboard/complaints" className="text-xs text-primary-600 hover:text-primary-700 mt-2 inline-block">
            Review complaints →
          </Link>
        </div>
      </div>

      {/* Pending Approvals Alert */}
      {stats?.pendingApprovals! > 0 && (
        <div className="alert alert-warning flex items-start">
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <div className="flex-1 ml-3">
            <h3 className="font-semibold">Pending User Approvals</h3>
            <p className="text-sm mt-1">
              {stats?.pendingApprovals} user registration{stats?.pendingApprovals! > 1 ? 's' : ''} waiting for approval.
            </p>
          </div>
          <Link href="/dashboard/users?tab=pending" className="btn btn-sm btn-primary ml-4">
            Review Now
          </Link>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* System Performance Trend */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-neutral-900">System Performance Trend</h2>
            <p className="text-sm text-neutral-600 mt-1">Ratings and satisfaction over time</p>
          </div>
          <div className="card-body">
            {stats?.trendData && stats.trendData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={stats.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis yAxisId="left" domain={[0, 5]} />
                  <YAxis yAxisId="right" orientation="right" />
                  <Tooltip />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="avgRating"
                    stroke="#dc2626"
                    strokeWidth={2}
                    name="Avg Rating"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="count"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Count"
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

        {/* Department Performance */}
        <div className="card">
          <div className="card-header">
            <h2 className="text-lg font-semibold text-neutral-900">Department Performance</h2>
            <p className="text-sm text-neutral-600 mt-1">Compare departments</p>
          </div>
          <div className="card-body">
            {stats?.departmentPerformance && stats.departmentPerformance.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={stats.departmentPerformance}>
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

      {/* Top Performers */}
      <div className="card">
        <div className="card-header">
          <h2 className="text-lg font-semibold text-neutral-900">Top Performing Agents</h2>
          <p className="text-sm text-neutral-600 mt-1">Agents with highest ratings this month</p>
        </div>
        <div className="card-body">
          {stats?.topPerformers && stats.topPerformers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.topPerformers.map((agent: any, index: number) => (
                <div
                  key={index}
                  className="p-4 border border-neutral-200 rounded-lg hover:border-primary-200 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-neutral-900">{agent.name}</h3>
                      <p className="text-sm text-neutral-500">{agent.departmentName}</p>
                    </div>
                    <div className="flex items-center">
                      <Star className="w-5 h-5 text-yellow-500 fill-yellow-500 mr-1" />
                      <span className="font-bold text-lg">{agent.avgRating?.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm text-neutral-600">
                    <span>{agent.totalRatings} ratings</span>
                    <span className="text-green-600 font-medium">
                      {agent.satisfactionPercentage}% satisfaction
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-neutral-500">
              No performance data available yet
            </div>
          )}
        </div>
      </div>

      {/* Pending Approvals */}
      {stats?.pendingUsers && stats.pendingUsers.length > 0 && (
        <div className="card">
          <div className="card-header flex justify-between items-center">
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">Pending Approvals</h2>
              <p className="text-sm text-neutral-600 mt-1">Review and approve user registrations</p>
            </div>
            <Link href="/dashboard/users?tab=pending" className="text-sm text-primary-600 hover:text-primary-700">
              View All →
            </Link>
          </div>
          <div className="card-body">
            <div className="space-y-4">
              {stats.pendingUsers.slice(0, 5).map((user: any, index: number) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg"
                >
                  <div className="flex-1">
                    <h3 className="font-semibold text-neutral-900">{user.name}</h3>
                    <p className="text-sm text-neutral-600">{user.email}</p>
                    <div className="flex items-center space-x-4 mt-2 text-xs text-neutral-500">
                      <span className="badge badge-info">{user.role}</span>
                      {user.departmentName && (
                        <>
                          <span>•</span>
                          <span>{user.departmentName}</span>
                        </>
                      )}
                      <span>•</span>
                      <span>{new Date(user.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button className="btn btn-sm bg-green-600 text-white hover:bg-green-700">
                      <UserCheck className="w-4 h-4" />
                    </button>
                    <button className="btn btn-sm btn-danger">
                      <UserX className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Link href="/dashboard/users" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Manage Users</h3>
            <p className="text-sm text-neutral-600">
              Approve and manage system users
            </p>
          </div>
        </Link>

        <Link href="/dashboard/departments" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Departments</h3>
            <p className="text-sm text-neutral-600">
              Create and manage departments
            </p>
          </div>
        </Link>

        <Link href="/dashboard/ratings" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Star className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">All Ratings</h3>
            <p className="text-sm text-neutral-600">
              View all system ratings
            </p>
          </div>
        </Link>

        <Link href="/dashboard/complaints" className="card hover:shadow-lg transition-shadow cursor-pointer">
          <div className="card-body text-center">
            <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="font-semibold text-neutral-900 mb-2">Complaints</h3>
            <p className="text-sm text-neutral-600">
              Review and resolve issues
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
}