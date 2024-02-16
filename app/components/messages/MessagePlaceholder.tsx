import { DescriptionRounded } from "@mui/icons-material"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { AnimatedPulseIcon } from "@/app/components/icons/AnimatedPulseIcon"

export default function MessagePlaceholder() {
  const { toolInUse } = useContext(MetadachiContext)

  return (
    <>
      {(() => {
        switch (toolInUse) {
          case "none":
            return <AnimatedPulseIcon />
          case "retrieval":
            return (
              <div className="flex animate-pulse items-center space-x-2">
                <DescriptionRounded />

                <div>Searching files...</div>
              </div>
            )
          default:
            return null
        }
      })()}
    </>
  )
}
