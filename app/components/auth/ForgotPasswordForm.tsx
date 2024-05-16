// Source: https://github.com/mckaywrigley/chatbot-ui/blob/d60e1f3ee9d2caf8c9aab659791b841690183b2d/app/%5Blocale%5D/login/page.tsx#L145

import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase/browser-client"
import {
  AuthFormType,
  useAuthModal
} from "@/app/lib/providers/AuthContextProvider"
import { Routes } from "@/app/lib/constants"
import { ROOT_URL } from "@/app/lib/config"
import { Button, Input, Link } from "@nextui-org/react"
import { toast } from "sonner"

export function ForgotPasswordForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const hasError = error != ""
  const { closeAuthModal } = useAuthModal()
  const router = useRouter()

  async function handleForgotPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string

    /* In order for redirect to work, make sure ROOT_URL is set correctly. This absolute URL must be saved in your Supabase's allowed Redirect URLs list found at Authentication > Redirect Configuration. */
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${ROOT_URL}${Routes.ResetPassword}`
    })

    // Show error message and return early if the signup failed
    if (error) {
      setError(error.message)
      return
    }

    // Handle successful password reset
    closeAuthModal()
    setAuthFormType(AuthFormType.Login)
    toast.success("Password reset email sent.")
    return router.push(Routes.Login)
  }

  return (
    <>
      <p className="pb-2 text-center text-2xl font-medium">
        Forgot your password?
      </p>
      <form className="flex flex-col gap-3" onSubmit={handleForgotPassword}>
        <Input
          isRequired
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
          isInvalid={hasError}
        />
        <Button color="primary" type="submit">
          Send Password Reset Email
        </Button>
        <p className="text-center text-small">
          <Link
            href=""
            size="sm"
            onClick={() => setAuthFormType(AuthFormType.Login)}
          >
            Login
          </Link>
          {" · "}
          <Link
            href=""
            size="sm"
            onClick={() => setAuthFormType(AuthFormType.SignUp)}
          >
            Sign Up
          </Link>
        </p>
      </form>
    </>
  )
}
