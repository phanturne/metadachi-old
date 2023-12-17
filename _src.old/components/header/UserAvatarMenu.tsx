// import * as React from 'react';
// import { useEffect, useState } from 'react';
// import Menu from '@mui/joy/Menu';
// import MenuItem from '@mui/joy/MenuItem';
// import ListItemDecorator from '@mui/joy/ListItemDecorator';
// import MenuButton from '@mui/joy/MenuButton';
// import Dropdown from '@mui/joy/Dropdown';
// import Avatar from '@mui/joy/Avatar';
// import ThemeToggleButton from '@/components/ThemeToggle';
// import { Box, Button, Typography } from '@mui/joy';
// import {
//   AnchorRounded,
//   HouseboatRounded,
//   LoginRounded,
//   LogoutRounded,
//   SettingsRounded,
// } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';
// import { routes } from '@/config';
// import Divider from '@mui/joy/Divider';
// import { useSupabaseSession } from '@/hooks/useSupabaseSession';
// import { supabase } from '@/utils/supabaseClient';
// import { useAuthModal } from '@/providers/AuthProvider';
//
// export default function UserAvatarMenu() {
//   const router = useRouter();
//   const session = useSupabaseSession();
//   const { openAuthModal } = useAuthModal();
//
//   // Get the user's name or email
//   const nameOrEmail = session?.user.email ?? 'Guest';
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: Avatar }}
//         slotProps={{
//           root: { variant: 'solid', size: 'sm' },
//         }}
//       >
//         <Avatar
//           variant='solid'
//           size='sm'
//           src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
//         />
//       </MenuButton>
//       <Menu placement='bottom-end' sx={{ width: '250px' }}>
//         <Box sx={{ display: 'flex', m: 1, mx: 1.5 }}>
//           <Avatar
//             variant='solid'
//             src='https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286'
//           />
//           <Box
//             sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               pl: 1.5,
//               overflow: 'hidden',
//             }}
//           >
//             <Typography
//               level='title-sm'
//               sx={{ overflow: 'hidden', textOverflow: 'ellipsis' }}
//             >
//               {nameOrEmail}
//             </Typography>
//             <Typography level='body-sm'>Subtitle</Typography>
//           </Box>
//         </Box>
//         <Divider sx={{ m: 0.5 }} />
//         <Box
//           sx={{ display: 'flex', my: 1, mx: 1.5, gap: 1, alignItems: 'center' }}
//         >
//           <ThemeToggleButton />
//           {process.env.BUILD_MODE === 'export' && <FloatingWindowToggle />}
//         </Box>
//         <MenuItem
//           onClick={() => {
//             router.push(routes.settings);
//           }}
//         >
//           <ListItemDecorator>
//             <SettingsRounded />
//           </ListItemDecorator>
//           Settings
//         </MenuItem>
//         <Divider sx={{ m: 0.5 }} />
//         {session !== null && (
//           <MenuItem
//             onClick={async () => {
//               await supabase.auth.signOut();
//             }}
//           >
//             <ListItemDecorator>
//               <LogoutRounded />
//             </ListItemDecorator>
//             Logout
//           </MenuItem>
//         )}
//         {session === null && (
//           <MenuItem onClick={() => openAuthModal()}>
//             <ListItemDecorator>
//               <LoginRounded />
//             </ListItemDecorator>
//             Login / Sign Up
//           </MenuItem>
//         )}
//       </Menu>
//     </Dropdown>
//   );
// }
//
// function FloatingWindowToggle() {
//   const [floating, setFloating] = useState(false);
//   const [mounted, setMounted] = useState(false);
//   useEffect(() => {
//     setMounted(true);
//   }, []);
//   if (!mounted) {
//     return (
//       <Button size='sm' variant='outlined' color='neutral' disabled>
//         Floating
//       </Button>
//     );
//   }
//   return (
//     <Button
//       id='theme-toggle'
//       size='sm'
//       variant='outlined'
//       color='neutral'
//       startDecorator={floating ? <HouseboatRounded /> : <AnchorRounded />}
//       onClick={() => {
//         setFloating(!floating);
//       }}
//       sx={{ flexGrow: 1 }}
//     >
//       {floating ? 'Floating' : 'Docked'}
//     </Button>
//   );
// }
