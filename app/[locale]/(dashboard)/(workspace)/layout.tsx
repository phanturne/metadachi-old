"use client"

import { MetadachiContext } from "@/app/lib/context"
import { getAssistantWorkspacesByWorkspaceId } from "@/app/lib/db/assistants"
import { getChatsByWorkspaceId } from "@/app/lib/db/chats"
import { getCollectionWorkspacesByWorkspaceId } from "@/app/lib/db/collections"
import { getFileWorkspacesByWorkspaceId } from "@/app/lib/db/files"
import { getFoldersByWorkspaceId } from "@/app/lib/db/folders"
import { getModelWorkspacesByWorkspaceId } from "@/app/lib/db/models"
import { getPresetWorkspacesByWorkspaceId } from "@/app/lib/db/presets"
import { getPromptWorkspacesByWorkspaceId } from "@/app/lib/db/prompts"
import { getAssistantImageFromStorage } from "@/app/lib/db/storage/assistant-images"
import { getToolWorkspacesByWorkspaceId } from "@/app/lib/db/tools"
import {
  getHomeWorkspaceByUserId,
  getWorkspaceById
} from "@/app/lib/db/workspaces"
import { convertBlobToBase64 } from "@/app/lib/utils/blob-to-b64"
import { supabase } from "@/app/lib/supabase/browser-client"
import { ReactNode, useContext, useEffect, useState } from "react"
import Loading from "@/app/[locale]/loading"
import { LLMID } from "@/app/lib/types"

interface WorkspaceLayoutProps {
  children: ReactNode
}

export default function WorkspaceLayout({ children }: WorkspaceLayoutProps) {
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
      model: (workspace?.default_model || "gpt-4-1106-preview") as LLMID,
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

  if (loading) {
    return <Loading />
  }

  return <>{children}</>
}
