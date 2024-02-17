import { Box, Typography } from "@mui/joy"
import { FC } from "react"
import { ContentType } from "@/app/lib/types"
import { DataListContent } from "@/app/components/data-list/DataListContent"
import { getSortedData } from "@/app/components/data-list/data-list-utils"

interface ChatsViewProps {
  displayedFiles: any[]
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragEnter: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragLeave: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void
  handleDragStart: (e: React.DragEvent<HTMLDivElement>, id: string) => void
  contentType: ContentType
}

export const ChatsView: FC<ChatsViewProps> = ({
  displayedFiles,
  handleDrop,
  handleDragEnter,
  handleDragLeave,
  handleDragOver,
  handleDragStart,
  contentType
}) => {
  return (
    <>
      {["Today", "Yesterday", "Previous Week", "Older"].map(dateCategory => {
        const sortedData = getSortedData(
          displayedFiles,
          dateCategory as "Today" | "Yesterday" | "Previous Week" | "Older"
        )
        return (
          sortedData.length > 0 && (
            <Box>
              <Typography level="body-sm">{dateCategory}</Typography>

              <Box
                sx={{ display: "flex", flexDirection: "column", flexGrow: 1 }}
                onDrop={handleDrop}
                onDragEnter={handleDragEnter}
                onDragLeave={handleDragLeave}
                onDragOver={handleDragOver}
              >
                {sortedData.map((item: any) => (
                  <Box
                    key={item.id}
                    draggable="true"
                    onDragStart={e => handleDragStart(e, item.id)}
                  >
                    <DataListContent contentType={contentType} item={item} />
                  </Box>
                ))}
              </Box>
            </Box>
          )
        )
      })}
    </>
  )
}
