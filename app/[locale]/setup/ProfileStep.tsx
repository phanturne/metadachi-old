import { FC } from "react"
import {
  DisplayNameInput,
  UsernameInput
} from "@/app/components/input/ProfileInputs"
import { StepContainer } from "@/app/components/ui/StepContainer"

interface ProfileStepProps {
  stepCount: number
  currentStep: number
  handleShouldProceed: (_: boolean) => void
  username: string
  usernameAvailable: boolean
  displayName: string
  onUsernameAvailableChange: (isAvailable: boolean) => void
  onUsernameChange: (username: string) => void
  onDisplayNameChange: (name: string) => void
}

export const ProfileStep: FC<ProfileStepProps> = ({
  stepCount,
  currentStep,
  handleShouldProceed,
  username,
  usernameAvailable,
  displayName,
  onUsernameAvailableChange,
  onUsernameChange,
  onDisplayNameChange
}) => {
  return (
    <StepContainer
      stepCount={stepCount}
      stepDescription="Let's create your profile."
      stepNum={currentStep}
      stepTitle="Welcome to Metadachi!"
      onShouldProceed={handleShouldProceed}
      showNextButton={!!(username && usernameAvailable)}
      showBackButton={false}
    >
      <div className="flex flex-col gap-4">
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
      </div>
    </StepContainer>
  )
}
