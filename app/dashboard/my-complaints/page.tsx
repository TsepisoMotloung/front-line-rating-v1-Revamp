'use client'

import { useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import { MessageSquare } from 'lucide-react'
import DashboardLayout from '@/components/DashboardLayout'
import { formatDistanceToNow } from 'date-fns'
import type { Complaint } from '@/types'

export default function MyComplaintsPage() {
  const { data: session } = useSession()
  const [complaints, setComplaints] = useState<Complaint[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  useEffect(() => {
    let cancelled = false

    async function fetchComplaints() {
      setLoading(true)
      try {
        const res = await fetch(`/api/user/complaints?page=${page}`)
        const data = await res.json()
        if (!cancelled) {
          if (res.ok) {
            setComplaints(data.complaints || [])
            setTotalPages(data.pagination?.pages || 1)
          } else {
            console.error('Failed to fetch complaints', data)
          }
        }
      } catch (err) {
        if (!cancelled) console.error('Error fetching complaints:', err)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchComplaints()
    return () => {
      cancelled = true
    }
  }, [page])

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-neutral-50 to-white">
      <DashboardLayout>
        <div className="container-custom py-8">
          <div className="glass p-responsive rounded-xl shadow-lg">
            <h1 className="text-2xl font-bold text-neutral-900 mb-6">
              {session?.user?.role === 'AGENT' ? 'Complaints Received' : 'My Complaints'}
            </h1>

            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : complaints.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-lg border border-neutral-200">
                <p className="text-neutral-600">No complaints found.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {complaints.map((complaint) => (
                  <div key={complaint.id} className="bg-white rounded-lg p-6 border border-neutral-200 hover:border-primary-200 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-medium text-neutral-900">
                          {session?.user?.role === 'AGENT'
                            ? `Complaint from ${complaint.isAnonymous ? 'Anonymous' : complaint.customerName}`
                            : `Complaint against ${complaint.agent.name}`}
                        </h3>
                        <p className="text-sm text-neutral-500">
                          {complaint.department?.name} • {formatDistanceToNow(new Date(complaint.createdAt))} ago
                        </p>
                      </div>

                      <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                        complaint.complaintStatus === 'OPEN' ? 'bg-red-100 text-red-600' : 'bg-green-100 text-green-600'
                      }`}>
                        {complaint.complaintStatus}
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 mt-4">
                      <MessageSquare className="w-5 h-5 text-neutral-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-neutral-600">{complaint.feedbackText || 'No details provided.'}</p>
                      </div>
                    </div>

                    {complaint.resolvedAt && (
                      <div className="mt-4 pt-4 border-t border-neutral-100">
                        <p className="text-sm text-neutral-600">
                          <span className="font-medium">Resolution:</span> Complaint resolved on{' '}
                          {new Date(complaint.resolvedAt).toLocaleDateString()}
                          {complaint.resolvedBy && ` by ${complaint.resolvedBy}`}
                        </p>
                      </div>
                    )}

                    <div className="mt-4 pt-4 border-t border-neutral-100">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {complaint.responses.map((response) => (
                          <div key={response.id} className="flex items-center justify-between">
                            <span className="text-sm text-neutral-600">{response.question.questionText}</span>
                            <span className="text-sm font-medium">{response.score}/5</span>
                          </div>
                        ))}
                      </div>
                    </div>
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

        <footer className="bg-neutral-900 text-white py-8 mt-16">
          <div className="container-custom text-center">
            <img src="/logo.png" alt="Frontline Rating" className="h-8 w-6 mx-auto mb-2" />
            <p className="text-neutral-400">&copy; {new Date().getFullYear()} Frontline Rating System. All rights reserved.</p>
          </div>
        </footer>

      </DashboardLayout>
    </div>
  )
}
 