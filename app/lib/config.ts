import { ChatSettings, LLMID } from "@/app/lib/types"

export const APP_NAME = "Metadachi"
export const APP_DEFAULT_TITLE = "Metadachi"
export const APP_TITLE_TEMPLATE = "%s - Metadachi"
export const APP_DESCRIPTION = "Metadachi PWA!"

// Required for redirecting the user after resetting the password
export const ROOT_URL = "https://metadachi.com"

// Used for handling sign-up logic, DOES NOT modify email verification
export const EMAIL_VERIFICATION = true

// Configure the default available models available for all users
// Set it to an empty list to enable all models available from providers w/ API keys
// Note: There should be a corresponding API key for each provider
export const SYSTEM_LLM_ID_LIST: LLMID[] = ["gpt-3.5-turbo"]

export const DEFAULT_CHAT_SETTINGS: ChatSettings = {
  model: "gpt-3.5-turbo",
  prompt: "",
  temperature: 0.5,
  contextLength: 4096,
  includeProfileContext: true,
  includeWorkspaceInstructions: true,
  embeddingsProvider: "openai"
}
