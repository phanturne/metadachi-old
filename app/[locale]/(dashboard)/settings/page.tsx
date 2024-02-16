import { ProfileSettings } from "@/app/components/utility/profile-settings"
import Header from "@/app/components/ui/Header"
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
