import { Tables } from "@/supabase/types"
import { MetadachiContext } from "@/app/lib/context"
import { useContext } from "react"
import { Box, Grid, Link } from "@mui/joy"
import { ArrowDropDownRounded, ArrowRightRounded } from "@mui/icons-material"
import SvgIcon from "@mui/joy/SvgIcon"
import { FileItemButton } from "@/app/components/files/FileItemButton"

export function MessageFiles({
  fileItems,
  viewSources,
  setViewSources,
  setSelectedFileItem,
  setShowFileItemPreview
}: {
  fileItems: Tables<"file_items">[]
  viewSources: boolean
  setViewSources: (value: boolean) => void
  setSelectedFileItem: (value: Tables<"file_items"> | null) => void
  setShowFileItemPreview: (value: boolean) => void
}) {
  const { files } = useContext(MetadachiContext)
  return (
    <>
      {fileItems.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {!viewSources ? (
            <Link
              component="button"
              level="body-sm"
              underline="none"
              color="neutral"
              onClick={() => setViewSources(true)}
              sx={{ fontWeight: "bold" }}
            >
              {`View ${fileItems.length} Source${
                fileItems.length == 1 ? "" : "s"
              }`}
              <SvgIcon size="lg">
                <ArrowRightRounded />
              </SvgIcon>
            </Link>
          ) : (
            <>
              <Link
                component="button"
                level="body-sm"
                underline="none"
                color="neutral"
                onClick={() => setViewSources(false)}
                sx={{ fontWeight: "bold" }}
              >
                Sources
                <SvgIcon size="lg">
                  <ArrowDropDownRounded />
                </SvgIcon>
              </Link>
              <Grid
                container
                spacing={{ xs: 1 }}
                columns={{ xs: 4, md: 8, xl: 12 }}
              >
                {fileItems.map((fileItem, index) => {
                  const parentFile = files.find(
                    file => file.id === fileItem.file_id
                  )

                  return (
                    <Grid xs={4} key={index}>
                      <FileItemButton
                        parentFile={parentFile}
                        subtitle={fileItem.content.substring(0, 60)}
                        onClick={() => {
                          setSelectedFileItem(fileItem)
                          setShowFileItemPreview(true)
                        }}
                      />
                    </Grid>
                  )
                })}
              </Grid>
            </>
          )}
        </Box>
      )}
    </>
  )
}
