import { Box, Button } from "@mui/joy"
import { IconBolt } from "@tabler/icons-react"
import { useContext } from "react"
import { MetadachiContext } from "@/app/lib/context"

export function ChatToolsDisplay() {
  const { selectedTools, setSelectedTools } = useContext(MetadachiContext)

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center",
        gap: 1
      }}
    >
      {selectedTools &&
        selectedTools.map((tool, index) => (
          <Button
            key={index}
            variant="outlined"
            color="neutral"
            sx={{
              mt: 2,
              mb: 1,
              display: "flex",
              justifyContent: "center"
              // "&:hover": {
              //   bgcolor: "transparent"
              // }
            }}
            onClick={() =>
              setSelectedTools(
                selectedTools.filter(
                  selectedTool => selectedTool.id !== tool.id
                )
              )
            }
            startDecorator={<IconBolt size={20} />}
          >
            {tool.name}
          </Button>
        ))}
    </Box>
  )
}
