"use client"

import { Toaster as Sonner } from "sonner"
import { useColorScheme } from "@mui/joy"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  const { mode = "system" } = useColorScheme()

  return <Sonner theme={mode} {...props} />
}

export { Toaster }
