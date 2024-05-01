import React, { FC, useContext } from "react"
import { ChatSettings } from "@/app/lib/types"
import { MetadachiContext } from "@/app/lib/context"
import { CHAT_SETTING_LIMITS } from "@/app/lib/utils/chat-setting-limits"
import {
  Accordion,
  AccordionItem,
  Checkbox,
  Slider,
  Tab,
  Tabs,
  Tooltip
} from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface AdvancedModelSettingsProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip: boolean
}

export const AdvancedModelSettingsAccordion: FC<AdvancedModelSettingsProps> = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip
}) => {
  return (
    <Accordion
      itemClasses={{
        trigger: "p-0",
        content: "pt-4 overflow-x-hidden",
        title: "text-sm"
      }}
      variant="light"
      className=" p-0"
    >
      <AccordionItem title="Advanced Settings">
        <AdvancedModelSettings
          chatSettings={chatSettings}
          onChangeChatSettings={onChangeChatSettings}
          showTooltip={showTooltip}
        />
      </AccordionItem>
    </Accordion>
  )
}

interface AdvancedContentProps {
  chatSettings: ChatSettings
  onChangeChatSettings: (value: ChatSettings) => void
  showTooltip: boolean
}

export const AdvancedModelSettings: FC<AdvancedContentProps> = ({
  chatSettings,
  onChangeChatSettings,
  showTooltip
}) => {
  const { profile, models, selectedWorkspace, availableOpenRouterModels } =
    useContext(MetadachiContext)

  const isCustomModel = models.some(
    model => model.model_id === chatSettings.model
  )

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
    <div className="flex flex-col gap-4">
      <Slider
        size="sm"
        label="Temperature"
        value={chatSettings.temperature}
        onChange={value =>
          onChangeChatSettings({
            ...chatSettings,
            temperature: value as number
          })
        }
        minValue={MODEL_LIMITS.MIN_TEMPERATURE}
        maxValue={MODEL_LIMITS.MAX_TEMPERATURE}
        step={0.01}
      />

      <Slider
        size="sm"
        label="Context Length"
        value={chatSettings.contextLength}
        onChange={value =>
          onChangeChatSettings({
            ...chatSettings,
            contextLength: value as number
          })
        }
        minValue={0}
        maxValue={
          isCustomModel
            ? models.find(model => model.model_id === chatSettings.model)
                ?.context_length
            : MODEL_LIMITS.MAX_CONTEXT_LENGTH
        }
        step={1}
      />

      <div className="flex items-center space-x-1">
        <Checkbox
          size="sm"
          checked={chatSettings.includeProfileContext}
          onChange={e =>
            onChangeChatSettings({
              ...chatSettings,
              includeProfileContext: e.target.checked
            })
          }
        >
          Chats Include Profile Context
        </Checkbox>

        {showTooltip && (
          <Tooltip
            content={
              `Profile Context: ${profile?.profile_context}` ||
              "No profile context."
            }
          >
            <Icon icon="solar:info-circle-linear" className="text-base" />
          </Tooltip>
        )}
      </div>

      <div className="flex items-center space-x-1">
        <Checkbox
          size="sm"
          checked={chatSettings.includeWorkspaceInstructions}
          onChange={e =>
            onChangeChatSettings({
              ...chatSettings,
              includeWorkspaceInstructions: e.target.checked
            })
          }
        >
          {" "}
          Chats Include Workspace Instructions
        </Checkbox>

        {showTooltip && (
          <Tooltip
            content={
              selectedWorkspace?.instructions || "No workspace instructions."
            }
          >
            <Icon icon="solar:info-circle-linear" className="text-base" />
          </Tooltip>
        )}
      </div>

      <div className="mt-2 flex flex-col space-x-1">
        <p className="text-base">Embeddings Provider</p>

        <Tabs
          fullWidth
          classNames={{
            base: "mt-3 !ml-0",
            cursor: "bg-content1 dark:bg-content1"
          }}
          selectedKey={chatSettings.embeddingsProvider}
          onSelectionChange={newTab => {
            if (newTab !== "openai" && newTab !== "local") return

            onChangeChatSettings({
              ...chatSettings,
              embeddingsProvider: newTab
            })
          }}
          disabledKeys={
            window.location.hostname === "localhost" ? [] : ["local"]
          }
        >
          <Tab
            key="openai"
            title={profile?.use_azure_openai ? "Azure OpenAI" : "OpenAI"}
          />
          <Tab key="local" title="Local" />
        </Tabs>
      </div>
    </div>
  )
}
