"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { FC } from "react"
import ThemeProvider from "@/app/lib/providers/ThemeProvider"
import { AuthContextProvider } from "@/app/lib/providers/AuthContextProvider"
import { NextUIProvider } from "@nextui-org/react"
import { useRouter } from "next/navigation"

export const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  const router = useRouter()

  return (
    // Remove ThemeProvider after replacing JoyUI
    <ThemeProvider options={{ key: "joy" }}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider {...props}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </ThemeProvider>
  )
}
