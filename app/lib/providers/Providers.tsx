"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { FC } from "react"
import ThemeProvider from "@/app/lib/providers/ThemeProvider"
import { NextUIProvider } from "@nextui-org/react"
import { useRouter } from "next/navigation"
import { AuthContextProvider } from "@/app/lib/providers/AuthContextProvider"

export const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  const router = useRouter()

  return (
    <NextUIProvider navigate={router.push}>
      <NextThemesProvider {...props}>
        <main className="bg-background text-foreground">
          <AuthContextProvider>{children}</AuthContextProvider>
        </main>
      </NextThemesProvider>
    </NextUIProvider>
  )
}
