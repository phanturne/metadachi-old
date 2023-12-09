'use client';

import React, { createContext, useContext, useState } from 'react';
import { Snackbar } from '@mui/joy';
import { ChatError } from '@/app/(sidebar)/chat/chat-utils';

// Create a context with initial values
const SnackbarContext = createContext({
  errorMsg: undefined as ChatError | undefined,
  setErrorMsg: (_: ChatError | undefined) => {},
});

// Context Provider
export const SnackbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [errorMsg, setErrorMsg] = useState<ChatError | undefined>(undefined);

  // Pass the context values to the provider
  const contextValue = {
    errorMsg,
    setErrorMsg,
  };

  return (
    <SnackbarContext.Provider value={contextValue}>
      <Snackbar
        variant='soft'
        color='danger'
        autoHideDuration={5000}
        open={errorMsg !== undefined}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        onClose={() => {
          setErrorMsg(undefined);
        }}
      >
        {errorMsg as string}
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
};

// Custom hook to use the SnackbarModalContext
export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
