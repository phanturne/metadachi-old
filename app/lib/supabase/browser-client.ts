// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/lib/supabase/browser-client.ts

import { Database } from "@/supabase/types"
import { createBrowserClient } from "@supabase/ssr"

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
