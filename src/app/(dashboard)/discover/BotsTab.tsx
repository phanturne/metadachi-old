import * as React from 'react';
import { Box, Grid, Sheet, TabPanel } from '@mui/joy';
import { useMaskStore } from '@/stores/mask';
import Typography from '@mui/joy/Typography';

export default function BotsTab() {
  const maskStore = useMaskStore();
  const bots = maskStore.getAll();

  return (
    <TabPanel value='bots'>
      <Box
        sx={{
          flexGrow: 1,
          height: '100dvh',
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
              <Sheet
                variant='soft'
                sx={{ textAlign: 'center', p: 1, borderRadius: 4 }}
              >
                <Typography
                  level='title-md'
                  noWrap
                  sx={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                  }}
                >
                  {b.name}
                </Typography>
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </Box>
    </TabPanel>
  );
}
