import * as React from 'react';
import { useEffect, useState } from 'react';
import { Bot } from '@/app/(sidebar)/chat/chat-utils';
import { getAllBots } from '@/app/(sidebar)/chat/chat-data-access';
import { Box, Grid, Sheet, styled, TabPanel } from '@mui/joy';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function BotsTab() {
  const [bots, setBots] = useState<Bot[]>([]);
  useEffect(() => {
    (async () => {
      const botsData = await getAllBots();
      setBots(botsData);
    })();
  }, []);

  return (
    <TabPanel value='bots'>
      <Box
        sx={{
          flexGrow: 1,
          px: 3,
          flexDirection: 'column-reverse',
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 2, sm: 3, md: 4 }}
          sx={{ flexGrow: 1 }}
        >
          {bots.map((b) => (
            <Grid xs={1} key={`bot-option-${b.id}`}>
              <Item>{b.name}</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </TabPanel>
  );
}
