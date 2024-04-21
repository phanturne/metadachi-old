import React from "react"
import { Icon } from "@iconify-icon/react"
import { Input } from "@nextui-org/react"

export default function PasswordInput({
  name = "password",
  label = "Password",
  placeholder = "Enter your password",
  variant,
  color = "default",
  isInvalid = false,
  errorMessage
}: {
  name?: string
  label?: string
  placeholder?: string
  variant?: "bordered" | "flat"
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "success"
    | "warning"
    | "danger"
    | undefined
  isInvalid?: boolean
  errorMessage?: string
}) {
  const [isVisible, setIsVisible] = React.useState(false)
  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <Input
      name={name}
      type={isVisible ? "text" : "password"}
      label={label}
      placeholder={placeholder}
      isRequired
      variant={variant}
      color={color}
      isInvalid={isInvalid}
      errorMessage={errorMessage}
      // startContent={
      //   <Icon icon="solar:lock-password-linear" className="text-xl" />
      // }
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
