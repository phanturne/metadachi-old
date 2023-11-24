import * as React from 'react';
import { useEffect, useState } from 'react';
import Menu from '@mui/joy/Menu';
import MenuItem from '@mui/joy/MenuItem';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import MenuButton from '@mui/joy/MenuButton';
import Dropdown from '@mui/joy/Dropdown';
import Avatar from '@mui/joy/Avatar';
import ThemeToggleButton from '@/ui/ThemeToggle';
import { Box, Button } from '@mui/joy';
import {
  HouseboatRounded,
  LightModeRounded,
  SettingsRounded,
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import config from '@/lib/config';

export default function UserAvatarMenu() {
  const router = useRouter();

  return (
    <Dropdown>
      <MenuButton
        slots={{ root: Avatar }}
        slotProps={{
          root: { variant: 'solid', size: 'sm' },
        }}
      >
        <Avatar
          variant='solid'
          size='sm'
          src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
        />
      </MenuButton>
      <Menu placement='bottom-end'>
        <Box sx={{ display: 'flex', m: 1, gap: 1, alignItems: 'center' }}>
          <ThemeToggleButton />
          <FloatingWindowToggle />
        </Box>
        <MenuItem
          onClick={() => {
            router.push(config.routes.settings);
          }}
        >
          <ListItemDecorator>
            <SettingsRounded />
          </ListItemDecorator>
          Settings
        </MenuItem>
      </Menu>
    </Dropdown>
  );
}

function FloatingWindowToggle() {
  const [floating, setFloating] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Button size='sm' variant='outlined' color='neutral' disabled>
        Floating
      </Button>
    );
  }
  return (
    <Button
      id='theme-toggle'
      size='sm'
      variant='outlined'
      color='neutral'
      startDecorator={floating ? <LightModeRounded /> : <HouseboatRounded />}
      onClick={() => {
        setFloating(!floating);
      }}
      sx={{ width: '100px' }}
    >
      {floating ? 'Floating' : 'Docked'}
    </Button>
  );
}
