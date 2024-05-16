// Source: https://github.com/mckaywrigley/chatbot-ui/blob/d60e1f3ee9d2caf8c9aab659791b841690183b2d/components/chat/chat-files-display.tsx#L183

import { FileIcons } from "@/app/components/files/FileIcons"
import { Tables } from "@/supabase/types"
import { Button } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface FileButtonProps {
  parentFile: Tables<"files"> | undefined
  subtitle?: string
  fileIcon?: React.ReactNode
  onClick?: (e: any) => void
  onClose?: (e: any) => void
}

export const FileItemButton: React.FC<FileButtonProps> = ({
  parentFile,
  subtitle,
  fileIcon,
  onClick,
  onClose
}) => {
  let fileExtension = parentFile?.type.includes("/")
    ? parentFile.type.split("/")[1]
    : parentFile?.type

  return (
    <Button
      variant="bordered"
      radius="md"
      className="w-full space-x-2 p-6"
      onClick={onClick}
    >
      <div className="rounded-md bg-blue-500 p-1">
        {fileIcon ?? (
          <FileIcons type={fileExtension ?? ""} className="text-2xl" />
        )}
      </div>

      <div className="overflow-hidden text-left">
        <p className="truncate text-sm">{parentFile?.name}</p>

        {subtitle && (
          <p className="truncate text-xs text-default-500">{subtitle}</p>
        )}
      </div>

      {onClose && (
        <Button
          isIconOnly
          size="sm"
          variant="light"
          radius="full"
          className="absolute right-0 top-0"
          onClick={onClose}
        >
          <Icon icon="solar:close-circle-linear" className="text-xl" />
        </Button>
      )}
    </Button>
  )
}
