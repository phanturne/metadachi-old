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
  AccountCircleRounded,
  AutoAwesome,
  ChatRounded,
  ExploreRounded,
  Facebook,
  GitHub,
  HomeRepairServiceRounded,
  ImageRounded,
  Instagram,
  MapsUgcRounded,
  PersonRounded,
  Reddit,
  SettingsRounded,
  SupportRounded,
  Twitter,
} from '@mui/icons-material';
import { Button } from '@mui/joy';
import { useChatStore } from '@/stores/chat';
import { Routes } from '@/constants';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import Typography from '@mui/joy/Typography';

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
  // const { setNewChat } = useChatStore();
  const routeList = [
    Routes.Chats,
    Routes.Images,
    Routes.Toolbox,
    Routes.Discover,
    Routes.Settings,
    Routes.Profile,
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
            router.push(routeList[index] ?? Routes.NotFound);
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

  // const handleNewChat = () => {
  //   setSelectedIndex(0);
  //   setNewChat();
  //   router.push(routes.chat);
  // };

  // function NewChatButton() {
  //   return (
  //     <>
  //       <Button
  //         variant='outlined'
  //         color='neutral'
  //         size='sm'
  //         startDecorator={<MapsUgcRounded />}
  //         sx={{
  //           mr: 1,
  //           display: { xs: 'none', lg: 'inline-flex' },
  //         }}
  //         onClick={handleNewChat}
  //       >
  //         New Chat
  //       </Button>
  //       <IconButton
  //         color='neutral'
  //         size='sm'
  //         sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
  //         onClick={handleNewChat}
  //       >
  //         <MapsUgcRounded />
  //       </IconButton>
  //     </>
  //   );
  // }

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
          <MenuItem index={4} icon={<SettingsRounded />} label='Settings' />
          <MenuItem index={5} icon={<PersonRounded />} label='Profile' />
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
      {/*<NewChatButton />*/}
      <SidebarMenu />
      <Divider sx={{ display: { xs: 'none', lg: 'flex' } }} />
      <SidebarFooter />
    </Sheet>
  );
}

function SidebarHeader() {
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        my: { xs: 0, lg: -1 },
        pb: 2,
      }}
    >
      <IconButton variant='plain' color='primary'>
        <AutoAwesome />
      </IconButton>
      <Typography level='title-lg' sx={{ display: { xs: 'none', lg: 'flex' } }}>
        Metadachi
      </Typography>
    </Box>
  );
}

function SidebarFooter() {
  return (
    <Box
      sx={{
        display: { xs: 'none', lg: 'flex' },
        gap: 1,
        alignItems: 'center',
      }}
    >
      <SocialButtonsRow />
      <IconButton size='sm' variant='plain' color='neutral'>
        <LogoutRoundedIcon />
      </IconButton>
    </Box>
  );
}

function SocialButtonsRow() {
  return (
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
  );
}