import { ProfileSettings } from "@/app/components/utility/profile-settings"
import Header from "@/app/components/ui/Header"
import { Typography } from "@mui/joy"
import React from "react"
import Tabs from "@mui/joy/Tabs"
import TabList from "@mui/joy/TabList"
import Tab, { tabClasses } from "@mui/joy/Tab"

export default function SettingsPage() {
  return (
    <>
      <Header
        startContent={<Typography level="title-lg">User Settings</Typography>}
      />
      {/*<ProfileSettings />*/}

      <Tabs aria-label="tabs" defaultValue={0} sx={{ bgcolor: "transparent" }}>
        <TabList
          disableUnderline
          sx={{
            p: 0.5,
            gap: 0.5,
            borderRadius: "xl",
            bgcolor: "background.level1",
            [`& .${tabClasses.root}[aria-selected="true"]`]: {
              boxShadow: "sm",
              bgcolor: "background.surface"
            }
          }}
        >
          <Tab disableIndicator>General</Tab>
          <Tab disableIndicator>API</Tab>
        </TabList>
      </Tabs>
    </>
  )
}
