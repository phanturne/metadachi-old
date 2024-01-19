import { CircleRounded } from "@mui/icons-material"

export const AnimatedPulseIcon = () => {
  return (
    <CircleRounded
      sx={{
        "@keyframes pulse": {
          "0%, 100%": {
            transform: "scale(1)"
          },
          "50%": {
            transform: "scale(1.2)"
          }
        },
        animation: "pulse 1.5s infinite"
      }}
      fontSize="small" // Adjust the size as needed
    />
  )
}
