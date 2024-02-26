import { ChatSettings, LLMID } from "@/app/lib/types"

// Required for redirecting the user after resetting the password
export const ROOT_URL = "https://metadachi.com"

// Used for handling sign-up logic, DOES NOT modify email verification
export const EMAIL_VERIFICATION = false

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
