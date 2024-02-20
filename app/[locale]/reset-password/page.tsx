"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import AuthForm, { AuthFormType } from "@/app/components/forms/AuthForm"
import { Box } from "@mui/joy"
import { supabase } from "@/app/lib/supabase/browser-client"

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

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        alignItems: "center"
      }}
    >
      <AuthForm type={AuthFormType.ResetPassword} />
    </Box>
  )
}
