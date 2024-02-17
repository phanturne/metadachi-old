import { Tables } from "@/supabase/types"
import { ContentType, DataListType } from "@/app/lib/types"
import { FC, useState } from "react"
import { CollectionsCreateButtons } from "./CollectionsCreateButtons"
import { CollectionsSearch } from "./CollectionsSearch"
import { Box } from "@mui/joy"
import { DataList } from "@/app/components/collections/data-list"

interface SidebarContentProps {
  contentType: ContentType
  data: DataListType
  folders: Tables<"folders">[]
  variant?: "list" | "grid"
}

export const CollectionsWrapper: FC<SidebarContentProps> = ({
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
    <Box
      sx={{
        display: "flex",
        width: variant === "grid" ? "100%" : 250,
        flexDirection: "column",
        flexGrow: 1,
        mt: variant === "grid" ? 5 : 2
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexGrow: 0 }}>
        <CollectionsSearch
          contentType={contentType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <CollectionsCreateButtons
          contentType={contentType}
          hasData={data.length > 0}
          variant={variant}
        />
      </Box>

      <DataList
        contentType={contentType}
        data={filteredData}
        folders={folders}
        variant={variant}
      />
    </Box>
  )
}
