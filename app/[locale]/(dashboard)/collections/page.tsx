"use client"
import * as React from "react"
import { useContext, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { DataListWrapper } from "@/app/components/ui/data-list/DataListWrapper"
import { ContentType } from "@/app/lib/types"
import { Tab, Tabs } from "@nextui-org/react"
import { useRouter, useSearchParams } from "next/navigation"

export default function CollectionsPage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get("tab") ?? "chats")

  const router = useRouter()

  const {
    folders,
    chats,
    presets,
    prompts,
    files,
    collections,
    assistants,
    tools
  } = useContext(MetadachiContext)
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
    <div className="flex w-full flex-col items-center overflow-auto px-8 py-4">
      <h1 className="self-start text-3xl font-bold leading-9 text-default-foreground">
        Collections
      </h1>
      <Tabs
        fullWidth
        classNames={{
          base: "mt-6",
          cursor: "bg-content1 dark:bg-content1",
          panel: "w-full p-0 pt-8"
        }}
        selectedKey={tab}
        onSelectionChange={newTab => {
          router.push(`/collections?tab=${newTab}`)
          setTab(newTab as string)
        }}
      >
        {Object.entries(CollectionTabs).map(([key, value]) => (
          <Tab key={key} title={value.label}>
            <DataListWrapper
              contentType={key as ContentType}
              data={value.data}
              folders={value.folders}
            />
          </Tab>
        ))}
      </Tabs>
    </div>
  )
}
