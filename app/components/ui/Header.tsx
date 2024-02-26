"use client"

import * as React from "react"
import Sheet from "@mui/joy/Sheet"
import Box from "@mui/joy/Box"
import ProfileMenu from "@/app/components/ui/ProfileMenu"
import { IconButton } from "@mui/joy"
import { NotificationsNoneRounded } from "@mui/icons-material"
import Divider from "@mui/joy/Divider"

export default function Header({
  startContent,
  endContent,
  middleContent
}: {
  startContent?: React.ReactNode
  middleContent?: React.ReactNode
  endContent?: React.ReactNode
}) {
  return (
    <Sheet
      sx={{
        display: "flex",
        flexShrink: 0,
        alignItems: "center",
        justifyContent: "space-between",
        alignContent: "center",
        textAlign: "center",
        zIndex: 100,
        width: "100%",
        height: 55,
        px: 2,
        border: "1px solid",
        borderColor: "divider",
        boxShadow: "sm"
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left" }}>
        {startContent || <div></div>}
      </Box>

      <Box
        sx={{
          flex: 1,
          flexGrow: 2,
          overflow: "hidden"
        }}
      >
        {middleContent}
      </Box>

      <Box
        sx={{
          flex: 1,
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
          gap: 1
        }}
      >
        {endContent}
        <IconButton disabled color="neutral">
          <NotificationsNoneRounded />
        </IconButton>
        <ProfileMenu />
      </Box>
    </Sheet>
  )
}
