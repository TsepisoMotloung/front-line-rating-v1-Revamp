'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Mail, Lock, User, Phone, Building2, Hash, AlertCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Department {
  id: string;
  name: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    employeeId: '',
    role: 'AGENT',
    departmentId: '',
  });

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

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return false;
    }

    if (formData.password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }

    if (formData.role !== 'ADMIN' && !formData.departmentId) {
      setError('Please select a department');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      toast.success('Registration successful! Please wait for admin approval.');
      router.push('/auth/registration-success');
    } catch (error: any) {
      setError(error.message);
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-neutral-50 to-neutral-100 py-12 px-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Logo and Title */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center space-x-2 mb-4">
            <div className="w-12 h-12 bg-primary-600 rounded-lg flex items-center justify-center">
              <Star className="w-7 h-7 text-white" fill="white" />
            </div>
            <span className="text-2xl font-bold text-neutral-900">Frontline Rating</span>
          </Link>
          <h1 className="text-2xl font-bold text-neutral-900 mt-4">Create Your Account</h1>
          <p className="text-neutral-600 mt-2">
            Register to access the rating system
          </p>
        </div>

        {/* Registration Form */}
        <div className="card">
          <div className="card-body">
            {error && (
              <div className="alert alert-error mb-6 flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className="label">
                    Full Name *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="input pl-10"
                      placeholder="John Doe"
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="label">
                    Email Address *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="input pl-10"
                      placeholder="john@example.com"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="input pl-10"
                      placeholder="+266 5000 0000"
                    />
                  </div>
                </div>

                {/* Employee ID */}
                <div>
                  <label htmlFor="employeeId" className="label">
                    Employee ID
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Hash className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="employeeId"
                      type="text"
                      value={formData.employeeId}
                      onChange={(e) => setFormData({ ...formData, employeeId: e.target.value })}
                      className="input pl-10"
                      placeholder="EMP001"
                    />
                  </div>
                </div>

                {/* Role */}
                <div>
                  <label htmlFor="role" className="label">
                    Role *
                  </label>
                  <select
                    id="role"
                    required
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                    className="input"
                  >
                    <option value="AGENT">Agent</option>
                    <option value="HOD">Head of Department</option>
                  </select>
                </div>

                {/* Department */}
                {formData.role !== 'ADMIN' && (
                  <div>
                    <label htmlFor="department" className="label">
                      Department *
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-neutral-400" />
                      </div>
                      <select
                        id="department"
                        required
                        value={formData.departmentId}
                        onChange={(e) => setFormData({ ...formData, departmentId: e.target.value })}
                        className="input pl-10"
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                )}

                {/* Password */}
                <div>
                  <label htmlFor="password" className="label">
                    Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="password"
                      type="password"
                      required
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      className="input pl-10"
                      placeholder="••••••••"
                      minLength={8}
                    />
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">
                    Must be at least 8 characters
                  </p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label htmlFor="confirmPassword" className="label">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="confirmPassword"
                      type="password"
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                      className="input pl-10"
                      placeholder="••••••••"
                    />
                  </div>
                </div>
              </div>

              {/* Info Box */}
              <div className="alert alert-info flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Your account will require administrator approval before you can log in.
                </span>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="btn btn-primary w-full"
              >
                {isLoading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>
          </div>
        </div>

        {/* Login Link */}
        <p className="text-center mt-6 text-neutral-600">
          Already have an account?{' '}
          <Link href="/auth/login" className="text-primary-600 hover:text-primary-700 font-medium">
            Sign in here
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-sm text-neutral-600 hover:text-neutral-900">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}