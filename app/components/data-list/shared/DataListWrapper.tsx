import { Tables } from "@/supabase/types"
import { ContentType, DataListType } from "@/app/lib/types"
import { FC, useState } from "react"
import { CreateItemButton } from "./CreateItemButton"
import { DataItemSearch } from "./DataItemSearch"
import { DataList } from "@/app/components/data-list/DataList"

interface SidebarContentProps {
  contentType: ContentType
  data: DataListType
  folders: Tables<"folders">[]
  variant?: "list" | "grid"
}

export const DataListWrapper: FC<SidebarContentProps> = ({
  contentType,
  data,
  folders,
  variant = "grid"
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData: any = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className={`flex flex-col ${variant === "grid" ? "w-full" : "w-64"}`}>
      <div className="flex items-center gap-2">
        <DataItemSearch
          contentType={contentType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <CreateItemButton
          contentType={contentType}
          hasData={data.length > 0}
          variant={variant}
        />
      </div>

      <DataList
        contentType={contentType}
        data={filteredData}
        folders={folders}
        variant={variant}
      />
    </div>
  )
}
