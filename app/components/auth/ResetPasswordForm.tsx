// Source: https://github.com/mckaywrigley/chatbot-ui/blob/d60e1f3ee9d2caf8c9aab659791b841690183b2d/app/%5Blocale%5D/login/page.tsx#L145

import React, { FC, FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase/browser-client"
import { PasswordInput } from "@/app/components/input"
import { toast } from "sonner"
import { Button } from "@nextui-org/react"
import { Routes } from "@/app/lib/constants"

interface ChangePasswordProps {}

export const ResetPasswordForm: FC<ChangePasswordProps> = () => {
  const router = useRouter()

  const [error, setError] = useState<string>("")
  const hasError = error != ""

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const newPassword = formJson["password"] as string
    const confirmPassword = formJson["confirm-password"] as string

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    await supabase.auth.updateUser({ password: newPassword })
    toast.success("Password changed successfully.")
    return router.push(Routes.Login)
  }

  return (
    <>
      <p className="pb-2 text-center text-2xl font-medium">Reset Password</p>
      <form className="flex flex-col gap-3" onSubmit={handleResetPassword}>
        <PasswordInput variant="bordered" isInvalid={hasError} />
        <PasswordInput
          name="confirm-password"
          placeholder="Confirm Password"
          variant="bordered"
          isInvalid={hasError}
          errorMessage={error}
        />
        <Button color="primary" type="submit">
          Confirm Change
        </Button>
      </form>
    </>
  )
}
