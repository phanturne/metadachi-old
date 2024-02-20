import { KeyRounded } from "@mui/icons-material"
import { Input } from "@mui/joy"
import React from "react"

// TODO: Add "view password" icon
export default function PasswordInput({
  name = "password",
  placeholder = "Password"
}: {
  name?: string
  placeholder?: string
}) {
  return (
    <Input
      name={name}
      type="password"
      startDecorator={<KeyRounded />}
      placeholder={placeholder}
      required
    />
  )
}
