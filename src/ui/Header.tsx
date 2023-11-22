'use client';

import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Sheet from '@mui/joy/Sheet';
import IconButton from '@mui/joy/IconButton';
import Box from '@mui/joy/Box';
import { NotificationsNoneRounded } from '@mui/icons-material';
import Avatar from '@mui/joy/Avatar';

export default function Header({
  startContent,
  endContent,
  middleContent,
}: {
  startContent?: React.ReactNode;
  middleContent?: React.ReactNode;
  endContent?: React.ReactNode;
}) {
  return (
    <Sheet
      sx={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center',
        textAlign: 'center',
        height: 'var(--Header-height)',
        zIndex: 100,
        p: 2,
        borderBottom: '1px solid',
        borderColor: 'background.level1',
        boxShadow: 'sm',
      }}
    >
      <GlobalStyles
        styles={() => ({
          ':root': {
            '--Header-height': '52px',
          },
        })}
      />
      <Box sx={{ flex: 1 }}>{startContent || <div></div>}</Box>

      <Box sx={{ flex: 1 }}>{middleContent}</Box>

      <Box
        sx={{
          flex: 1,
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 0.5,
        }}
      >
        {endContent}
        <IconButton color='neutral' size='sm'>
          <NotificationsNoneRounded />
        </IconButton>
        <Avatar
          sx={{ ml: 1 }}
          variant='solid'
          size='sm'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
        />
      </Box>
    </Sheet>
  );
}
