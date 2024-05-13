"use client"
import React, { useContext, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { uploadProfileImage } from "@/app/lib/db/storage/profile-images"
import { updateProfile } from "@/app/lib/db/profile"
import { toast } from "sonner"
import { LLM_LIST_MAP } from "@/app/lib/models/llm/llm-list"
import { OpenRouterLLM } from "@/app/lib/types"
import { fetchOpenRouterModels } from "@/app/lib/models/fetch-models"
import { ApiInputs } from "@/app/components/input/ApiInputs"
import { useRouter, useSearchParams } from "next/navigation"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { ProfileSettings } from "@/app/components/settings/ProfileSettings"
import { Button, Tab, Tabs } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { TablesUpdate } from "@/supabase/types"

export default function SettingsPage() {
  const searchParams = useSearchParams()
  const [tab, setTab] = useState(searchParams.get("tab") ?? "profile")

  const { openAuthModal } = useAuthModal()
  const router = useRouter()

  const {
    profile,
    setProfile,
    envKeyMap,
    setAvailableHostedModels,
    setAvailableOpenRouterModels,
    availableOpenRouterModels
  } = useContext(MetadachiContext)

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
  const [azureOpenaiEmbeddingsID, setAzureOpenaiEmbeddingsID] = useState(
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
  const [groqAPIKey, setGroqAPIKey] = useState(profile?.groq_api_key || "")
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

    // TODO: Check if `profileImageURL` or `profileImagePath` is used correctly
    let profileImageUrl = profile.image_url
    let profileImagePath = ""

    if (profileImageFile) {
      const { path, url } = await uploadProfileImage(profile, profileImageFile)
      profileImageUrl = url ?? profileImageUrl
      profileImagePath = path
    }

    const updateProfilePayload: TablesUpdate<"profiles"> = {
      ...profile,
      has_onboarded: true,
      display_name: displayName,
      username,
      openai_api_key: openaiAPIKey,
      openai_organization_id: openaiOrgID,
      anthropic_api_key: anthropicAPIKey,
      google_gemini_api_key: googleGeminiAPIKey,
      mistral_api_key: mistralAPIKey,
      groq_api_key: groqAPIKey,
      perplexity_api_key: perplexityAPIKey,
      openrouter_api_key: openrouterAPIKey,
      use_azure_openai: useAzureOpenai,
      azure_openai_api_key: azureOpenaiAPIKey,
      azure_openai_endpoint: azureOpenaiEndpoint,
      azure_openai_35_turbo_id: azureOpenai35TurboID,
      azure_openai_45_turbo_id: azureOpenai45TurboID,
      azure_openai_45_vision_id: azureOpenai45VisionID,
      azure_openai_embeddings_id: azureOpenaiEmbeddingsID
    }

    const updatedProfile = await updateProfile(profile.id, updateProfilePayload)
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
    setAzureOpenaiEmbeddingsID(profile?.azure_openai_embeddings_id || "")
    setAnthropicAPIKey(profile?.anthropic_api_key || "")
    setGoogleGeminiAPIKey(profile?.google_gemini_api_key || "")
    setMistralAPIKey(profile?.mistral_api_key || "")
    setPerplexityAPIKey(profile?.perplexity_api_key || "")
    setOpenrouterAPIKey(profile?.openrouter_api_key || "")
  }

  return (
    <div className="flex w-full flex-col items-center overflow-auto p-4">
      <div className="w-full max-w-2xl">
        <h1 className="text-3xl font-bold leading-9 text-default-foreground">
          Settings
        </h1>
        <h2 className="mt-2 text-small text-default-500">
          Customize settings, email preferences, and web appearance.
        </h2>
        <Tabs
          fullWidth
          classNames={{
            base: "mt-6",
            cursor: "bg-content1 dark:bg-content1",
            panel: "w-full p-0 pt-4"
          }}
          selectedKey={tab}
          onSelectionChange={newTab => {
            router.push(`/settings?tab=${newTab}`)
            setTab(newTab as string)
          }}
        >
          <Tab
            key="profile"
            title={
              <div className="flex items-center space-x-2">
                <Icon icon="solar:user-linear" className="text-base" />
                <span>Profile</span>
              </div>
            }
          >
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
          </Tab>
          <Tab
            key="api-keys"
            title={
              <div className="flex items-center space-x-2">
                <Icon
                  icon="solar:key-minimalistic-linear"
                  className="text-base"
                />
                <span>API Keys</span>
              </div>
            }
          >
            <ApiInputs
              openaiAPIKey={openaiAPIKey}
              openaiOrgID={openaiOrgID}
              azureOpenaiAPIKey={azureOpenaiAPIKey}
              azureOpenaiEndpoint={azureOpenaiEndpoint}
              azureOpenai35TurboID={azureOpenai35TurboID}
              azureOpenai45TurboID={azureOpenai45TurboID}
              azureOpenai45VisionID={azureOpenai45VisionID}
              azureOpenaiEmbeddingsID={azureOpenaiEmbeddingsID}
              anthropicAPIKey={anthropicAPIKey}
              googleGeminiAPIKey={googleGeminiAPIKey}
              mistralAPIKey={mistralAPIKey}
              groqAPIKey={groqAPIKey}
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
              onAzureOpenaiEmbeddingsIDChange={setAzureOpenaiEmbeddingsID}
              onAnthropicAPIKeyChange={setAnthropicAPIKey}
              onGoogleGeminiAPIKeyChange={setGoogleGeminiAPIKey}
              onMistralAPIKeyChange={setMistralAPIKey}
              onGroqAPIKeyChange={setGroqAPIKey}
              onPerplexityAPIKeyChange={setPerplexityAPIKey}
              onUseAzureOpenaiChange={setUseAzureOpenai}
              onOpenrouterAPIKeyChange={setOpenrouterAPIKey}
            />
          </Tab>
        </Tabs>

        <div className="flex justify-end gap-2 py-8">
          <Button variant="light" onClick={handleReset}>
            Reset
          </Button>
          <Button color="primary" onClick={handleSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  )
}
