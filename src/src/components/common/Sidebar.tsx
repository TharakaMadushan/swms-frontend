import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  FileText,
  Settings,
  X,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { ROUTES, ROLES } from '../../utils/constants';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user, hasRole } = useAuth();

  const navItems = [
    {
      to: ROUTES.DASHBOARD,
      icon: LayoutDashboard,
      label: 'Dashboard',
      roles: [ROLES.ADMIN, ROLES.MANAGER, ROLES.USER],
    },
    {
      to: ROUTES.ADMIN_USERS,
      icon: Users,
      label: 'Manage Users',
      roles: [ROLES.ADMIN],
    },
    {
      to: '/reports',
      icon: FileText,
      label: 'Reports',
      roles: [ROLES.ADMIN, ROLES.MANAGER],
    },
    {
      to: '/settings',
      icon: Settings,
      label: 'Settings',
      roles: [ROLES.ADMIN],
    },
  ];

  const filteredNavItems = navItems.filter(item =>
    item.roles.some(role => hasRole(role))
  );

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 bg-primary-600 rounded-lg flex items-center justify-center text-white font-bold">
              S
            </div>
            <span className="text-xl font-bold text-gray-900">SWMS</span>
          </div>
          <button onClick={onClose} className="lg:hidden p-2 rounded-lg hover:bg-gray-100">
            <X className="h-6 w-6" />
          </button>
        </div>

        <nav className="p-4 space-y-2">
          {filteredNavItems.map(item => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-primary-50 text-primary-700 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`
                }
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 bg-primary-100 rounded-full flex items-center justify-center">
              <span className="text-primary-700 font-semibold">
                {user?.fullName.charAt(0)}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {user?.fullName}
              </p>
              <p className="text-xs text-gray-500 truncate">{user?.roles[0]}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};