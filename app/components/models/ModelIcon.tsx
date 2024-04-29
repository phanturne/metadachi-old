import { ModelProvider } from "@/app/lib/types"
import { FC, HTMLAttributes } from "react"
import { Icon } from "@iconify-icon/react"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider?: ModelProvider
  size?: "sm" | "md"
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  size
  // ...props
}) => {
  let fontSize = "text-2xl"
  switch (size) {
    case "sm":
      fontSize = "text-2xl"
      break
    case "md":
      fontSize = "text-3xl"
      break
  }

  switch (provider as ModelProvider) {
    case "openai":
      return (
        <Icon icon="logos:openai-icon" className={`${fontSize} dark:invert`} />
      )
    case "mistral":
      return <Icon icon="logos:mistral-ai-icon" className={fontSize} />
    case "groq":
      return <Icon icon="solar:stars-bold-duotone" className={fontSize} />
    case "anthropic":
      return (
        <Icon
          icon="simple-icons:anthropic"
          className={`${fontSize} light:invert`}
        />
      )
    case "google":
      return <Icon icon="logos:google-icon" className={fontSize} />
    case "perplexity":
      return (
        <Icon
          icon="simple-icons:perplexity"
          className={`${fontSize} light:invert`}
        />
      )
    default:
      return <Icon icon="solar:planet-bold-duotone" className={fontSize} />
  }
}
