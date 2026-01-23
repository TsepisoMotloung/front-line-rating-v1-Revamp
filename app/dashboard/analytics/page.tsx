'use client';

import { useState, useEffect } from 'react';
import { Search, Filter, Download, TrendingUp, Star, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';
import Link from 'next/link';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';

interface Rating {
  id: string;
  ratingType: string;
  customerName: string;
  agentId?: string;
  agent?: { name: string };
  departmentId?: string;
  department?: { name: string };
  averageScore: number;
  feedbackText?: string;
  createdAt: string;
}

interface Department {
  id: string;
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface Analytics {
  totalRatings: number;
  averageRating: number;
  alliances: number;
  agents: number;
  satisfactionRate: number;
  trendData: any[];
  ratingsByType: any[];
  topAgents: any[];
}

export default function RatingsAnalyticsPage() {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Filters
  const [filters, setFilters] = useState({
    ratingType: '', // 'ALLIANCE', 'AGENT', or ''
    userId: '',
    departmentId: '',
    startDate: '',
    endDate: '',
    searchQuery: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    fetchRatings();
  }, [filters]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const [deptRes, usersRes] = await Promise.all([
        fetch('/api/departments'),
        fetch('/api/users'),
      ]);

      if (deptRes.ok) {
        const deptData = await deptRes.json();
        setDepartments(deptData);
      }
      if (usersRes.ok) {
        const usersData = await usersRes.json();
        setUsers(usersData);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRatings = async () => {
    try {
      const params = new URLSearchParams();
      if (filters.ratingType) params.append('ratingType', filters.ratingType);
      if (filters.userId) params.append('userId', filters.userId);
      if (filters.departmentId) params.append('departmentId', filters.departmentId);
      if (filters.startDate) params.append('startDate', filters.startDate);
      if (filters.endDate) params.append('endDate', filters.endDate);
      if (filters.searchQuery) params.append('search', filters.searchQuery);

      const response = await fetch(`/api/ratings?${params.toString()}`);
      if (response.ok) {
        const data = await response.json();
        setRatings(data.ratings || []);
        setAnalytics(data.analytics || null);
      }
    } catch (error) {
      toast.error('Failed to fetch ratings');
      console.error(error);
    }
  };

  const handleFilterChange = (key: string, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  const resetFilters = () => {
    setFilters({
      ratingType: '',
      userId: '',
      departmentId: '',
      startDate: '',
      endDate: '',
      searchQuery: '',
    });
  };

  const COLORS = ['#10b981', '#3b82f6', '#f59e0b'];
  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4) return 'text-green-500';
    if (rating >= 3) return 'text-yellow-500';
    return 'text-orange-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Ratings Analytics</h1>
          <p className="text-neutral-600 mt-2">View and analyze all ratings with advanced filtering</p>
        </div>
        <Link href="/dashboard" className="btn btn-outline">
          ← Back to Dashboard
        </Link>
      </div>

      {/* Analytics Cards */}
      {analytics && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          <div className="stat-card">
            <h3 className="text-sm font-medium text-neutral-600">Total Ratings</h3>
            <p className="text-3xl font-bold text-neutral-900">{analytics.totalRatings}</p>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-medium text-neutral-600">Average Rating</h3>
            <p className={`text-3xl font-bold ${getRatingColor(analytics.averageRating)}`}>
              {analytics.averageRating.toFixed(2)}
            </p>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-medium text-neutral-600">Alliance Ratings</h3>
            <p className="text-3xl font-bold text-blue-600">{analytics.alliances}</p>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-medium text-neutral-600">Employee Ratings</h3>
            <p className="text-3xl font-bold text-purple-600">{analytics.agents}</p>
          </div>
          <div className="stat-card">
            <h3 className="text-sm font-medium text-neutral-600">Satisfaction Rate</h3>
            <p className="text-3xl font-bold text-green-600">{analytics.satisfactionRate}%</p>
          </div>
        </div>
      )}

      {/* Filters */}
      <div className="card">
        <div className="card-body">
          <h2 className="text-lg font-semibold text-neutral-900 mb-4">Filters</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Rating Type</label>
              <select
                value={filters.ratingType}
                onChange={(e) => handleFilterChange('ratingType', e.target.value)}
                className="input"
              >
                <option value="">All Types</option>
                <option value="ALLIANCE">Alliance Insurance</option>
                <option value="AGENT">Employee/Agent</option>
                <option value="INTERNAL">Internal</option>
              </select>
            </div>

            <div>
              <label className="label">Employee/Agent</label>
              <select
                value={filters.userId}
                onChange={(e) => handleFilterChange('userId', e.target.value)}
                className="input"
              >
                <option value="">All Employees</option>
                {users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Department</label>
              <select
                value={filters.departmentId}
                onChange={(e) => handleFilterChange('departmentId', e.target.value)}
                className="input"
              >
                <option value="">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="label">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => handleFilterChange('startDate', e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="label">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => handleFilterChange('endDate', e.target.value)}
                className="input"
              />
            </div>

            <div>
              <label className="label">Search</label>
              <input
                type="text"
                placeholder="Search by name or feedback..."
                value={filters.searchQuery}
                onChange={(e) => handleFilterChange('searchQuery', e.target.value)}
                className="input"
              />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            <button onClick={resetFilters} className="btn btn-secondary">
              Reset Filters
            </button>
            <button onClick={fetchRatings} className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      </div>

      {/* Charts */}
      {analytics && analytics.trendData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rating Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.trendData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="average" stroke="#3b82f6" name="Avg Rating" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="card">
            <div className="card-body">
              <h3 className="text-lg font-semibold text-neutral-900 mb-4">Ratings by Type</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={analytics.ratingsByType}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {analytics.ratingsByType.map((entry: any, index: number) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      )}

      {/* Ratings Table */}
      <div className="card">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold text-neutral-900">Ratings ({ratings.length})</h2>
          </div>

          {ratings.length === 0 ? (
            <div className="text-center py-12 text-neutral-500">
              <p>No ratings found. Adjust your filters to see results.</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">Customer</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">Type</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">Target</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">Rating</th>
                    <th className="text-left py-3 px-4 font-semibold text-neutral-900">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {ratings.map((rating) => (
                    <tr key={rating.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 text-sm text-neutral-900">{rating.customerName}</td>
                      <td className="py-3 px-4 text-sm">
                        <span className={`badge ${rating.ratingType === 'ALLIANCE' ? 'badge-info' : 'badge-secondary'}`}>
                          {rating.ratingType === 'ALLIANCE' ? 'Alliance' : 'Employee'}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {rating.agent?.name || rating.department?.name || '—'}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <div className="flex items-center gap-2">
                          <span className={getRatingColor(rating.averageScore)}>
                            {rating.averageScore.toFixed(1)}
                          </span>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 ${
                                  i <= Math.round(rating.averageScore)
                                    ? 'text-yellow-400 fill-yellow-400'
                                    : 'text-neutral-300'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">
                        {new Date(rating.createdAt).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
