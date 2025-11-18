import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { LoadingSpinner } from '../common/LoadingSpinner';
import type { LoginRequest } from '../../types/auth.types';
import { ROUTES } from '../../utils/constants';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isLoading, error } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginRequest>();

  const onSubmit = async (data: LoginRequest) => {
    console.log('🚀 Form submitted!');
    console.log('📧 Email:', data.email);
    console.log('🔑 Password length:', data.password?.length);
    
    try {
      console.log('⏳ Calling login function...');
      const result = await login(data);
      
      console.log('📦 Login result:', result);
      console.log('📦 Result status:', result.status);
      console.log('📦 Result payload:', result.payload);
      
      // Check for the correct property structure
      if (result.status === 'fulfilled' && result.payload) {
        const user = result.payload;
        console.log('✅ Login successful!');
        console.log('👤 User:', user);
        
        if (user.isTempPassword) {
          console.log('🔄 Navigating to change password...');
          navigate(ROUTES.CHANGE_PASSWORD);
        } else {
          const from = (location.state as any)?.from?.pathname || ROUTES.DASHBOARD;
          console.log('🔄 Navigating to:', from);
          navigate(from, { replace: true });
        }
      } else {
        console.error('❌ Login failed!');
        console.error('Status:', result.status);
        console.error('Error:', result.error);
      }
    } catch (err) {
      console.error('💥 Exception during login:', err);
    }
  };

  console.log('🔄 LoginForm render - isLoading:', isLoading, 'error:', error);

  return (
    <div className="w-full max-w-md">
      <div className="text-center mb-8">
        <div className="inline-flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 mb-4">
          <Lock className="h-8 w-8 text-primary-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your SWMS account</p>
      </div>

      <form 
        onSubmit={(e) => {
          console.log('📝 Form onSubmit event triggered');
          handleSubmit(onSubmit)(e);
        }}
        className="space-y-6"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Email Field */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
            Email Address
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address',
                },
              })}
              type="email"
              id="email"
              className={`input-field pl-10 ${errors.email ? 'border-red-500' : ''}`}
              placeholder="you@example.com"
              autoComplete="email"
              onChange={(e) => console.log('📧 Email input:', e.target.value)}
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              {...register('password', {
                required: 'Password is required',
              })}
              type={showPassword ? 'text' : 'password'}
              id="password"
              className={`input-field pl-10 pr-10 ${errors.password ? 'border-red-500' : ''}`}
              placeholder="••••••••"
              autoComplete="current-password"
              onChange={(e) => console.log('🔑 Password length:', e.target.value.length)}
            />
            <button
              type="button"
              onClick={() => {
                console.log('👁️ Toggle password visibility');
                setShowPassword(!showPassword);
              }}
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5 text-gray-400" />
              ) : (
                <Eye className="h-5 w-5 text-gray-400" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          onClick={() => console.log('🖱️ Submit button clicked')}
          className="w-full btn-primary flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <LoadingSpinner size="sm" />
              <span>Signing in...</span>
            </>
          ) : (
            'Sign In'
          )}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Having trouble? Contact your system administrator.
      </p>
    </div>
  );
};