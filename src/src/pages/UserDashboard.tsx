import React, { useState, useEffect } from 'react';
import { Bell, Clock, TrendingUp } from 'lucide-react';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { useAuth } from '../hooks/useAuth';
import { userService } from '../api/userService';
import { formatDateTime } from '../utils/formatters';
import type { DashboardStats } from '../types/dashboard.types';

export const UserDashboard: React.FC = () => {
  const { user } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadDashboardStats();
  }, []);

  const loadDashboardStats = async () => {
    try {
      const response = await userService.getDashboardStats();
      if (response.success && response.data) {
        setStats(response.data);
      }
    } catch (error) {
      console.error('Failed to load dashboard stats:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Welcome Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Welcome, {user?.fullName}!
            </h1>
            <p className="text-gray-600 mt-1">
              Here's what's happening with your account today.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
          ) : (
            <>
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Unread Notifications</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {stats?.unreadNotifications || 0}
                      </p>
                    </div>
                    <div className="bg-blue-500 p-3 rounded-lg">
                      <Bell className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Last Login</p>
                      <p className="text-lg font-bold text-gray-900 mt-2">
                        {stats?.lastLogin ? formatDateTime(stats.lastLogin) : 'N/A'}
                      </p>
                    </div>
                    <div className="bg-green-500 p-3 rounded-lg">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">Weekly Activities</p>
                      <p className="text-3xl font-bold text-gray-900 mt-2">
                        {stats?.weeklyActivities || 0}
                      </p>
                    </div>
                    <div className="bg-purple-500 p-3 rounded-lg">
                      <TrendingUp className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Information */}
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Profile Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="text-sm text-gray-600">Full Name</p>
                    <p className="text-lg font-medium text-gray-900">{user?.fullName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Email</p>
                    <p className="text-lg font-medium text-gray-900">{user?.email}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Employee Number</p>
                    <p className="text-lg font-medium text-gray-900">{user?.employeeNo || 'N/A'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Role</p>
                    <p className="text-lg font-medium text-gray-900">
                      {user?.roles.join(', ')}
                    </p>
                  </div>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};