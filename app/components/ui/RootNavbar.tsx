"use client"

import { Button, NavbarProps } from "@nextui-org/react"
import {
  Link,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle
} from "@nextui-org/react"

import React, { useContext } from "react"
import { cn } from "@/app/lib/utils/utils"
import Image from "next/image"
import { Routes } from "@/app/lib/constants"
import ProfileMenu from "@/app/components/utility/ProfileMenu"
import { usePathname } from "next/navigation"
import { MetadachiContext } from "@/app/lib/context"
import { useAuthModal } from "@/app/lib/providers/AuthContextProvider"
import { Icon } from "@iconify-icon/react"

const routes = [
  { route: Routes.Chat, label: "Chats" },
  { route: Routes.Images, label: "Images" },
  { route: Routes.Tools, label: "Tools" },
  { route: Routes.Games, label: "Games" },
  { route: Routes.Collections, label: "Collections" },
  { route: Routes.Explore, label: "Explore" }
]

export default function Component(props: NavbarProps) {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = React.useState(false)

  const { profile } = useContext(MetadachiContext)
  const { openAuthModal } = useAuthModal()

  function isActiveRoute(route: string) {
    // Hacky: Chat page is considered active when on the home page
    // Remove after getting redirect working
    if (pathname === Routes.Home && route === Routes.Chat) return true

    return pathname.split("/")[1] === route.split("/")[1]
  }

  return (
    <Navbar
      {...props}
      isBordered
      classNames={{
        base: cn("border-default-100", {
          "bg-default-200/50 dark:bg-default-100/50": isMenuOpen
        }),
        wrapper: "w-full justify-center bg-transparent ",
        item: "hidden md:flex"
      }}
      maxWidth="full"
      height="60px"
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle className="text-default-400 md:hidden" />

      <NavbarBrand>
        <Link href={Routes.Home} color="foreground">
          <Image
            src="/metadachi.svg"
            alt="Metadachi Icon"
            width={26}
            height={26}
          />
          <span className="ml-2 font-medium">Metadachi</span>
        </Link>
      </NavbarBrand>
      <NavbarContent
        className="hidden h-11 gap-4 rounded-full border-small border-default-200/20 bg-background/60 px-4 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50 md:flex"
        justify="center"
      >
        {routes.map(({ route, label }) => (
          <NavbarItem key={route} isActive={isActiveRoute(route)}>
            <Link
              className={isActiveRoute(route) ? "" : "text-default-500"}
              href={route}
              size="sm"
              color={isActiveRoute(route) ? "foreground" : undefined}
            >
              {label}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          {/* TODO: Display LoginButton + DotMenu if user is logged in and ProfileMenu otherwise*/}
          {!profile && (
            <Button
              className="hidden border-small border-secondary-500/20 bg-secondary-500/10 text-secondary-800 sm:flex"
              color="secondary"
              radius="full"
              style={{
                boxShadow: "inset 0 0 4px #bf97ff70"
              }}
              variant="flat"
              onClick={openAuthModal}
              endContent={
                <Icon icon="solar:login-linear" className="text-xl" />
              }
            >
              Login
            </Button>
          )}
        </NavbarItem>
        <NavbarItem>
          <ProfileMenu />
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu
        className="top-[calc(var(--navbar-height)_-_1px)] max-h-[70vh] bg-default-200/50 pt-6 shadow-medium backdrop-blur-md backdrop-saturate-150 dark:bg-default-100/50"
        motionProps={{
          initial: { opacity: 0, y: -20 },
          animate: { opacity: 1, y: 0 },
          exit: { opacity: 0, y: -20 },
          transition: {
            ease: "easeInOut",
            duration: 0.2
          }
        }}
      >
        {routes.map(({ route, label }) => (
          <NavbarMenuItem key={route} isActive={isActiveRoute(route)}>
            <Link
              className={isActiveRoute(route) ? "" : "text-default-500"}
              href={route}
              size="sm"
              color={isActiveRoute(route) ? "foreground" : undefined}
            >
              {label}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  )
}
