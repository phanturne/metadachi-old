import { EmailRounded } from "@mui/icons-material"
import { Input } from "@mui/joy"
import React from "react"

export default function EmailInput() {
  return (
    <Input
      name="email"
      type="email"
      placeholder="Email"
      autoFocus
      required
      startDecorator={<EmailRounded />}
    />
  )
}
