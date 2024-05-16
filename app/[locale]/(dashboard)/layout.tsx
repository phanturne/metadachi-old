// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/app/%5Blocale%5D/%5Bworkspaceid%5D/layout.tsx

"use client"

import RootNavbar from "@/app/components/ui/RootNavbar"
import { useContext, useEffect, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { supabase } from "@/app/lib/supabase/browser-client"
import {
  getHomeWorkspaceByUserId,
  getWorkspaceById
} from "@/app/lib/db/workspaces"
import { getAssistantWorkspacesByWorkspaceId } from "@/app/lib/db/assistants"
import { getAssistantImageFromStorage } from "@/app/lib/db/storage/assistant-images"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import { getChatsByWorkspaceId } from "@/app/lib/db/chats"
import { getCollectionWorkspacesByWorkspaceId } from "@/app/lib/db/collections"
import { getFoldersByWorkspaceId } from "@/app/lib/db/folders"
import { getFileWorkspacesByWorkspaceId } from "@/app/lib/db/files"
import { getPresetWorkspacesByWorkspaceId } from "@/app/lib/db/presets"
import { getPromptWorkspacesByWorkspaceId } from "@/app/lib/db/prompts"
import { getToolWorkspacesByWorkspaceId } from "@/app/lib/db/tools"
import { getModelWorkspacesByWorkspaceId } from "@/app/lib/db/models"
import { LLMID } from "@/app/lib/types"
import Loading from "@/app/[locale]/loading"

export default function DashboardLayout({
  children
}: {
  children: React.ReactNode
}) {
  const {
    setChatSettings,
    setAssistants,
    setAssistantImages,
    setChats,
    setCollections,
    setFolders,
    setFiles,
    setPresets,
    setPrompts,
    setTools,
    setModels,
    selectedWorkspace,
    setSelectedWorkspace,
    setSelectedChat,
    setChatMessages,
    setUserInput,
    setIsGenerating,
    setFirstTokenReceived,
    setChatFiles,
    setChatImages,
    setNewMessageFiles,
    setNewMessageImages,
    setShowFilesDisplay
  } = useContext(MetadachiContext)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      if (!session) {
        setLoading(false)
        return
      } else {
        await fetchWorkspaceData(selectedWorkspace?.id)
      }
    })()
  }, [])

  useEffect(() => {
    ;(async () => {
      await fetchWorkspaceData(selectedWorkspace?.id)
    })()

    if (!selectedWorkspace) return

    setUserInput("")
    setChatMessages([])
    setSelectedChat(null)

    setIsGenerating(false)
    setFirstTokenReceived(false)

    setChatFiles([])
    setChatImages([])
    setNewMessageFiles([])
    setNewMessageImages([])
    setShowFilesDisplay(false)
  }, [selectedWorkspace?.id])

  const fetchWorkspaceData = async (workspaceId?: string) => {
    if (!workspaceId) {
      const session = (await supabase.auth.getSession()).data.session
      if (!session) return
      workspaceId = await getHomeWorkspaceByUserId(session.user.id)
    }

    if (!workspaceId) {
      return
    }

    setLoading(true)

    const workspace = await getWorkspaceById(workspaceId)
    setSelectedWorkspace(workspace)

    const assistantData = await getAssistantWorkspacesByWorkspaceId(workspaceId)
    setAssistants(assistantData.assistants)

    for (const assistant of assistantData.assistants) {
      let url = ""

      if (assistant.image_path) {
        url = (await getAssistantImageFromStorage(assistant.image_path)) || ""
      }

      if (url) {
        const response = await fetch(url)
        const blob = await response.blob()
        const base64 = await convertBlobToBase64(blob)

        setAssistantImages(prev => [
          ...prev,
          {
            assistantId: assistant.id,
            path: assistant.image_path,
            base64,
            url
          }
        ])
      } else {
        setAssistantImages(prev => [
          ...prev,
          {
            assistantId: assistant.id,
            path: assistant.image_path,
            base64: "",
            url
          }
        ])
      }
    }

    const chats = await getChatsByWorkspaceId(workspaceId)
    setChats(chats)

    const collectionData =
      await getCollectionWorkspacesByWorkspaceId(workspaceId)
    setCollections(collectionData.collections)

    const folders = await getFoldersByWorkspaceId(workspaceId)
    setFolders(folders)

    const fileData = await getFileWorkspacesByWorkspaceId(workspaceId)
    setFiles(fileData.files)

    const presetData = await getPresetWorkspacesByWorkspaceId(workspaceId)
    setPresets(presetData.presets)

    const promptData = await getPromptWorkspacesByWorkspaceId(workspaceId)
    setPrompts(promptData.prompts)

    const toolData = await getToolWorkspacesByWorkspaceId(workspaceId)
    setTools(toolData.tools)

    const modelData = await getModelWorkspacesByWorkspaceId(workspaceId)
    setModels(modelData.models)

    setChatSettings({
      model: (workspace?.default_model || "gpt-3.5-turbo") as LLMID,
      prompt:
        workspace?.default_prompt ||
        "You are a friendly, helpful AI assistant.",
      temperature: workspace?.default_temperature || 0.5,
      contextLength: workspace?.default_context_length || 4096,
      includeProfileContext: workspace?.include_profile_context || true,
      includeWorkspaceInstructions:
        workspace?.include_workspace_instructions || true,
      embeddingsProvider:
        (workspace?.embeddings_provider as "openai" | "local") || "openai"
    })

    setLoading(false)
  }

  return (
    <div className="flex h-dvh w-dvw flex-col">
      <RootNavbar />
      {loading ? <Loading /> : children}

      {/*<CommandK />*/}

      {/*<div className="absolute bottom-2 right-2 hidden md:block lg:bottom-4 lg:right-4">*/}
      {/*  <HelpButton />*/}
      {/*</div>*/}
    </div>
  )
}
