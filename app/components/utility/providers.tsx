"use client"

import { TooltipProvider } from "@/app/components/ui/tooltip"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { FC } from "react"
import ThemeProvider from "@/app/lib/providers/ThemeProvider"
import { SnackbarProvider } from "@/app/lib/providers/SnackbarProvider"
import { AuthContextProvider } from "@/app/lib/providers/AuthContextProvider"

export const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <ThemeProvider options={{ key: "joy" }}>
      <SnackbarProvider>
        <NextThemesProvider {...props}>
          <TooltipProvider>
            <AuthContextProvider>{children}</AuthContextProvider>
          </TooltipProvider>
        </NextThemesProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
