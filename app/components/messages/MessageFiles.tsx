// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/messages/message.tsx

import { Tables } from "@/supabase/types"
import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { FileItemButton } from "@/app/components/files/FileItemButton"
import { Button } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

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
  const { files } = useContext(MetadachiContext)
  return (
    <>
      {fileItems.length > 0 && (
        <div className="mt-4">
          {!viewSources ? (
            <Button
              size="sm"
              variant="flat"
              className="font-semibold"
              onClick={() => setViewSources(true)}
              endContent={<Icon icon="solar:alt-arrow-right-linear" />}
            >
              {`View ${fileItems.length} Source${
                fileItems.length == 1 ? "" : "s"
              }`}
            </Button>
          ) : (
            <>
              <Button
                size="sm"
                variant="flat"
                className="font-semibold"
                onClick={() => setViewSources(false)}
                endContent={<Icon icon="solar:alt-arrow-down-linear" />}
              >
                Sources
              </Button>
              <div className="mt-2 flex flex-wrap gap-2">
                {fileItems.map((fileItem, index) => {
                  const parentFile = files.find(
                    file => file.id === fileItem.file_id
                  )

                  return (
                    <div
                      className="w-full md:w-1/2 lg:w-1/3"
                      key={fileItem.file_id}
                    >
                      <FileItemButton
                        parentFile={parentFile}
                        subtitle={fileItem.content.substring(0, 60)}
                        onClick={() => {
                          setSelectedFileItem(fileItem)
                          setShowFileItemPreview(true)
                        }}
                      />
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
