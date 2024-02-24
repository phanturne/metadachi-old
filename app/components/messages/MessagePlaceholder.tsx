import { DescriptionRounded } from "@mui/icons-material"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { AnimatedPulseIcon } from "@/app/components/icons/AnimatedPulseIcon"
import { Box } from "@mui/joy"

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
              <Box
                sx={{
                  display: "flex",
                  animation: "pulse", // TODO: Fix animation
                  alignItems: "center",
                  gap: 2
                }}
              >
                <DescriptionRounded />
                Searching files...
              </Box>
            )
          default:
            return null
        }
      })()}
    </>
  )
}
