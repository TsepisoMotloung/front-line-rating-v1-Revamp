'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { format } from 'date-fns';
import Link from 'next/link';
import DashboardLayout from '@/components/DashboardLayout';
import { Bell, Star, MessageSquare, AlertCircle } from 'lucide-react';
import toast from 'react-hot-toast';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  isRead: boolean;
  createdAt: string;
  link?: string;
}

export default function NotificationsPage() {
  const { data: session } = useSession();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/notifications');
      if (!response.ok) throw new Error('Failed to fetch notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Error fetching notifications:', error);
      toast.error('Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const markAsRead = async () => {
    try {
      const response = await fetch('/api/notifications', {
        method: 'PUT',
      });
      if (response.ok) {
        await fetchNotifications();
        toast.success('All notifications marked as read');
      }
    } catch (error) {
      console.error('Error marking notifications as read:', error);
      toast.error('Failed to update notifications');
    }
  };

  const getNotificationStyles = (type: string, isRead: boolean) => {
    const baseStyles = 'p-4 rounded-lg border transition-all hover:border-primary-300';
    if (isRead) return `${baseStyles} bg-white border-neutral-200`;
    
    switch (type) {
      case 'rating':
        return `${baseStyles} bg-primary-50 border-l-4 border-primary-400`;
      case 'complaint':
        return `${baseStyles} bg-primary-50 border-l-4 border-primary-400`;
      case 'system':
        return `${baseStyles} bg-primary-50 border-l-4 border-primary-400`;
      default:
        return `${baseStyles} bg-primary-50 border-l-4 border-primary-400`;
    }
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'rating':
        return <Star className="w-6 h-6 text-primary-500" />;
      case 'complaint':
        return <MessageSquare className="w-6 h-6 text-primary-500" />;
      case 'system':
        return <Bell className="w-6 h-6 text-primary-500" />;
      default:
        return <AlertCircle className="w-6 h-6 text-primary-500" />;
    }
  };

  const NotificationContent = ({ notification }: { notification: Notification }) => {
    return (
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0 mt-1">
          {getNotificationIcon(notification.type)}
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex justify-between">
            <p className="text-sm font-medium text-neutral-900 truncate">
              {notification.title}
            </p>
            <span className="text-xs text-neutral-500">
              {format(new Date(notification.createdAt), 'MMM d, h:mm a')}
            </span>
          </div>
          <p className="mt-1 text-sm text-neutral-600">
            {notification.message}
          </p>
        </div>
      </div>
    );
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-neutral-900">Notifications</h1>
            <p className="text-neutral-600">Stay updated with your latest notifications</p>
          </div>
          {notifications.some(n => !n.isRead) && (
            <button
              onClick={markAsRead}
              className="btn btn-secondary"
            >
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
            <p className="text-neutral-600 mt-4">Loading notifications...</p>
          </div>
        ) : notifications.length > 0 ? (
          <div className="space-y-4">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={getNotificationStyles(notification.type, notification.isRead)}
              >
                {notification.link ? (
                  <Link href={notification.link} className="block">
                    <NotificationContent notification={notification} />
                  </Link>
                ) : (
                  <NotificationContent notification={notification} />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Bell className="w-12 h-12 text-neutral-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-neutral-900">No notifications yet</h3>
            <p className="text-neutral-600 mt-1">
              You&apos;ll see your notifications here when they arrive
            </p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
