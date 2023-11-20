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
      {startContent || <div></div>}

      {middleContent}

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          padding: '10px',
          gap: 1,
        }}
      >
        {endContent}
        {/*{endContent && (*/}
        {/*  <Divider orientation='vertical' sx={{ m: 0.5, ml: 1.5 }} />*/}
        {/*)}*/}
        <IconButton color='neutral' size='sm'>
          <NotificationsNoneRounded />
        </IconButton>
        <Avatar
          variant='solid'
          size='sm'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
        />
      </Box>
    </Sheet>
  );
}
