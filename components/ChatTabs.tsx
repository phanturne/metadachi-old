"use client"

import { Box, Tab, tabClasses, TabList, Tabs } from "@mui/joy"
import { useRouter } from "next/navigation"

export default function ChatTabs({ tab }: { tab: string }) {
  const router = useRouter()
  return (
    <Tabs
      aria-label="Pipeline"
      value={tab}
      onChange={(_, value) => router.push(`/${value}`)}
    >
      <TabList
        sx={{
          pt: 1,
          justifyContent: "center",
          [`&& .${tabClasses.root}`]: {
            flex: "initial",
            bgcolor: "transparent",
            "&:hover": {
              bgcolor: "transparent"
            },
            [`&.${tabClasses.selected}`]: {
              color: "primary.plainColor",
              "&::after": {
                height: 2,
                borderTopLeftRadius: 3,
                borderTopRightRadius: 3,
                bgcolor: "primary.500"
              }
            }
          }
        }}
      >
        <Tab indicatorInset value="chat">
          Chat
        </Tab>
        <Tab indicatorInset value="assistants">
          Assistants
        </Tab>
        <Tab indicatorInset value="prompts">
          Prompts
        </Tab>
        {/* Commands? */}
        <Tab indicatorInset value="files">
          Files
        </Tab>
        <Tab indicatorInset value="tools">
          Tools
        </Tab>
      </TabList>
    </Tabs>
  )
}

export function ChatTabsStandalone({ tab }: { tab: string }) {
  return (
    <Box
      sx={{
        position: "relative",
        width: "300px",
        paddingBottom: "8px",
        paddingTop: "5px",
        minWidth: {
          xs: "300px",
          sm: "400px",
          md: "500px",
          lg: "660px",
          xl: "800px"
        }
      }}
    >
      <ChatTabs tab={tab} />
    </Box>
  )
}
