import React from "react"
import { Icon } from "@iconify-icon/react"
import { Input } from "@nextui-org/react"

export default function EmailInput() {
  return (
    <Input
      name="email"
      type="email"
      placeholder="Email"
      isRequired
      startContent={<Icon icon="solar:letter-linear" className="text-xl" />}
    />
  )
}
