import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import {
  Facebook,
  GitHub,
  Instagram,
  Reddit,
  Twitter,
} from '@mui/icons-material';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import * as React from 'react';

export default function SidebarFooter() {
  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        gap: 1,
        alignItems: 'center',
      }}
    >
      <Box sx={{ minWidth: 0, flex: 1 }}>
        <IconButton
          color='neutral'
          size='sm'
          component='a'
          target='_blank'
          href='https://github.com/phanturne/metadachi'
        >
          <GitHub />
        </IconButton>
        <IconButton
          color='neutral'
          size='sm'
          component='a'
          target='_blank'
          href='https://twitter.com/metadachi'
        >
          <Twitter />
        </IconButton>
        <IconButton color='neutral' size='sm' disabled={true}>
          <Facebook />
        </IconButton>
        <IconButton color='neutral' size='sm' disabled={true}>
          <Reddit />
        </IconButton>
        <IconButton color='neutral' size='sm' disabled={true}>
          <Instagram />
        </IconButton>
      </Box>
      <IconButton size='sm' variant='plain' color='neutral'>
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  );
}
