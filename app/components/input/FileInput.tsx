import * as React from "react"
import { Icon } from "@iconify-icon/react"
import { Button } from "@nextui-org/react"

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
    <Button
      isIconOnly={isIconOnly}
      variant={isIconOnly ? "light" : "bordered"}
      onClick={() => fileInputRef.current?.click()}
      startContent={
        isIconOnly ? (
          <Icon icon="solar:add-circle-linear" className="text-xl" />
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
  )
}
