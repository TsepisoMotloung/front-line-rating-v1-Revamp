'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Users, Star, ArrowLeft, AlertCircle, Search, ChevronLeft, ChevronRight } from 'lucide-react';
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
  rater: { id: string; name: string; role: string };
  rated: { id: string; name: string; role: string };
  createdAt: string;
}

interface RaterGroup {
  raterId: string;
  raterName: string;
  raterRole: string;
  isAnonymous: boolean;
  ratings: InternalRating[];
  averageScore: number;
}

interface RatedPerson {
  ratedId: string;
  ratedName: string;
  ratedRole: string;
  departmentName?: string;
  totalRatings: number;
  averageScore: number;
}

const RATING_CATEGORIES = [
  { id: 'professionalism', label: 'Professionalism', description: 'Professional conduct and attitude' },
  { id: 'teamwork', label: 'Teamwork', description: 'Collaboration and support for team' },
  { id: 'performance', label: 'Performance', description: 'Overall job performance' },
  { id: 'communication', label: 'Communication', description: 'Clarity and effectiveness in communication' },
  { id: 'reliability', label: 'Reliability', description: 'Dependability and consistency' },
];

const ITEMS_PER_PAGE = 8;

export default function InternalRatingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // View mode
  const [viewMode, setViewMode] = useState<'submit' | 'view'>('view');

  // Submit mode
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Employee[]>([]);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});
  const [feedback, setFeedback] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // View mode
  const [viewType, setViewType] = useState<'received' | 'sent'>('received');
  const [ratedPersons, setRatedPersons] = useState<RatedPerson[]>([]);
  const [isLoadingPersons, setIsLoadingPersons] = useState(false);
  
  // Level 2: Raters list
  const [selectedPerson, setSelectedPerson] = useState<RatedPerson | null>(null);
  const [raters, setRaters] = useState<RaterGroup[]>([]);
  const [isLoadingRaters, setIsLoadingRaters] = useState(false);
  const [ratersPage, setRatersPage] = useState(1);

  // Level 3: Rating details
  const [selectedRater, setSelectedRater] = useState<RaterGroup | null>(null);

  // Pagination
  const [personsPage, setPersonsPage] = useState(1);
  const [searchResultsPage, setSearchResultsPage] = useState(1);
  const [sentRatingsPage, setSentRatingsPage] = useState(1);

  // Error and loading
  const [error, setError] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Effect: Check authentication and role
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    }
    if (status === 'authenticated' && session?.user?.role === 'AGENT') {
      router.push('/dashboard');
    }
  }, [status, router, session]);

  // Effect: Load rated persons when entering view mode or changing view type
  useEffect(() => {
    if (viewMode === 'view' && status === 'authenticated' && session?.user?.role !== 'AGENT') {
      if (viewType === 'received') {
        fetchReceivedRatings();
      } else {
        fetchSentRatings();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, viewType, status]);

  // Search employees for rating
  const searchEmployees = async () => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      setError('');
      return;
    }

    if (searchQuery.trim().length < 2) {
      setError('Please enter at least 2 characters to search');
      return;
    }

    try {
      setIsSearching(true);
      setError('');
      
      const response = await fetch(
        `/api/users/search?search=${encodeURIComponent(searchQuery)}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to search employees');
      }
      
      const data = await response.json();
      // Filter out agents
      const filtered = data.filter((emp: Employee) => emp.role !== 'AGENT');
      
      if (filtered.length === 0) {
        setError('No employees found');
      } else {
        setError('');
      }
      
      setSearchResults(filtered);
      setSearchResultsPage(1);
    } catch (err) {
      setError('Failed to search employees');
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search input
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery) {
        searchEmployees();
      } else {
        setSearchResults([]);
        setError('');
      }
    }, 300);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchQuery]);

  // Fetch all ratings received by current user (aggregated view)
  const fetchReceivedRatings = async () => {
    try {
      setIsLoadingPersons(true);
      setError('');
      
      const response = await fetch('/api/ratings/internal?viewMode=received');
      if (!response.ok) throw new Error('Failed to fetch ratings');
      
      const data = await response.json();
      
      // Group ratings by rater
      const grouped = new Map<string, RatedPerson>();
      
      data.forEach((rating: InternalRating) => {
        const key = rating.rater.id;
        if (!grouped.has(key)) {
          grouped.set(key, {
            ratedId: rating.rater.id,
            ratedName: rating.rater.name,
            ratedRole: rating.rater.role,
            totalRatings: 0,
            averageScore: 0,
          });
        }
        
        const person = grouped.get(key)!;
        person.totalRatings += 1;
        person.averageScore = (person.averageScore * (person.totalRatings - 1) + rating.score) / person.totalRatings;
      });
      
      setRatedPersons(Array.from(grouped.values()).sort((a, b) => b.averageScore - a.averageScore));
      setPersonsPage(1);
    } catch (err) {
      setError('Failed to load ratings');
    } finally {
      setIsLoadingPersons(false);
    }
  };

  // Fetch all ratings sent by current user (aggregated view)
  const fetchSentRatings = async () => {
    try {
      setIsLoadingPersons(true);
      setError('');
      
      const response = await fetch('/api/ratings/internal?viewMode=sent');
      if (!response.ok) throw new Error('Failed to fetch ratings');
      
      const data = await response.json();
      
      // Group ratings by rated person
      const grouped = new Map<string, RatedPerson>();
      
      data.forEach((rating: InternalRating) => {
        const key = rating.rated.id;
        if (!grouped.has(key)) {
          grouped.set(key, {
            ratedId: rating.rated.id,
            ratedName: rating.rated.name,
            ratedRole: rating.rated.role,
            totalRatings: 0,
            averageScore: 0,
          });
        }
        
        const person = grouped.get(key)!;
        person.totalRatings += 1;
        person.averageScore = (person.averageScore * (person.totalRatings - 1) + rating.score) / person.totalRatings;
      });
      
      setRatedPersons(Array.from(grouped.values()).sort((a, b) => b.averageScore - a.averageScore));
      setPersonsPage(1);
    } catch (err) {
      setError('Failed to load ratings');
    } finally {
      setIsLoadingPersons(false);
    }
  };

  // Fetch raters/ratings for a selected person (depends on view type)
  const fetchRatersForPerson = async (personId: string) => {
    try {
      setIsLoadingRaters(true);
      let url = `/api/ratings/internal?personId=${personId}`;
      if (viewType === 'received') {
        url += '&filterType=receivedFrom';
      } else {
        url += '&filterType=sentTo';
      }
      
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch raters');
      
      const data = await response.json();
      
      // Group ratings by rater (for received) or just collect (for sent)
      const grouped = new Map<string, RaterGroup>();
      
      data.forEach((rating: InternalRating) => {
        const key = viewType === 'received' ? rating.rater.id : rating.rated.id;
        const rater = viewType === 'received' ? rating.rater : rating.rated;
        
        if (!grouped.has(key)) {
          grouped.set(key, {
            raterId: key,
            raterName: rater.name,
            raterRole: rater.role,
            isAnonymous: rating.isAnonymous,
            ratings: [],
            averageScore: 0,
          });
        }
        
        grouped.get(key)!.ratings.push(rating);
      });

      setRaters(
        Array.from(grouped.values()).map(g => ({
          ...g,
          averageScore: g.ratings.reduce((sum, r) => sum + r.score, 0) / g.ratings.length,
        }))
      );
      
      setRatersPage(1);
    } catch (err) {
      setError('Failed to load raters');
    } finally {
      setIsLoadingRaters(false);
    }
  };

  // Handle selecting a person to view raters
  const handleSelectPerson = (person: RatedPerson) => {
    setSelectedPerson(person);
    setSelectedRater(null);
    fetchRatersForPerson(person.ratedId);
  };

  // Handle submitting a rating
  const handleSubmitRating = async () => {
    if (!selectedEmployee || Object.keys(ratings).length === 0) {
      setError('Please select an employee and rate at least one category');
      return;
    }

    try {
      setIsSubmitting(true);
      setError('');
      
      // Submit each category rating individually
      const ratingEntries = Object.entries(ratings);
      
      for (const [category, score] of ratingEntries) {
        const ratingData = {
          ratedId: selectedEmployee.id,
          category,
          score: parseInt(score as any),
          feedbackText: feedback.trim() || null,
          isAnonymous,
        };

        const response = await fetch('/api/ratings/internal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ratingData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to submit rating');
        }
      }

      toast.success('Rating submitted successfully!');
      setSelectedEmployee(null);
      setRatings({});
      setFeedback('');
      setIsAnonymous(false);
      setSearchQuery('');
    } catch (err: any) {
      const errorMessage = err?.message || 'Failed to submit rating';
      setError(errorMessage);
      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Pagination helpers
  const getPageItems = <T,>(items: T[], page: number, itemsPerPage: number) => {
    const startIdx = (page - 1) * itemsPerPage;
    return items.slice(startIdx, startIdx + itemsPerPage);
  };

  const getTotalPages = (total: number, itemsPerPage: number) => {
    return Math.ceil(total / itemsPerPage);
  };

  if (status === 'loading') {
    return (
      <DashboardLayout>
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-neutral-600">Loading...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  const currentSearchResults = getPageItems(searchResults, searchResultsPage, ITEMS_PER_PAGE);
  const searchTotalPages = getTotalPages(searchResults.length, ITEMS_PER_PAGE);

  const currentPersons = getPageItems(ratedPersons, personsPage, ITEMS_PER_PAGE);
  const personsTotalPages = getTotalPages(ratedPersons.length, ITEMS_PER_PAGE);

  const currentRaters = getPageItems(raters, ratersPage, ITEMS_PER_PAGE);
  const ratersTotalPages = getTotalPages(raters.length, ITEMS_PER_PAGE);

  return (
    <DashboardLayout>
      <div className="w-full max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Internal Ratings</h1>
          <p className="text-neutral-600">
            {viewMode === 'submit'
              ? 'Rate employees within your organization'
              : 'View ratings received by team members'}
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex gap-4 mb-8">
          <button
            onClick={() => setViewMode('submit')}
            className={`px-6 py-3 rounded-lg font-medium transition-colors ${
              viewMode === 'submit'
                ? 'bg-primary-600 text-white'
                : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
            }`}
          >
            Submit Rating
          </button>
          {(session?.user?.role === 'HOD' || session?.user?.role === 'ADMIN' || session?.user?.role === 'EMPLOYEE') && (
            <button
              onClick={() => setViewMode('view')}
              className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                viewMode === 'view'
                  ? 'bg-primary-600 text-white'
                  : 'bg-neutral-100 text-neutral-900 hover:bg-neutral-200'
              }`}
            >
              View Ratings
            </button>
          )}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Submit Mode */}
        {viewMode === 'submit' && (
          <div className="space-y-8">
            {!selectedEmployee ? (
              <>
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-4">Search Employee to Rate</h2>
                  
                  <div className="mb-6">
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                    />
                  </div>

                  {isSearching && (
                    <div className="flex justify-center py-8">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  )}

                  {!isSearching && searchResults.length > 0 && (
                    <>
                      <div className="grid gap-4 mb-6">
                        {currentSearchResults.map((emp) => (
                          <button
                            key={emp.id}
                            onClick={() => setSelectedEmployee(emp)}
                            className="text-left p-4 border border-neutral-200 rounded-lg hover:border-primary-600 hover:bg-primary-50 transition-colors"
                          >
                            <p className="font-semibold text-neutral-900">{emp.name}</p>
                            <p className="text-sm text-neutral-600">{emp.role}</p>
                            {emp.email && <p className="text-sm text-neutral-600">{emp.email}</p>}
                          </button>
                        ))}
                      </div>

                      {searchTotalPages > 1 && (
                        <div className="flex items-center justify-between">
                          <p className="text-sm text-neutral-600">
                            Page {searchResultsPage} of {searchTotalPages}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setSearchResultsPage(p => Math.max(1, p - 1))}
                              disabled={searchResultsPage === 1}
                              className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setSearchResultsPage(p => Math.min(searchTotalPages, p + 1))}
                              disabled={searchResultsPage === searchTotalPages}
                              className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <button
                    onClick={() => setSelectedEmployee(null)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-4"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Search
                  </button>

                  <h2 className="text-2xl font-semibold text-neutral-900 mb-1">
                    {selectedEmployee.name}
                  </h2>
                  <p className="text-neutral-600 mb-6">{selectedEmployee.role}</p>

                  <div className="space-y-6">
                    {RATING_CATEGORIES.map((category) => (
                      <div key={category.id} className="border-b border-neutral-200 pb-6 last:border-b-0 last:pb-0">
                        <div className="mb-4">
                          <h3 className="font-semibold text-neutral-900 mb-1">{category.label}</h3>
                          <p className="text-sm text-neutral-600">{category.description}</p>
                        </div>
                        <div className="flex gap-2">
                          {[1, 2, 3, 4, 5].map((score) => (
                            <button
                              key={score}
                              onClick={() => setRatings(prev => ({ ...prev, [category.id]: score }))}
                              className={`flex items-center justify-center w-12 h-12 rounded-lg border-2 transition-colors ${
                                ratings[category.id] === score
                                  ? 'border-primary-600 bg-primary-50'
                                  : 'border-neutral-300 hover:border-primary-600'
                              }`}
                            >
                              <span className="font-semibold">{score}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-8 pt-6 border-t border-neutral-200">
                    <label className="block mb-4">
                      <textarea
                        placeholder="Add feedback (optional)"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        className="w-full px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-600"
                        rows={4}
                      />
                    </label>

                    <label className="flex items-center gap-3 mb-6">
                      <input
                        type="checkbox"
                        checked={isAnonymous}
                        onChange={(e) => setIsAnonymous(e.target.checked)}
                        className="w-4 h-4 rounded border-neutral-300"
                      />
                      <span className="text-neutral-700">Submit as anonymous</span>
                    </label>

                    <button
                      onClick={handleSubmitRating}
                      disabled={isSubmitting}
                      className="w-full bg-primary-600 text-white py-3 rounded-lg font-semibold hover:bg-primary-700 disabled:opacity-50 transition-colors"
                    >
                      {isSubmitting ? 'Submitting...' : 'Submit Rating'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* View Mode */}
        {viewMode === 'view' && (
          <div className="space-y-8">
            {/* View Type Toggle */}
            <div className="flex gap-2 bg-white p-2 rounded-lg border border-neutral-200 w-fit">
              <button
                onClick={() => {
                  setViewType('received');
                  setSelectedPerson(null);
                  setSelectedRater(null);
                }}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  viewType === 'received'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Ratings Received
              </button>
              <button
                onClick={() => {
                  setViewType('sent');
                  setSelectedPerson(null);
                  setSelectedRater(null);
                }}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  viewType === 'sent'
                    ? 'bg-primary-600 text-white'
                    : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Ratings Sent
              </button>
            </div>

            {!selectedPerson ? (
              <>
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <h2 className="text-xl font-semibold text-neutral-900 mb-6">
                    {viewType === 'received' ? 'People Who Rated Me' : 'People I Rated'}
                  </h2>

                  {isLoadingPersons ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  ) : ratedPersons.length === 0 ? (
                    <p className="text-center text-neutral-600 py-12">No ratings available</p>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                        {currentPersons.map((person) => (
                          <button
                            key={person.ratedId}
                            onClick={() => handleSelectPerson(person)}
                            className="text-left p-6 border border-neutral-200 rounded-lg hover:border-primary-600 hover:shadow-md transition-all"
                          >
                            <h3 className="font-semibold text-neutral-900 mb-2">{person.ratedName}</h3>
                            <p className="text-sm text-neutral-600 mb-4">{person.ratedRole}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < Math.round(person.averageScore)
                                          ? 'fill-amber-400 text-amber-400'
                                          : 'text-neutral-300'
                                      }`}
                                    />
                                  ))}
                                </div>
                                <span className="text-lg font-bold text-primary-600">
                                  {person.averageScore.toFixed(1)}
                                </span>
                              </div>
                              <span className="text-sm text-neutral-600">
                                {person.totalRatings} rating{person.totalRatings !== 1 ? 's' : ''}
                              </span>
                            </div>
                          </button>
                        ))}
                      </div>

                      {personsTotalPages > 1 && (
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                          <p className="text-sm text-neutral-600">
                            Page {personsPage} of {personsTotalPages}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setPersonsPage(p => Math.max(1, p - 1))}
                              disabled={personsPage === 1}
                              className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setPersonsPage(p => Math.min(personsTotalPages, p + 1))}
                              disabled={personsPage === personsTotalPages}
                              className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : !selectedRater ? (
              <>
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <button
                    onClick={() => {
                      setSelectedPerson(null);
                      setSelectedRater(null);
                    }}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to {viewType === 'received' ? 'People' : 'Employees'}
                  </button>

                  <div className="mb-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
                    <h2 className="text-2xl font-semibold text-neutral-900 mb-2">
                      {selectedPerson.ratedName}
                    </h2>
                    <p className="text-neutral-600 mb-4">{selectedPerson.ratedRole}</p>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-5 h-5 ${
                                i < Math.round(selectedPerson.averageScore)
                                  ? 'fill-amber-400 text-amber-400'
                                  : 'text-neutral-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-2xl font-bold text-primary-600">
                          {selectedPerson.averageScore.toFixed(1)}
                        </span>
                      </div>
                      <div>
                        <p className="text-lg font-semibold text-neutral-900">
                          {selectedPerson.totalRatings}
                        </p>
                        <p className="text-sm text-neutral-600">
                          Total Rating{selectedPerson.totalRatings !== 1 ? 's' : ''}
                        </p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">
                    {viewType === 'received' ? 'Rating Details' : 'My Rating Details'}
                  </h3>

                  {isLoadingRaters ? (
                    <div className="flex justify-center py-12">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
                    </div>
                  ) : raters.length === 0 ? (
                    <p className="text-center text-neutral-600 py-8">No ratings found</p>
                  ) : (
                    <>
                      <div className="space-y-4 mb-6">
                        {currentRaters.map((rater) => (
                          <button
                            key={rater.raterId}
                            onClick={() => setSelectedRater(rater)}
                            className="w-full text-left p-6 border border-neutral-200 rounded-lg hover:border-primary-600 hover:shadow-md transition-all"
                          >
                            <div className="flex items-center justify-between">
                              <div>
                                <h4 className="font-semibold text-neutral-900">
                                  {rater.isAnonymous ? 'Anonymous' : rater.raterName}
                                </h4>
                                {!rater.isAnonymous && (
                                  <p className="text-sm text-neutral-600">{rater.raterRole}</p>
                                )}
                                <p className="text-sm text-neutral-600 mt-2">
                                  {rater.ratings.length} rating{rater.ratings.length !== 1 ? 's' : ''}
                                </p>
                              </div>
                              <div className="flex items-center gap-3">
                                <div className="text-right">
                                  <div className="flex justify-end gap-1">
                                    {[...Array(5)].map((_, i) => (
                                      <Star
                                        key={i}
                                        className={`w-4 h-4 ${
                                          i < Math.round(rater.averageScore)
                                            ? 'fill-amber-400 text-amber-400'
                                            : 'text-neutral-300'
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  <p className="text-lg font-bold text-primary-600">
                                    {rater.averageScore.toFixed(1)}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </button>
                        ))}
                      </div>

                      {ratersTotalPages > 1 && (
                        <div className="flex items-center justify-between pt-6 border-t border-neutral-200">
                          <p className="text-sm text-neutral-600">
                            Page {ratersPage} of {ratersTotalPages}
                          </p>
                          <div className="flex gap-2">
                            <button
                              onClick={() => setRatersPage(p => Math.max(1, p - 1))}
                              disabled={ratersPage === 1}
                              className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                            >
                              <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => setRatersPage(p => Math.min(ratersTotalPages, p + 1))}
                              disabled={ratersPage === ratersTotalPages}
                              className="p-2 border border-neutral-300 rounded-lg hover:bg-neutral-50 disabled:opacity-50"
                            >
                              <ChevronRight className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="bg-white rounded-lg border border-neutral-200 p-6">
                  <button
                    onClick={() => setSelectedRater(null)}
                    className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6"
                  >
                    <ArrowLeft className="w-4 h-4" />
                    Back to Raters
                  </button>

                  <div className="mb-8 p-6 bg-primary-50 border border-primary-200 rounded-lg">
                    <h3 className="text-lg font-semibold text-neutral-900 mb-1">
                      {viewType === 'received' 
                        ? `Rated by: ${selectedRater.isAnonymous ? 'Anonymous' : selectedRater.raterName}`
                        : `My rating for: ${selectedRater.raterName}`
                      }
                    </h3>
                    {!selectedRater.isAnonymous && (
                      <p className="text-neutral-600">{selectedRater.raterRole}</p>
                    )}
                  </div>

                  <h4 className="font-semibold text-neutral-900 mb-4">Ratings Details</h4>
                  <div className="space-y-6">
                    {selectedRater.ratings.map((rating) => (
                      <div key={rating.id} className="border border-neutral-200 rounded-lg p-6">
                        <div className="flex items-start justify-between">
                          <div>
                            <h5 className="font-semibold text-neutral-900">{rating.category}</h5>
                          </div>
                          <div className="text-right">
                            <p className="text-3xl font-bold text-primary-600">{rating.score}</p>
                            <p className="text-sm text-neutral-600">/5</p>
                          </div>
                        </div>
                        <p className="text-xs text-neutral-400 mt-2">
                          {new Date(rating.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </p>
                      </div>
                    ))}
                    
                    {/* Feedback Card - shown only if feedback exists */}
                    {selectedRater.ratings.some(r => r.feedbackText) && (
                      <div className="border border-primary-200 bg-primary-50 rounded-lg p-6">
                        <h5 className="font-semibold text-neutral-900 mb-3">Feedback</h5>
                        <p className="text-neutral-700">
                          {selectedRater.ratings.find(r => r.feedbackText)?.feedbackText}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
