import React, { FormEvent, useState } from "react"
import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Link,
  Stack,
  Typography
} from "@mui/joy"
import { redirect, useRouter } from "next/navigation"
import { InfoOutlined } from "@mui/icons-material"
import { supabase } from "@/lib/supabase/browser-client"
import { AuthFormType } from "@/components/auth/AuthModal"
import { useAuthModal } from "@/lib/providers/AuthContextProvider"
import { useSnackbar } from "@/lib/providers/SnackbarProvider"

export function LoginForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const router = useRouter()
  const { closeAuthModal } = useAuthModal()
  const { setSnackbar } = useSnackbar()

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formJson["email"] as string,
      password: formJson["password"] as string
    })

    // Show error message and return early if the login failed
    if (error) {
      setError(error.message)
      return
    }

    const { data: homeWorkspace, error: homeWorkspaceError } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", data.user.id)
      .eq("is_home", true)
      .single()

    if (!homeWorkspace) {
      throw new Error(
        homeWorkspaceError?.message || "An unexpected error occurred"
      )
    }

    // return redirect(`/${homeWorkspace.id}/chat`)

    // Handle successful login
    setSnackbar({ message: "Successfully logged in", color: "success" })
    closeAuthModal()
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={2}>
        <Typography level="h3" sx={{ alignSelf: "center" }}>
          Welcome Back
        </Typography>
        <FormControl error={error != ""}>
          <FormLabel>Email</FormLabel>
          <Input name="email" type="email" autoFocus required />
        </FormControl>
        <FormControl error={error != ""}>
          <FormLabel>Password</FormLabel>
          <Input name="password" type="password" required />
          {error && (
            <FormHelperText>
              <InfoOutlined />
              Invalid Credentials
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit">Login</Button>
        <Typography
          endDecorator={
            <Link
              component="button"
              onClick={() => {
                setAuthFormType(AuthFormType.SignUp)
              }}
            >
              Sign up
            </Link>
          }
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          {`Don't have an account?`}
        </Typography>
      </Stack>
    </form>
  )
}
