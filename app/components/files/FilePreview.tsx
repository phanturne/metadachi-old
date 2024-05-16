// Source: https://github.com/mckaywrigley/chatbot-ui/blob/d60e1f3ee9d2caf8c9aab659791b841690183b2d/components/ui/file-preview.tsx

import { ChatFile, MessageImage } from "@/app/lib/types"
import { Tables } from "@/supabase/types"
import { FC } from "react"
import Image from "next/image"
import { DrawingCanvas } from "@/app/components/utility/DrawingCanvas"
import { Icon } from "@iconify-icon/react"
import { Modal, ModalBody, ModalContent } from "@nextui-org/react"

interface FilePreviewProps {
  type: "image" | "file" | "file_item"
  item: ChatFile | MessageImage | Tables<"file_items">
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const FilePreview: FC<FilePreviewProps> = ({
  type,
  item,
  isOpen,
  onOpenChange
}) => {
  return (
    <Modal
      size="5xl"
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      scrollBehavior="inside"
    >
      <ModalContent>
        <ModalBody>
          {type === "image" ? (
            (item as MessageImage).file ? (
              <DrawingCanvas imageItem={item as MessageImage} />
            ) : (
              <Image
                src={
                  (item as MessageImage).base64 || (item as MessageImage).url
                }
                alt="File image"
                width={2000}
                height={2000}
                style={{
                  maxHeight: "67vh",
                  maxWidth: "67vw",
                  borderRadius: "0.25rem"
                }}
              />
            )
          ) : type === "file_item" ? (
            <p>{(item as Tables<"file_items">).content}</p>
          ) : (
            <Icon icon="solar:file-text-bold-duotone" className="text-2xl" />
          )}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
