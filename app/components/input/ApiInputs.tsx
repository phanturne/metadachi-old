import { Box, FormControl, FormLabel, Input, Stack, Typography } from "@mui/joy"
import { FC } from "react"
import Button from "@mui/joy/Button"
import Divider from "@mui/joy/Divider"

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
    <Stack spacing={2}>
      <Typography>
        Adding an API Key will override its corresponding system API key (if it
        exists).
      </Typography>
      <Divider />
      <FormControl>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            gap: 1
          }}
        >
          <FormLabel sx={{ alignSelf: "center" }}>
            {useAzureOpenai ? "Azure OpenAI API Key" : "OpenAI API Key"}
          </FormLabel>

          <Button
            size="sm"
            color="neutral"
            variant="outlined"
            onClick={() => onUseAzureOpenaiChange(!useAzureOpenai)}
            sx={{ mb: 1 }}
          >
            <Typography fontSize="x-small">
              {useAzureOpenai
                ? "Switch To Standard OpenAI"
                : "Switch To Azure OpenAI"}
            </Typography>
          </Button>
        </Box>

        <Input
          placeholder={
            useAzureOpenai ? "Azure OpenAI API Key" : "OpenAI API Key"
          }
          type="password"
          value={useAzureOpenai ? azureOpenaiAPIKey : openaiAPIKey}
          onChange={e =>
            useAzureOpenai
              ? onAzureOpenaiAPIKeyChange(e.target.value)
              : onOpenaiAPIKeyChange(e.target.value)
          }
        />
      </FormControl>

      <Stack sx={{ pl: 3, gap: 2 }}>
        {useAzureOpenai ? (
          <>
            <FormControl>
              <FormLabel>Azure OpenAI Endpoint</FormLabel>

              <Input
                placeholder="https://your-endpoint.openai.azure.com"
                type="password"
                value={azureOpenaiEndpoint}
                onChange={e => onAzureOpenaiEndpointChange(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Azure OpenAI GPT-3.5 Turbo ID</FormLabel>

              <Input
                placeholder="Azure OpenAI GPT-3.5 Turbo ID"
                type="password"
                value={azureOpenai35TurboID}
                onChange={e => onAzureOpenai35TurboIDChange(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Azure OpenAI GPT-4.5 Turbo ID</FormLabel>

              <Input
                placeholder="Azure OpenAI GPT-4.5 Turbo ID"
                type="password"
                value={azureOpenai45TurboID}
                onChange={e => onAzureOpenai45TurboIDChange(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Azure OpenAI GPT-4.5 Vision ID</FormLabel>

              <Input
                placeholder="Azure OpenAI GPT-4.5 Vision ID"
                type="password"
                value={azureOpenai45VisionID}
                onChange={e => onAzureOpenai45VisionIDChange(e.target.value)}
              />
            </FormControl>

            <FormControl>
              <FormLabel>Azure OpenAI Embeddings ID</FormLabel>

              <Input
                placeholder="Azure OpenAI Embeddings ID"
                type="password"
                value={azureOpenaiEmbeddingsID}
                onChange={e => onAzureOpenaiEmbeddingsIDChange(e.target.value)}
              />
            </FormControl>
          </>
        ) : (
          <>
            <FormControl>
              <FormLabel>OpenAI Organization ID</FormLabel>

              <Input
                placeholder="OpenAI Organization ID (optional)"
                type="password"
                value={openaiOrgID}
                onChange={e => onOpenaiOrgIDChange(e.target.value)}
              />
            </FormControl>
          </>
        )}
      </Stack>

      <FormControl>
        <FormLabel>Anthropic API Key</FormLabel>

        <Input
          placeholder="Anthropic API Key"
          type="password"
          value={anthropicAPIKey}
          onChange={e => onAnthropicAPIKeyChange(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Google Gemini API Key</FormLabel>

        <Input
          placeholder="Google Gemini API Key"
          type="password"
          value={googleGeminiAPIKey}
          onChange={e => onGoogleGeminiAPIKeyChange(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Mistral API Key</FormLabel>

        <Input
          placeholder="Mistral API Key"
          type="password"
          value={mistralAPIKey}
          onChange={e => onMistralAPIKeyChange(e.target.value)}
        />
      </FormControl>

      <FormControl>
        <FormLabel>Perplexity API Key</FormLabel>

        <Input
          placeholder="Perplexity API Key"
          type="password"
          value={perplexityAPIKey}
          onChange={e => onPerplexityAPIKeyChange(e.target.value)}
        />
      </FormControl>
      <FormControl>
        <FormLabel>OpenRouter API Key</FormLabel>

        <Input
          placeholder="OpenRouter API Key"
          type="password"
          value={openrouterAPIKey}
          onChange={e => onOpenrouterAPIKeyChange(e.target.value)}
        />
      </FormControl>
    </Stack>
  )
}
