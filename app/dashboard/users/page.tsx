'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { UserCheck, UserX, Search } from 'lucide-react';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  department?: { name: string };
  employeeId?: string;
  createdAt: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchQuery, statusFilter, users]);

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users');
      if (response.ok) {
        const data = await response.json();
        setUsers(data);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
      toast.error('Failed to load users');
    } finally {
      setIsLoading(false);
    }
  };

  const filterUsers = () => {
    let filtered = users;

    if (searchQuery) {
      filtered = filtered.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (statusFilter !== 'ALL') {
      filtered = filtered.filter(user => user.status === statusFilter);
    }

    setFilteredUsers(filtered);
  };

  const handleApprove = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/approve`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to approve user');

      toast.success('User approved successfully');
      fetchUsers();
    } catch (error) {
      console.error('Error approving user:', error);
      toast.error('Failed to approve user');
    }
  };

  const handleReject = async (userId: string) => {
    if (!confirm('Are you sure you want to reject this user?')) return;

    try {
      const response = await fetch(`/api/users/${userId}/reject`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to reject user');

      toast.success('User rejected');
      fetchUsers();
    } catch (error) {
      console.error('Error rejecting user:', error);
      toast.error('Failed to reject user');
    }
  };

  const handleActivate = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/activate`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to activate user');

      toast.success('User activated');
      fetchUsers();
    } catch (error) {
      console.error('Error activating user:', error);
      toast.error('Failed to activate user');
    }
  };

  const handleDeactivate = async (userId: string) => {
    if (!confirm('Are you sure you want to deactivate this user?')) return;

    try {
      const response = await fetch(`/api/users/${userId}/deactivate`, {
        method: 'PUT',
      });

      if (!response.ok) throw new Error('Failed to deactivate user');

      toast.success('User deactivated');
      fetchUsers();
    } catch (error) {
      console.error('Error deactivating user:', error);
      toast.error('Failed to deactivate user');
    }
  };

  const handleDelete = async (userId: string) => {
    if (!confirm('This will permanently delete the user and related data. Continue?')) return;

    try {
      const response = await fetch(`/api/users/${userId}/delete`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      toast.success('User deleted');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Failed to delete user');
    }
  };

  const pendingCount = users.filter(u => u.status === 'PENDING').length;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">User Management</h1>
          <p className="text-neutral-600 mt-2">
            Approve registrations and manage system users
          </p>
        </div>

        {pendingCount > 0 && (
          <div className="alert alert-warning">
            <span className="font-semibold">{pendingCount} pending approval{pendingCount > 1 ? 's' : ''}</span>
          </div>
        )}

        <div className="card">
          <div className="card-body">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="input w-full md:w-48"
              >
                <option value="ALL">All Status</option>
                <option value="PENDING">Pending</option>
                <option value="APPROVED">Approved</option>
                <option value="REJECTED">Rejected</option>
              </select>
            </div>

            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : filteredUsers.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Role</th>
                      <th>Department</th>
                      <th>Status</th>
                      <th>Registered</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredUsers.map((user) => (
                      <tr key={user.id}>
                        <td>
                          <div>
                            <div className="font-semibold text-neutral-900">{user.name}</div>
                            <div className="text-sm text-neutral-500">{user.email}</div>
                            {user.employeeId && (
                              <div className="text-xs text-neutral-400">ID: {user.employeeId}</div>
                            )}
                          </div>
                        </td>
                        <td>
                          <span className="badge badge-info">{user.role}</span>
                        </td>
                        <td>{user.department?.name || '-'}</td>
                        <td>
                          {user.status === 'APPROVED' && <span className="badge badge-success">Approved</span>}
                          {user.status === 'PENDING' && <span className="badge badge-warning">Pending</span>}
                          {user.status === 'REJECTED' && <span className="badge badge-danger">Rejected</span>}
                        </td>
                        <td className="text-sm text-neutral-600">
                          {new Date(user.createdAt).toLocaleDateString()}
                        </td>
                        <td>
                          {user.status === 'PENDING' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleApprove(user.id)}
                                className="btn btn-sm btn-primary"
                                title="Approve"
                              >
                                <UserCheck className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleReject(user.id)}
                                className="btn btn-sm btn-danger"
                                title="Reject"
                              >
                                <UserX className="w-4 h-4" />
                              </button>
                            </div>
                          )}

                          {user.status === 'APPROVED' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleDeactivate(user.id)}
                                className="btn btn-sm btn-warning"
                                title="Deactivate"
                              >
                                Deactivate
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="btn btn-sm btn-danger"
                                title="Delete"
                              >
                                Delete
                              </button>
                            </div>
                          )}

                          {user.status === 'REJECTED' && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleActivate(user.id)}
                                className="btn btn-sm btn-primary"
                                title="Activate"
                              >
                                Activate
                              </button>
                              <button
                                onClick={() => handleDelete(user.id)}
                                className="btn btn-sm btn-danger"
                                title="Delete"
                              >
                                Delete
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-12 text-neutral-500">
                No users found
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}