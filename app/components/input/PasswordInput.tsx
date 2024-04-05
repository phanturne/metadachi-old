import React from "react"
import { Icon } from "@iconify-icon/react"
import { Input } from "@nextui-org/react"

export default function PasswordInput({
  name = "password",
  placeholder = "Password"
}: {
  name?: string
  placeholder?: string
}) {
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      name={name}
      type={isVisible ? "text" : "password"}
      placeholder="Password"
      isRequired
      startContent={
        <Icon icon="solar:lock-password-linear" className="text-xl" />
      }
      endContent={
        <button
          className="flex focus:outline-none"
          type="button"
          onClick={toggleVisibility}
        >
          {isVisible ? (
            <Icon icon="solar:eye-closed-linear" className="text-xl" />
          ) : (
            <Icon icon="solar:eye-linear" className="text-xl" />
          )}
        </button>
      }
    />
  )
}
