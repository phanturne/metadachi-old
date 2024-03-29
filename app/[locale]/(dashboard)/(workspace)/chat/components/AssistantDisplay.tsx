// TODO: Refactor UI
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import Image from "next/image"

export function AssistantDisplay() {
  const { selectedAssistant, assistantImages } = useContext(MetadachiContext)

  return (
    <>
      {selectedAssistant && (
        <div className="border-primary mx-auto flex w-fit items-center space-x-2 rounded-lg border p-1.5">
          {selectedAssistant.image_path && (
            <Image
              className="rounded"
              src={
                assistantImages.find(
                  img => img.path === selectedAssistant.image_path
                )?.base64
              }
              width={28}
              height={28}
              alt={selectedAssistant.name}
            />
          )}
          <div className="text-sm font-bold">
            Talking to {selectedAssistant.name}
          </div>
        </div>
      )}
    </>
  )
}
