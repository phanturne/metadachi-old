import { LLMID } from "@/app/lib/types"

// Required for redirecting the user after resetting the password
export const ROOT_URL = "https://metadachi.com"

// Used for handling sign-up logic, DOES NOT modify email verification
export const EMAIL_VERIFICATION = false

export const GUEST_LLM_LIST: LLMID[] = ["gpt-3.5-turbo"]
