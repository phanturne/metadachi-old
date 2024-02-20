import React, { FC, FormEvent, useState } from "react"
import {
  Button,
  FormControl,
  FormHelperText,
  Stack,
  Typography
} from "@mui/joy"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase/browser-client"
import { InfoOutlined } from "@mui/icons-material"
import { PasswordInput } from "@/app/components/input"
import { toast } from "sonner"

interface ChangePasswordProps {}

export const ResetPasswordForm: FC<ChangePasswordProps> = () => {
  const router = useRouter()

  const [error, setError] = useState<string>("")

  async function handleResetPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const newPassword = formJson["password"] as string
    const confirmPassword = formJson["confirm-password"] as string

    console.log("new", newPassword, "confirm", confirmPassword)
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.")
      return
    }

    await supabase.auth.updateUser({ password: newPassword })
    toast.success("Password changed successfully.")
    return router.push("/login")
  }

  return (
    <form onSubmit={handleResetPassword}>
      <Stack spacing={2}>
        <Typography level="h3" sx={{ alignSelf: "center" }}>
          Change Password
        </Typography>
        <FormControl error={error != ""}>
          <PasswordInput />
        </FormControl>
        <FormControl error={error != ""}>
          <PasswordInput
            name="confirm-password"
            placeholder="Confirm Password"
          />
          {error && (
            <FormHelperText>
              <InfoOutlined />
              {error}
            </FormHelperText>
          )}
        </FormControl>
        <Button type="submit">Confirm Change</Button>
      </Stack>
    </form>
  )
}
