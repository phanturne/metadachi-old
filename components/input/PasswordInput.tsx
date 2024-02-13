import { KeyRounded } from "@mui/icons-material"
import { Input } from "@mui/joy"
import React from "react"

export default function PasswordInput() {
  return (
    <Input
      name="password"
      type="password"
      startDecorator={<KeyRounded />}
      placeholder="Password"
      required
    />
  )
}
