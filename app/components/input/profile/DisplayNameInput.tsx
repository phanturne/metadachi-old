// DisplayNameInput.tsx
import { FC } from "react"
import { FormControl, FormHelperText, FormLabel, Input } from "@mui/joy"
import { PROFILE_DISPLAY_NAME_MAX } from "@/app/lib/db/limits"

interface DisplayNameInputProps {
  displayName: string
  onDisplayNameChange: (name: string) => void
}

export const DisplayNameInput: FC<DisplayNameInputProps> = ({
  displayName,
  onDisplayNameChange
}) => {
  return (
    <FormControl>
      <FormLabel>Display Name</FormLabel>
      <Input
        placeholder="Your Name"
        value={displayName}
        onChange={e => onDisplayNameChange(e.target.value)}
        slotProps={{ input: { maxLength: PROFILE_DISPLAY_NAME_MAX } }}
      />
      <FormHelperText
        sx={{ fontStyle: "italic" }}
      >{`${displayName.length}/${PROFILE_DISPLAY_NAME_MAX}`}</FormHelperText>
    </FormControl>
  )
}
