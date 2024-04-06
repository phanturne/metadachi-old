import { ModelProvider } from "@/app/lib/types"
import { FC, HTMLAttributes } from "react"
import { AnthropicSVG } from "@/app/components/icons/anthropic-svg"
import { GoogleSVG } from "@/app/components/icons/google-svg"
import { OpenAISVG } from "@/app/components/icons/openai-svg"
import { AutoAwesomeRounded } from "@mui/icons-material"
import SvgIcon from "@mui/joy/SvgIcon"
import MistralIcon from "@/app/components/icons/mistral.svg"
import Image from "next/image"
import groq from "@/public/providers/groq.png"
import { Icon } from "@iconify-icon/react"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider?: ModelProvider
  height: number
  width: number
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  height,
  width
  // ...props
}) => {
  switch (provider as ModelProvider) {
    case "openai":
      return (
        <SvgIcon style={{ width: width, height: height }}>
          <OpenAISVG />
        </SvgIcon>
      )
    case "mistral":
      return (
        <SvgIcon
          component={MistralIcon}
          viewBox="0 0 314 296"
          style={{ width: width, height: height }}
        />
      )
    // TODO: Update Groq icon
    case "groq":
      return <Image src={groq.src} alt="Groq" width={width} height={height} />
    case "anthropic":
      return (
        <SvgIcon style={{ width: width, height: height }}>
          <AnthropicSVG />
        </SvgIcon>
      )
    case "google":
      return (
        <SvgIcon style={{ width: width, height: height }}>
          <GoogleSVG />
        </SvgIcon>
      )
    case "perplexity":
      return (
        // <SvgIcon
        //   component={PerplexityIcon}
        //   viewBox="0 0 344 345"
        //   style={{ width: width, height: height, fill: "white" }}
        // />
        // <SvgIcon style={{ width: width, height: height, color: "white" }}>
        //   <PerplexityIcon />
        // </SvgIcon>
        <AutoAwesomeRounded style={{ width: width, height: height }} />
      )
    default:
      return <Icon icon="solar:atom-bold-duotone" className="text-2xl" />
  }
}
