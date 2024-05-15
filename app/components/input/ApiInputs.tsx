import { FC } from "react"
import { Button, Input } from "@nextui-org/react"

// TODO: Use an object w/ reducer or Immer instead of multiple state variables
interface ApiInputsProps {
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
  groqAPIKey: string
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
  onGroqAPIKeyChange: (value: string) => void
  onPerplexityAPIKeyChange: (value: string) => void
  onUseAzureOpenaiChange: (value: boolean) => void
}

export const ApiInputs: FC<ApiInputsProps> = ({
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
  groqAPIKey,
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
  onGroqAPIKeyChange,
  onPerplexityAPIKeyChange,
  onUseAzureOpenaiChange,
  onOpenrouterAPIKeyChange
}) => {
  return (
    <div className="flex flex-col gap-4">
      <h2 className="mb-8 text-default-500">
        Enjoy free access to select AI models. As we secure more funding,
        we&apos;ll unlock exciting new models and increase your usage limits.
        Optionally, use your API keys for unlimited access.
      </h2>

      <Input
        label={
          <>
            {useAzureOpenai ? "Azure OpenAI API Key" : "OpenAI API Key"}

            <Button
              size="sm"
              variant="bordered"
              onClick={() => onUseAzureOpenaiChange(!useAzureOpenai)}
              className="mb-1 ml-4"
            >
              {useAzureOpenai
                ? "Switch To Standard OpenAI"
                : "Switch To Azure OpenAI"}
            </Button>
          </>
        }
        labelPlacement="outside"
        placeholder={useAzureOpenai ? "Azure OpenAI API Key" : "OpenAI API Key"}
        type="password"
        value={useAzureOpenai ? azureOpenaiAPIKey : openaiAPIKey}
        onChange={e =>
          useAzureOpenai
            ? onAzureOpenaiAPIKeyChange(e.target.value)
            : onOpenaiAPIKeyChange(e.target.value)
        }
        className="mt-1"
      />

      <div className="flex flex-col gap-4 pl-unit-lg">
        {useAzureOpenai ? (
          <>
            <Input
              label="Azure OpenAI Endpoint"
              labelPlacement="outside"
              placeholder="https://your-endpoint.openai.azure.com"
              type="password"
              value={azureOpenaiEndpoint}
              onChange={e => onAzureOpenaiEndpointChange(e.target.value)}
              className="mt-1"
            />

            <Input
              label="Azure OpenAI GPT-3.5 Turbo ID"
              labelPlacement="outside"
              placeholder="Azure OpenAI GPT-3.5 Turbo ID"
              type="password"
              value={azureOpenai35TurboID}
              onChange={e => onAzureOpenai35TurboIDChange(e.target.value)}
              className="mt-1"
            />

            <Input
              label="Azure OpenAI GPT-4.5 Turbo ID"
              labelPlacement="outside"
              placeholder="Azure OpenAI GPT-4.5 Turbo ID"
              type="password"
              value={azureOpenai45TurboID}
              onChange={e => onAzureOpenai45TurboIDChange(e.target.value)}
              className="mt-1"
            />

            <Input
              label="Azure OpenAI GPT-4.5 Vision ID"
              labelPlacement="outside"
              placeholder="Azure OpenAI GPT-4.5 Vision ID"
              type="password"
              value={azureOpenai45VisionID}
              onChange={e => onAzureOpenai45VisionIDChange(e.target.value)}
              className="mt-1"
            />

            <Input
              label="Azure OpenAI Embeddings ID"
              labelPlacement="outside"
              placeholder="Azure OpenAI Embeddings ID"
              type="password"
              value={azureOpenaiEmbeddingsID}
              onChange={e => onAzureOpenaiEmbeddingsIDChange(e.target.value)}
              className="mt-1"
            />
          </>
        ) : (
          <Input
            label="OpenAI Organization ID"
            labelPlacement="outside"
            placeholder="OpenAI Organization ID (optional)"
            type="password"
            value={openaiOrgID}
            onChange={e => onOpenaiOrgIDChange(e.target.value)}
            className="mt-1"
          />
        )}
      </div>

      <Input
        label="Anthropic API Key"
        labelPlacement="outside"
        placeholder="Anthropic API Key"
        type="password"
        value={anthropicAPIKey}
        onChange={e => onAnthropicAPIKeyChange(e.target.value)}
      />

      <Input
        label="Google Gemini API Key"
        labelPlacement="outside"
        placeholder="Google Gemini API Key"
        type="password"
        value={googleGeminiAPIKey}
        onChange={e => onGoogleGeminiAPIKeyChange(e.target.value)}
        className="mt-1"
      />

      <Input
        label="Mistral API Key"
        labelPlacement="outside"
        placeholder="Mistral API Key"
        type="password"
        value={mistralAPIKey}
        onChange={e => onMistralAPIKeyChange(e.target.value)}
        className="mt-1"
      />

      <Input
        label="Groq API Key"
        labelPlacement="outside"
        placeholder="Groq API Key"
        type="password"
        value={groqAPIKey}
        onChange={e => onGroqAPIKeyChange(e.target.value)}
        className="mt-1"
      />

      <Input
        label="Perplexity API Key"
        labelPlacement="outside"
        placeholder="Perplexity API Key"
        type="password"
        value={perplexityAPIKey}
        onChange={e => onPerplexityAPIKeyChange(e.target.value)}
        className="mt-1"
      />

      <Input
        label="OpenRouter API Key"
        labelPlacement="outside"
        placeholder="OpenRouter API Key"
        type="password"
        value={openrouterAPIKey}
        onChange={e => onOpenrouterAPIKeyChange(e.target.value)}
        className="mt-1"
      />
    </div>
  )
}
