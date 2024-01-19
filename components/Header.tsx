"use client"

import * as React from "react"
import Sheet from "@mui/joy/Sheet"
import Box from "@mui/joy/Box"

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
        p: { xs: 0.25, sm: 0.5, md: 1 },
        borderBottom: "1px solid",
        borderColor: "background.level1",
        boxShadow: "sm"
      }}
    >
      <Box sx={{ flex: 1, textAlign: "left" }}>
        {startContent || <div></div>}
      </Box>

      <Box
        sx={{
          flex: 1,
          flexGrow: 2
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
          gap: 0.5
        }}
      >
        {endContent}
        {/*<IconButton color="neutral" size="sm">*/}
        {/*  <NotificationsNoneRounded />*/}
        {/*</IconButton>*/}
        {/*<UserAvatarMenu />*/}
      </Box>
    </Sheet>
  )
}
