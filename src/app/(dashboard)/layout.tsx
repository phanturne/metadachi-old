import { Box } from '@mui/joy';
import Sidebar from '@/components/Sidebar';

export default function SidebarLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Box sx={{ display: 'flex', height: '100dvh', overflow: 'hidden' }}>
      <Sidebar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: '100dvh',
          width: 'calc(100vw - var(--Sidebar-width))',
          overflow: 'auto',
        }}
      >
        {children}
      </Box>
    </Box>
  );
}
