import {
  Button,
  Divider,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader
} from "@nextui-org/react"
import React, { useContext } from "react"
import { AdvancedModelSettings } from "@/app/components/models/AdvancedModelSettings"
import { MetadachiContext } from "@/app/lib/context"
import { DEFAULT_CHAT_SETTINGS } from "@/app/lib/config"
import { FileRetrievalSettings } from "@/app/components/files/FileRetrievalSettings"

export default function AdvancedChatSettingsButton() {
  const { chatSettings, setChatSettings } = useContext(MetadachiContext)
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <>
      <Button size="sm" variant="flat" onClick={() => setIsOpen(true)}>
        Advanced Settings
      </Button>
      <Modal size="sm" isOpen={isOpen} onOpenChange={setIsOpen}>
        <ModalContent className="p-4">
          <ModalHeader className="justify-center">
            Advanced Chat Settings
          </ModalHeader>
          <ModalBody>
            {/* TODO: Add tabs to the modal for Model Settings & File Retrieval Settings */}
            <FileRetrievalSettings />

            <Divider className="my-2" />

            <p className="font-semibold">Model Settings</p>
            <AdvancedModelSettings
              chatSettings={chatSettings ?? DEFAULT_CHAT_SETTINGS}
              onChangeChatSettings={setChatSettings}
              showTooltip={true}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
