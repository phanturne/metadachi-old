import { Tables } from "@/supabase/types"
import { Dispatch, SetStateAction, useContext } from "react"
import { MessageImage } from "@/app/lib/types"
import { MetadachiContext } from "@/app/lib/context"
import Image from "next/image"

export function MessageImages({
  message,
  setSelectedImage,
  setShowImagePreview
}: {
  message: Tables<"messages">
  setSelectedImage: Dispatch<SetStateAction<MessageImage | null>>
  setShowImagePreview: Dispatch<SetStateAction<boolean>>
}) {
  const { chatImages } = useContext(MetadachiContext)

  return (
    <div className="mt-2 flex flex-wrap gap-1">
      {message.image_paths.map((path, index) => {
        const item = chatImages.find(image => image.messageId === message.id)

        return (
          <Image
            key={index}
            style={{
              cursor: "pointer",
              borderRadius: "0.25rem",
              transitionDuration: "200ms",
              transitionProperty: "opacity"
            }}
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
