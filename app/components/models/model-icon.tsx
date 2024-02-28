import mistral from "@/public/providers/mistral.png"
import perplexity from "@/public/providers/perplexity.png"
import { ModelProvider } from "@/app/lib/types"
import { useTheme } from "next-themes"
import Image from "next/image"
import { FC, HTMLAttributes } from "react"
import { AnthropicSVG } from "@/app/components/icons/anthropic-svg"
import { GoogleSVG } from "@/app/components/icons/google-svg"
import { OpenAISVG } from "@/app/components/icons/openai-svg"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { AutoAwesomeRounded } from "@mui/icons-material"
import SvgIcon from "@mui/joy/SvgIcon"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  provider?: ModelProvider
  height: number
  width: number
  size: number
}

export const ModelIcon: FC<ModelIconProps> = ({
  provider,
  height = 30,
  width = 30,
  ...props
}) => {
  const { theme } = useTheme()

  switch (provider as ModelProvider) {
    case "openai":
      return (
        <SvgIcon style={{ width: width, height: height }}>
          <OpenAISVG />
        </SvgIcon>
      )
    case "mistral":
      return (
        <Image
          // className={cn(
          //   "rounded-sm p-1",
          //   theme === "dark" ? "bg-white" : "border-[1px] border-black"
          // )}
          src={mistral.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    case "anthropic":
      return (
        <AnthropicSVG
          // className={cn(
          //   "rounded-sm bg-[#fff] p-1 text-black",
          //   props.className,
          //   theme === "dark" ? "bg-white" : "border-[1px] border-black"
          // )}
          width={width}
          height={height}
        />
      )
    case "google":
      return (
        // <GoogleSVG
        //   // className={cn(
        //   //   "rounded-sm bg-[#fff] p-1 text-black",
        //   //   props.className,
        //   //   theme === "dark" ? "bg-white" : "border-[1px] border-black"
        //   // )}
        //   width={width}
        //   height={height}
        // />
        <SvgIcon style={{ width: width, height: height }}>
          <GoogleSVG />
        </SvgIcon>
      )
    case "perplexity":
      return (
        <Image
          // className={cn(
          //   "rounded-sm p-1",
          //   theme === "dark" ? "bg-white" : "border-[1px] border-black"
          // )}
          style={{
            borderRadius: "0.125rem",
            padding: "0.25rem",
            backgroundColor: theme === "dark" ? "white" : "",
            border: theme === "dark" ? "" : "1px solid black"
          }}
          src={perplexity.src}
          alt="Mistral"
          width={width}
          height={height}
        />
      )
    default:
      return <AutoAwesomeRounded style={{ width: width, height: height }} />
  }
}
