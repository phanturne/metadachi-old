import type { Metadata } from 'next';
import TauriConfig from '@/config/tauri';
import ThemeProvider from '@/providers/ThemeProvider';
import { SnackbarProvider } from '@/providers/SnackbarProvider';
import { getClientConfig } from '@/config/client';

export const metadata: Metadata = {
  title: 'Metadachi',
  description: 'Your Supercharged AI Assistant',
  appleWebApp: {
    title: 'Metadachi',
    statusBarStyle: 'default',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <meta name='config' content={JSON.stringify(getClientConfig())} />
        <link rel='manifest' href='/site.webmanifest'></link>
        <script src='/serviceWorkerRegister.js' defer></script>
        <title>Metadachi</title>
      </head>
      <TauriConfig />

      <body>
        <ThemeProvider options={{ key: 'joy' }}>
          <SnackbarProvider>{children}</SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
