import { FC } from "react"
import { StepContainer } from "@/app/components/surfaces/StepContainer"
import { ApiInputs } from "@/app/components/input/ApiInputs"

interface APIStepProps {
  stepCount: number
  currentStep: number
  handleShouldProceed: (_: boolean) => void
  openaiAPIKey: string
  openaiOrgID: string
  azureOpenaiAPIKey: string
  azureOpenaiEndpoint: string
  azureOpenai35TurboID: string
  azureOpenai45TurboID: string
  azureOpenai45VisionID: string
  azureOpenaiEmbeddingsID: string
  anthropicAPIKey: string
  googleGeminiAPIKey: string
  mistralAPIKey: string
  perplexityAPIKey: string
  useAzureOpenai: boolean
  openrouterAPIKey: string
  onOpenrouterAPIKeyChange: (value: string) => void
  onOpenaiAPIKeyChange: (value: string) => void
  onOpenaiOrgIDChange: (value: string) => void
  onAzureOpenaiAPIKeyChange: (value: string) => void
  onAzureOpenaiEndpointChange: (value: string) => void
  onAzureOpenai35TurboIDChange: (value: string) => void
  onAzureOpenai45TurboIDChange: (value: string) => void
  onAzureOpenai45VisionIDChange: (value: string) => void
  onAzureOpenaiEmbeddingsIDChange: (value: string) => void
  onAnthropicAPIKeyChange: (value: string) => void
  onGoogleGeminiAPIKeyChange: (value: string) => void
  onMistralAPIKeyChange: (value: string) => void
  onPerplexityAPIKeyChange: (value: string) => void
  onUseAzureOpenaiChange: (value: boolean) => void
}

export const ApiStep: FC<APIStepProps> = ({
  stepCount,
  currentStep,
  handleShouldProceed,
  openaiAPIKey,
  openaiOrgID,
  azureOpenaiAPIKey,
  azureOpenaiEndpoint,
  azureOpenai35TurboID,
  azureOpenai45TurboID,
  azureOpenai45VisionID,
  azureOpenaiEmbeddingsID,
  anthropicAPIKey,
  googleGeminiAPIKey,
  mistralAPIKey,
  perplexityAPIKey,
  openrouterAPIKey,
  useAzureOpenai,
  onOpenaiAPIKeyChange,
  onOpenaiOrgIDChange,
  onAzureOpenaiAPIKeyChange,
  onAzureOpenaiEndpointChange,
  onAzureOpenai35TurboIDChange,
  onAzureOpenai45TurboIDChange,
  onAzureOpenai45VisionIDChange,
  onAzureOpenaiEmbeddingsIDChange,
  onAnthropicAPIKeyChange,
  onGoogleGeminiAPIKeyChange,
  onMistralAPIKeyChange,
  onPerplexityAPIKeyChange,
  onUseAzureOpenaiChange,
  onOpenrouterAPIKeyChange
}) => {
  return (
    <StepContainer
      stepCount={stepCount}
      stepDescription="Enter API keys for each service you'd like to use."
      stepNum={currentStep}
      stepTitle="Set API Keys (optional)"
      onShouldProceed={handleShouldProceed}
      showNextButton={true}
      showBackButton={true}
    >
      <ApiInputs
        openaiAPIKey={openaiAPIKey}
        openaiOrgID={openaiOrgID}
        azureOpenaiAPIKey={azureOpenaiAPIKey}
        azureOpenaiEndpoint={azureOpenaiEndpoint}
        azureOpenai35TurboID={azureOpenai35TurboID}
        azureOpenai45TurboID={azureOpenai45TurboID}
        azureOpenai45VisionID={azureOpenai45VisionID}
        azureOpenaiEmbeddingsID={azureOpenaiEmbeddingsID}
        anthropicAPIKey={anthropicAPIKey}
        googleGeminiAPIKey={googleGeminiAPIKey}
        mistralAPIKey={mistralAPIKey}
        perplexityAPIKey={perplexityAPIKey}
        useAzureOpenai={useAzureOpenai}
        openrouterAPIKey={openrouterAPIKey}
        onOpenrouterAPIKeyChange={onOpenrouterAPIKeyChange}
        onOpenaiAPIKeyChange={onOpenaiAPIKeyChange}
        onOpenaiOrgIDChange={onOpenaiOrgIDChange}
        onAzureOpenaiAPIKeyChange={onAzureOpenaiAPIKeyChange}
        onAzureOpenaiEndpointChange={onAzureOpenaiEndpointChange}
        onAzureOpenai35TurboIDChange={onAzureOpenai35TurboIDChange}
        onAzureOpenai45TurboIDChange={onAzureOpenai45TurboIDChange}
        onAzureOpenai45VisionIDChange={onAzureOpenai45VisionIDChange}
        onAzureOpenaiEmbeddingsIDChange={onAzureOpenaiEmbeddingsIDChange}
        onAnthropicAPIKeyChange={onAnthropicAPIKeyChange}
        onGoogleGeminiAPIKeyChange={onGoogleGeminiAPIKeyChange}
        onMistralAPIKeyChange={onMistralAPIKeyChange}
        onPerplexityAPIKeyChange={onPerplexityAPIKeyChange}
        onUseAzureOpenaiChange={onUseAzureOpenaiChange}
      />
    </StepContainer>
  )
}
