"use client"

import { ReactNode, useState } from "react"
import { Box, Typography } from "@mui/joy"
import { useSelectFileHandler } from "@/app/lib/hooks/use-select-file-handler"
import Sheet from "@mui/joy/Sheet"

interface ChatLayoutProps {
  children: ReactNode
}

export default function FileDropzoneContainer({ children }: ChatLayoutProps) {
  const [isDragging, setIsDragging] = useState(false)
  const { handleSelectDeviceFile } = useSelectFileHandler()

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
        height: "100%",
        width: "100%"
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
            width: "100%",
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
