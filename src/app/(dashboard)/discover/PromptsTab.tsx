import * as React from 'react';
import { Box, Grid, Sheet, TabPanel } from '@mui/joy';
import { usePromptStore } from '@/stores';
import Typography from '@mui/joy/Typography';

export default function PromptsTab() {
  const promptStore = usePromptStore();
  const prompts = promptStore.search('');

  return (
    <TabPanel value='prompts'>
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
          {prompts.map((p) => (
            <Grid xs={1} key={`prompt-option-${p.id}`}>
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
                  {p.title}
                </Typography>
              </Sheet>
            </Grid>
          ))}
        </Grid>
      </Box>
    </TabPanel>
  );
}
