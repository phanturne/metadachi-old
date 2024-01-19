"use client"

import { supabase } from "@/lib/supabase/browser-client"
import { useRouter } from "next/navigation"
import { ReactNode, useEffect, useState } from "react"
import { Box } from "@mui/joy"
import { useSelectFileHandler } from "@/lib/hooks/use-select-file-handler"

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
        // width: "calc(100vw - var(--Sidebar-width))",
        overflow: "auto"
      }}
      onDrop={onFileDrop}
      onDragOver={onDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {isDragging ? (
        <div className="flex h-full items-center justify-center bg-black/50 text-2xl text-white">
          drop file here
        </div>
      ) : (
        children
      )}
    </Box>
  )
}
