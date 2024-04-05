import { Toaster } from "@/app/components/utility/Toaster"
import { GlobalStateProvider } from "@/app/lib/providers/GlobalStateProvider"
import { Providers } from "@/app/lib/providers/Providers"
import TranslationsProvider from "@/app/lib/providers/TranslationsProvider"
import initTranslations from "@/app/lib/utils/i18n"
import { Database } from "@/supabase/types"
import { createServerClient } from "@supabase/ssr"
import { Metadata, Viewport } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ReactNode } from "react"
import "@/app/lib/globals.css"
import {
  APP_DEFAULT_TITLE,
  APP_DESCRIPTION,
  APP_NAME,
  APP_TITLE_TEMPLATE
} from "@/app/lib/config"

const inter = Inter({ subsets: ["latin"] })

interface RootLayoutProps {
  children: ReactNode
  params: {
    locale: string
  }
}

export const metadata: Metadata = {
  applicationName: APP_NAME,
  title: {
    default: APP_DEFAULT_TITLE,
    template: APP_TITLE_TEMPLATE
  },
  description: APP_DESCRIPTION,
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black",
    title: APP_DEFAULT_TITLE
    // startUpImage: [],
  },
  formatDetection: {
    telephone: false
  },
  openGraph: {
    type: "website",
    siteName: APP_NAME,
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  },
  twitter: {
    card: "summary",
    title: {
      default: APP_DEFAULT_TITLE,
      template: APP_TITLE_TEMPLATE
    },
    description: APP_DESCRIPTION
  }
}

export const viewport: Viewport = {
  themeColor: "#000000"
}

const i18nNamespaces = ["translation"]

export default async function RootLayout({
  children,
  params: { locale }
}: RootLayoutProps) {
  const cookieStore = cookies()
  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        }
      }
    }
  )
  const session = (await supabase.auth.getSession()).data.session

  const { t, resources } = await initTranslations(locale, i18nNamespaces)

  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers attribute="class" defaultTheme="system">
          <TranslationsProvider
            namespaces={i18nNamespaces}
            locale={locale}
            resources={resources}
          >
            <Toaster richColors position="bottom-center" duration={3000} />
            {session ? (
              <GlobalStateProvider>{children}</GlobalStateProvider>
            ) : (
              children
            )}
          </TranslationsProvider>
        </Providers>
      </body>
    </html>
  )
}
