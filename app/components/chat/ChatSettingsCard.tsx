"use client"

import { Icon } from "@iconify-icon/react"
import { Button, Card, CardBody, CardHeader } from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { ModelSelect } from "@/app/components/models/ModelSelect"
import FileSelect from "@/app/components/files/FileSelect"
import AssistantSelect from "@/app/components/assistants/AssistantSelect"
import { AssistantToolSelect } from "@/app/components/assistants/AssistantToolSelect"

export default function ChatSettingsCard() {
  const { selectedChat, chatSettings, setChatSettings } =
    useContext(MetadachiContext)

  const [isChatSettingsOpen, setIsChatSettingsOpen] = useState(() => {
    const localStorageVal = localStorage.getItem("isChatSettingsOpen")
    return localStorageVal === "true"
  })

  const onChatSettingsDropdownClick = () => {
    const newValue = !isChatSettingsOpen
    setIsChatSettingsOpen(newValue)
    localStorage.setItem("isChatSettingsOpen", String(newValue))
  }

  return (
    <Card className="p-1" key={selectedChat?.id}>
      {/* Dropdown button height > H4 height. Set 38px height to prevent CardHeader height increase. */}
      <CardHeader className="flex h-[38px] justify-between">
        <h4 className="text-small font-semibold leading-none text-default-600">
          Chat Settings
        </h4>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={onChatSettingsDropdownClick}
          radius="full"
        >
          {isChatSettingsOpen ? (
            <Icon icon="solar:alt-arrow-down-linear" className="text-base" />
          ) : (
            <Icon icon="solar:alt-arrow-left-linear" className="text-base" />
          )}
        </Button>
      </CardHeader>

      {isChatSettingsOpen && (
        // TODO: add logic for disabling some of the settings
        <CardBody className="flex gap-2 pt-1 text-small font-semibold leading-none text-default-500">
          {/* TODO: Model Select is not taking effect*/}
          {selectedChat ? (
            // ModelSelect for existing chats
            <ModelSelect
              label=""
              isDisabled
              selectedModelId={selectedChat?.model}
              onSelectModel={() => {}}
            />
          ) : chatSettings ? (
            // ModelSelect for new chats
            <ModelSelect
              label=""
              selectedModelId={chatSettings.model}
              onSelectModel={model =>
                setChatSettings({ ...chatSettings, model })
              }
            />
          ) : (
            // Placeholder ModelSelect
            <ModelSelect label="" />
          )}

          <AssistantSelect label="" />

          <FileSelect label="" />

          <AssistantToolSelect
            label=""
            selectedAssistantTools={[]}
            setSelectedAssistantTools={() => {}}
          />

          <Button size="sm" variant="flat">
            Advanced Settings
          </Button>
        </CardBody>
      )}
    </Card>
  )
}
