import React, { FormEvent, useState } from "react"
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  Link,
  Stack,
  Typography
} from "@mui/joy"
import { useRouter } from "next/navigation"
import { supabase } from "@/lib/supabase/browser-client"
import { useAuthModal } from "@/lib/providers/AuthContextProvider"
import { AuthFormType } from "@/components/auth/AuthForm"
import { EmailInput } from "@/components/input"
import { InfoOutlined } from "@mui/icons-material"

export function ResetPasswordForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const { closeAuthModal } = useAuthModal()
  const router = useRouter()

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get("email") as string

    const { error } = await supabase.auth.resetPasswordForEmail(email)

    // Show error message and return early if the signup failed
    if (error) {
      setError(error.message)
      return
    }

    // Handle successful password reset
    closeAuthModal()
    setAuthFormType(AuthFormType.Login)
    return router.push(
      "/login?message=Check inbox to reset password&variant=success"
    )
  }

  return (
    <form onSubmit={handleResetPassword}>
      <Stack spacing={2}>
        <Typography level="h3" sx={{ alignSelf: "center" }}>
          Reset Your Password
        </Typography>
        <FormControl error={error != ""}>
          <EmailInput />
          {error && (
            <FormHelperText>
              <InfoOutlined />
              {error}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit">Reset Password</Button>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: 1
          }}
        >
          <Link
            component="button"
            onClick={() => {
              setAuthFormType(AuthFormType.Login)
            }}
          >
            Login
          </Link>
          {"·"}
          <Link
            component="button"
            onClick={() => {
              setAuthFormType(AuthFormType.SignUp)
            }}
          >
            Sign Up
          </Link>
        </Box>
      </Stack>
    </form>
  )
}
