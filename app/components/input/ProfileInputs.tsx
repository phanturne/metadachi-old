import {
  PROFILE_DISPLAY_NAME_MAX,
  PROFILE_USERNAME_MAX,
  PROFILE_USERNAME_MIN
} from "@/app/lib/db/limits"
import { Input, Spinner } from "@nextui-org/react"
import { useCallback, useState } from "react"
import { Icon } from "@iconify-icon/react"

export const DisplayNameInput = ({
  displayName,
  onDisplayNameChange,
  labelPlacement = "inside"
}: {
  displayName: string
  onDisplayNameChange: (name: string) => void
  labelPlacement?: "inside" | "outside"
}) => {
  return (
    <Input
      isRequired
      label="Display Name"
      labelPlacement={labelPlacement}
      placeholder="Your Display Name"
      value={displayName}
      onValueChange={onDisplayNameChange}
      maxLength={PROFILE_DISPLAY_NAME_MAX}
      description={`${displayName.length}/${PROFILE_DISPLAY_NAME_MAX}`}
    />
  )
}

export const UsernameInput = ({
  username,
  usernameAvailable,
  onUsernameAvailableChange,
  onUsernameChange,
  labelPlacement = "inside"
}: {
  username: string
  usernameAvailable: boolean
  onUsernameAvailableChange: (isAvailable: boolean) => void
  onUsernameChange: (username: string) => void
  labelPlacement?: "inside" | "outside"
}) => {
  const [loading, setLoading] = useState(false)

  const debounce = (func: (...args: any[]) => void, wait: number) => {
    let timeout: NodeJS.Timeout | null

    return (...args: any[]) => {
      const later = () => {
        if (timeout) clearTimeout(timeout)
        func(...args)
      }

      if (timeout) clearTimeout(timeout)
      timeout = setTimeout(later, wait)
    }
  }

  const checkUsernameAvailability = useCallback(
    debounce(async (username: string) => {
      if (!username) return

      if (username.length < PROFILE_USERNAME_MIN) {
        onUsernameAvailableChange(false)
        return
      }

      if (username.length > PROFILE_USERNAME_MAX) {
        onUsernameAvailableChange(false)
        return
      }

      const usernameRegex = /^[a-zA-Z0-9_]+$/
      if (!usernameRegex.test(username)) {
        onUsernameAvailableChange(false)
        alert(
          "Username must be letters, numbers, or underscores only - no other characters or spacing allowed."
        )
        return
      }

      setLoading(true)

      const response = await fetch(`/api/username/available`, {
        method: "POST",
        body: JSON.stringify({ username })
      })

      const data = await response.json()
      const isAvailable = data.isAvailable

      onUsernameAvailableChange(isAvailable)

      setLoading(false)
    }, 500),
    []
  )

  return (
    <Input
      isRequired
      label="Your Username"
      labelPlacement={labelPlacement}
      placeholder="Username"
      value={username}
      onValueChange={val => {
        onUsernameChange(val)
        checkUsernameAvailability(val)
      }}
      minLength={PROFILE_USERNAME_MIN}
      maxLength={PROFILE_USERNAME_MAX}
      description={`${username.length}/${PROFILE_USERNAME_MAX}`}
      endContent={
        <>
          {loading ? (
            <Spinner
              size={labelPlacement === "inside" ? "md" : "sm"}
              className="flex h-full items-center"
            />
          ) : usernameAvailable ? (
            <Icon
              icon="solar:check-circle-linear"
              className={`flex h-full items-center text-2xl text-green-500`}
            />
          ) : (
            <Icon
              icon="solar:close-circle-linear"
              className={`flex h-full items-center text-2xl text-red-500`}
            />
          )}
        </>
      }
    />
  )
}
