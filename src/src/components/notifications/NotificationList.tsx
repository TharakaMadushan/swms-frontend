import React from 'react';
import { X, Check, CheckCheck } from 'lucide-react';
import { useNotifications } from '../../hooks/useNotifications';
import { formatTimeAgo } from '../../utils/formatters';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { Notification } from '../../types/notification.types';

interface NotificationListProps {
  onClose: () => void;
}

export const NotificationList: React.FC<NotificationListProps> = ({ onClose }) => {
  const {
    notifications,
    unreadCount,
    isLoading,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  } = useNotifications();

  const handleMarkAsRead = async (notificationId: number) => {
    await markNotificationAsRead(notificationId);
  };

  const handleMarkAllAsRead = async () => {
    await markAllNotificationsAsRead();
  };

  return (
    <div className="flex flex-col max-h-[500px]">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Notifications
          {unreadCount > 0 && (
            <span className="ml-2 text-sm text-primary-600">
              ({unreadCount} unread)
            </span>
          )}
        </h3>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="text-xs text-primary-600 hover:text-primary-700 flex items-center gap-1"
            >
              <CheckCheck className="h-4 w-4" />
              Mark all as read
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-gray-100"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="overflow-y-auto flex-1">
        {isLoading ? (
          <div className="p-8 flex items-center justify-center">
            <LoadingSpinner />
          </div>
        ) : notifications.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p>No notifications</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-200">
            {notifications.map((notification: Notification) => (
              <div
                key={notification.notificationID}
                className={`p-4 hover:bg-gray-50 transition-colors ${
                  !notification.isRead ? 'bg-blue-50/50' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`flex-shrink-0 w-2 h-2 rounded-full mt-2 ${
                      !notification.isRead ? 'bg-primary-600' : 'bg-gray-300'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">
                      {notification.title}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {formatTimeAgo(notification.createdDate)}
                    </p>
                  </div>
                  {!notification.isRead && (
                    <button
                      onClick={() => handleMarkAsRead(notification.notificationID)}
                      className="flex-shrink-0 p-1 text-primary-600 hover:text-primary-700"
                      title="Mark as read"
                    >
                      <Check className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};