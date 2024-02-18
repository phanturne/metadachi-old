import React, { FC, memo } from "react"
import remarkGfm from "remark-gfm"
import remarkMath from "remark-math"
import { MessageCodeblock } from "./MessageCodeblock"
import ReactMarkdown, { Options } from "react-markdown"
import { Typography } from "@mui/joy"

interface MessageMarkdownProps {
  content: string
}

export const MessageMarkdown: FC<MessageMarkdownProps> = ({ content }) => {
  return (
    <MessageMarkdownMemoized
      remarkPlugins={[remarkGfm, remarkMath]}
      components={{
        p({ children }) {
          return <Typography>{children}</Typography>
        },
        img({ node, ...props }) {
          return <img className="max-w-[67%]" {...props} /> // TODO: Remove TailwindCSS style
        },
        code({ node, className, children, ...props }) {
          const childArray = React.Children.toArray(children)
          const firstChild = childArray[0] as React.ReactElement
          const firstChildAsString = React.isValidElement(firstChild)
            ? (firstChild as React.ReactElement).props.children
            : firstChild

          if (firstChildAsString === "▍") {
            return (
              <Typography
                sx={{
                  mt: 1,
                  animation: "pulse",
                  cursor: "default"
                }}
              >
                ▍
              </Typography>
            )
          }

          if (typeof firstChildAsString === "string") {
            childArray[0] = firstChildAsString.replace("`▍`", "▍")
          }

          const match = /language-(\w+)/.exec(className || "")

          if (
            typeof firstChildAsString === "string" &&
            !firstChildAsString.includes("\n")
          ) {
            return <code {...props}>{childArray}</code>
          }

          return (
            <MessageCodeblock
              key={Math.random()}
              language={(match && match[1]) || ""}
              value={String(childArray).replace(/\n$/, "")}
              {...props}
            />
          )
        }
      }}
    >
      {content}
    </MessageMarkdownMemoized>
  )
}

export const MessageMarkdownMemoized: FC<Options> = memo(
  ReactMarkdown,
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.className === nextProps.className
)
