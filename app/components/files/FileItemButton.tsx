import { Box, Button, IconButton, Typography } from "@mui/joy"
import { FileIcon } from "@/app/components/files/file-icon"
import { Tables } from "@/supabase/types"
import { CloseRounded } from "@mui/icons-material"

interface FileButtonProps {
  parentFile: Tables<"files"> | undefined
  subtitle?: string
  fileIcon?: React.ReactNode
  onClick?: (e: any) => void
  onClose?: (e: any) => void
}

export const FileItemButton: React.FC<FileButtonProps> = ({
  parentFile,
  subtitle,
  fileIcon,
  onClick,
  onClose
}) => {
  let fileExtension = parentFile?.type.includes("/")
    ? parentFile.type.split("/")[1]
    : parentFile?.type

  return (
    <Button
      variant="outlined"
      color="neutral"
      sx={{
        width: "100%",
        gap: 2,
        borderRadius: "md",
        p: 1.5
      }}
      onClick={onClick}
    >
      <Box
        sx={{
          borderRadius: "md",
          backgroundColor: "rgb(59 130 246)", // Tailwind bg-blue-500
          p: 1
        }}
      >
        {fileIcon ?? <FileIcon type={fileExtension ?? ""} size={24} />}
      </Box>

      <Box
        sx={{
          overflow: "hidden",
          textAlign: "start"
        }}
      >
        <Typography level="title-sm" noWrap>
          {parentFile?.name}
        </Typography>

        {subtitle && (
          <Typography level="body-sm" fontWeight="normal" noWrap>
            {subtitle}
          </Typography>
        )}
      </Box>

      {onClose && (
        <IconButton
          size="sm"
          variant="solid"
          sx={{
            position: "absolute",
            right: -8,
            top: -8,
            borderRadius: "xl",
            minWidth: "20px",
            minHeight: "20px",
            p: 0
          }}
          onClick={onClose}
        >
          <CloseRounded
            sx={{
              width: "15px",
              height: "auto"
            }}
          />
        </IconButton>
      )}
    </Button>
  )
}
