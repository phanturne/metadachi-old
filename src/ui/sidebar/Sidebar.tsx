'use client';

import * as React from 'react';
import GlobalStyles from '@mui/joy/GlobalStyles';
import Box from '@mui/joy/Box';
import Divider from '@mui/joy/Divider';
import IconButton from '@mui/joy/IconButton';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListItemButton, { listItemButtonClasses } from '@mui/joy/ListItemButton';
import ListItemContent from '@mui/joy/ListItemContent';
import Sheet from '@mui/joy/Sheet';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { useRouter } from 'next/navigation';
import {
  ChatRounded,
  ExploreRounded,
  HomeRepairServiceRounded,
  ImageRounded,
  MapsUgcRounded,
  SettingsRounded,
  SupportRounded,
} from '@mui/icons-material';
import config from '@/lib/config';
import { Button } from '@mui/joy';
import { useChatStore } from '@/lib/stores/chat';
import SidebarHeader from '@/ui/sidebar/SidebarHeader';
import SidebarFooter from '@/ui/sidebar/SidebarFooter';

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  const chatState = useChatStore();
  const routes = [
    config.routes.chat,
    config.routes.images,
    config.routes.toolbox,
    config.routes.discover,
    config.routes.support,
    config.routes.settings,
  ];

  function MenuItem({
    index,
    icon,
    label,
    trailingContent,
  }: {
    index: number;
    icon: React.ReactNode;
    label: string;
    trailingContent?: React.ReactNode;
  }) {
    return (
      <ListItem>
        <ListItemButton
          selected={index === selectedIndex}
          onClick={() => {
            setSelectedIndex(index);
            router.push(routes[index] ?? config.routes.notFound);
          }}
        >
          <ListItemDecorator>{icon}</ListItemDecorator>
          <ListItemContent sx={{ display: { xs: 'none', lg: 'flex' } }}>
            {label}
          </ListItemContent>
          {trailingContent}
        </ListItemButton>
      </ListItem>
    );
  }

  function NewChatButton() {
    return (
      <>
        <Button
          variant='outlined'
          color='neutral'
          size='sm'
          startDecorator={<MapsUgcRounded />}
          sx={{
            mr: 1,
            display: { xs: 'none', lg: 'inline-flex' },
          }}
          onClick={() => {
            chatState.reset();
            router.push(config.routes.chat);
            setSelectedIndex(0);
          }}
        >
          New Chat
        </Button>
        <IconButton
          color='neutral'
          size='sm'
          sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
          onClick={() => {
            chatState.reset();
            router.push(config.routes.chat);
            setSelectedIndex(0);
          }}
        >
          <MapsUgcRounded />
        </IconButton>
      </>
    );
  }

  function SidebarMenu() {
    return (
      <Box
        sx={{
          minHeight: 0,
          overflow: 'auto',
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          [`& .${listItemButtonClasses.root}`]: {
            gap: 1.5,
          },
        }}
      >
        <List
          size='sm'
          sx={{
            gap: 1,
            overflow: 'hidden',
            '--List-nestedInsetStart': '30px',
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
          }}
        >
          <MenuItem index={0} icon={<ChatRounded />} label='Chats' />
          <MenuItem index={1} icon={<ImageRounded />} label='Images' />
          <MenuItem
            index={2}
            icon={<HomeRepairServiceRounded />}
            label='Toolbox'
          />
          <MenuItem index={3} icon={<ExploreRounded />} label='Discover' />
        </List>

        <List
          size='sm'
          sx={{
            overflow: 'hidden',
            mt: 1,
            flexGrow: 0,
            '--ListItem-radius': (theme) => theme.vars.radius.sm,
            '--List-gap': '8px',
          }}
        >
          <MenuItem index={4} icon={<SupportRounded />} label='Support' />
          <MenuItem index={5} icon={<SettingsRounded />} label='Settings' />
        </List>
      </Box>
    );
  }
  return (
    <Sheet
      className='Sidebar'
      sx={{
        transform: {
          xs: 'translateX(calc(100% * (var(1, 0) - 1)))',
          lg: 'none',
        },
        transition: 'transform 0.4s, width 0.4s',
        height: '100dvh',
        width: {
          xs: 'var(--Sidebar-width)',
          lg: 'calc(var(--Sidebar-width) + 190px)',
        },
        top: 0,
        p: { xs: 1, lg: 2 },
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: { xs: 0, lg: 2 },
        borderRight: '1px solid',
        borderColor: 'divider',
      }}
    >
      <GlobalStyles
        styles={() => ({
          ':root': {
            '--Sidebar-width': '50px',
          },
        })}
      />
      <SidebarHeader />
      <NewChatButton />
      <SidebarMenu />
      <Divider sx={{ display: { xs: 'none', lg: 'flex' } }} />
      <SidebarFooter />
    </Sheet>
  );
}
