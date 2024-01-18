"use client"

import { TooltipProvider } from "@/components/ui/tooltip"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { ThemeProviderProps } from "next-themes/dist/types"
import { FC } from "react"
import ThemeProvider from "@/lib/providers/ThemeProvider"
import { SnackbarProvider } from "@/lib/providers/SnackbarProvider"

export const Providers: FC<ThemeProviderProps> = ({ children, ...props }) => {
  return (
    <ThemeProvider options={{ key: "joy" }}>
      <SnackbarProvider>
        <NextThemesProvider {...props}>
          <TooltipProvider>{children}</TooltipProvider>
        </NextThemesProvider>
      </SnackbarProvider>
    </ThemeProvider>
  )
}
