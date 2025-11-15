import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { changePassword } from '../../store/authSlice';
import { LoadingSpinner } from '../common/LoadingSpinner';
import { getPasswordStrength } from '../../utils/validators';
import type { ChangePasswordRequest } from '../../types/auth.types';
import { ROUTES } from '../../utils/constants';
import toast from 'react-hot-toast';
import { useAppDispatch } from '@/src/hooks/useAppDispatch';

export const ChangePasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordRequest>();

  const newPassword = watch('newPassword', '');
  const passwordStrength = getPasswordStrength(newPassword);

  const onSubmit = async (data: ChangePasswordRequest) => {
    setIsLoading(true);
    
    const result = await dispatch(changePassword(data));
    
    if (result.meta.requestStatus === 'fulfilled') {
      toast.success('Password changed successfully!');
      navigate(ROUTES.DASHBOARD);
    } else {
      toast.error(result.payload as string || 'Failed to change password');
    }
    
    setIsLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-yellow-100 mb-4">
          <AlertCircle className="h-8 w-8 text-yellow-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Change Password</h1>
        <p className="text-gray-600 mt-2">
          You must change your temporary password before continuing
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Current Password */}
        <div>
          <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <div className="relative">
            <input
              {...register('currentPassword', {
                required: 'Current password is required',
              })}
              type={showPasswords.current ? 'text' : 'password'}
              id="currentPassword"
              className={`input-field pr-10 ${errors.currentPassword ? 'border-red-500' : ''}`}
              placeholder="Enter your current password"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, current: !prev.current }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords.current ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.currentPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.currentPassword.message}</p>
          )}
        </div>

        {/* New Password */}
        <div>
          <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <div className="relative">
            <input
              {...register('newPassword', {
                required: 'New password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
                pattern: {
                  value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/,
                  message: 'Password must contain uppercase, lowercase, number and special character',
                },
              })}
              type={showPasswords.new ? 'text' : 'password'}
              id="newPassword"
              className={`input-field pr-10 ${errors.newPassword ? 'border-red-500' : ''}`}
              placeholder="Enter new password"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords.new ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.newPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.newPassword.message}</p>
          )}
          
          {/* Password Strength Indicator */}
          {newPassword && (
            <div className="mt-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs text-gray-600">Password Strength</span>
                <span className={`text-xs font-medium ${
                  passwordStrength.score <= 2 ? 'text-red-600' :
                  passwordStrength.score <= 4 ? 'text-yellow-600' : 'text-green-600'
                }`}>
                  {passwordStrength.label}
                </span>
              </div>
              <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                  style={{ width: `${(passwordStrength.score / 6) * 100}%` }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <div className="relative">
            <input
              {...register('confirmPassword', {
                required: 'Please confirm your password',
                validate: value =>
                  value === newPassword || 'Passwords do not match',
              })}
              type={showPasswords.confirm ? 'text' : 'password'}
              id="confirmPassword"
              className={`input-field pr-10 ${errors.confirmPassword ? 'border-red-500' : ''}`}
              placeholder="Confirm new password"
            />
            <button
              type="button"
              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPasswords.confirm ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
          )}
        </div>

        {/* Password Requirements */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</p>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3" />
              At least 8 characters long
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3" />
              Contains uppercase and lowercase letters
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3" />
              Contains at least one number
            </li>
            <li className="flex items-center gap-2">
              <CheckCircle className="h-3 w-3" />
              Contains at least one special character (@$!%*?&)
            </li>
          </ul>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Changing Password...</span>
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              <span>Change Password</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};