import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { userService } from '../api/userService';
import type { NotificationState, Notification } from '../types/notification.types';
import { handleApiError } from '../utils/errorHandler';

const initialState: NotificationState = {
  notifications: [],
  unreadCount: 0,
  isLoading: false,
};

export const fetchNotifications = createAsyncThunk(
  'notifications/fetch',
  async (params: { pageSize?: number; pageNumber?: number } = {}, { rejectWithValue }) => {
    try {
      const response = await userService.getNotifications(
        params.pageSize || 20,
        params.pageNumber || 1
      );
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      
      return response.data!;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const fetchUnreadCount = createAsyncThunk(
  'notifications/fetchUnreadCount',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.getUnreadCount();
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      
      return response.data!;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const markAsRead = createAsyncThunk(
  'notifications/markAsRead',
  async (notificationId: number, { rejectWithValue }) => {
    try {
      const response = await userService.markNotificationAsRead(notificationId);
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      
      return notificationId;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

export const markAllAsRead = createAsyncThunk(
  'notifications/markAllAsRead',
  async (_, { rejectWithValue }) => {
    try {
      const response = await userService.markAllNotificationsAsRead();
      
      if (!response.success) {
        return rejectWithValue(response.message);
      }
      
      return true;
    } catch (error) {
      return rejectWithValue(handleApiError(error));
    }
  }
);

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action: PayloadAction<Notification>) => {
      state.notifications.unshift(action.payload);
      if (!action.payload.isRead) {
        state.unreadCount += 1;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
      state.unreadCount = 0;
    },
    setUnreadCount: (state, action: PayloadAction<number>) => {
      state.unreadCount = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotifications.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchNotifications.fulfilled, (state, action) => {
        state.isLoading = false;
        state.notifications = action.payload;
      })
      .addCase(fetchNotifications.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(fetchUnreadCount.fulfilled, (state, action) => {
        state.unreadCount = action.payload;
      })
      .addCase(markAsRead.fulfilled, (state, action) => {
        const notification = state.notifications.find(
          n => n.notificationID === action.payload
        );
        if (notification && !notification.isRead) {
          notification.isRead = true;
          notification.readDate = new Date().toISOString();
          state.unreadCount = Math.max(0, state.unreadCount - 1);
        }
      })
      .addCase(markAllAsRead.fulfilled, (state) => {
        state.notifications.forEach(n => {
          n.isRead = true;
          n.readDate = new Date().toISOString();
        });
        state.unreadCount = 0;
      });
  },
});

export const { addNotification, clearNotifications, setUnreadCount } = notificationSlice.actions;
export default notificationSlice.reducer;