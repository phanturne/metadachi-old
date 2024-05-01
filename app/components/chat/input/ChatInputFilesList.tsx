import * as React from "react"
import { Badge, Button, Image } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

// TODO: This component will be used to display the list of files/images that the user has uploaded in the chat input
// It is different from the files selected in Chat Settings
export function ChatInputFilesList() {
  const initialImages = [
    "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/nextui-cover1.png",
    "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/nextui-cover2.png",
    "https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/nextui-cover3.jpeg"
  ]
  const [images, setImages] = React.useState<string[]>(initialImages)

  const onRemoveImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  return (
    <div className="group flex gap-2 px-4 pt-4">
      {images.map((image, index) => (
        <Badge
          key={index}
          isOneChar
          className="opacity-0 group-hover:opacity-100"
          content={
            <Button
              isIconOnly
              radius="full"
              size="sm"
              variant="light"
              onPress={() => onRemoveImage(index)}
            >
              <Icon
                className="text-foreground"
                icon="iconamoon:close-thin"
                width={16}
              />
            </Button>
          }
        >
          <Image
            alt="uploaded image cover"
            className="size-14 rounded-small border-small border-default-200/50 object-cover"
            src={image}
          />
        </Badge>
      ))}
    </div>
  )
}
