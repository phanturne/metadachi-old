import * as React from "react"
import { useContext } from "react"
import Menu from "@mui/joy/Menu"
import MenuItem from "@mui/joy/MenuItem"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import MenuButton from "@mui/joy/MenuButton"
import Dropdown from "@mui/joy/Dropdown"
import Avatar from "@mui/joy/Avatar"
import { Box, Typography } from "@mui/joy"
import {
  CollectionsBookmarkRounded,
  LoginRounded,
  LogoutRounded,
  SettingsRounded
} from "@mui/icons-material"
import { useRouter } from "next/navigation"
import { Routes } from "@/lib/constants"
import Divider from "@mui/joy/Divider"
// import { useAuthModal } from '@/providers/AuthProvider';
import ThemeToggleButton from "@/components/ThemeToggle"
import { ChatbotUIContext } from "@/context/context"
import { supabase } from "@/lib/supabase/browser-client"

export default function ProfileMenu({
  children,
  placement = "bottom"
}: {
  children?: React.ReactNode
  placement?: "left" | "right" | "top" | "bottom"
}) {
  const router = useRouter()
  const { profile } = useContext(ChatbotUIContext)
  // const { openAuthModal } = useAuthModal();

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <Dropdown>
      {children && <>{children}</>}
      {!children && (
        <MenuButton
          slots={{ root: Avatar }}
          slotProps={{
            root: { variant: "solid", size: "sm" }
          }}
        >
          <Avatar
            variant="solid"
            size="sm"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          />
        </MenuButton>
      )}

      <Menu placement={placement} sx={{ width: "250px" }}>
        <Box sx={{ display: "flex", m: 1, mx: 1.5 }}>
          <Avatar
            variant="solid"
            src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=286"
          />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              pl: 1.5,
              overflow: "hidden"
            }}
          >
            <Typography
              level="title-sm"
              sx={{ overflow: "hidden", textOverflow: "ellipsis" }}
            >
              {profile?.display_name ?? "Guest"}
            </Typography>
            <Typography level="body-sm">Subtitle</Typography>
          </Box>
        </Box>
        <Divider sx={{ m: 0.5 }} />
        <Box
          sx={{ display: "flex", my: 1, mx: 1.5, gap: 1, alignItems: "center" }}
        >
          <ThemeToggleButton />
          {/*{process.env.BUILD_MODE === 'export' && <FloatingWindowToggle />}*/}
        </Box>

        <MenuItem
          onClick={() => {
            router.push(Routes.Collections)
          }}
        >
          <ListItemDecorator>
            <CollectionsBookmarkRounded />
          </ListItemDecorator>
          Collections
        </MenuItem>

        <MenuItem
          onClick={() => {
            router.push(Routes.Settings)
          }}
        >
          <ListItemDecorator>
            <SettingsRounded />
          </ListItemDecorator>
          Settings
        </MenuItem>
        <Divider sx={{ m: 0.5 }} />
        {profile !== null && (
          <MenuItem onClick={handleSignOut}>
            <ListItemDecorator>
              <LogoutRounded />
            </ListItemDecorator>
            Logout
          </MenuItem>
        )}
        {profile === null && (
          <MenuItem onClick={() => router.push(Routes.Login)}>
            <ListItemDecorator>
              <LoginRounded />
            </ListItemDecorator>
            Login / Sign Up
          </MenuItem>
        )}
      </Menu>
    </Dropdown>
  )
}
