// Source: https://github.com/mckaywrigley/chatbot-ui/blob/605f8e4daf445fa945ea4374e88e9fab8d287439/components/ui/dashboard.tsx#L40

"use client"

import { ReactNode, useState } from "react"
import { useSelectFileHandler } from "@/app/lib/hooks/use-select-file-handler"

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
    console.log("drag leave", event)
    setIsDragging(false)
  }

  const onDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
  }

  return (
    <div
      className="flex size-full"
      onDrop={onFileDrop}
      onDragOver={onDragOver}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
    >
      {isDragging ? (
        <div className="flex size-full items-center justify-center">
          <h1 className="text-4xl font-bold">Drop File Here</h1>
        </div>
      ) : (
        children
      )}
    </div>
  )
}
