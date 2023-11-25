'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import AuthModal from '@/ui/AuthModal';
import { useSupabaseSession } from '@/lib/hooks/useSupabaseSession';

// Create a context with initial values
const AuthContext = createContext({
  isAuthModalOpen: false,
  openAuthModal: () => {},
  closeAuthModal: () => {},
});

// Context Provider
export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // If user is not authenticated for the desktop app, show the auth page
  const isApp = process.env.NEXT_PUBLIC_BUILD_MODE === 'export';
  const session = useSupabaseSession();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  useEffect(() => {
    console.log('Auth state changed');
    setIsAuthModalOpen(isApp && session === null);
  }, [session]);

  const openAuthModal = () => {
    setIsAuthModalOpen(true);
  };

  const closeAuthModal = () => {
    setIsAuthModalOpen(false);
  };

  // Pass the context values to the provider
  const contextValue = {
    isAuthModalOpen,
    openAuthModal,
    closeAuthModal,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {isAuthModalOpen && (
        <AuthModal isAuthPage={isApp} onClose={closeAuthModal} />
      )}
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthModalContext
export const useAuthModal = () => {
  return useContext(AuthContext);
};
