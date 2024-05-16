// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/app/%5Blocale%5D/login/password/page.tsx

"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/app/lib/supabase/browser-client"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"
import AuthForm from "@/app/components/auth/AuthForm"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

      console.log(session)
      if (!session) {
        router.push("/login")
      } else {
        setLoading(false)
      }
    })()
  }, [])

  if (loading) {
    return null
  }

  return <AuthForm type={AuthFormType.ResetPassword} />
}
