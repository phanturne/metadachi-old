import { useContext } from "react"
import { ChatbotUIContext } from "@/context/context"
import { IconButton, Tooltip } from "@mui/joy"
import { IconCircleFilled } from "@tabler/icons-react"

export const RetrievalToggle = ({}) => {
  const { useRetrieval, setUseRetrieval } = useContext(ChatbotUIContext)

  return (
    <Tooltip
      variant="outlined"
      title={
        useRetrieval
          ? "File retrieval is enabled on the selected files for this message. Click the indicator to disable."
          : "Click the indicator to enable file retrieval for this message."
      }
    >
      <IconButton
        variant="plain"
        size="sm"
        color={useRetrieval ? "success" : "danger"}
        onClick={e => {
          e.stopPropagation()
          setUseRetrieval(prev => !prev)
        }}
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
      >
        <IconCircleFilled size={16} />
      </IconButton>
    </Tooltip>
  )
}
