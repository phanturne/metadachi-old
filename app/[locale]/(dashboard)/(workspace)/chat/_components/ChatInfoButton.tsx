import { ChatbotUIContext } from "@/context/context"
import React, { FC, useContext } from "react"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Textarea,
  Tooltip,
  Typography
} from "@mui/joy"
import { ModelSelect } from "@/components/models/ModelSelect"
import { InfoOutlined } from "@mui/icons-material"

interface ChatSecondaryButtonsProps {}

export const ChatInfoButton: FC<ChatSecondaryButtonsProps> = ({}) => {
  const { selectedChat } = useContext(ChatbotUIContext)

  if (!selectedChat) return

  return (
    <Tooltip
      variant="outlined"
      color="neutral"
      title={
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 1.5,
            p: 2,
            borderRadius: "sm"
          }}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              level="title-sm"
              fontWeight="bold"
              sx={{ alignSelf: "flex-start" }}
            >
              Model
            </Typography>

            <ModelSelect
              disabled
              selectedModelId={selectedChat?.model}
              onSelectModel={() => {}}
            />
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Typography
              level="title-sm"
              fontWeight="bold"
              sx={{ alignSelf: "flex-start" }}
            >
              Prompt
            </Typography>

            <Textarea
              placeholder="You are a helpful AI assistant."
              value={selectedChat?.prompt}
              onChange={() => {}}
              minRows={3}
              maxRows={6}
            />
          </Box>

          <Accordion>
            <AccordionSummary>
              <Typography
                level="title-sm"
                fontWeight="bold"
                sx={{ alignSelf: "flex-start" }}
              >
                Advanced Settings
              </Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography fontSize="md">
                {`Temperature: ${selectedChat.temperature}`}
              </Typography>
              <Typography fontSize="md">
                {`Context Length: ${selectedChat.context_length}`}
              </Typography>
              <Typography fontSize="md">
                {`Include Workspace Instructions: ${selectedChat.include_workspace_instructions}`}
              </Typography>
              <Typography fontSize="md">
                {`Include Profile Context: ${selectedChat.include_profile_context}`}
              </Typography>
              <Typography fontSize="md">
                {`Embeddings Provider: ${selectedChat.embeddings_provider}`}
              </Typography>
            </AccordionDetails>
          </Accordion>
        </Box>
      }
    >
      <InfoOutlined />
    </Tooltip>
  )
}
