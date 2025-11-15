import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Users, UserPlus, Bell, Activity } from 'lucide-react';
import { Header } from '../components/common/Header';
import { Sidebar } from '../components/common/Sidebar';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { userService } from '../api/userService';
import { ROUTES } from '../utils/constants';
import type { DashboardStats } from '../types/dashboard.types';

export const AdminDashboard: React.FC = () => {
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

  const statCards = [
    {
      title: 'Total Users',
      value: stats?.totalUsers || 0,
      icon: Users,
      color: 'bg-blue-500',
      link: ROUTES.ADMIN_USERS,
    },
    {
      title: 'New Users (This Month)',
      value: stats?.newUsersThisMonth || 0,
      icon: UserPlus,
      color: 'bg-green-500',
    },
    {
      title: 'Pending Notifications',
      value: stats?.pendingNotifications || 0,
      icon: Bell,
      color: 'bg-yellow-500',
    },
    {
      title: "Today's Activities",
      value: stats?.todayActivities || 0,
      icon: Activity,
      color: 'bg-purple-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      
      <div className="lg:pl-64">
        <Header onMenuClick={() => setSidebarOpen(true)} />
        
        <main className="p-6">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">
              Welcome back! Here's an overview of your system.
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center justify-center h-64">
              <LoadingSpinner size="lg" text="Loading dashboard..." />
            </div>
          ) : (
            <>
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {statCards.map((card, index) => {
                  const Icon = card.icon;
                  const CardContent = (
                    <div className="card hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-gray-600">{card.title}</p>
                          <p className="text-3xl font-bold text-gray-900 mt-2">
                            {card.value}
                          </p>
                        </div>
                        <div className={`${card.color} p-3 rounded-lg`}>
                          <Icon className="h-6 w-6 text-white" />
                        </div>
                      </div>
                    </div>
                  );

                  return card.link ? (
                    <Link key={index} to={card.link}>
                      {CardContent}
                    </Link>
                  ) : (
                    <div key={index}>{CardContent}</div>
                  );
                })}
              </div>

              {/* Quick Actions */}
              <div className="card">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Link
                    to={ROUTES.ADMIN_USERS}
                    className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors"
                  >
                    <Users className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">Manage Users</p>
                      <p className="text-sm text-gray-600">View and edit users</p>
                    </div>
                  </Link>
                  
                  <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
                    <Activity className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">View Reports</p>
                      <p className="text-sm text-gray-600">System analytics</p>
                    </div>
                  </button>

                  <button className="flex items-center gap-3 p-4 border border-gray-200 rounded-lg hover:border-primary-500 hover:bg-primary-50 transition-colors text-left">
                    <Bell className="h-8 w-8 text-primary-600" />
                    <div>
                      <p className="font-medium text-gray-900">Send Notification</p>
                      <p className="text-sm text-gray-600">Broadcast message</p>
                    </div>
                  </button>
                </div>
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};