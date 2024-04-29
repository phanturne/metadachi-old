import * as React from "react"
import { FC } from "react"
import { Icon } from "@iconify-icon/react"

interface FileIconProps {
  type: string
  className?: string
}

export const FileIcons: FC<FileIconProps> = ({ type, className }) => {
  if (type.includes("image")) {
    return <Icon icon="bxs:file-image" className={className} />
  } else if (type.includes("pdf")) {
    return <Icon icon="bxs:file-pdf" className={className} />
  } else if (type.includes("docx")) {
    return <Icon icon="bxs:file-doc" className={className} />
  } else if (type.includes("plain")) {
    return <Icon icon="bxs:file-txt" className={className} />
  } else if (type.includes("json")) {
    return <Icon icon="bxs:file-json" className={className} />
  } else if (type.includes("markdown")) {
    return <Icon icon="bxs:file-md" className={className} />
  } else {
    return <Icon icon="bxs:file-blank" className={className} />
  }
}
