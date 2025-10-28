'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Star, QrCode, User, Building2, ArrowRight } from 'lucide-react';
import toast from 'react-hot-toast';

interface Agent {
  id: string;
  name: string;
  email: string;
  employeeId: string;
  department: {
    id: string;
    name: string;
  };
}

interface Department {
  id: string;
  name: string;
}

export default function RateAgentPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setHasSearched(true);

    try {
      const params = new URLSearchParams();
      if (searchQuery) params.append('query', searchQuery);
      if (selectedDepartment) params.append('departmentId', selectedDepartment);

      const response = await fetch(`/api/agents/search?${params}`);
      if (response.ok) {
        const data = await response.json();
        setAgents(data);
        if (data.length === 0) {
          toast.error('No agents found matching your search');
        }
      } else {
        toast.error('Failed to search agents');
      }
    } catch (error) {
      console.error('Error searching agents:', error);
      toast.error('An error occurred while searching');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-neutral-900">Frontline Rating</span>
            </Link>
            <Link href="/" className="text-neutral-600 hover:text-neutral-900">
              ← Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-custom py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-neutral-900 mb-4">
              Find Your Agent
            </h1>
            <p className="text-lg text-neutral-600">
              Search for the agent who served you to share your feedback
            </p>
          </div>

          {/* Alternative Option */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                <QrCode className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-blue-900 mb-2">Have a QR Code?</h3>
                <p className="text-sm text-blue-800 mb-4">
                  If your agent provided a QR code, you can scan it for faster access to the rating form.
                </p>
                <Link href="/rate/scan" className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700">
                  Scan QR Code
                </Link>
              </div>
            </div>
          </div>

          {/* Search Form */}
          <div className="card">
            <div className="card-body">
              <form onSubmit={handleSearch} className="space-y-6">
                <div>
                  <label htmlFor="search" className="label">
                    Agent Name or Employee ID
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
                      placeholder="Enter agent name or employee ID..."
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="department" className="label">
                    Department (Optional)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Building2 className="h-5 w-5 text-neutral-400" />
                    </div>
                    <select
                      id="department"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      className="input pl-10"
                    >
                      <option value="">All Departments</option>
                      {departments.map((dept) => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading || !searchQuery}
                  className="btn btn-primary w-full"
                >
                  {isLoading ? 'Searching...' : 'Search Agents'}
                </button>
              </form>
            </div>
          </div>

          {/* Search Results */}
          {hasSearched && (
            <div className="mt-8">
              {isLoading ? (
                <div className="text-center py-12">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                  <p className="text-neutral-600 mt-4">Searching...</p>
                </div>
              ) : agents.length > 0 ? (
                <>
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">
                    Search Results ({agents.length})
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {agents.map((agent) => (
                      <Link
                        key={agent.id}
                        href={`/rate/${agent.id}`}
                        className="card hover:shadow-lg transition-all cursor-pointer group"
                      >
                        <div className="card-body">
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                <User className="w-6 h-6 text-primary-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                  {agent.name}
                                </h3>
                                <p className="text-sm text-neutral-500">
                                  ID: {agent.employeeId}
                                </p>
                              </div>
                            </div>
                            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all" />
                          </div>
                          <div className="flex items-center space-x-2 text-sm text-neutral-600">
                            <Building2 className="w-4 h-4" />
                            <span>{agent.department.name}</span>
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <div className="card">
                  <div className="card-body text-center py-12">
                    <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-neutral-400" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-2">
                      No agents found
                    </h3>
                    <p className="text-neutral-600 mb-4">
                      Try adjusting your search criteria or check the spelling
                    </p>
                    <button
                      onClick={() => {
                        setSearchQuery('');
                        setSelectedDepartment('');
                        setHasSearched(false);
                      }}
                      className="btn btn-secondary"
                    >
                      Clear Search
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}