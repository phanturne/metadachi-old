import type {Metadata} from 'next'
import TauriConfig from "@/app/TauriConfig";
import ThemeRegistry from "@/app/ThemeRegistry";

export const metadata: Metadata = {
  title: 'Metadachi',
  description: 'Your Supercharged AI Assistant',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <TauriConfig/>

      <body>
        <ThemeRegistry options={{ key: 'joy' }}>{children}</ThemeRegistry>
      </body>
    </html>
  )
}
