// Source: https://github.com/mckaywrigley/chatbot-ui/tree/main/types

import { Tables } from "@/supabase/types"

export interface ChatMessage {
  message: Tables<"messages">
  fileItems: string[]
}
