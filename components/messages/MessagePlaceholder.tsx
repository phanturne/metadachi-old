import { DescriptionRounded } from "@mui/icons-material"
import { useContext } from "react"
import { ChatbotUIContext } from "@/context/context"
import { AnimatedPulseIcon } from "@/components/icons/AnimatedPulseIcon"

export default function MessagePlaceholder() {
  const { toolInUse } = useContext(ChatbotUIContext)

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
