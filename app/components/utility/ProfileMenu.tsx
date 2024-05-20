import * as React from "react"
import { useContext } from "react"
import { useRouter } from "next/navigation"
import ThemeSwitcher from "@/app/components/utility/ThemeSwitcher"
import { MetadachiContext } from "@/app/lib/context"
import { supabase } from "@/app/lib/supabase/browser-client"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { Routes } from "@/app/lib/constants"
import { toast } from "sonner"
import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownSection,
  DropdownTrigger,
  useDisclosure
} from "@nextui-org/react"
import { User } from "@nextui-org/user"
import { Icon } from "@iconify-icon/react"
import { WorkspaceSwitcher } from "@/app/components/workspace/WorkspaceSwitcher"
import { useSession } from "@/app/lib/hooks/use-session"

export default function ProfileMenu({
  placement = "bottom"
}: {
  placement?: "left" | "right" | "top" | "bottom"
}) {
  const router = useRouter()
  const { profile } = useContext(MetadachiContext)
  const { isAnonymous } = useSession()
  const { openAuthModal } = useAuthModal()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      toast.error(error.message)
    } else {
      toast.success("Signed out successfully")
    }
    router.refresh()
  }

  return (
    <>
      <Dropdown
        placement={placement}
        classNames={{
          content: "p-0 border-small border-divider bg-background"
        }}
      >
        <DropdownTrigger>
          {profile ? (
            <Avatar
              as="button"
              size="sm"
              showFallback
              name={profile?.display_name ?? profile?.username}
              src={profile?.image_url}
            />
          ) : (
            <Button isIconOnly variant="light" size="sm">
              <Icon icon="solar:menu-dots-bold" className="text-xl" />
            </Button>
          )}
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Profile Menu"
          disabledKeys={["profile"]}
          className="w-60 p-3"
          itemClasses={{
            base: [
              "rounded-md",
              "text-default-500",
              "transition-opacity",
              "data-[hover=true]:text-foreground",
              "data-[hover=true]:bg-default-100",
              "dark:data-[hover=true]:bg-default-50",
              "data-[selectable=true]:focus:bg-default-50",
              "data-[pressed=true]:opacity-70",
              "data-[focus-visible=true]:ring-default-500"
            ]
          }}
        >
          <DropdownSection aria-label="Profile & Actions" showDivider>
            <DropdownItem
              isReadOnly
              key="profile"
              className="h-14 gap-2 opacity-100"
            >
              <User
                name={`${profile?.display_name && profile.display_name.trim() !== "" ? profile.display_name : profile?.username}${isAnonymous ? " (Guest)" : ""}`}
                description={
                  profile?.username ? `@${profile.username}` : "Guest"
                }
                classNames={{
                  name: "text-default-600",
                  description: "text-default-500"
                }}
                avatarProps={{
                  size: "sm",
                  src: profile?.image_url,
                  showFallback: true,
                  name: profile?.display_name ?? profile?.username
                }}
              />
            </DropdownItem>
            <DropdownItem isReadOnly key="workspace-select">
              <WorkspaceSwitcher />
            </DropdownItem>
            <DropdownItem
              key="collections"
              onClick={() => router.push(Routes.Collections)}
            >
              Collections
            </DropdownItem>
            <DropdownItem
              key="settings"
              // onClick={onOpen}
              onClick={() => router.push(Routes.Settings)}
            >
              Settings
            </DropdownItem>
            <DropdownItem
              key="workspace_settings"
              onClick={() => router.push(Routes.WorkspaceSettings)}
            >
              Workspace Settings
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Preferences" showDivider>
            <DropdownItem
              key="quick_search"
              shortcut="⌘K"
              onClick={() =>
                toast.message("The Quick Search feature is coming soon!")
              }
            >
              Quick Search
            </DropdownItem>
            <DropdownItem
              isReadOnly
              key="theme"
              className="cursor-default"
              endContent={<ThemeSwitcher />}
            >
              Theme
            </DropdownItem>
          </DropdownSection>

          <DropdownSection aria-label="Help & FAQ">
            <DropdownItem
              key="help_and_faq"
              onClick={() => router.push(Routes.Help)}
            >
              Help & FAQ
            </DropdownItem>
            <DropdownItem
              key="feedback"
              onClick={() =>
                toast.message("The Feedback feature is coming soon!")
              }
            >
              Feedback
            </DropdownItem>
            {!isAnonymous ? (
              <DropdownItem key="logout" onClick={handleSignOut}>
                Log Out
              </DropdownItem>
            ) : (
              <DropdownItem key="login" onClick={openAuthModal}>
                {`Sign Up / Log In`}
              </DropdownItem>
            )}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
      {/*<SettingsModal isOpen={isOpen} onClose={onClose} />*/}
    </>
  )
}
