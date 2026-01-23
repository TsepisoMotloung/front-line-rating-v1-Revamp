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
  const [agents, setAgents] = useState<Agent[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // live-search as user types with debounce
    if (!searchQuery || searchQuery.trim() === '') {
      setAgents([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setHasSearched(true);

    const id = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.append('query', searchQuery.trim());

        const res = await fetch(`/api/agents/search?${params.toString()}`, { signal: controller.signal });
        if (!res.ok) {
          console.error('Failed to search agents');
          toast.error('Failed to search agents');
          setAgents([]);
          return;
        }
        const data = await res.json();
        setAgents(data);
        if (data.length === 0) {
          // show friendly notice but don't spam toasts while typing
          // only show toast when user stops typing for debounce period and no results
          toast.error('No agents found matching your search');
        }
      } catch (err: any) {
        if (err.name === 'AbortError') return;
        console.error('Error searching agents:', err);
        toast.error('An error occurred while searching');
      } finally {
        setIsLoading(false);
      }
    }, 300);

    return () => {
      controller.abort();
      clearTimeout(id);
    };
  }, [searchQuery]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200">
        <div className="container-custom">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/logo.png" alt="Frontline Rating" className="h-10 w-[3.33rem]" />
              <span className="text-xl font-bold text-neutral-900\">Alliance Insurance Service Feedback</span>
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
              Share Your Rating
            </h1>
            <p className="text-lg text-neutral-600">
              Help us improve by rating our employees, agents, and Alliance Insurance
            </p>
          </div>

          {/* Rating Options */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            {/* Rate an Agent/Employee */}
            <div className="card hover:shadow-lg transition-all">
              <div className="card-body">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center mb-4">
                  <User className="w-6 h-6 text-primary-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  Rate an Employee
                </h2>
                <p className="text-neutral-600 text-sm mb-6">
                  Share your feedback about an agent or employee who served you
                </p>
                <Link href="#search" className="btn btn-primary w-full">
                  Get Started
                </Link>
              </div>
            </div>

            {/* Rate Alliance Insurance */}
            <div className="card hover:shadow-lg transition-all">
              <div className="card-body">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-green-600" />
                </div>
                <h2 className="text-xl font-semibold text-neutral-900 mb-2">
                  Rate Alliance Insurance
                </h2>
                <p className="text-neutral-600 text-sm mb-6">
                  Share your overall feedback about Alliance Insurance as a company
                </p>
                <Link href="/rate/alliance" className="btn bg-green-600 hover:bg-green-700 text-white w-full">
                  Rate Company
                </Link>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div id="search" className="scroll-mt-8">
            <h2 className="text-2xl font-bold text-neutral-900 mb-6">
              Find Your Employee or Agent
            </h2>
            <p className="text-neutral-600 mb-8">
              Search for the employee or agent who served you to share your feedback
            </p>

            {/* QR Code Scanner Option */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-6 mb-8">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-primary-900 mb-2">Have a QR Code?</h3>
                  <p className="text-sm text-primary-800 mb-4">
                    If your agent provided a QR code, you can scan it for faster access to the rating form.
                  </p>
                  <Link href="/rate/scan" className="btn btn-sm btn-primary">
                    Scan QR Code
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="card">
              <div className="card-body">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
                  <div>
                    <label htmlFor="search" className="label">
                      Agent or Employee Name
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
                        placeholder="Start typing an agent/empoyee name..."
                      />
                    </div>
                  </div>
                  <div className="flex">
                    <button
                      type="button"
                      onClick={() => {
                        setSearchQuery('');
                        setAgents([]);
                        setHasSearched(false);
                      }}
                      className="btn btn-secondary w-full"
                    >
                      Clear Search
                    </button>
                  </div>
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
                          setAgents([]);
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
    </div>
  );
}