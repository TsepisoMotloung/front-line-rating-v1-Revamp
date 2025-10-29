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
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14 sm:h-16">
            {/* Logo and Mobile Menu Button */}
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-1.5 sm:p-2 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                aria-label="Toggle menu"
              >
                {isSidebarOpen ? (
                  <X className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
                )}
              </button>
              
              <Link href="/dashboard" className="flex items-center space-x-2">
                <img 
                  src="/logo.png" 
                  alt="Frontline Rating" 
                  className="w-7 h-7 sm:w-8 sm:h-8" 
                />
                <span className="text-base sm:text-lg font-bold text-neutral-900 hidden sm:block">
                  Frontline Rating System
                </span>
              </Link>
            </div>

            {/* Right Side */}
            <div className="flex items-center space-x-2 sm:space-x-4">
              {/* Notifications */}
              <Link
                href="/dashboard/notifications"
                className="p-1.5 sm:p-2 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500 relative"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary-600 rounded-full"></span>
              </Link>

              {/* Profile Dropdown */}
              <div className="relative group">
                <button 
                  className="flex items-center space-x-2 sm:space-x-3 p-1.5 sm:p-2 rounded-lg hover:bg-neutral-100 focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="User menu"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-primary-600" />
                  </div>
                  <div className="hidden md:block text-left">
                    <p className="text-sm font-medium text-neutral-900 truncate max-w-[120px]">
                      {session?.user?.name}
                    </p>
                    <p className="text-xs text-neutral-500">
                      {session?.user?.role}
                    </p>
                  </div>
                </button>

                {/* Dropdown Menu */}
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-neutral-200 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <Link
                    href="/dashboard/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-neutral-50 focus:outline-none focus:bg-neutral-100"
                  >
                    <User className="w-4 h-4" />
                    <span>Profile</span>
                  </Link>
                  <hr className="my-1.5" />
                  <button
                    onClick={() => signOut({ callbackUrl: '/' })}
                    className="flex items-center space-x-2 px-4 py-2 text-sm hover:bg-neutral-50 w-full text-left text-primary-600 focus:outline-none focus:bg-neutral-100"
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
        className={`fixed left-0 top-14 sm:top-16 bottom-0 w-[240px] sm:w-64 bg-white border-r border-neutral-200 z-20 transition-all duration-300 transform lg:translate-x-0 ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-200`}
      >
        <nav className="p-3 sm:p-4 space-y-1 sm:space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-600 font-medium'
                    : 'text-neutral-600 hover:bg-neutral-50'
                } focus:outline-none focus:ring-2 focus:ring-primary-500`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-10 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Main Content */}
      <main className="pt-14 sm:pt-16 lg:pl-64 min-h-screen bg-neutral-50">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[2000px] mx-auto">{children}</div>
      </main>
    </div>
  );
}