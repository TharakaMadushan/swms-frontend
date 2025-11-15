import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { X } from 'lucide-react';
import { adminService } from '../../api/adminService';
import { LoadingSpinner } from '../common/LoadingSpinner';
import toast from 'react-hot-toast';
import type { User, UpdateUserRequest } from '../../types/user.types';

interface EditUserModalProps {
  user: User;
  onClose: () => void;
  onSuccess: () => void;
}

export const EditUserModal: React.FC<EditUserModalProps> = ({ user, onClose, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserRequest>({
    defaultValues: {
      userID: user.userID,
      fullName: user.fullName,
      email: user.email,
      employeeNo: user.employeeNo,
      documentEmployeeNo: user.documentEmployeeNo,
      isActive: user.isActive,
      roleIDs: [],
    },
  });

  useEffect(() => {
    // Set role IDs based on user's current roles
    const roleMap: Record<string, number> = { Admin: 1, Manager: 2, User: 3 };
    const roleIds = user.roles.map(role => roleMap[role]).filter(Boolean);
    setValue('roleIDs', roleIds);
  }, [user, setValue]);

  const onSubmit = async (data: UpdateUserRequest) => {
    setIsLoading(true);
    
    try {
      const response = await adminService.updateUser(user.userID, data);
      
      if (response.success) {
        toast.success('User updated successfully!');
        onSuccess();
      } else {
        toast.error(response.message || 'Failed to update user');
      }
    } catch (error) {
      toast.error('Failed to update user');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Edit User</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-6 w-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
              <input
                {...register('fullName', { required: 'Full name is required' })}
                type="text"
                className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-red-600">{errors.fullName.message}</p>
              )}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
              <input
                {...register('email', {
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address',
                  },
                })}
                type="email"
                className={`input-field ${errors.email ? 'border-red-500' : ''}`}
              />
              {errors.email && <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Employee Number</label>
              <input {...register('employeeNo')} type="text" className="input-field" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Document Employee Number
              </label>
              <input {...register('documentEmployeeNo')} type="text" className="input-field" />
            </div>

            <div className="md:col-span-2">
              <label className="flex items-center gap-2">
                <input
                  {...register('isActive')}
                  type="checkbox"
                  className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <span className="text-sm font-medium text-gray-700">Active User</span>
              </label>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">Roles *</label>
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    {...register('roleIDs', { required: 'At least one role is required' })}
                    type="checkbox"
                    value="1"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Admin</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    {...register('roleIDs')}
                    type="checkbox"
                    value="2"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Manager</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    {...register('roleIDs')}
                    type="checkbox"
                    value="3"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">User</span>
                </label>
              </div>
              {errors.roleIDs && <p className="mt-1 text-sm text-red-600">{errors.roleIDs.message}</p>}
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200">
            <button type="button" onClick={onClose} className="btn-secondary" disabled={isLoading}>
              Cancel
            </button>
            <button type="submit" className="btn-primary flex items-center gap-2" disabled={isLoading}>
              {isLoading ? (
                <>
                  <LoadingSpinner size="sm" />
                  <span>Updating...</span>
                </>
              ) : (
                'Update User'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};