import { ContentType } from "@/app/lib/types"
import React, { FC } from "react"
import { SearchRounded } from "@mui/icons-material"
import { Input } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface SidebarSearchProps {
  contentType: ContentType
  searchTerm: string
  setSearchTerm: Function
}

export const DataItemSearch: FC<SidebarSearchProps> = ({
  contentType,
  searchTerm,
  setSearchTerm
}) => {
  return (
    <Input
      placeholder={`Search ${contentType}...`}
      value={searchTerm}
      onChange={e => setSearchTerm(e.target.value)}
      startContent={<Icon icon="ic:round-search" className="text-base" />}
    />
  )
}
