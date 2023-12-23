import { Button, useColorScheme } from '@mui/joy';
import { useEffect, useState } from 'react';
import { DarkModeRounded, LightModeRounded } from '@mui/icons-material';

export default function ThemeToggleButton() {
  const { mode, setMode } = useColorScheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return (
      <Button size='sm' variant='outlined' color='neutral' disabled>
        Light
      </Button>
    );
  }
  return (
    <Button
      id='theme-toggle'
      size='sm'
      variant='outlined'
      color='neutral'
      startDecorator={
        mode === 'light' ? (
          <LightModeRounded color='warning' />
        ) : (
          <DarkModeRounded color='primary' />
        )
      }
      onClick={() => {
        setMode(mode === 'light' ? 'dark' : 'light');
      }}
      sx={{ flexGrow: 1 }}
    >
      {mode === 'dark' ? 'Dark' : 'Light'}{' '}
      {process.env.BUILD_MODE !== 'export' && 'Mode'}
    </Button>
  );
}

// export function ThemeToggleIconButton() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return <IconButton size='sm' variant='outlined' color='neutral' disabled />;
//   }
//   return (
//     <IconButton
//       id='theme-toggle'
//       size='sm'
//       variant='outlined'
//       color='neutral'
//       onClick={() => {
//         setMode(mode === 'light' ? 'dark' : 'light');
//       }}
//     >
//       {mode === 'dark' && <DarkModeRounded color='primary' />}
//       {mode === 'light' && <LightModeRounded color='warning' />}
//     </IconButton>
//   );
// }

// export function ThemeToggleSwitch() {
//   const { mode, setMode } = useColorScheme();
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return null;
//   }
//
//   return (
//     <Switch
//       color={mode === 'light' ? 'warning' : 'primary'}
//       size='lg'
//       checked={mode === 'light'}
//       onChange={() => {
//         setMode(mode === 'light' ? 'dark' : 'light');
//       }}
//       slotProps={{
//         thumb: {
//           children:
//             mode === 'light' ? (
//               <LightModeRounded color='warning' />
//             ) : (
//               <DarkModeRounded color='primary' />
//             ),
//         },
//       }}
//     />
//   );
// }
