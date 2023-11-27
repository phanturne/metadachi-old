'use client';

import Header from '@/ui/header/Header';
import { Box, Grid, Sheet, styled } from '@mui/joy';

const Item = styled(Sheet)(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark' ? theme.palette.background.level1 : '#fff',
  ...theme.typography['body-sm'],
  padding: theme.spacing(1),
  textAlign: 'center',
  borderRadius: 4,
  color: theme.vars.palette.text.secondary,
}));

export default function DiscoverPage() {
  return (
    <>
      <Header />
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'scroll',
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
          {Array.from(Array(120)).map((_, index) => (
            <Grid xs={1} key={index}>
              <Item>xs=2</Item>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
