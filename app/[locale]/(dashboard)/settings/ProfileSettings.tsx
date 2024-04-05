"use client"

import { MetadachiContext } from "@/app/lib/context"
import { PROFILE_CONTEXT_MAX } from "@/app/lib/db/limits"
import { exportLocalStorageAsJSON } from "@/app/lib/utils/export-old-data"
import React, { FC, useContext } from "react"
import ImageInput from "../../../components/input/ImageInput"
import {
  Box,
  FormControl,
  FormHelperText,
  FormLabel,
  Stack,
  Textarea,
  Tooltip
} from "@mui/joy"
import { BackupRounded, CloudDownloadRounded } from "@mui/icons-material"
import {
  DisplayNameInput,
  UsernameInput
} from "@/app/components/input/ProfileInputs"
import Button from "@mui/joy/Button"

interface ProfileSettingsProps {
  profileImageSrc: string
  setProfileImageSrc: (src: string) => void
  profileImageFile: File | null
  setProfileImageFile: (file: File | null) => void
  profileInstructions: string
  setProfileInstructions: (instructions: string) => void
  username: string
  usernameAvailable: boolean
  displayName: string
  onUsernameAvailableChange: (isAvailable: boolean) => void
  onUsernameChange: (username: string) => void
  onDisplayNameChange: (name: string) => void
}

export const ProfileSettings: FC<ProfileSettingsProps> = ({
  profileImageSrc,
  setProfileImageSrc,
  profileImageFile,
  setProfileImageFile,
  profileInstructions,
  setProfileInstructions,
  username,
  usernameAvailable,
  displayName,
  onUsernameAvailableChange,
  onUsernameChange,
  onDisplayNameChange
}) => {
  const {} = useContext(MetadachiContext)

  return (
    <Stack spacing={2}>
      <FormControl>
        <FormLabel>Profile Image</FormLabel>
        <ImageInput
          src={profileImageSrc}
          image={profileImageFile}
          height={50}
          width={50}
          onSrcChange={setProfileImageSrc}
          onImageChange={setProfileImageFile}
        />
      </FormControl>

      <UsernameInput
        username={username}
        usernameAvailable={usernameAvailable}
        onUsernameAvailableChange={onUsernameAvailableChange}
        onUsernameChange={onUsernameChange}
      />

      <DisplayNameInput
        displayName={displayName}
        onDisplayNameChange={onDisplayNameChange}
      />

      <FormControl>
        <FormLabel>
          What would you like the AI to know about you to provide better
          responses?
        </FormLabel>

        <Textarea
          value={profileInstructions}
          onChange={e => setProfileInstructions(e.target.value)}
          placeholder="Profile context... (optional)"
          minRows={6}
          maxRows={10}
        />

        <FormHelperText
          sx={{ fontStyle: "italic" }}
        >{`${profileInstructions.length}/${PROFILE_CONTEXT_MAX}`}</FormHelperText>
      </FormControl>
      <Box
        sx={{
          mt: 6,
          display: "flex",
          justifyContent: "space-between"
        }}
      >
        <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
          <Tooltip title="Import your data from JSON." variant="outlined">
            <Button
              disabled
              variant="soft"
              color="neutral"
              startDecorator={<BackupRounded />}
            >
              Import Data
            </Button>
          </Tooltip>

          <Tooltip
            title="Export your data as JSON. Import coming soon!"
            variant="outlined"
          >
            <Button
              variant="soft"
              color="neutral"
              startDecorator={<CloudDownloadRounded />}
              onClick={exportLocalStorageAsJSON}
            >
              Export Data
            </Button>
          </Tooltip>
        </Box>
      </Box>
    </Stack>
  )
}
