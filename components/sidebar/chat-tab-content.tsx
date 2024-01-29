import { Tables } from "@/supabase/types"
import { ContentType, DataListType } from "@/types"
import { FC, useState } from "react"
import { SidebarCreateButtons } from "./sidebar-create-buttons"
import { DataList } from "./data-list"
import { SidebarSearch } from "./sidebar-search"
import { Box } from "@mui/joy"

interface SidebarContentProps {
  contentType: ContentType
  data: DataListType
  folders: Tables<"folders">[]
}

export const ChatTabContent: FC<SidebarContentProps> = ({
  contentType,
  data,
  folders
}) => {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredData: any = data.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        maxHeight: "calc(100% - 50px)",
        flexGrow: 1
      }}
    >
      <Box sx={{ mt: 2, display: "flex", alignItems: "center" }}>
        <SidebarCreateButtons
          contentType={contentType}
          hasData={data.length > 0}
        />
      </Box>

      <Box sx={{ mt: 2 }}>
        <SidebarSearch
          contentType={contentType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </Box>

      <DataList
        contentType={contentType}
        data={filteredData}
        folders={folders}
        variant="grid"
      />
    </Box>
  )
}
