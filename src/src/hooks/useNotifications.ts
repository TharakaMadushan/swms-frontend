import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { useAppSelector } from './useAppSelector';
import {
  fetchNotifications,
  fetchUnreadCount,
  markAsRead,
  markAllAsRead,
} from '../store/notificationSlice';
import type { RootState } from '../store';

export const useNotifications = () => {
  const dispatch = useAppDispatch();
  const { notifications, unreadCount, isLoading } = useAppSelector(
    (state: RootState) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotifications({}));
    dispatch(fetchUnreadCount());
  }, [dispatch]);

  const refreshNotifications = () => {
    dispatch(fetchNotifications({}));
    dispatch(fetchUnreadCount());
  };

  const markNotificationAsRead = async (notificationId: number) => {
    return dispatch(markAsRead(notificationId));
  };

  const markAllNotificationsAsRead = async () => {
    return dispatch(markAllAsRead());
  };

  return {
    notifications,
    unreadCount,
    isLoading,
    refreshNotifications,
    markNotificationAsRead,
    markAllNotificationsAsRead,
  };
};