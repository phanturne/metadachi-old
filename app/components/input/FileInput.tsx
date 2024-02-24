// Source: https://mui.com/joy-ui/react-button/#file-upload

import * as React from "react"
import Button from "@mui/joy/Button"
import SvgIcon from "@mui/joy/SvgIcon"
import { IconButton } from "@mui/joy"
import { AddCircleOutlineRounded } from "@mui/icons-material"
import { VisuallyHiddenInput } from "@/app/components/input/VisuallyHiddenInput"

export default function FileInput({
  handleSelectedFile,
  accept,
  required
}: {
  handleSelectedFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  required?: boolean
}) {
  return (
    <Button
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="outlined"
      color="neutral"
      startDecorator={
        <SvgIcon>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
            />
          </svg>
        </SvgIcon>
      }
    >
      Upload a file
      <VisuallyHiddenInput
        type="file"
        required={required}
        onChange={handleSelectedFile}
        accept={accept}
      />
    </Button>
  )
}

export function FileInputIconButton({
  handleSelectedFile,
  accept,
  required
}: {
  handleSelectedFile: (e: React.ChangeEvent<HTMLInputElement>) => void
  accept?: string
  required?: boolean
}) {
  return (
    <IconButton
      component="label"
      role={undefined}
      tabIndex={-1}
      variant="plain"
      color="neutral"
      size="md"
    >
      <AddCircleOutlineRounded />
      <VisuallyHiddenInput
        type="file"
        required={required}
        onChange={handleSelectedFile}
        accept={accept}
      />
    </IconButton>
  )
}
