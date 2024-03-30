import React, { FormEvent, useState } from "react"
import {
  Button,
  FormControl,
  FormHelperText,
  Link,
  Stack,
  Typography
} from "@mui/joy"
import { useRouter } from "next/navigation"
import { InfoOutlined } from "@mui/icons-material"
import { supabase } from "@/app/lib/supabase/browser-client"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { AuthFormType } from "@/app/components/forms/AuthForm"
import { EmailInput, PasswordInput } from "@/app/components/input"
import { Routes } from "@/app/lib/constants"
import { toast } from "sonner"

export function LoginForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const router = useRouter()
  const { closeAuthModal } = useAuthModal()

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

    // Handle successful login
    toast.success("Successfully logged in")
    closeAuthModal()

    // Refresh is required because routing to home won't work if the user is already on the home page
    router.push(Routes.Home)
    router.refresh()
  }

  return (
    <form onSubmit={handleLogin}>
      <Stack spacing={2}>
        <Typography level="h3" sx={{ alignSelf: "center" }}>
          Welcome Back
        </Typography>
        <FormControl error={error != ""}>
          <EmailInput />
        </FormControl>
        <FormControl error={error != ""}>
          <PasswordInput />
          {error && (
            <FormHelperText>
              <InfoOutlined />
              Invalid Credentials
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit">Login</Button>
        <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
          {"Forgot your "}
          <Link
            component="button"
            onClick={() => {
              setAuthFormType(AuthFormType.ForgotPassword)
            }}
          >
            password
          </Link>
          {"?"}
        </Typography>

        <Typography fontSize="sm" sx={{ alignSelf: "center" }}>
          {`New to Metadachi? `}
          <Link
            component="button"
            onClick={() => {
              setAuthFormType(AuthFormType.SignUp)
            }}
          >
            Sign up
          </Link>
        </Typography>
      </Stack>
    </form>
  )
}
