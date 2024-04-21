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
import { supabase } from "@/app/lib/supabase/browser-client"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"
import { EmailInput } from "@/app/components/input"
import { InfoOutlined } from "@mui/icons-material"
import { Routes } from "@/app/lib/constants"
import { ROOT_URL } from "@/app/lib/config"

export function ForgotPasswordForm({
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
    return router.push(
      "/login?message=Check inbox for password reset link&variant=success"
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
        <Button type="submit">Forgot Your Password?</Button>
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
