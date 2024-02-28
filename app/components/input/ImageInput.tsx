import * as React from "react"
import { toast } from "sonner"
import Button from "@mui/joy/Button"
import { FileUploadRounded } from "@mui/icons-material"
import { VisuallyHiddenInput } from "@/app/components/input/VisuallyHiddenInput"
import { Box } from "@mui/joy"

interface ImageInputProps {
  src: string
  image: File | null
  onSrcChange: (src: string) => void
  onImageChange: (image: File) => void
  width?: number
  height?: number
}

const ImageInput: React.FC<ImageInputProps> = ({
  src,
  image,
  onSrcChange,
  onImageChange,
  width = 200,
  height = 200
}) => {
  const [previewSrc, setPreviewSrc] = React.useState<string>(src)
  const [previewImage, setPreviewImage] = React.useState<File | null>(image)

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
    <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
      {previewSrc && (
        <img
          style={{
            width: `${width}px`,
            height: `${height}px`,
            borderRadius: "0.25rem"
          }}
          height={height}
          width={width}
          src={previewSrc}
          alt={"Image"}
        />
      )}

      <Button
        size="sm"
        component="label"
        role={undefined}
        tabIndex={-1}
        variant="outlined"
        color="neutral"
        startDecorator={<FileUploadRounded />}
      >
        Upload an image
        <VisuallyHiddenInput
          type="file"
          accept="image/png, image/jpeg, image/jpg"
          onChange={handleImageSelect}
        />
      </Button>
    </Box>
  )
}

export default ImageInput
