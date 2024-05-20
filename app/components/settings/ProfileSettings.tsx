// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/components/utility/profile-settings.tsx

"use client"

import { PROFILE_CONTEXT_MAX } from "@/app/lib/db/limits"
import { exportLocalStorageAsJSON } from "@/app/lib/utils/export-old-data"
import React, { FC } from "react"
import { AvatarImageInput } from "@/app/components/input/ImageInput"
import {
  DisplayNameInput,
  UsernameInput
} from "@/app/components/input/ProfileInputs"
import { Button, Card, CardBody, Textarea, Tooltip } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { useSession } from "@/app/lib/hooks/use-session"

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
  const { isAnonymous } = useSession()

  return (
    <div className="flex flex-col gap-4">
      {/* Profile */}
      <Card className="my-4 bg-default-100" shadow="none">
        <CardBody>
          <div className="flex items-center gap-4">
            <AvatarImageInput
              src={profileImageSrc}
              name={displayName ?? username}
              onSrcChange={setProfileImageSrc}
              onImageChange={setProfileImageFile}
            />

            <div>
              <p className="text-sm font-medium text-default-600">
                {(displayName && displayName.trim() !== ""
                  ? displayName
                  : username) + (isAnonymous ? " (Guest)" : "")}
              </p>
              <p className="text-xs text-default-400">{username}</p>
              {/*<p className="mt-1 text-xs text-default-400">kate.moore@acme.com</p>*/}
            </div>
          </div>
        </CardBody>
      </Card>

      <UsernameInput
        username={username}
        usernameAvailable={usernameAvailable}
        onUsernameAvailableChange={onUsernameAvailableChange}
        onUsernameChange={onUsernameChange}
        labelPlacement="outside"
      />

      <DisplayNameInput
        displayName={displayName}
        onDisplayNameChange={onDisplayNameChange}
        labelPlacement="outside"
      />

      <Textarea
        label="What would you like the AI to know about you to provide better
          responses?"
        labelPlacement="outside"
        value={profileInstructions}
        onChange={e => setProfileInstructions(e.target.value)}
        placeholder="Profile context... (optional)"
        minRows={6}
        maxRows={10}
        maxLength={PROFILE_CONTEXT_MAX}
        description={`${profileInstructions.length}/${PROFILE_CONTEXT_MAX}`}
      />

      <div className="mt-2 flex justify-between">
        <div className="flex items-center gap-1">
          <Tooltip content="Import your data from JSON.">
            <Button
              isDisabled
              variant="flat"
              startContent={
                <Icon icon="solar:import-linear" className="text-xl" />
              }
            >
              Import Data
            </Button>
          </Tooltip>

          <Tooltip content="Export your data as JSON. Import coming soon!">
            <Button
              variant="flat"
              startContent={
                <Icon icon="solar:export-linear" className="text-xl" />
              }
              onClick={exportLocalStorageAsJSON}
            >
              Export Data
            </Button>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
