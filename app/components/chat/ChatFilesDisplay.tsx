import { MetadachiContext } from "@/app/lib/context"
import { getFileFromStorage } from "@/app/lib/db/storage/files"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import { ChatFile, MessageImage } from "@/app/lib/types"
import Image from "next/image"
import { FC, useContext, useState } from "react"
import { FilePreview } from "../files/FilePreview"
import { FileRetrievalSettings } from "../files/FileRetrievalSettings"
import { Box, Button, CircularProgress, Grid, IconButton } from "@mui/joy"
import { RetrievalToggle } from "@/app/components/files/FileRetrievalToggle"
import { FileItemButton } from "@/app/components/files/FileItemButton"
import { CloseRounded } from "@mui/icons-material"

interface ChatFilesDisplayProps {}

export const ChatFilesDisplay: FC<ChatFilesDisplayProps> = ({}) => {
  useHotkey("f", () => setShowFilesDisplay(prev => !prev))
  useHotkey("e", () => setUseRetrieval(prev => !prev))

  const {
    files,
    newMessageImages,
    setNewMessageImages,
    newMessageFiles,
    setNewMessageFiles,
    setShowFilesDisplay,
    showFilesDisplay,
    chatFiles,
    chatImages,
    setChatImages,
    setChatFiles,
    setUseRetrieval
  } = useContext(MetadachiContext)

  const [selectedFile, setSelectedFile] = useState<ChatFile | null>(null)
  const [selectedImage, setSelectedImage] = useState<MessageImage | null>(null)
  const [showPreview, setShowPreview] = useState(false)

  const messageImages = [
    ...newMessageImages.filter(
      image =>
        !chatImages.some(chatImage => chatImage.messageId === image.messageId)
    )
  ]

  const combinedChatFiles = [
    ...newMessageFiles.filter(
      file => !chatFiles.some(chatFile => chatFile.id === file.id)
    ),
    ...chatFiles
  ]

  const combinedMessageFiles = [...messageImages, ...combinedChatFiles]

  const getLinkAndView = async (file: ChatFile) => {
    const fileRecord = files.find(f => f.id === file.id)

    if (!fileRecord) return

    const link = await getFileFromStorage(fileRecord.file_path)
    window.open(link, "_blank")
  }

  function ToggleFilesButton({ on }: { on: boolean }) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Button
          size="sm"
          variant="outlined"
          color="neutral"
          onClick={() => setShowFilesDisplay(!on)}
          startDecorator={<RetrievalToggle />}
          endDecorator={
            <Box onClick={e => e.stopPropagation()}>
              <FileRetrievalSettings />
            </Box>
          }
        >
          {on
            ? "Hide files"
            : `View ${combinedMessageFiles.length} file${
                combinedMessageFiles.length > 1 ? "s" : ""
              }`}
        </Button>
      </Box>
    )
  }

  return showFilesDisplay && combinedMessageFiles.length > 0 ? (
    <>
      {showPreview && selectedImage && (
        <FilePreview
          type="image"
          item={selectedImage}
          isOpen={showPreview}
          onOpenChange={(isOpen: boolean) => {
            setShowPreview(isOpen)
            setSelectedImage(null)
          }}
        />
      )}

      {showPreview && selectedFile && (
        <FilePreview
          type="file"
          item={selectedFile}
          isOpen={showPreview}
          onOpenChange={(isOpen: boolean) => {
            setShowPreview(isOpen)
            setSelectedFile(null)
          }}
        />
      )}

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
        <ToggleFilesButton on={true} />
        <Grid container spacing={{ xs: 1 }} columns={{ xs: 4, md: 8, xl: 12 }}>
          {messageImages.map((image, index) => (
            <Grid
              xs={4}
              key={index}
              sx={{
                position: "relative",
                display: "flex",
                height: "64px",
                cursor: "pointer",
                alignItems: "center",
                gap: 1,
                borderRadius: "md",
                "&:hover": {
                  opacity: 0.5
                }
              }}
            >
              <Image
                // Force the image to be 56px by 56px
                style={{
                  minWidth: "56px",
                  minHeight: "56px",
                  maxHeight: "56px",
                  maxWidth: "56px",
                  borderRadius: "0.25rem"
                }}
                src={image.base64} // Preview images will always be base64
                alt="File image"
                width={56}
                height={56}
                onClick={() => {
                  setSelectedImage(image)
                  setShowPreview(true)
                }}
              />

              <IconButton
                size="sm"
                variant="solid"
                sx={{
                  position: "absolute",
                  right: -8,
                  top: -8,
                  borderRadius: "xl",
                  minWidth: "20px",
                  minHeight: "20px",
                  p: 0
                }}
                onClick={e => {
                  e.stopPropagation()
                  setNewMessageImages(
                    newMessageImages.filter(
                      f => f.messageId !== image.messageId
                    )
                  )
                  setChatImages(
                    chatImages.filter(f => f.messageId !== image.messageId)
                  )
                }}
              >
                <CloseRounded
                  sx={{
                    width: "15px",
                    height: "auto"
                  }}
                />
              </IconButton>
            </Grid>
          ))}

          {combinedChatFiles.map((file, index) => (
            <Grid xs={4} key={index}>
              {file.id === "loading" ? (
                <FileItemButton
                  key={file.id}
                  parentFile={files.find(f => f.id === file.id)}
                  subtitle={file.type}
                  fileIcon={
                    <CircularProgress variant="plain" sx={{ mb: -0.5 }} />
                  }
                  onClick={() => getLinkAndView(file)}
                  onClose={e => {
                    e.stopPropagation()
                    setNewMessageFiles(
                      newMessageFiles.filter(f => f.id !== file.id)
                    )
                    setChatFiles(chatFiles.filter(f => f.id !== file.id))
                  }}
                />
              ) : (
                <FileItemButton
                  key={file.id}
                  parentFile={files.find(f => f.id === file.id)}
                  onClick={() => getLinkAndView(file)}
                  onClose={e => {
                    e.stopPropagation()
                    setNewMessageFiles(
                      newMessageFiles.filter(f => f.id !== file.id)
                    )
                    setChatFiles(chatFiles.filter(f => f.id !== file.id))
                  }}
                />
              )}
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  ) : (
    combinedMessageFiles.length > 0 && <ToggleFilesButton on={false} />
  )
}
