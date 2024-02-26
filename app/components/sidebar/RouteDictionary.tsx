import * as React from "react"
import { Routes } from "@/app/lib/constants"
import {
  ChatRounded,
  CollectionsBookmarkRounded,
  ExploreRounded,
  HomeRepairServiceRounded,
  HomeRounded,
  ImageRounded,
  PersonRounded,
  RoomPreferencesRounded,
  SettingsRounded,
  SportsEsportsRounded
} from "@mui/icons-material"

export const routeDictionary: Record<
  string,
  { icon: React.ReactElement; label: string; disabled?: boolean }
> = {
  [Routes.Home]: { icon: <HomeRounded />, label: "Home" },
  [Routes.Chat]: { icon: <ChatRounded />, label: "Chats" },
  [Routes.Images]: { icon: <ImageRounded />, label: "Images", disabled: true },
  [Routes.Toolbox]: {
    icon: <HomeRepairServiceRounded />,
    label: "Toolbox",
    disabled: true
  },
  [Routes.Games]: {
    icon: <SportsEsportsRounded />,
    label: "Games",
    disabled: true
  },
  [Routes.Collections]: {
    icon: <CollectionsBookmarkRounded />,
    label: "Collections"
  },
  [Routes.Explore]: {
    icon: <ExploreRounded />,
    label: "Explore",
    disabled: true
  },
  [Routes.Settings]: { icon: <SettingsRounded />, label: "User Settings" },
  [Routes.WorkspaceSettings]: {
    icon: <RoomPreferencesRounded />,
    label: "Workspace Settings"
  },
  [Routes.Profile]: { icon: <PersonRounded />, label: "Profile" }
}
