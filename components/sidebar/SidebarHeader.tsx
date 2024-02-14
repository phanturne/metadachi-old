import Box from "@mui/joy/Box"
import { Link } from "@mui/joy"
import { Routes } from "@/lib/constants"
import Image from "next/image"
import Typography from "@mui/joy/Typography"
import * as React from "react"

export function SidebarHeader({ isShrunk = true }: { isShrunk?: boolean }) {
  return (
    <Box
      sx={{
        display: "flex",
        alignContent: "center",
        justifyContent: "center",
        mt: 0.75
      }}
    >
      {isShrunk ? (
        <Link href={Routes.Home}>
          <Image
            src="/metadachi.svg"
            alt="Metadachi Icon"
            width={26}
            height={26}
          />
        </Link>
      ) : (
        <Link href={Routes.Home} underline="none" sx={{ gap: 0.5 }}>
          <Image
            src="/metadachi.svg"
            alt="Metadachi Icon"
            width={26}
            height={26}
          />
          <Typography level="h4">Metadachi</Typography>
        </Link>
      )}
    </Box>
  )
}
