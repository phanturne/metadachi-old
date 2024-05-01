import * as React from "react"
import { useState } from "react"
import { toast } from "sonner"
import { Avatar, Badge, Button } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

export default function ImageInput({
  src,
  image,
  onSrcChange,
  onImageChange,
  width = 200,
  height = 200,
  label = ""
}: {
  src: string
  image: File | null
  onSrcChange: (src: string) => void
  onImageChange: (image: File) => void
  width?: number
  height?: number
  label?: string
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)
  const [previewSrc, setPreviewSrc] = React.useState<string>(src)
  const [previewImage, setPreviewImage] = useState<File | null>(image)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file.size > 6000000) {
        toast.error("Image must be less than 6MB!")
        return
      }

      const url = URL.createObjectURL(file)

      const img = new window.Image()
      img.src = url

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          toast.error("Unable to create canvas context.")
          return
        }

        const size = Math.min(img.width, img.height)
        canvas.width = size
        canvas.height = size

        ctx.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
        )

        const squareUrl = canvas.toDataURL()

        setPreviewSrc(squareUrl)
        setPreviewImage(file)
        onSrcChange(squareUrl)
        onImageChange(file)
      }
    }
  }

  return (
    <div className="flex flex-col gap-1">
      {label && <label className="text-sm">{label}</label>}
      <div className="flex w-full items-center gap-3">
        {previewSrc && (
          <img
            height={height}
            width={width}
            src={previewSrc}
            alt={"Image"}
            className="rounded-full"
          />
        )}

        <Button
          size="sm"
          variant="bordered"
          onClick={() => fileInputRef.current?.click()}
          startContent={
            <Icon icon="solar:upload-linear" className="text-base" />
          }
        >
          Upload an image
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            className="hidden"
            onChange={handleImageSelect}
          />
        </Button>
      </div>
    </div>
  )
}

export function AvatarImageInput({
  src,
  name,
  onSrcChange,
  onImageChange
}: {
  src: string
  name?: string
  onSrcChange: (src: string) => void
  onImageChange: (image: File) => void
}) {
  const fileInputRef = React.useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0]

      if (file.size > 6000000) {
        toast.error("Image must be less than 6MB!")
        return
      }

      const url = URL.createObjectURL(file)

      const img = new window.Image()
      img.src = url

      img.onload = () => {
        const canvas = document.createElement("canvas")
        const ctx = canvas.getContext("2d")

        if (!ctx) {
          toast.error("Unable to create canvas context.")
          return
        }

        const size = Math.min(img.width, img.height)
        canvas.width = size
        canvas.height = size

        ctx.drawImage(
          img,
          (img.width - size) / 2,
          (img.height - size) / 2,
          size,
          size,
          0,
          0,
          size,
          size
        )

        const squareUrl = canvas.toDataURL()

        onSrcChange(squareUrl)
        onImageChange(file)
      }
    }
  }

  return (
    <Badge
      className="size-5"
      showOutline={false}
      content={
        <Button
          isIconOnly
          radius="full"
          size="sm"
          variant="light"
          onClick={() => fileInputRef.current?.click()}
        >
          <>
            <Icon className="size-unit-sm" icon="solar:pen-linear" />
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              className="hidden"
              onChange={handleImageSelect}
            />
          </>
        </Button>
      }
      placement="bottom-right"
      shape="circle"
    >
      <Avatar size="lg" showFallback name={name} src={src} />
    </Badge>
  )
}
