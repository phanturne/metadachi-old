import {
  IconCaretDownFilled,
  IconCaretRightFilled,
  IconFileFilled,
  IconFileTypePdf
} from "@tabler/icons-react"
import { Tables } from "@/supabase/types"
import { ChatbotUIContext } from "@/context/context"
import { Dispatch, SetStateAction, useContext } from "react"
import Image from "next/image"
import { MessageImage } from "@/types"
import { Link } from "@mui/joy"

export function MessageFiles({
  fileItems,
  viewSources,
  setViewSources,
  setSelectedFileItem,
  setShowFileItemPreview
}: {
  fileItems: Tables<"file_items">[]
  viewSources: boolean
  setViewSources: (value: boolean) => void
  setSelectedFileItem: (value: Tables<"file_items"> | null) => void
  setShowFileItemPreview: (value: boolean) => void
}) {
  const { files } = useContext(ChatbotUIContext)
  return (
    <>
      {fileItems.length > 0 && (
        <div className="mt-6 text-lg font-bold">
          {!viewSources ? (
            <Link
              component="button"
              level="body-sm"
              underline="none"
              color="neutral"
              onClick={() => setViewSources(true)}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer"
              }}
            >
              {`View ${fileItems.length} Source${
                fileItems.length == 1 ? "" : "s"
              }`}
              <IconCaretRightFilled className="ml-1" />
            </Link>
          ) : (
            <>
              <Link
                component="button"
                level="body-sm"
                underline="none"
                color="neutral"
                onClick={() => setViewSources(false)}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer"
                }}
              >
                Sources <IconCaretDownFilled className="ml-1" />
              </Link>
              <div className="mt-2 grid grid-cols-2 gap-2">
                {fileItems.map((fileItem, index) => {
                  const parentFile = files.find(
                    file => file.id === fileItem.file_id
                  )

                  return (
                    <div
                      key={index}
                      className="border-primary flex cursor-pointer items-center space-x-4 rounded-xl border px-4 py-3 hover:opacity-50"
                      onClick={() => {
                        setSelectedFileItem(fileItem)
                        setShowFileItemPreview(true)
                      }}
                    >
                      <div className="rounded bg-blue-500 p-2">
                        {(() => {
                          let fileExtension = parentFile?.type.includes("/")
                            ? parentFile.type.split("/")[1]
                            : parentFile?.type

                          switch (fileExtension) {
                            case "pdf":
                              return <IconFileTypePdf />
                            default:
                              return <IconFileFilled />
                          }
                        })()}
                      </div>

                      <div className="w-fit space-y-1 truncate text-wrap text-xs">
                        <div className="truncate">{parentFile?.name}</div>

                        <div className="truncate text-xs opacity-50">
                          {fileItem.content.substring(0, 60)}...
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </>
          )}
        </div>
      )}
    </>
  )
}

export function MessageImages({
  message,
  setSelectedImage,
  setShowImagePreview
}: {
  message: Tables<"messages">
  setSelectedImage: Dispatch<SetStateAction<MessageImage | null>>
  setShowImagePreview: Dispatch<SetStateAction<boolean>>
}) {
  const { chatImages } = useContext(ChatbotUIContext)

  return (
    <div className="mt-3 flex flex-wrap gap-2">
      {message.image_paths.map((path, index) => {
        const item = chatImages.find(image => image.messageId === message.id)

        return (
          <Image
            key={index}
            className="cursor-pointer rounded hover:opacity-50"
            src={path.startsWith("data") ? path : item?.base64}
            alt="message image"
            width={300}
            height={300}
            onClick={() => {
              setSelectedImage({
                messageId: message.id,
                path,
                base64: path.startsWith("data") ? path : item?.base64 || "",
                url: path.startsWith("data") ? "" : item?.url || "",
                file: null
              })

              setShowImagePreview(true)
            }}
            loading="lazy"
          />
        )
      })}
    </div>
  )
}
