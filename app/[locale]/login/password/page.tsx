"use client"

import { ChangePassword } from "@/app/components/utility/change-password"
import { supabase } from "@/app/lib/supabase/browser-client"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(true)

  const router = useRouter()

  useEffect(() => {
    ;(async () => {
      const session = (await supabase.auth.getSession()).data.session

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

  return <ChangePassword />
}
