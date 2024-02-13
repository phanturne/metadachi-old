import { IconLoader2 } from "@tabler/icons-react"
import { Box, CircularProgress } from "@mui/joy"

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <CircularProgress />
    </Box>
  )
}
