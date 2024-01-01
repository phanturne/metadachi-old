import type { Metadata } from "next";
import TauriConfig from "@/config/tauri";
import ThemeProvider from "@/utils/providers/ThemeProvider";
// import { AuthContextProvider } from '@/app/AuthContextProvider';
import { SnackbarProvider } from "@/utils/providers/SnackbarProvider";

export const metadata: Metadata = {
  title: "Metadachi",
  description: "Your Supercharged AI Assistant",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <TauriConfig />

      <body>
        <ThemeProvider options={{ key: "joy" }}>
          <SnackbarProvider>
            {/*<AuthContextProvider>{children}</AuthContextProvider>*/}
            {children}
          </SnackbarProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
