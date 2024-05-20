import { useState, useEffect } from "react"
import { Session } from "@supabase/auth-js"
import { supabase } from "@/app/lib/supabase/browser-client"
import { ALLOW_ANONYMOUS_USERS } from "@/app/lib/config"

export const useSession = () => {
  const [session, setSession] = useState<Session | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchSession = async () => {
      const sessionData = await supabase.auth.getSession()
      let session: Session | null = sessionData?.data?.session || null

      // Create an anonymous account for the user
      if (!session && ALLOW_ANONYMOUS_USERS) {
        const { data, error } = await supabase.auth.signInAnonymously()
        if (error) {
          console.error("Error creating a guest account:", error)
        } else if (data) {
          session = data.session
        }
      }

      setSession(session)
      setLoading(false)
    }

    fetchSession()
  }, [])

  return { session, isAnonymous: session?.user.is_anonymous ?? true, loading }
}
