import { ModelProvider } from "@/app/lib/types"
import { FC, HTMLAttributes } from "react"
import { Icon } from "@iconify-icon/react"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider?: ModelProvider
  size?: "xs" | "sm" | "md"
  isLocked?: boolean
}

export const ModelIcon: FC<ModelIconProps> = ({ provider, size, isLocked }) => {
  // Some icons are inherently big, so we use a smaller font size
  let bigIconFontSize = "text-xl"
  let fontSize = "text-2xl"
  switch (size) {
    case "xs":
      bigIconFontSize = "text-xl"
      fontSize = "text-2xl"
      break
    case "sm":
      bigIconFontSize = "text-2xl"
      fontSize = "text-3xl"
      break
    case "md":
      bigIconFontSize = "text-3xl"
      fontSize = "text-4xl"
      break
  }

  // if (isLocked) {
  //   return (
  //     <Icon
  //       icon="solar:lock-keyhole-bold-duotone"
  //       className={fontSize}
  //     />
  //   )
  // }

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
