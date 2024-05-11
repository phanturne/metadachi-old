import * as React from "react"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { Icon } from "@iconify-icon/react"

export default function MessagePlaceholder() {
  const { toolInUse } = useContext(MetadachiContext)

  return (
    <>
      {(() => {
        switch (toolInUse) {
          case "none":
            return (
              <div className="animate-pulse">
                <Icon icon="solar:record-bold" className="text-base" />
              </div>
            )
          case "retrieval":
            return (
              <div className="flex animate-pulse items-center space-x-2">
                <Icon icon="solar:record-bold" className="text-base" />
                <span>Searching files...</span>
              </div>
            )
          default:
            return null
        }
      })()}
    </>
  )
}
