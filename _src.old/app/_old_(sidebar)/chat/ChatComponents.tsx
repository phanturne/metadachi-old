// 'use client';
//
// import {
//   Avatar,
//   Box,
//   FormControl,
//   MenuList,
//   Option,
//   Select,
//   selectClasses,
//   Stack,
//   Textarea,
//   Typography,
// } from '@mui/joy';
// import Sheet from '@mui/joy/Sheet';
// import IconButton from '@mui/joy/IconButton';
// import { HistoryRounded, KeyboardArrowDown, Send } from '@mui/icons-material';
// import { useAuthModal } from '@/providers/AuthProvider';
// import { useSupabaseSession } from '@/hooks/useSupabaseSession';
// import { useRouter } from 'next/navigation';
// import Dropdown from '@mui/joy/Dropdown';
// import MenuButton from '@mui/joy/MenuButton';
// import Menu from '@mui/joy/Menu';
// import MenuItem from '@mui/joy/MenuItem';
// import * as React from 'react';
// import { useState } from 'react';
// import { getAllChats } from '@/app/_old_(sidebar)/chat/chat-data-access';
// import { Bot, Chat } from '@/app/_old_(sidebar)/chat/chat-utils';
// import { routes } from '@/config';
// import { useChatStore } from '@/stores/chat';
//
// function ChatBubble({ m }: { m: Message }) {
//   const fromUser = m.role === 'user';
//   return (
//     <Stack direction={fromUser ? 'row-reverse' : 'row'}>
//       <Avatar variant={fromUser ? 'outlined' : 'solid'} />
//       <Box sx={{ maxWidth: '60%', minWidth: 'auto' }}>
//         <Sheet
//           color={fromUser ? 'primary' : 'neutral'}
//           variant={fromUser ? 'solid' : 'solid'}
//           sx={{
//             p: 1,
//             borderRadius: 'lg',
//             borderTopRightRadius: fromUser ? 0 : 'lg',
//             borderTopLeftRadius: fromUser ? 'lg' : 0,
//             marginLeft: fromUser ? 0 : 2,
//             marginRight: fromUser ? 2 : 0,
//             backgroundColor: fromUser
//               ? 'var(--joy-palette-primary-solidBg)'
//               : 'var(--joy-palette-primary-solidBg)',
//           }}
//         >
//           <Typography
//             sx={{
//               color: 'var(--joy-palette-text-primary)',
//             }}
//           >
//             {m.content}
//           </Typography>
//         </Sheet>
//       </Box>
//     </Stack>
//   );
// }
//
// export function ChatMessages({ messages }: { messages: Message[] }) {
//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         overflowY: 'scroll',
//         px: 3,
//         flexDirection: 'column-reverse',
//       }}
//     >
//       <Stack gap={1.5} sx={{ py: 2 }}>
//         {messages.map((m) => (
//           <ChatBubble key={m.id} m={m} />
//         ))}
//       </Stack>
//     </Box>
//   );
// }
//
// export function ChatInput({
//   input,
//   handleInputChange,
//   handleSubmit,
// }: {
//   input: string;
//   handleInputChange: (event: any) => void;
//   handleSubmit: (event: any) => void;
// }) {
//   const { openAuthModal } = useAuthModal();
//   const session = useSupabaseSession();
//
//   const handleKeyDown = (event: React.KeyboardEvent) => {
//     if (event.key === 'Enter' && !event.shiftKey) {
//       event.preventDefault();
//
//       if (!session) {
//         openAuthModal();
//       } else {
//         handleSubmit(event);
//       }
//     }
//   };
//
//   return (
//     <Box sx={{ px: 3, py: 2 }}>
//       <form onSubmit={handleSubmit}>
//         <Textarea
//           placeholder='Send a message'
//           maxRows={20}
//           value={input}
//           onChange={handleInputChange}
//           onKeyDown={handleKeyDown}
//           sx={{
//             display: 'flex',
//             flexDirection: 'row',
//           }}
//           endDecorator={
//             <IconButton sx={{ mt: -1 }}>
//               <Send />
//             </IconButton>
//           }
//         />
//       </form>
//     </Box>
//   );
// }
//
// export function EmptyChatConfig({ bots }: { bots: Bot[] }) {
//   const { setBot } = useChatStore();
//   return (
//     <Box
//       sx={{
//         flexGrow: 1,
//         overflowY: 'scroll',
//         px: 3,
//         flexDirection: 'column-reverse',
//         alignItems: 'center',
//         justifyContent: 'center',
//         display: 'flex',
//       }}
//     >
//       <Sheet
//         variant='plain'
//         sx={{
//           height: '300px',
//           width: '400px',
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'center',
//           flexDirection: 'column',
//         }}
//       >
//         <FormControl sx={{ width: '240px', gap: 1 }}>
//           <Typography>Bot</Typography>
//           <Select
//             // TODO: Value for bots?.[0] gets set in useEffect(), so it's not available yet. Show loading indicator instead?
//             defaultValue={bots?.[0]?.name}
//             placeholder='Select a Bot'
//             indicator={<KeyboardArrowDown />}
//             onChange={(_, newValue) => {
//               const selectedBot = bots.find((b) => b.id === newValue);
//               setBot(selectedBot);
//             }}
//             sx={{
//               [`& .${selectClasses.indicator}`]: {
//                 transition: '0.2s',
//                 [`&.${selectClasses.expanded}`]: {
//                   transform: 'rotate(-180deg)',
//                 },
//               },
//             }}
//           >
//             {bots.map((b) => (
//               <Option key={`bot-option-${b.id}`} value={b.id}>
//                 {b.name}
//               </Option>
//             ))}
//           </Select>
//         </FormControl>
//       </Sheet>
//     </Box>
//   );
// }
//
// export function ChatHistoryDropdown() {
//   const router = useRouter();
//   const [chats, setChats] = useState<Chat[]>([]);
//   const { setChat } = useChatStore();
//   const session = useSupabaseSession();
//
//   async function onClick() {
//     if (!session?.user?.id) {
//       return;
//     }
//     await getAllChats(session.user.id, setChats);
//   }
//
//   // TODO: Add loading indicator when fetching chat list
//   // TODO: Fix: [MenuList] is causing the dropdown to not be hidden when click away
//   return (
//     <Dropdown>
//       <MenuButton
//         slots={{ root: IconButton }}
//         slotProps={{ root: { variant: 'plain', color: 'neutral' } }}
//         sx={{ borderRadius: 40 }}
//       >
//         <IconButton color='neutral' size='sm' onClick={onClick}>
//           <HistoryRounded />
//         </IconButton>
//       </MenuButton>
//       <Menu placement='bottom-start' sx={{ m: 0, p: 0 }}>
//         <MenuList
//           component='div'
//           variant='plain'
//           size='sm'
//           sx={{
//             boxShadow: 'sm',
//             flexGrow: 0,
//             width: 250,
//             maxHeight: 'calc(100dvh - var(--Header-height))',
//             overflow: 'auto',
//           }}
//         >
//           {chats.length === 0 && <Typography>Chat List is Empty</Typography>}
//           {chats.map((c) => (
//             <MenuItem
//               key={`ChatListItem_${c.id}`}
//               onClick={() => {
//                 setChat(c);
//                 router.push(`${routes.chat}?c=${c.id}`);
//               }}
//             >
//               {c.chatName}
//             </MenuItem>
//           ))}
//         </MenuList>
//       </Menu>
//     </Dropdown>
//   );
// }
