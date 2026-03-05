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
  const [clientServicesDept, setClientServicesDept] = useState<Department | null>(null);

  // Fetch Client Services department on mount
  useEffect(() => {
    const fetchClientServicesDept = async () => {
      try {
        const res = await fetch('/api/departments');
        if (res.ok) {
          const departments = await res.json();
          const cssServices = departments.find(
            (dept: Department) => dept.name.toLowerCase() === 'client services'
          );
          if (cssServices) {
            setClientServicesDept(cssServices);
          } else {
            console.warn('Client Services department not found');
            toast.error('Client Services department not found');
          }
        }
      } catch (error) {
        console.error('Error fetching departments:', error);
      }
    };
    fetchClientServicesDept();
  }, []);

  useEffect(() => {
    // live-search as user types with debounce
    if (!searchQuery || searchQuery.trim() === '') {
      setAgents([]);
      setHasSearched(false);
      setIsLoading(false);
      return;
    }

    // Only search if Client Services department is loaded
    if (!clientServicesDept) {
      return;
    }

    const controller = new AbortController();
    setIsLoading(true);
    setHasSearched(true);

    const id = setTimeout(async () => {
      try {
        const params = new URLSearchParams();
        params.append('query', searchQuery.trim());
        params.append('departmentId', clientServicesDept.id);

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
  }, [searchQuery, clientServicesDept]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-neutral-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-neutral-200 sticky top-0 z-10 backdrop-blur-sm bg-white/95">
        <div className="container-custom px-4">
          <div className="flex justify-between items-center py-3 sm:py-4">
            <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
              <img src="/logo.png" alt="Frontline Rating" className="h-8 w-[2.67rem] sm:h-10 sm:w-[3.33rem]" />
              <span className="text-base sm:text-xl font-bold text-neutral-900 hidden sm:inline">Service Feedback Platform</span>
            </Link>
            <Link href="/" className="text-xs sm:text-sm text-neutral-600 hover:text-neutral-900 transition-colors inline-flex items-center space-x-1 group">
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              <span>Back to Home</span>
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container-custom px-4 py-8 sm:py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12 animate-fade-in">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-3 sm:mb-4">
              Share Your Rating
            </h1>
            <p className="text-base sm:text-lg text-neutral-600">
              Help us improve by rating our employees, agents, and Alliance Insurance
            </p>
          </div>

          

          {/* Search Section */}
          <div id="search" className="scroll-mt-8">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 mb-4 sm:mb-6">
              Find An Agent
            </h2>
            <p className="text-sm sm:text-base text-neutral-600 mb-6 sm:mb-8">
              Search for an agent or Client Services employee to rate their service
            </p>

            {/* QR Code Scanner Option */}
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 hover:bg-primary-100/50 transition-colors">
              <div className="flex items-start space-x-3 sm:space-x-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <QrCode className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-base sm:text-lg font-semibold text-primary-900 mb-2">Have a QR Code?</h3>
                  <p className="text-xs sm:text-sm text-primary-800 mb-3 sm:mb-4">
                    If your agent provided a QR code, you can scan it for faster access to the rating form.
                  </p>
                  <Link href="/rate/scan" className="btn btn-sm btn-primary hover:shadow-lg transition-all">
                    Scan QR Code
                  </Link>
                </div>
              </div>
            </div>

            {/* Search Form */}
            <div className="card shadow-lg">
              <div className="card-body p-4 sm:p-6">
                <form onSubmit={(e) => e.preventDefault()} className="space-y-5 sm:space-y-6">
                  <div>
                    <label htmlFor="search" className="label text-sm sm:text-base">
                      Agent or Client Services Employee Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 sm:h-5 sm:w-5 text-neutral-400" />
                      </div>
                      <input
                        id="search"
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="input pl-9 sm:pl-10 text-sm sm:text-base focus:ring-2 focus:ring-primary-500 transition-all"
                        placeholder="Search for an agent or Client Services employee..."
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
                      className="btn btn-secondary w-full hover:shadow-lg transition-all text-sm sm:text-base"
                    >
                      Clear Search
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Search Results */}
            {hasSearched && (
              <div className="mt-6 sm:mt-8 animate-fade-in">
                {isLoading ? (
                  <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-10 w-10 sm:h-12 sm:w-12 border-b-2 border-primary-600 mx-auto"></div>
                    <p className="text-sm sm:text-base text-neutral-600 mt-4">Searching...</p>
                  </div>
                ) : agents.length > 0 ? (
                  <>
                    <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-4">
                      Search Results ({agents.length})
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                      {agents.map((agent) => (
                        <Link
                          key={agent.id}
                          href={`/rate/${agent.id}`}
                          className="card hover:shadow-xl transition-all duration-300 cursor-pointer group hover:-translate-y-1"
                        >
                          <div className="card-body p-4 sm:p-6">
                            <div className="flex items-start justify-between mb-3 sm:mb-4">
                              <div className="flex items-center space-x-2 sm:space-x-3">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-100 rounded-full flex items-center justify-center">
                                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-primary-600" />
                                </div>
                                <div>
                                  <h3 className="text-sm sm:text-base font-semibold text-neutral-900 group-hover:text-primary-600 transition-colors">
                                    {agent.name}
                                  </h3>
                                  <p className="text-xs sm:text-sm text-neutral-500">
                                    ID: {agent.employeeId}
                                  </p>
                                </div>
                              </div>
                              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-neutral-400 group-hover:text-primary-600 group-hover:translate-x-1 transition-all flex-shrink-0" />
                            </div>
                            <div className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-600">
                              <Building2 className="w-3 h-3 sm:w-4 sm:h-4" />
                              <span>{agent.department.name}</span>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="card">
                    <div className="card-body text-center py-10 sm:py-12 p-4 sm:p-6">
                      <div className="w-14 h-14 sm:w-16 sm:h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Search className="w-7 h-7 sm:w-8 sm:h-8 text-neutral-400" />
                      </div>
                      <h3 className="text-base sm:text-lg font-semibold text-neutral-900 mb-2">
                        No agents found
                      </h3>
                      <p className="text-sm sm:text-base text-neutral-600 mb-4">
                        Try adjusting your search criteria or check the spelling
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setAgents([]);
                          setHasSearched(false);
                        }}
                        className="btn btn-secondary hover:shadow-lg transition-all text-sm sm:text-base"
                      >
                        Clear Search
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Rating Options */}
          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-8 sm:mb-12 mt-6 sm:mt-8">
            {/* Rate Alliance Insurance */}
            <div className="card hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="card-body p-5 sm:p-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Building2 className="w-5 h-5 sm:w-6 sm:h-6 text-green-600" />
                </div>
                <h2 className="text-lg sm:text-xl font-semibold text-neutral-900 mb-2">
                  Rate Alliance Insurance
                </h2>
                <p className="text-neutral-600 text-xs sm:text-sm mb-5 sm:mb-6">
                  Share your overall feedback about Alliance Insurance
                </p>
                <Link href="/rate/alliance" className="btn bg-green-600 hover:bg-green-700 text-white w-full shadow-lg hover:shadow-xl transition-all text-sm sm:text-base">
                  Rate Alliance Insurance
                </Link>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}