"use client"

import { supabase } from "@/lib/supabase/browser-client"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { Box, Typography } from "@mui/joy"
import { useSelectFileHandler } from "@/lib/hooks/use-select-file-handler"
import Sheet from "@mui/joy/Sheet"

interface ChatLayoutProps {
  children: ReactNode
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  const [loading, setLoading] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const router = useRouter()
  const { handleSelectDeviceFile } = useSelectFileHandler()

  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return null
  }

  const onFileDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files = event.dataTransfer.files
    const file = files[0]

    handleSelectDeviceFile(file)

    setIsDragging(false)
  }

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setIsDragging(false)
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        width: "100%",
        overflow: "auto"
      }}
      onDrop={onFileDrop}
      onDragOver={onDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {isDragging ? (
        <Sheet
          sx={{
            display: "flex",
            height: "100%",
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Typography level="h1">Drop File Here</Typography>
        </Sheet>
      ) : (
        children
      )}
    </Box>
  )
}
