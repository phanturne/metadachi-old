import { FC, useContext } from "react"
import { ChatSettings } from "@/types"
import { ChatbotUIContext } from "@/context/context"
import { CHAT_SETTING_LIMITS } from "@/lib/chat-setting-limits"
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Checkbox,
  IconButton,
  Option,
  Select,
  Slider,
  Tooltip,
  Typography
} from "@mui/joy"
import { InfoRounded } from "@mui/icons-material"

interface AdvancedModelSettingsProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip: boolean
}

export const AdvancedModelSettings: FC<AdvancedModelSettingsProps> = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip
}) => {
  return (
    <Accordion sx={{ ml: -1.5 }}>
      <AccordionSummary>
        <Typography level="title-sm" fontWeight="bold">
          Advanced Settings
        </Typography>
      </AccordionSummary>
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
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Box sx={{ display: "flex", flexDirection: "column", mt: 2 }}>
        <Typography level="title-sm" fontWeight="bold">
          {`Temperature: ${chatSettings.temperature}`}
        </Typography>

        <Slider
          value={[chatSettings.temperature]}
          onChange={(event, newValue) =>
            onChangeChatSettings({
              ...chatSettings,
              temperature: newValue as number
            })
          }
          min={MODEL_LIMITS.MIN_TEMPERATURE}
          max={MODEL_LIMITS.MAX_TEMPERATURE}
          step={0.01}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Typography level="title-sm" fontWeight="bold">
          {`Context Length: ${chatSettings.contextLength}`}
        </Typography>

        <Slider
          value={[chatSettings.contextLength]}
          onChange={(event, newValue) =>
            onChangeChatSettings({
              ...chatSettings,
              contextLength: newValue as number
            })
          }
          min={0}
          max={MODEL_LIMITS.MAX_CONTEXT_LENGTH - 200}
          step={1}
        />
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox
          size="sm"
          checked={chatSettings.includeProfileContext}
          onChange={event =>
            onChangeChatSettings({
              ...chatSettings,
              includeProfileContext: event.target.checked
            })
          }
        />

        <Typography level="title-sm" fontWeight="bold">
          Chats Include Profile Context
        </Typography>

        {showTooltip && (
          <Tooltip title={profile?.profile_context || "No profile context."}>
            <IconButton size="sm">
              <InfoRounded />
            </IconButton>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Checkbox
          size="sm"
          checked={chatSettings.includeWorkspaceInstructions}
          onChange={event =>
            onChangeChatSettings({
              ...chatSettings,
              includeWorkspaceInstructions: event.target.checked
            })
          }
        />

        <Typography level="title-sm" fontWeight="bold">
          Chats Include Workspace Instructions
        </Typography>

        {showTooltip && (
          <Tooltip
            title={
              selectedWorkspace?.instructions || "No workspace instructions."
            }
          >
            <Tooltip title={profile?.profile_context || "No profile context."}>
              <IconButton size="sm">
                <InfoRounded />
              </IconButton>
            </Tooltip>
          </Tooltip>
        )}
      </Box>

      <Box sx={{ display: "flex", flexDirection: "column", gap: 1, mt: 2 }}>
        <Typography level="title-sm" fontWeight="bold">
          Embeddings Provider
        </Typography>

        <Select
          value={chatSettings.embeddingsProvider}
          onChange={(_, v) =>
            onChangeChatSettings({
              ...chatSettings,
              embeddingsProvider: v ?? "openai"
            })
          }
        >
          <Option value="openai">
            {profile?.use_azure_openai ? "Azure OpenAI" : "OpenAI"}
          </Option>
          {window.location.hostname === "localhost" && (
            <Option value="local">Local</Option>
          )}
        </Select>
      </Box>
    </Box>
  )
}
