"use client"
import * as React from "react"
import { useContext } from "react"
import { Tab, tabClasses, TabList, TabPanel, Tabs } from "@mui/joy"
import { ChatbotUIContext } from "@/context/context"
import { ChatTabContent } from "@/components/sidebar/chat-tab-content"
import { ContentType } from "@/types"

export default function CollectionsPage() {
  const {
    folders,
    chats,
    presets,
    prompts,
    files,
    collections,
    assistants,
    tools
  } = useContext(ChatbotUIContext)
  const chatFolders = folders.filter(folder => folder.type === "chats")
  const presetFolders = folders.filter(folder => folder.type === "presets")
  const promptFolders = folders.filter(folder => folder.type === "prompts")
  const filesFolders = folders.filter(folder => folder.type === "files")
  const collectionFolders = folders.filter(
    folder => folder.type === "collections"
  )
  const assistantFolders = folders.filter(
    folder => folder.type === "assistants"
  )
  const toolFolders = folders.filter(folder => folder.type === "tools")

  // TODO: Add images collection tab
  const CollectionTabs = {
    chats: { label: "Chats", data: chats, folders: chatFolders },
    presets: { label: "Presets", data: presets, folders: presetFolders },
    prompts: { label: "Prompts", data: prompts, folders: promptFolders },
    files: { label: "Files", data: files, folders: filesFolders },
    collections: {
      label: "Collections",
      data: collections,
      folders: collectionFolders
    },
    assistants: {
      label: "Assistants",
      data: assistants,
      folders: assistantFolders
    },
    tools: { label: "Tools", data: tools, folders: toolFolders }
  }

  return (
    <>
      <Tabs
        aria-label="tabs"
        defaultValue="prompts"
        sx={{
          width: "100%",
          height: "100%",
          bgColor: "transparent",
          overflowY: "scroll",
          p: 3
        }}
      >
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: "xl",
            bgColor: "background.level1",
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: "sm",
              bgColor: "background.surface"
            }
          }}
        >
          {Object.entries(CollectionTabs).map(([key, value]) => (
            <Tab key={`${key}-collection`} value={key}>
              {value.label}
            </Tab>
          ))}
        </TabList>

        {Object.entries(CollectionTabs).map(([key, value]) => (
          <TabPanel value={key} key={`${key}-collections-tab-panel`}>
            <ChatTabContent
              contentType={key as ContentType}
              data={value.data}
              folders={value.folders}
            />
          </TabPanel>
        ))}
      </Tabs>
    </>
  )
}
