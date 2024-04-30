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
  // Some icons are inherently big, so use a smaller font for them
  let bigIconFontSize = "text-xl"
  let fontSize = "text-2xl"
  switch (size) {
    case "sm":
      bigIconFontSize = "text-xl"
      fontSize = "text-2xl"
      break
    case "md":
      bigIconFontSize = "text-2xl"
      fontSize = "text-3xl"
      break
  }

  switch (provider as ModelProvider) {
    case "openai":
      return (
        <Icon
          icon="logos:openai-icon"
          className={`${bigIconFontSize} dark:invert`}
        />
      )
    case "mistral":
      return <Icon icon="logos:mistral-ai-icon" className={bigIconFontSize} />
    case "groq":
      return (
        <Icon icon="solar:stars-bold-duotone" className={bigIconFontSize} />
      )
    case "anthropic":
      return (
        <Icon
          icon="simple-icons:anthropic"
          className={`${bigIconFontSize} light:invert`}
        />
      )
    case "google":
      return <Icon icon="logos:google-icon" className={bigIconFontSize} />
    case "perplexity":
      return (
        <Icon
          icon="simple-icons:perplexity"
          className={`${bigIconFontSize} light:invert`}
        />
      )
    default:
      return <Icon icon="solar:planet-bold-duotone" className={fontSize} />
  }
}
