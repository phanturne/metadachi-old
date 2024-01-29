"use client"

import { Tab, tabClasses, TabList, Tabs } from "@mui/joy"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { Dispatch, SetStateAction } from "react"

export default function ChatTabs({
  tab,
  setTab
}: {
  tab: string
  setTab: Dispatch<SetStateAction<string>>
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const chatId = searchParams.get("id")
  const chatSearchParam = chatId ? `id=${chatId}&` : ""

  return (
    <Tabs
      aria-label="Pipeline"
      value={tab}
      onChange={(event, value) => {
        setTab((value as string) ?? "chat")
        router.push(`${pathname}?${chatSearchParam}tab=${value}`)
      }}
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
