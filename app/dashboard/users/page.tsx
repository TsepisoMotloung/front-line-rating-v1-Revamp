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
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [bulkAction, setBulkAction] = useState<string>('');

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    filterUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  const toggleUserSelection = (userId: string) => {
    const newSelected = new Set(selectedUsers);
    if (newSelected.has(userId)) {
      newSelected.delete(userId);
    } else {
      newSelected.add(userId);
    }
    setSelectedUsers(newSelected);
  };

  const selectAllUsers = () => {
    if (selectedUsers.size === filteredUsers.length) {
      setSelectedUsers(new Set());
    } else {
      setSelectedUsers(new Set(filteredUsers.map(u => u.id)));
    }
  };

  const executeBulkAction = async () => {
    if (selectedUsers.size === 0) {
      toast.error('Please select at least one user');
      return;
    }

    if (!bulkAction) {
      toast.error('Please select an action');
      return;
    }

    if (!confirm(`Apply "${bulkAction}" to ${selectedUsers.size} user(s)? This action cannot be undone.`)) {
      return;
    }

    try {
      let actionUrl = '';
      if (bulkAction === 'APPROVE') actionUrl = '/api/users/{id}/approve';
      else if (bulkAction === 'REJECT') actionUrl = '/api/users/{id}/reject';
      else if (bulkAction === 'ACTIVATE') actionUrl = '/api/users/{id}/activate';
      else if (bulkAction === 'DEACTIVATE') actionUrl = '/api/users/{id}/deactivate';
      else if (bulkAction === 'DELETE') actionUrl = '/api/users/{id}/delete';

      let successCount = 0;
      const errors: string[] = [];

      for (const userId of selectedUsers) {
        try {
          const url = actionUrl.replace('{id}', userId);
          const method = bulkAction === 'DELETE' ? 'DELETE' : 'PUT';
          const response = await fetch(url, { method });
          if (response.ok) {
            successCount++;
          } else {
            errors.push(`Failed to ${bulkAction} user ${userId}`);
          }
        } catch (error) {
          errors.push(`Error processing user ${userId}`);
        }
      }

      setSelectedUsers(new Set());
      setBulkAction('');
      fetchUsers();

      if (successCount > 0) {
        toast.success(`${bulkAction} applied to ${successCount} user(s)`);
      }
      if (errors.length > 0) {
        toast.error(`${errors.length} action(s) failed. Check console for details.`);
        console.error('Bulk action errors:', errors);
      }
    } catch (error) {
      console.error('Error executing bulk action:', error);
      toast.error('Failed to execute bulk action');
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
            <div className="space-y-4 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
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

              {selectedUsers.size > 0 && (
                <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="text-sm font-medium text-primary-900">
                    {selectedUsers.size} user(s) selected
                  </div>
                  <div className="flex gap-2">
                    <select
                      value={bulkAction}
                      onChange={(e) => setBulkAction(e.target.value)}
                      className="input text-sm"
                    >
                      <option value="">-- Select Action --</option>
                      <option value="APPROVE">Approve</option>
                      <option value="REJECT">Reject</option>
                      <option value="ACTIVATE">Activate</option>
                      <option value="DEACTIVATE">Deactivate</option>
                      <option value="DELETE">Delete</option>
                    </select>
                    <button
                      onClick={executeBulkAction}
                      className="btn btn-sm btn-primary"
                      disabled={!bulkAction}
                    >
                      Apply
                    </button>
                    <button
                      onClick={() => setSelectedUsers(new Set())}
                      className="btn btn-sm btn-secondary"
                    >
                      Clear Selection
                    </button>
                  </div>
                </div>
              )}
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
                      <th className="w-12">
                        <input
                          type="checkbox"
                          checked={selectedUsers.size === filteredUsers.length && filteredUsers.length > 0}
                          onChange={selectAllUsers}
                          className="checkbox"
                          title="Select all"
                        />
                      </th>
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
                          <input
                            type="checkbox"
                            checked={selectedUsers.has(user.id)}
                            onChange={() => toggleUserSelection(user.id)}
                            className="checkbox"
                          />
                        </td>
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