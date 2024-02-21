import { FC, useCallback, useState } from "react"
import {
  Box,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  Typography
} from "@mui/joy"
import { CancelRounded, CheckCircleRounded } from "@mui/icons-material"
import { PROFILE_USERNAME_MAX, PROFILE_USERNAME_MIN } from "@/app/lib/db/limits"

interface UsernameInputProps {
  username: string
  usernameAvailable: boolean
  onUsernameAvailableChange: (isAvailable: boolean) => void
  onUsernameChange: (username: string) => void
}

export const UsernameInput: FC<UsernameInputProps> = ({
  username,
  usernameAvailable,
  onUsernameAvailableChange,
  onUsernameChange
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
    <FormControl>
      <Box sx={{ display: "flex", flexDirection: "row", gap: 1 }}>
        <FormLabel>Username</FormLabel>
        {usernameAvailable ? (
          <Typography color="success" fontSize="smaller">
            AVAILABLE
          </Typography>
        ) : (
          <Typography style={{ color: "red" }} fontSize="smaller">
            UNAVAILABLE
          </Typography>
        )}
      </Box>
      <Input
        required
        placeholder="username"
        value={username}
        onChange={e => {
          onUsernameChange(e.target.value)
          checkUsernameAvailability(e.target.value)
        }}
        slotProps={{
          input: {
            minLength: PROFILE_USERNAME_MIN,
            maxLength: PROFILE_USERNAME_MAX
          }
        }}
        endDecorator={
          <>
            {loading ? (
              <CircularProgress size="sm" />
            ) : usernameAvailable ? (
              <CheckCircleRounded color="success" />
            ) : (
              <CancelRounded style={{ color: "red" }} />
            )}
          </>
        }
      />
      <FormHelperText
        sx={{ fontStyle: "italic" }}
      >{`${username.length}/${PROFILE_USERNAME_MAX}`}</FormHelperText>
    </FormControl>
  )
}
