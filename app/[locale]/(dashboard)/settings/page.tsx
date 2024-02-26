"use client"
import Header from "@/app/components/ui/Header"
import { Box, Button, Typography } from "@mui/joy"
import React, { useContext, useRef, useState } from "react"
import Tabs from "@mui/joy/Tabs"
import TabList from "@mui/joy/TabList"
import Tab, { tabClasses } from "@mui/joy/Tab"
import { MetadachiContext } from "@/app/lib/context"
import { uploadProfileImage } from "@/app/lib/db/storage/profile-images"
import { updateProfile } from "@/app/lib/db/profile"
import { toast } from "sonner"
import { LLM_LIST_MAP } from "@/app/lib/models/llm/llm-list"
import { OpenRouterLLM } from "@/app/lib/types"
import { fetchOpenRouterModels } from "@/app/lib/models/fetch-models"
import { ApiInputs } from "@/app/components/input/ApiInputs"
import { KeyRounded, SettingsRounded } from "@mui/icons-material"
import { useSearchParams } from "next/navigation"
import { FULL_WIDTH_PADDING_X } from "@/app/lib/constants"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { ProfileSettings } from "@/app/[locale]/(dashboard)/settings/ProfileSettings"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get("tab") ?? "general")

  const { openAuthModal } = useAuthModal()

  const {
    profile,
    setProfile,
    envKeyMap,
    setAvailableHostedModels,
    setAvailableOpenRouterModels,
    availableOpenRouterModels
  } = useContext(MetadachiContext)

  const buttonRef = useRef<HTMLButtonElement>(null)

  const [displayName, setDisplayName] = useState(profile?.display_name || "")
  const [username, setUsername] = useState(profile?.username || "")
  const [usernameAvailable, setUsernameAvailable] = useState(true)
  const [profileImageSrc, setProfileImageSrc] = useState(
    profile?.image_url || ""
  )
  const [profileImageFile, setProfileImageFile] = useState<File | null>(null)
  const [profileInstructions, setProfileInstructions] = useState(
    profile?.profile_context || ""
  )

  const [useAzureOpenai, setUseAzureOpenai] = useState(
    profile?.use_azure_openai ?? false
  )
  const [openaiAPIKey, setOpenaiAPIKey] = useState(
    profile?.openai_api_key || ""
  )
  const [openaiOrgID, setOpenaiOrgID] = useState(
    profile?.openai_organization_id || ""
  )
  const [azureOpenaiAPIKey, setAzureOpenaiAPIKey] = useState(
    profile?.azure_openai_api_key || ""
  )
  const [azureOpenaiEndpoint, setAzureOpenaiEndpoint] = useState(
    profile?.azure_openai_endpoint || ""
  )
  const [azureOpenai35TurboID, setAzureOpenai35TurboID] = useState(
    profile?.azure_openai_35_turbo_id || ""
  )
  const [azureOpenai45TurboID, setAzureOpenai45TurboID] = useState(
    profile?.azure_openai_45_turbo_id || ""
  )
  const [azureOpenai45VisionID, setAzureOpenai45VisionID] = useState(
    profile?.azure_openai_45_vision_id || ""
  )
  const [azureEmbeddingsID, setAzureEmbeddingsID] = useState(
    profile?.azure_openai_embeddings_id || ""
  )
  const [anthropicAPIKey, setAnthropicAPIKey] = useState(
    profile?.anthropic_api_key || ""
  )
  const [googleGeminiAPIKey, setGoogleGeminiAPIKey] = useState(
    profile?.google_gemini_api_key || ""
  )
  const [mistralAPIKey, setMistralAPIKey] = useState(
    profile?.mistral_api_key || ""
  )
  const [perplexityAPIKey, setPerplexityAPIKey] = useState(
    profile?.perplexity_api_key || ""
  )

  const [openrouterAPIKey, setOpenrouterAPIKey] = useState(
    profile?.openrouter_api_key || ""
  )

  const handleSave = async () => {
    if (!profile) {
      toast.error("You must be logged in to save user settings.")
      openAuthModal()
      return
    }

    let profileImageUrl = profile.image_url
    let profileImagePath = ""

    if (profileImageFile) {
      const { path, url } = await uploadProfileImage(profile, profileImageFile)
      profileImageUrl = url ?? profileImageUrl
      profileImagePath = path
    }

    const updatedProfile = await updateProfile(profile.id, {
      ...profile,
      display_name: displayName,
      username,
      profile_context: profileInstructions,
      image_url: profileImageUrl,
      image_path: profileImagePath,
      openai_api_key: openaiAPIKey,
      openai_organization_id: openaiOrgID,
      anthropic_api_key: anthropicAPIKey,
      google_gemini_api_key: googleGeminiAPIKey,
      mistral_api_key: mistralAPIKey,
      perplexity_api_key: perplexityAPIKey,
      use_azure_openai: useAzureOpenai,
      azure_openai_api_key: azureOpenaiAPIKey,
      azure_openai_endpoint: azureOpenaiEndpoint,
      azure_openai_35_turbo_id: azureOpenai35TurboID,
      azure_openai_45_turbo_id: azureOpenai45TurboID,
      azure_openai_45_vision_id: azureOpenai45VisionID,
      azure_openai_embeddings_id: azureEmbeddingsID,
      openrouter_api_key: openrouterAPIKey
    })

    setProfile(updatedProfile)

    toast.success("Profile updated!")

    const providers = [
      "openai",
      "google",
      "azure",
      "anthropic",
      "mistral",
      "perplexity",
      "openrouter"
    ]

    for (const provider of providers) {
      let providerKey: keyof typeof profile

      if (provider === "google") {
        providerKey = "google_gemini_api_key"
      } else if (provider === "azure") {
        providerKey = "azure_openai_api_key"
      } else {
        providerKey = `${provider}_api_key` as keyof typeof profile
      }

      const models = LLM_LIST_MAP[provider]
      const envKeyActive = envKeyMap[provider]

      if (!envKeyActive) {
        const hasApiKey = !!updatedProfile[providerKey]

        if (provider === "openrouter") {
          if (hasApiKey && availableOpenRouterModels.length === 0) {
            const openrouterModels: OpenRouterLLM[] =
              await fetchOpenRouterModels()
            setAvailableOpenRouterModels(prev => {
              const newModels = openrouterModels.filter(
                model =>
                  !prev.some(prevModel => prevModel.modelId === model.modelId)
              )
              return [...prev, ...newModels]
            })
          } else {
            setAvailableOpenRouterModels([])
          }
        } else {
          if (hasApiKey && Array.isArray(models)) {
            setAvailableHostedModels(prev => {
              const newModels = models.filter(
                model =>
                  !prev.some(prevModel => prevModel.modelId === model.modelId)
              )
              return [...prev, ...newModels]
            })
          } else if (!hasApiKey && Array.isArray(models)) {
            setAvailableHostedModels(prev =>
              prev.filter(model => !models.includes(model))
            )
          }
        }
      }
    }
  }

  const handleReset = () => {
    setDisplayName(profile?.display_name || "")
    setUsername(profile?.username || "")
    setUsernameAvailable(true)
    setProfileImageSrc(profile?.image_url || "")
    setProfileImageFile(null)
    setProfileInstructions(profile?.profile_context || "")
    setUseAzureOpenai(profile?.use_azure_openai ?? false)
    setOpenaiAPIKey(profile?.openai_api_key || "")
    setOpenaiOrgID(profile?.openai_organization_id || "")
    setAzureOpenaiAPIKey(profile?.azure_openai_api_key || "")
    setAzureOpenaiEndpoint(profile?.azure_openai_endpoint || "")
    setAzureOpenai35TurboID(profile?.azure_openai_35_turbo_id || "")
    setAzureOpenai45TurboID(profile?.azure_openai_45_turbo_id || "")
    setAzureOpenai45VisionID(profile?.azure_openai_45_vision_id || "")
    setAzureEmbeddingsID(profile?.azure_openai_embeddings_id || "")
    setAnthropicAPIKey(profile?.anthropic_api_key || "")
    setGoogleGeminiAPIKey(profile?.google_gemini_api_key || "")
    setMistralAPIKey(profile?.mistral_api_key || "")
    setPerplexityAPIKey(profile?.perplexity_api_key || "")
    setOpenrouterAPIKey(profile?.openrouter_api_key || "")
  }

  return (
    <>
      <Header
        startContent={<Typography level="title-lg">User Settings</Typography>}
        middleContent={
          <Tabs
            value={tab}
            onChange={(event, value) => {
              setTab((value as string) ?? "general")
            }}
            size="sm"
            aria-label="tabs"
            defaultValue={0}
            sx={{
              bgcolor: "transparent",
              alignItems: "center",
              display: "flex",
              width: "100%",
              height: "100%",
              overflow: "scroll",
              mt: 1
            }}
          >
            <TabList
              disableUnderline
              sx={{
                p: 0.5,
                gap: 0.5,
                borderRadius: "xl",
                bgcolor: "background.level1",
                [`& .${tabClasses.root}[aria-selected="true"]`]: {
                  boxShadow: "sm",
                  bgcolor: "background.surface"
                }
              }}
            >
              <Tab disableIndicator value="general">
                <SettingsRounded />
                General
              </Tab>
              <Tab disableIndicator value="api">
                <KeyRounded />
                API Keys
              </Tab>
            </TabList>
          </Tabs>
        }
      />

      <Box
        sx={{
          width: "100%",
          height: "100%",
          overflow: "scroll",
          mt: 2,
          px: FULL_WIDTH_PADDING_X
        }}
      >
        {tab === "general" && (
          <ProfileSettings
            profileImageSrc={profileImageSrc}
            setProfileImageSrc={setProfileImageSrc}
            profileImageFile={profileImageFile}
            setProfileImageFile={setProfileImageFile}
            profileInstructions={profileInstructions}
            setProfileInstructions={setProfileInstructions}
            username={username}
            usernameAvailable={usernameAvailable}
            displayName={displayName}
            onUsernameAvailableChange={setUsernameAvailable}
            onUsernameChange={setUsername}
            onDisplayNameChange={setDisplayName}
          />
        )}

        {tab === "api" && (
          <ApiInputs
            openaiAPIKey={openaiAPIKey}
            openaiOrgID={openaiOrgID}
            azureOpenaiAPIKey={azureOpenaiAPIKey}
            azureOpenaiEndpoint={azureOpenaiEndpoint}
            azureOpenai35TurboID={azureOpenai35TurboID}
            azureOpenai45TurboID={azureOpenai45TurboID}
            azureOpenai45VisionID={azureOpenai45VisionID}
            azureOpenaiEmbeddingsID={azureEmbeddingsID}
            anthropicAPIKey={anthropicAPIKey}
            googleGeminiAPIKey={googleGeminiAPIKey}
            mistralAPIKey={mistralAPIKey}
            perplexityAPIKey={perplexityAPIKey}
            useAzureOpenai={useAzureOpenai}
            openrouterAPIKey={openrouterAPIKey}
            onOpenaiAPIKeyChange={setOpenaiAPIKey}
            onOpenaiOrgIDChange={setOpenaiOrgID}
            onAzureOpenaiAPIKeyChange={setAzureOpenaiAPIKey}
            onAzureOpenaiEndpointChange={setAzureOpenaiEndpoint}
            onAzureOpenai35TurboIDChange={setAzureOpenai35TurboID}
            onAzureOpenai45TurboIDChange={setAzureOpenai45TurboID}
            onAzureOpenai45VisionIDChange={setAzureOpenai45VisionID}
            onAzureOpenaiEmbeddingsIDChange={setAzureEmbeddingsID}
            onAnthropicAPIKeyChange={setAnthropicAPIKey}
            onGoogleGeminiAPIKeyChange={setGoogleGeminiAPIKey}
            onMistralAPIKeyChange={setMistralAPIKey}
            onPerplexityAPIKeyChange={setPerplexityAPIKey}
            onUseAzureOpenaiChange={setUseAzureOpenai}
            onOpenrouterAPIKeyChange={setOpenrouterAPIKey}
          />
        )}
      </Box>

      <Box
        sx={{
          display: "flex",
          alignSelf: "flex-end",
          gap: 2,
          py: 2,
          px: FULL_WIDTH_PADDING_X
        }}
      >
        <Button variant="outlined" color="neutral" onClick={handleReset}>
          Reset
        </Button>
        <Button ref={buttonRef} onClick={handleSave}>
          Save
        </Button>
      </Box>
    </>
  )
}
