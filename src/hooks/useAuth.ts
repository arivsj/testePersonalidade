// Custom hooks for the Personality Test app

import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/src/store/hooks';
import { setUser, clearUser } from '@/src/store/slices/userSlice';

/**
 * Custom hook for managing user authentication state
 */
export const useAuth = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => ({
    user: state.user
  }));
  
  const login = (userData: { id: string; name: string; email: string }) => {
    dispatch(setUser(userData));
  };

  const logout = () => {
    dispatch(clearUser());
  };

  return {
    user,
    login,
    logout,
    isAuthenticated: user.isAuthenticated
  };
};