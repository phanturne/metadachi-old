'use client';

import React from 'react';
import { useSnackbar } from '@/providers/SnackbarProvider';
import { Button } from '@mui/joy';

export default function HomePage() {
  const { setSnackbar } = useSnackbar();

  return (
    <>
      Home
      <Button
        onClick={() => {
          setSnackbar({
            msg: 'Message Message MessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessageMessage',
            onClose: () => console.log('closed'),
            action: {
              text: 'text',
              onClick: () => setSnackbar(undefined),
            },
          });
        }}
      >
        Snack
      </Button>
    </>
  );
}
