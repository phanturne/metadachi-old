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
import { useRouter } from "next/navigation"
import { InfoOutlined } from "@mui/icons-material"
import { supabase } from "@/lib/supabase/browser-client"
import { AuthFormType } from "@/components/auth/AuthModal"
import { useAuthModal } from "@/lib/providers/AuthContextProvider"
import { Routes } from "@/lib/constants"

export function SignupForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const router = useRouter()
  const { closeAuthModal } = useAuthModal()

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const { data, error } = await supabase.auth.signUp({
      email: formJson["email"] as string,
      password: formJson["password"] as string
    })

    // Show error message and return early if the signup failed
    if (error) {
      setError(error.message)
      return
    }

    // Handle successful signup
    closeAuthModal()
    router.push(Routes.Setup)
  }

  return (
    <form onSubmit={handleSignup}>
      <Stack spacing={2}>
        <Typography level="h3" sx={{ alignSelf: "center" }}>
          Join Now
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
              {error}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit">Create account</Button>
        <Typography
          endDecorator={
            <Link
              component="button"
              onClick={() => {
                setAuthFormType(AuthFormType.Login)
              }}
            >
              Login
            </Link>
          }
          fontSize="sm"
          sx={{ alignSelf: "center" }}
        >
          I already have an account!
        </Typography>
      </Stack>
    </form>
  )
}
