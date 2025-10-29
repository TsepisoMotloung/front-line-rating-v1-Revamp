'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import DashboardLayout from '@/components/DashboardLayout';
import { User, Mail, Building2, Download, QrCode, Edit, Save, X } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ProfilePage() {
  const { data: session } = useSession();
  const [isEditing, setIsEditing] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    employeeId: '',
  });

  useEffect(() => {
    if (session?.user) {
      setFormData({
        name: session.user.name || '',
        email: session.user.email || '',
        employeeId: session.user.employeeId || '',
      });
      if (session.user.role === 'AGENT') {
        generateQRCode();
      }
    }
  }, [session]);

  const generateQRCode = async () => {
    if (!session?.user.id) return;
    
    try {
      const response = await fetch(`/api/profile/qrcode?agentId=${session.user.id}`);
      if (response.ok) {
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setQrCodeUrl(url);
        console.log(url);
      }
    } catch (error) {
      console.log('Error generating QR code:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      toast.success('Profile updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = `${formData.employeeId || 'agent'}-qrcode.png`;
    link.click();
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-neutral-900">Profile Settings</h1>
          <p className="text-neutral-600 mt-2">
            Manage your account information and preferences
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <div className="card">
              <div className="card-header flex justify-between items-center">
                <h2 className="text-lg font-semibold text-neutral-900">Personal Information</h2>
                {!isEditing ? (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="btn btn-sm btn-secondary flex items-center space-x-2"
                  >
                    <Edit className="w-4 h-4" />
                    <span>Edit</span>
                  </button>
                ) : (
                  <button
                    onClick={() => setIsEditing(false)}
                    className="btn btn-sm btn-secondary flex items-center space-x-2"
                  >
                    <X className="w-4 h-4" />
                    <span>Cancel</span>
                  </button>
                )}
              </div>
              <div className="card-body">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="label">
                      Full Name
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <User className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        id="name"
                        type="text"
                        disabled={!isEditing}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="input pl-10 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="label">
                      Email Address
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-neutral-400" />
                      </div>
                      <input
                        id="email"
                        type="email"
                        disabled={!isEditing}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="input pl-10 disabled:bg-neutral-50 disabled:cursor-not-allowed"
                      />
                    </div>
                  </div>

                  {session?.user.role === 'AGENT' && (
                    <div>
                      <label htmlFor="employeeId" className="label">
                        Employee ID
                      </label>
                      <input
                        id="employeeId"
                        type="text"
                        disabled
                        value={formData.employeeId}
                        className="input disabled:bg-neutral-50 disabled:cursor-not-allowed"
                      />
                      <p className="text-xs text-neutral-500 mt-2">
                        Employee ID cannot be changed
                      </p>
                    </div>
                  )}

                  <div>
                    <label className="label">Role</label>
                    <div className="flex items-center space-x-2">
                      <span className="badge badge-info">{session?.user.role}</span>
                      {session?.user.departmentName && (
                        <>
                          <span className="text-neutral-400">•</span>
                          <div className="flex items-center space-x-2 text-sm text-neutral-600">
                            <Building2 className="w-4 h-4" />
                            <span>{session.user.departmentName}</span>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="flex justify-end space-x-3 pt-4 border-t">
                      <button
                        type="button"
                        onClick={() => setIsEditing(false)}
                        className="btn btn-secondary"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn btn-primary flex items-center space-x-2"
                      >
                        <Save className="w-4 h-4" />
                        <span>Save Changes</span>
                      </button>
                    </div>
                  )}
                </form>
              </div>
            </div>

            {/* Account Status */}
            <div className="card mt-6">
              <div className="card-header">
                <h2 className="text-lg font-semibold text-neutral-900">Account Status</h2>
              </div>
              <div className="card-body">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Account Status</span>
                    <span className="badge badge-success">Active</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-neutral-600">Account Type</span>
                    <span className="font-medium text-neutral-900">{session?.user.role}</span>
                  </div>
                  {session?.user.departmentName && (
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-600">Department</span>
                      <span className="font-medium text-neutral-900">{session.user.departmentName}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* QR Code Section (Agents Only) */}
          {session?.user.role === 'AGENT' && (
            <div>
              <div className="card">
                <div className="card-header">
                  <h2 className="text-lg font-semibold text-neutral-900">Your QR Code</h2>
                  <p className="text-sm text-neutral-600 mt-1">
                    Share this with customers for quick ratings
                  </p>
                </div>
                <div className="card-body text-center">
                  {qrCodeUrl ? (
                    <>
                      <div className="mb-6 flex justify-center">
                        <div className="p-4 bg-white border-2 border-neutral-200 rounded-lg">
                          <img
                            src={qrCodeUrl}
                            alt="QR Code"
                            className="w-48 h-48"
                          />
                        </div>
                      </div>
                      <div className="space-y-3">
                        <button
                          onClick={downloadQRCode}
                          className="btn btn-primary w-full flex items-center justify-center space-x-2"
                        >
                          <Download className="w-4 h-4" />
                          <span>Download QR Code</span>
                        </button>
                        <button
                          onClick={generateQRCode}
                          className="btn btn-secondary w-full flex items-center justify-center space-x-2"
                        >
                          <QrCode className="w-4 h-4" />
                          <span>Regenerate</span>
                        </button>
                      </div>
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg text-left">
                        <h4 className="font-semibold text-blue-900 text-sm mb-2">
                          How to use:
                        </h4>
                        <ul className="text-xs text-blue-800 space-y-1">
                          <li>• Print and display at your desk</li>
                          <li>• Add to your email signature</li>
                          <li>• Share on business cards</li>
                          <li>• Customers can scan to rate you instantly</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="py-12">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
                      <p className="text-neutral-600 mt-4">Generating QR Code...</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Rating Link */}
              <div className="card mt-6">
                <div className="card-header">
                  <h2 className="text-lg font-semibold text-neutral-900">Direct Rating Link</h2>
                </div>
                <div className="card-body">
                  <p className="text-sm text-neutral-600 mb-3">
                    Share this link with customers:
                  </p>
                  <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg font-mono text-xs break-all">
                    {typeof window !== 'undefined' && `${window.location.origin}/rate/${session?.user.id}`}
                  </div>
                  <button
                    onClick={() => {
                      if (typeof window !== 'undefined') {
                        navigator.clipboard.writeText(`${window.location.origin}/rate/${session?.user.id}`);
                        toast.success('Link copied to clipboard!');
                      }
                    }}
                    className="btn btn-secondary w-full mt-3"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}