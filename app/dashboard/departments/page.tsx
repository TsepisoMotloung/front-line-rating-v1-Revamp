'use client';

import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/DashboardLayout';
import { Plus, Edit, Trash2, Building2, Users } from 'lucide-react';
import toast from 'react-hot-toast';

interface Department {
  id: string;
  name: string;
  description: string;
  isActive: boolean;
  _count?: {
    users: number;
    questions: number;
  };
}

export default function DepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingDepartment, setEditingDepartment] = useState<Department | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    isActive: true,
  });

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = async () => {
    try {
      const response = await fetch('/api/departments?includeStats=true');
      if (response.ok) {
        const data = await response.json();
        setDepartments(data);
      }
    } catch (error) {
      console.error('Error fetching departments:', error);
      toast.error('Failed to load departments');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenModal = (department?: Department) => {
    if (department) {
      setEditingDepartment(department);
      setFormData({
        name: department.name,
        description: department.description || '',
        isActive: department.isActive,
      });
    } else {
      setEditingDepartment(null);
      setFormData({
        name: '',
        description: '',
        isActive: true,
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingDepartment(null);
    setFormData({ name: '', description: '', isActive: true });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const url = editingDepartment
        ? `/api/departments/${editingDepartment.id}`
        : '/api/departments';
      
      const method = editingDepartment ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save department');

      toast.success(editingDepartment ? 'Department updated!' : 'Department created!');
      handleCloseModal();
      fetchDepartments();
    } catch (error) {
      console.error('Error saving department:', error);
      toast.error('Failed to save department');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this department? This action cannot be undone.')) {
      return;
    }

    try {
      const response = await fetch(`/api/departments/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to delete department');
      }

      toast.success('Department deleted!');
      fetchDepartments();
    } catch (error: any) {
      console.error('Error deleting department:', error);
      toast.error(error.message || 'Failed to delete department');
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900">Departments</h1>
            <p className="text-neutral-600 mt-2">
              Manage organizational departments and their settings
            </p>
          </div>
          <button
            onClick={() => handleOpenModal()}
            className="btn btn-primary flex items-center space-x-2"
          >
            <Plus className="w-5 h-5" />
            <span>Add Department</span>
          </button>
        </div>

        <div className="card">
          <div className="card-body">
            {isLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
              </div>
            ) : departments.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((department) => (
                  <div
                    key={department.id}
                    className="p-6 border border-neutral-200 rounded-lg hover:border-primary-200 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-primary-100 rounded-lg flex items-center justify-center">
                          <Building2 className="w-6 h-6 text-primary-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-neutral-900">{department.name}</h3>
                          {department.isActive ? (
                            <span className="badge badge-success text-xs">Active</span>
                          ) : (
                            <span className="badge badge-danger text-xs">Inactive</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {department.description && (
                      <p className="text-sm text-neutral-600 mb-4 line-clamp-2">
                        {department.description}
                      </p>
                    )}

                    <div className="flex items-center justify-between text-sm text-neutral-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4" />
                        <span>{department._count?.users || 0} members</span>
                      </div>
                      <div>
                        {department._count?.questions || 0} questions
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-4 border-t">
                      <button
                        onClick={() => handleOpenModal(department)}
                        className="btn btn-sm btn-secondary flex items-center space-x-1 flex-1"
                      >
                        <Edit className="w-4 h-4" />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => handleDelete(department.id)}
                        className="btn btn-sm btn-danger"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Building2 className="w-12 h-12 text-neutral-400 mx-auto mb-3" />
                <p className="text-neutral-600 mb-4">No departments yet</p>
                <button
                  onClick={() => handleOpenModal()}
                  className="btn btn-primary"
                >
                  Create Your First Department
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-xl w-full">
            <div className="p-6 border-b border-neutral-200">
              <h2 className="text-xl font-bold text-neutral-900">
                {editingDepartment ? 'Edit Department' : 'Add New Department'}
              </h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div>
                <label htmlFor="name" className="label">
                  Department Name *
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="input"
                  placeholder="e.g., Sales, IT, Customer Service"
                />
              </div>

              <div>
                <label htmlFor="description" className="label">
                  Description
                </label>
                <textarea
                  id="description"
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="input"
                  placeholder="Brief description of the department..."
                />
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isActive"
                  checked={formData.isActive}
                  onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
                  className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-neutral-300 rounded"
                />
                <label htmlFor="isActive" className="ml-2 text-sm text-neutral-700">
                  Active (department is visible and operational)
                </label>
              </div>

              <div className="flex justify-end space-x-3 pt-4 border-t">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  {editingDepartment ? 'Update Department' : 'Create Department'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}