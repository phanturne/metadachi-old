import { MetadachiContext } from "@/app/lib/context"
import { getFileFromStorage } from "@/app/lib/db/storage/files"
import useHotkey from "@/app/lib/hooks/use-hotkey"
import { ChatFile, MessageImage } from "@/app/lib/types"
import {
  IconFileFilled,
  IconFileTypeCsv,
  IconFileTypeDocx,
  IconFileTypePdf,
  IconFileTypeTxt,
  IconJson,
  IconLoader2,
  IconMarkdown,
  IconX
} from "@tabler/icons-react"
import Image from "next/image"
import { FC, useContext, useState } from "react"
import { FilePreview } from "../ui/FilePreview"
import { FileRetrievalSettings } from "./FileRetrievalSettings"
import { Box, Button } from "@mui/joy"
import { RetrievalToggle } from "@/app/components/files/FileRetrievalToggle"

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

      <Box>
        <ToggleFilesButton on={true} />
        <Box sx={{ overflow: "auto" }}>
          <Box
            sx={{ display: "flex", gap: 2, overflow: "auto", paddingTop: 1 }}
          >
            {messageImages.map((image, index) => (
              <div
                key={index}
                className="relative flex h-[64px] cursor-pointer items-center space-x-4 rounded-xl hover:opacity-50"
              >
                <Image
                  className="rounded"
                  // Force the image to be 56px by 56px
                  style={{
                    minWidth: "56px",
                    minHeight: "56px",
                    maxHeight: "56px",
                    maxWidth: "56px"
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

                <IconX
                  className="bg-muted-foreground border-primary absolute right-[-6px] top-[-2px] flex size-5 cursor-pointer items-center justify-center rounded-full border-[1px] text-[10px] hover:border-red-500 hover:bg-white hover:text-red-500"
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
                />
              </div>
            ))}

            {combinedChatFiles.map((file, index) =>
              file.id === "loading" ? (
                <div
                  key={index}
                  className="relative flex h-[64px] items-center space-x-4 rounded-xl border-2 px-4 py-3"
                >
                  <div className="rounded bg-blue-500 p-2">
                    <IconLoader2 className="animate-spin" />
                  </div>

                  <div className="truncate text-sm">
                    <div className="truncate">{file.name}</div>
                    <div className="truncate opacity-50">{file.type}</div>
                  </div>
                </div>
              ) : (
                <div
                  key={file.id}
                  className="relative flex h-[64px] cursor-pointer items-center space-x-4 rounded-xl border-2 px-4 py-3 hover:opacity-50"
                  onClick={() => getLinkAndView(file)}
                >
                  <div className="rounded bg-blue-500 p-2">
                    {(() => {
                      let fileExtension = file.type.includes("/")
                        ? file.type.split("/")[1]
                        : file.type

                      switch (fileExtension) {
                        case "pdf":
                          return <IconFileTypePdf />
                        case "markdown":
                          return <IconMarkdown />
                        case "txt":
                          return <IconFileTypeTxt />
                        case "json":
                          return <IconJson />
                        case "csv":
                          return <IconFileTypeCsv />
                        case "docx":
                          return <IconFileTypeDocx />
                        default:
                          return <IconFileFilled />
                      }
                    })()}
                  </div>

                  <div className="truncate text-sm">
                    <div className="truncate">{file.name}</div>
                  </div>

                  <IconX
                    className="bg-muted-foreground border-primary absolute right-[-6px] top-[-6px] flex size-5 cursor-pointer items-center justify-center rounded-full border-[1px] text-[10px] hover:border-red-500 hover:bg-white hover:text-red-500"
                    onClick={e => {
                      e.stopPropagation()
                      setNewMessageFiles(
                        newMessageFiles.filter(f => f.id !== file.id)
                      )
                      setChatFiles(chatFiles.filter(f => f.id !== file.id))
                    }}
                  />
                </div>
              )
            )}
          </Box>
        </Box>
      </Box>
    </>
  ) : (
    combinedMessageFiles.length > 0 && <ToggleFilesButton on={false} />
  )
}
