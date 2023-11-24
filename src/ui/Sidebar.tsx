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
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import ListItemDecorator from '@mui/joy/ListItemDecorator';
import { useRouter } from 'next/navigation';
import {
  AutoAwesome,
  ChatRounded,
  ExploreRounded,
  Facebook,
  GitHub,
  HomeRepairServiceRounded,
  ImageRounded,
  Instagram,
  MapsUgcRounded,
  Reddit,
  SettingsRounded,
  SupportRounded,
  Twitter,
} from '@mui/icons-material';
import config from '@/lib/config';
import { Button } from '@mui/joy';

// Controller for nested menu items
function Toggler({
  defaultExpanded = false,
  renderToggle,
  children,
}: {
  defaultExpanded?: boolean;
  children: React.ReactNode;
  renderToggle: (params: {
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  }) => React.ReactNode;
}) {
  const [open, setOpen] = React.useState(defaultExpanded);
  return (
    <React.Fragment>
      {renderToggle({ open, setOpen })}
      <Box
        sx={{
          display: 'grid',
          gridTemplateRows: open ? '1fr' : '0fr',
          transition: '0.2s ease',
          '& > *': {
            overflow: 'hidden',
          },
        }}
      >
        {children}
      </Box>
    </React.Fragment>
  );
}

export default function Sidebar() {
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const router = useRouter();
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
        <Typography
          level='title-lg'
          sx={{ display: { xs: 'none', lg: 'flex' } }}
        >
          Metadachi
        </Typography>
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
      <Button
        variant='outlined'
        color='neutral'
        size='sm'
        startDecorator={<MapsUgcRounded />}
        sx={{
          mr: 1,
          display: { xs: 'none', lg: 'inline-flex' },
        }}
      >
        New Chat
      </Button>
      <IconButton
        color='neutral'
        size='sm'
        sx={{ display: { xs: 'inline-flex', lg: 'none' } }}
      >
        <MapsUgcRounded />
      </IconButton>
      {/*<Input*/}
      {/*  sx={{ display: { xs: 'none', lg: 'flex' } }}*/}
      {/*  size='sm'*/}
      {/*  startDecorator={<SearchRounded />}*/}
      {/*  placeholder='Search'*/}
      {/*/>*/}
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
          {/*<IconButton*/}
          {/*  sx={{ display: { xs: 'flex', lg: 'none' } }}*/}
          {/*  variant='plain'*/}
          {/*>*/}
          {/*  <SearchRounded />*/}
          {/*</IconButton>*/}
          <MenuItem index={0} icon={<ChatRounded />} label='Chats' />
          <MenuItem index={1} icon={<ImageRounded />} label='Images' />
          <MenuItem
            index={2}
            icon={<HomeRepairServiceRounded />}
            label='Toolbox'
          />
          <MenuItem index={3} icon={<ExploreRounded />} label='Discover' />
          {/*<Divider sx={{ my: 1 }} />*/}
          {/*<ListItem nested>*/}
          {/*  <Toggler*/}
          {/*    defaultExpanded={true}*/}
          {/*    renderToggle={({ open, setOpen }) => (*/}
          {/*      <ListItemButton onClick={() => setOpen(!open)}>*/}
          {/*        <QuestionAnswerRounded />*/}
          {/*        <ListItemContent>*/}
          {/*          <Typography level='title-sm'>Recent Chats</Typography>*/}
          {/*        </ListItemContent>*/}
          {/*        <KeyboardArrowDown*/}
          {/*          sx={{ transform: open ? 'rotate(180deg)' : 'none' }}*/}
          {/*        />*/}
          {/*      </ListItemButton>*/}
          {/*    )}*/}
          {/*  >*/}
          {/*    <List sx={{ gap: 0.5 }}>*/}
          {/*      <ListItem sx={{ mt: 0.5 }}>*/}
          {/*        <ListItemButton>Chat 1</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*      <ListItem>*/}
          {/*        <ListItemButton>Chat 2</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*      <ListItem>*/}
          {/*        <ListItemButton>Chat 3</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*      <ListItem>*/}
          {/*        <ListItemButton>Chat 4</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*      <ListItem>*/}
          {/*        <ListItemButton>Chat 5</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*      <ListItem>*/}
          {/*        <ListItemButton>Chat 6</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*      <ListItem>*/}
          {/*        <ListItemButton>Chat 7</ListItemButton>*/}
          {/*      </ListItem>*/}
          {/*    </List>*/}
          {/*  </Toggler>*/}
          {/*</ListItem>*/}
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

      <Divider sx={{ display: { xs: 'none', lg: 'flex' } }} />
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
    </Sheet>
  );
}
