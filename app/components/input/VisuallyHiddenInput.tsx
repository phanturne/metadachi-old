import { JSX, ClassAttributes, InputHTMLAttributes } from "react"

export const VisuallyHiddenInput = (
  props: JSX.IntrinsicAttributes &
    ClassAttributes<HTMLInputElement> &
    InputHTMLAttributes<HTMLInputElement>
) => (
  <input
    className="clip-[rect(0, 0, 0)] clip-path-[inset(50%)] absolute bottom-0 left-0 size-1 overflow-hidden whitespace-nowrap"
    {...props}
  />
)
