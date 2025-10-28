'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  Users,
  Star,
  MessageSquare,
  Settings,
  Bell,
  User,
  LogOut,
  Building2,
  FileText,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const { data: session } = useSession();
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const getNavItems = () => {
    const role = session?.user?.role;

    const commonItems = [
      { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    ];

    if (role === 'ADMIN') {
      return [
        ...commonItems,
        { href: '/dashboard/users', icon: Users, label: 'Users' },
        { href: '/dashboard/departments', icon: Building2, label: 'Departments' },
        { href: '/dashboard/ratings', icon: Star, label: 'All Ratings' },
        { href: '/dashboard/complaints', icon: MessageSquare, label: 'Complaints' },
        { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
      ];
    }

    if (role === 'HOD') {
      return [
        ...commonItems,
        { href: '/dashboard/questions', icon: FileText, label: 'Questions' },
        { href: '/dashboard/ratings', icon: Star, label: 'Ratings' },
        { href: '/dashboard/complaints', icon: MessageSquare, label: 'Complaints' },
        { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
      ];
    }

    if (role === 'AGENT') {
      return [
        ...commonItems,
        { href: '/dashboard/my-ratings', icon: Star, label: 'My Ratings' },
        { href: '/dashboard/my-complaints', icon: MessageSquare, label: 'My Complaints' },
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  return (
    <div className="min-h-screen bg-neutral-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-neutral-200 fixed top-0 left-0 right-0 z-30">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-neutral-100"
              >
                {isSidebarOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
              
              <Link href="/dashboard" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                  <Star className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-lg font-bold text-neutral-900 hidden sm:block">
                  Frontline Rating
                </span>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Link
                href="/dashboard/notifications"
                className="p-2 rounded-lg hover:bg-neutral-100 relative"
              >
                <Bell className="w-6 h-6 text-neutral-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-3 p-2 rounded-lg hover:bg-neutral-100">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-primary-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-neutral-900">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {session?.user?.role}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-50"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <Link
                    href="/dashboard/settings"
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-50"
                  >
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </Link>
                  <hr className="my-2" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center space-x-2 px-4 py-2 hover:bg-neutral-50 w-full text-left text-primary-600"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-16 bottom-0 w-64 bg-white border-r border-neutral-200 z-20 transition-transform duration-300 lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <nav className="p-4 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-50'
                }`}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="pt-16 lg:pl-64">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
      </main>
    </div>
  );
}