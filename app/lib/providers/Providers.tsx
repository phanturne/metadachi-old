"use client"

import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { FC } from "react"
import ThemeProvider from "@/app/lib/providers/ThemeProvider"
import { AuthContextProvider } from "@/app/lib/providers/AuthContextProvider"
import { NextUIProvider } from "@nextui-org/react"

export const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <ThemeProvider options={{ key: "joy" }}>
      <NextUIProvider>
        <NextThemesProvider {...props}>
          <AuthContextProvider>{children}</AuthContextProvider>
        </NextThemesProvider>
      </NextUIProvider>
    </ThemeProvider>
  )
}
