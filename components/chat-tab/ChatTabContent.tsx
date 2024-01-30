import { Tables } from "@/supabase/types"
import { ContentType, DataListType } from "@/types"
import { FC, useState } from "react"
import { ChatTabCreateButtons } from "./ChatTabCreateButtons"
import { DataList } from "../sidebar/data-list"
import { ChatTabSearch } from "./ChatTabSearch"
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
  console.log("filteredData", filteredData)

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        flexGrow: 1,
        mt: 2
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, flexGrow: 0 }}>
        <ChatTabSearch
          contentType={contentType}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
        <ChatTabCreateButtons
          contentType={contentType}
          hasData={data.length > 0}
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
