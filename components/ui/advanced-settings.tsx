import { IconInfoCircle } from "@tabler/icons-react"
import { FC, useContext } from "react"
import { ChatSettings } from "@/types"
import { ChatbotUIContext } from "@/context/context"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import { Accordion, AccordionDetails, AccordionSummary, Box } from "@mui/joy"
import {
  Typography,
  Slider,
  Checkbox,
  Tooltip,
  Select,
  MenuItem,
  IconButton
} from "@mui/joy"
import InfoIcon from "@mui/icons-material/Info"

interface AdvancedSettingsProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip: boolean
}

export const AdvancedSettings: FC<AdvancedSettingsProps> = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip
}) => {
  return (
    <Accordion>
      <AccordionSummary>Advanced Settings</AccordionSummary>
      <AccordionDetails>
        <AdvancedContent
          chatSettings={chatSettings}
          onChangeChatSettings={onChangeChatSettings}
          showTooltip={showTooltip}
        />
      </AccordionDetails>
    </Accordion>
  )
}

interface AdvancedContentProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip: boolean
}

const AdvancedContent: FC<AdvancedContentProps> = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip
}) => {
  const {
    profile,
    selectedWorkspace,
    availableOpenRouterModels,
    selectedAssistant
  } = useContext(ChatbotUIContext)

  function findOpenRouterModel(modelId: string) {
    return availableOpenRouterModels.find(model => model.modelId === modelId)
  }

  const MODEL_LIMITS = CHAT_SETTING_LIMITS[chatSettings.model] || {
    MIN_TEMPERATURE: 0,
    MAX_TEMPERATURE: 1,
    MAX_CONTEXT_LENGTH:
      findOpenRouterModel(chatSettings.model)?.maxContext || 4096
  }

  return (
    <Box mt={1}>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography
          level="title-sm"
          fontWeight="bold"
          sx={{ display: "flex", alignItems: "center", gap: 1 }}
        >
          Temperature:
          <Typography>{chatSettings.temperature}</Typography>
        </Typography>

        {/*<Slider*/}
        {/*  value={[chatSettings.temperature]}*/}
        {/*  onChange={(event, newValue) => onChangeChatSettings({ ...chatSettings, temperature: newValue[0] })}*/}
        {/*  min={MODEL_LIMITS.MIN_TEMPERATURE}*/}
        {/*  max={MODEL_LIMITS.MAX_TEMPERATURE}*/}
        {/*  step={0.01}*/}
        {/*/>*/}
      </Box>

      <Box mt={6} sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
        <Typography sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          Context Length:
          <Typography>{chatSettings.contextLength}</Typography>
        </Typography>

        {/*<Slider*/}
        {/*  value={[chatSettings.contextLength]}*/}
        {/*  onChange={(event, newValue) => onChangeChatSettings({ ...chatSettings, contextLength: newValue[0] })}*/}
        {/*  min={0}*/}
        {/*  max={MODEL_LIMITS.MAX_CONTEXT_LENGTH - 200}*/}
        {/*  step={1}*/}
        {/*/>*/}
      </Box>

      <Box mt={7} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Checkbox
          checked={chatSettings.includeProfileContext}
          onChange={event =>
            onChangeChatSettings({
              ...chatSettings,
              includeProfileContext: event.target.checked
            })
          }
        />

        <Typography level="body-md">Chats Include Profile Context</Typography>

        {showTooltip && (
          <Tooltip title={profile?.profile_context || "No profile context."}>
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box mt={4} sx={{ display: "flex", alignItems: "center", gap: 2 }}>
        <Checkbox
          checked={chatSettings.includeWorkspaceInstructions}
          onChange={event =>
            onChangeChatSettings({
              ...chatSettings,
              includeWorkspaceInstructions: event.target.checked
            })
          }
        />

        <Typography level="body-md">
          Chats Include Workspace Instructions
        </Typography>

        {showTooltip && (
          <Tooltip
            title={
              selectedWorkspace?.instructions || "No workspace instructions."
            }
          >
            <IconButton>
              <InfoIcon />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box mt={5}>
        <Typography>Embeddings Provider</Typography>

        <Select
          value={chatSettings.embeddingsProvider}
          onChange={(_, v) =>
            onChangeChatSettings({
              ...chatSettings,
              embeddingsProvider: v ?? "openai"
            })
          }
        >
          {/*<MenuItem value="openai">{profile?.use_azure_openai ? "Azure OpenAI" : "OpenAI"}</MenuItem>*/}
          {/*{window.location.hostname === "localhost" && <MenuItem value="local">Local</MenuItem>}*/}
        </Select>
      </Box>
    </Box>
  )
}
