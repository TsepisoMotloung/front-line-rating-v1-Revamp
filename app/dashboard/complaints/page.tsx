'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/DashboardLayout';
import { MessageSquare, CheckCircle, Clock, User, Calendar, Star } from 'lucide-react';
import toast from 'react-hot-toast';

interface Complaint {
  id: string;
  customerName: string;
  customerContact: string;
  feedbackText: string;
  complaintStatus: string;
  createdAt: string;
  agent: {
    name: string;
    employeeId: string;
  };
  responses: Array<{
    score: number;
    question: {
      questionText: string;
    };
  }>;
}

export default function ComplaintsPage() {
  const { data: session } = useSession();
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [filteredComplaints, setFilteredComplaints] = useState<Complaint[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);

  useEffect(() => {
    fetchComplaints();
  }, []);

  useEffect(() => {
    filterComplaints();
  }, [statusFilter, complaints]);

  const fetchComplaints = async () => {
    try {
      const params = new URLSearchParams({ isComplaint: 'true' });
      
      if (session?.user.role === 'AGENT') {
        params.append('agentId', session.user.id);
      } else if (session?.user.role === 'HOD' && session.user.departmentId) {
        params.append('departmentId', session.user.departmentId);
      }

      const response = await fetch(`/api/ratings?${params}`);
      if (response.ok) {
        const data = await response.json();
        setComplaints(data);
      }
    } catch (error) {
      console.error('Error fetching complaints:', error);
      toast.error('Failed to load complaints');
    } finally {
      setIsLoading(false);
    }
  };

  const filterComplaints = () => {
    if (statusFilter === 'ALL') {
      setFilteredComplaints(complaints);
    } else {
      setFilteredComplaints(complaints.filter(c => c.complaintStatus === statusFilter));
    }
  };

  const handleResolve = async (complaintId: string) => {
    try {
      const response = await fetch(`/api/complaints/${complaintId}/resolve`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to resolve complaint');

      toast.success('Complaint resolved successfully');
      setSelectedComplaint(null);
      fetchComplaints();
    } catch (error) {
      console.error('Error resolving complaint:', error);
      toast.error('Failed to resolve complaint');
    }
  };

  const openComplaint = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
  };

  const closeModal = () => {
    setSelectedComplaint(null);
  };

  const calculateAverage = (responses: any[]) => {
    if (!responses || responses.length === 0) return 0;
    const sum = responses.reduce((acc, r) => acc + r.score, 0);
    return (sum / responses.length).toFixed(1);
  };

  const openCount = complaints.filter(c => c.complaintStatus === 'OPEN').length;
  const resolvedCount = complaints.filter(c => c.complaintStatus === 'RESOLVED').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Complaints Management</h1>
          <p className="text-neutral-600 mt-2">
            Review and resolve customer complaints
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-600">Total Complaints</span>
              <MessageSquare className="w-5 h-5 text-neutral-400" />
            </div>
            <p className="text-3xl font-bold text-neutral-900">{complaints.length}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-600">Open</span>
              <Clock className="w-5 h-5 text-orange-500" />
            </div>
            <p className="text-3xl font-bold text-orange-600">{openCount}</p>
          </div>

          <div className="stat-card">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-neutral-600">Resolved</span>
              <CheckCircle className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-green-600">{resolvedCount}</p>
          </div>
        </div>

        {/* Filters */}
        <div className="card">
          <div className="card-body">
            <div className="flex items-center space-x-4">
              <label className="text-sm font-medium text-neutral-700">Filter by status:</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-48"
              >
                <option value="ALL">All Complaints</option>
                <option value="OPEN">Open</option>
                <option value="RESOLVED">Resolved</option>
              </select>
            </div>
          </div>
        </div>

        {/* Complaints List */}
        <div className="card">
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : filteredComplaints.length > 0 ? (
              <div className="space-y-4">
                {filteredComplaints.map((complaint) => (
                  <div
                    key={complaint.id}
                    className="p-4 border border-neutral-200 rounded-lg hover:border-primary-200 transition-colors cursor-pointer"
                    onClick={() => openComplaint(complaint)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className="font-semibold text-neutral-900">
                            {complaint.customerName}
                          </h3>
                          {complaint.complaintStatus === 'OPEN' ? (
                            <span className="badge badge-danger text-xs">Open</span>
                          ) : (
                            <span className="badge badge-success text-xs">Resolved</span>
                          )}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-neutral-600 mb-2">
                          <div className="flex items-center space-x-1">
                            <User className="w-4 h-4" />
                            <span>Agent: {complaint.agent.name}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500" />
                            <span>Rating: {calculateAverage(complaint.responses)}/5.0</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(complaint.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <p className="text-neutral-700 line-clamp-2">
                          {complaint.feedbackText || 'No additional feedback provided'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
                <p className="text-neutral-600">No complaints found</p>
                <p className="text-sm text-neutral-500 mt-1">
                  {statusFilter === 'OPEN' ? 'All complaints have been resolved!' : 'Great work maintaining customer satisfaction!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Complaint Detail Modal */}
      {selectedComplaint && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-neutral-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-neutral-900">Complaint Details</h2>
                  {selectedComplaint.complaintStatus === 'OPEN' ? (
                    <span className="badge badge-danger mt-2">Open</span>
                  ) : (
                    <span className="badge badge-success mt-2">Resolved</span>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Customer Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Name:</span>
                    <span className="font-medium text-neutral-900">{selectedComplaint.customerName}</span>
                  </div>
                  {selectedComplaint.customerContact && (
                    <div className="flex justify-between">
                      <span className="text-neutral-600">Contact:</span>
                      <span className="font-medium text-neutral-900">{selectedComplaint.customerContact}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Date:</span>
                    <span className="font-medium text-neutral-900">
                      {new Date(selectedComplaint.createdAt).toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>

              {/* Agent Info */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Agent Information</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Name:</span>
                    <span className="font-medium text-neutral-900">{selectedComplaint.agent.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-neutral-600">Employee ID:</span>
                    <span className="font-medium text-neutral-900">{selectedComplaint.agent.employeeId}</span>
                  </div>
                </div>
              </div>

              {/* Ratings */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Rating Details</h3>
                <div className="space-y-3">
                  {selectedComplaint.responses.map((response, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-neutral-50 rounded-lg">
                      <span className="text-sm text-neutral-700">{response.question.questionText}</span>
                      <div className="flex items-center space-x-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-4 h-4 ${
                              star <= response.score ? 'text-yellow-500 fill-yellow-500' : 'text-neutral-300'
                            }`}
                          />
                        ))}
                        <span className="ml-2 text-sm font-medium">{response.score}/5</span>
                      </div>
                    </div>
                  ))}
                  <div className="flex justify-between items-center p-3 bg-primary-50 border border-primary-200 rounded-lg">
                    <span className="font-semibold text-neutral-900">Average Rating</span>
                    <span className="text-lg font-bold text-primary-600">
                      {calculateAverage(selectedComplaint.responses)}/5.0
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback */}
              <div>
                <h3 className="font-semibold text-neutral-900 mb-3">Customer Feedback</h3>
                <div className="p-4 bg-neutral-50 border border-neutral-200 rounded-lg">
                  <p className="text-neutral-700">
                    {selectedComplaint.feedbackText || 'No additional feedback provided'}
                  </p>
                </div>
              </div>
            </div>

            <div className="p-6 border-t border-neutral-200 flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="btn btn-secondary"
              >
                Close
              </button>
              {selectedComplaint.complaintStatus === 'OPEN' && (
                session?.user.role === 'HOD' || session?.user.role === 'ADMIN'
              ) && (
                <button
                  onClick={() => handleResolve(selectedComplaint.id)}
                  className="btn btn-primary flex items-center space-x-2"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>Mark as Resolved</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}