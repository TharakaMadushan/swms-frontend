import { useEffect } from 'react';
import { useAppDispatch } from './useAppDispatch';
import { signalRService } from '../api/signalRService'
import { addNotification, fetchUnreadCount } from '../store/notificationSlice';
import { useAuth } from './useAuth';
import toast from 'react-hot-toast';
import type { Notification } from '../types/notification.types';

export const useSignalR = () => {
  const dispatch = useAppDispatch();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      signalRService.stop();
      return;
    }

    signalRService.start();

    const handleNotification = (notification: Notification) => {
      dispatch(addNotification(notification));
      dispatch(fetchUnreadCount());

      const toastType = notification.type.toLowerCase();
      
      if (toastType === 'success') {
        toast.success(notification.message);
      } else if (toastType === 'error') {
        toast.error(notification.message);
      } else if (toastType === 'warning') {
        toast(notification.message, {
          icon: '⚠️',
        });
      } else {
        toast(notification.message, {
          icon: 'ℹ️',
        });
      }
    };

    signalRService.on('notification', handleNotification);

    return () => {
      signalRService.off('notification', handleNotification);
      signalRService.stop();
    };
  }, [isAuthenticated, dispatch]);

  return {
    isConnected: signalRService.isConnected(),
    connectionState: signalRService.getConnectionState(),
  };
};