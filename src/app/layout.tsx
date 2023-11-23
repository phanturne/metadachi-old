import type { Metadata } from 'next';
import TauriConfig from '@/app/TauriConfig';
import ThemeProvider from '@/app/ThemeProvider';
import { AuthContextProvider } from '@/app/AuthContextProvider';

export const metadata: Metadata = {
  title: 'Metadachi',
  description: 'Your Supercharged AI Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <TauriConfig />

      <body>
        <ThemeProvider options={{ key: 'joy' }}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
