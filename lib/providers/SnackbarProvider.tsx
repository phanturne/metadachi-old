"use client"

import React, { createContext, useContext, useState } from "react"
import { Button, ColorPaletteProp, Snackbar, VariantProp } from "@mui/joy"

type SnackbarConfig = {
  message?: string
  variant?: VariantProp
  color?: ColorPaletteProp
  action?: {
    text: string
    onClick: () => void
  }
  onClose?: () => void
}

// Create a context with initial values
const SnackbarContext = createContext({
  snackbar: {} as SnackbarConfig | undefined,
  setSnackbar: (_: SnackbarConfig | undefined) => {}
})

// Context Provider
export const SnackbarProvider = ({
  children
}: {
  children: React.ReactNode
}) => {
  const [snackbar, setSnackbar] = useState<SnackbarConfig | undefined>(
    undefined
  )

  // Pass the context values to the provider
  const contextValue = { snackbar, setSnackbar }

  return (
    <SnackbarContext.Provider value={contextValue}>
      <Snackbar
        variant={snackbar?.variant ?? "soft"}
        color={snackbar?.color ?? "neutral"}
        size="sm"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={3000}
        open={snackbar !== undefined}
        onClose={(_, reason) => {
          if (reason === "clickaway") {
            return
          }
          snackbar?.onClose?.()
          setSnackbar(undefined)
        }}
      >
        {snackbar?.message}
        {snackbar?.action && (
          <Button
            variant="plain"
            onClick={() => {
              snackbar.action?.onClick?.()
            }}
          >
            {snackbar.action.text}
          </Button>
        )}
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  )
}

// Custom hook to use the SnackbarModalContext
export const useSnackbar = () => {
  return useContext(SnackbarContext)
}
