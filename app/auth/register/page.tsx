'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Star, Mail, Lock, User, Phone, Building2, Hash, AlertCircle, CheckCircle, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';
import HCaptcha from '@hcaptcha/react-hcaptcha';
import {
  validateEmail,
  validatePhoneNumber,
  validatePassword,
  validatePasswordConfirmation,
  validateName,
  validateEmployeeId,
  validateDepartmentSelection,
} from '@/lib/validations';

interface Department {
  id: string;
  name: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  employeeId?: string;
  password?: string;
  confirmPassword?: string;
  departmentId?: string;
}

export default function RegisterPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FormErrors>({});
  const [hcaptchaToken, setHcaptchaToken] = useState<string | null>(null);
  const hcaptchaRef = useRef<any>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

  const handleHcaptchaVerify = (token: string) => {
    setHcaptchaToken(token);
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};
    let isValid = true;

    // Validate name
    const nameValidation = validateName(formData.name, 'Full Name');
    if (!nameValidation.isValid) {
      errors.name = nameValidation.error;
      isValid = false;
    }

    // Validate email
    const emailValidation = validateEmail(formData.email);
    if (!emailValidation.isValid) {
      errors.email = emailValidation.error;
      isValid = false;
    }

    // Validate phone
    const phoneValidation = validatePhoneNumber(formData.phone, 'ZA');
    if (!phoneValidation.isValid) {
      errors.phone = phoneValidation.error;
      isValid = false;
    }

    // Validate employee ID if provided
    if (formData.employeeId) {
      const empIdValidation = validateEmployeeId(formData.employeeId);
      if (!empIdValidation.isValid) {
        errors.employeeId = empIdValidation.error;
        isValid = false;
      }
    }

    // Validate password
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.error;
      isValid = false;
    }

    // Validate password confirmation
    const confirmValidation = validatePasswordConfirmation(
      formData.password,
      formData.confirmPassword
    );
    if (!confirmValidation.isValid) {
      errors.confirmPassword = confirmValidation.error;
      isValid = false;
    }

    // Validate department selection
    if (formData.role !== 'ADMIN' && !formData.departmentId) {
      const deptValidation = validateDepartmentSelection(formData.departmentId);
      if (!deptValidation.isValid) {
        errors.departmentId = deptValidation.error;
        isValid = false;
      }
    }

    setFieldErrors(errors);
    return isValid;
  };

  const handleFieldChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    // Clear field error when user starts typing
    if (fieldErrors[field as keyof FormErrors]) {
      setFieldErrors({ ...fieldErrors, [field]: undefined });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    if (!hcaptchaToken) {
      setError('Please complete the hCaptcha verification');
      toast.error('Please complete the hCaptcha verification');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          hcaptchaToken,
        }),
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
      // Reset captcha on error
      hcaptchaRef.current?.resetCaptcha();
      setHcaptchaToken(null);
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
            <img src="/logo.png" alt="Frontline Rating" className="h-12 w-16" />
            <span className="text-2xl font-bold text-neutral-900\">Service Feedback Platform</span>
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
                      onChange={(e) => handleFieldChange('name', e.target.value)}
                      className={`input pl-10 ${fieldErrors.name ? 'border-red-500' : ''}`}
                      placeholder="Tsepiso Motloung"
                    />
                  </div>
                  {fieldErrors.name && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.name}
                    </p>
                  )}
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
                      onChange={(e) => handleFieldChange('email', e.target.value)}
                      className={`input pl-10 ${fieldErrors.email ? 'border-red-500' : ''}`}
                      placeholder="user@example.com"
                    />
                  </div>
                  {fieldErrors.email && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.email}
                    </p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label htmlFor="phone" className="label">
                    Phone Number * (South African format)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="h-5 w-5 text-neutral-400" />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleFieldChange('phone', e.target.value)}
                      className={`input pl-10 ${fieldErrors.phone ? 'border-red-500' : ''}`}
                      placeholder="+27 60 000 0000 or 060 000 0000"
                    />
                  </div>
                  {fieldErrors.phone && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.phone}
                    </p>
                  )}
                  <p className="text-xs text-neutral-500 mt-1">10 digits, starting with 0 or +27</p>
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
                      onChange={(e) => handleFieldChange('employeeId', e.target.value)}
                      className={`input pl-10 ${fieldErrors.employeeId ? 'border-red-500' : ''}`}
                      placeholder="EMP001"
                    />
                  </div>
                  {fieldErrors.employeeId && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.employeeId}
                    </p>
                  )}
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
                    onChange={(e) => handleFieldChange('role', e.target.value)}
                    className="input"
                  >
                    <option value="AGENT">Agent</option>
                    <option value="EMPLOYEE">Employee</option>
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
                        onChange={(e) => handleFieldChange('departmentId', e.target.value)}
                        className={`input pl-10 ${fieldErrors.departmentId ? 'border-red-500' : ''}`}
                      >
                        <option value="">Select Department</option>
                        {departments.map((dept) => (
                          <option key={dept.id} value={dept.id}>
                            {dept.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    {fieldErrors.departmentId && (
                      <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {fieldErrors.departmentId}
                      </p>
                    )}
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
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={formData.password}
                      onChange={(e) => handleFieldChange('password', e.target.value)}
                      className={`input pl-10 pr-12 ${fieldErrors.password ? 'border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.password}
                    </p>
                  )}
                  {!fieldErrors.password && (
                    <p className="text-xs text-neutral-500 mt-1">
                      At least 8 chars, 1 uppercase, 1 lowercase, 1 number
                    </p>
                  )}
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
                      type={showConfirmPassword ? 'text' : 'password'}
                      required
                      value={formData.confirmPassword}
                      onChange={(e) => handleFieldChange('confirmPassword', e.target.value)}
                      className={`input pl-10 pr-12 ${fieldErrors.confirmPassword ? 'border-red-500' : ''}`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600 transition-colors"
                      tabIndex={-1}
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="w-5 h-5" />
                      ) : (
                        <Eye className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                  {fieldErrors.confirmPassword && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {fieldErrors.confirmPassword}
                    </p>
                  )}
                </div>
              </div>

              {/* Info Box */}
              <div className="alert alert-info flex items-start space-x-2">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <span className="text-sm">
                  Your account will require administrator approval before you can log in.
                </span>
              </div>

              <div className="my-6 flex justify-center">
                <HCaptcha
                  ref={hcaptchaRef}
                  sitekey={process.env.NEXT_PUBLIC_HCAPTCHA_SITE_KEY || ''}
                  onVerify={handleHcaptchaVerify}
                />
              </div>

              <button
                type="submit"
                disabled={isLoading || !hcaptchaToken}
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