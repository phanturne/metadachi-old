import { useColorScheme } from '@mui/joy/styles';
import { useEffect, useState } from 'react';
import IconButton from '@mui/joy/IconButton';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';

export default function ThemeToggle() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return <IconButton size='sm' variant='outlined' color='neutral' disabled />;
  }
  return (
    <IconButton
      id='theme-toggle'
      size='sm'
      variant='outlined'
      color='neutral'
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
    >
      {mode === 'dark' && <DarkModeRounded />}
      {mode === 'light' && <LightModeRounded />}
    </IconButton>
  );
}
