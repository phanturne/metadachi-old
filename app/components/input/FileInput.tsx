import * as React from "react"
import { Icon } from "@iconify-icon/react"
import { Button, Tooltip } from "@nextui-org/react"

export default function FileInput({
  handleSelectedFile,
  accept,
  required,
  isIconOnly = false
}: {
  handleSelectedFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  required?: boolean
  isIconOnly?: boolean
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  return (
    <Tooltip showArrow content="Add Files">
      <Button
        isIconOnly={isIconOnly}
        radius={isIconOnly ? "full" : "md"}
        size={isIconOnly ? "sm" : "md"}
        variant={isIconOnly ? "light" : "bordered"}
        onClick={() => fileInputRef.current?.click()}
        startContent={
          isIconOnly ? (
            <Icon
              className="text-xl text-default-500"
              icon="solar:paperclip-linear"
            />
          ) : (
            <Icon icon="solar:upload-linear" className="text-xl" />
          )
        }
      >
        {!isIconOnly && "Upload a file"}
        <input
          required={required}
          accept={accept}
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleSelectedFile}
        />
      </Button>
    </Tooltip>
  )
}
