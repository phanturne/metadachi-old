import { ProfileSettings } from "@/components/utility/profile-settings"
import Header from "@/components/Header"
import { Typography } from "@mui/joy"
import React from "react"

export default function SettingsPage() {
  return (
    <>
      <Header
        startContent={<Typography level="title-lg">User Settings</Typography>}
      />
      <ProfileSettings />
    </>
  )
}
