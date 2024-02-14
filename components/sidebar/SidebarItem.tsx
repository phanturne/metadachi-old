import * as React from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import { Tooltip } from "@mui/joy"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/navigation"
import { routeDictionary } from "@/components/sidebar/RouteDictionary"

export function SidebarItem({
  selected = false,
  disabled,
  onClick,
  isShrunk = true,

  children
}: {
  selected?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  isShrunk?: boolean

  children?: React.ReactNode
}) {
  return (
    <ListItem
      sx={{
        alignContent: "center",
        justifyContent: "center"
      }}
    >
      <ListItemButton
        selected={selected}
        onClick={onClick}
        sx={{
          justifyContent: "center",
          flexGrow: isShrunk ? 0 : 1,
          px: 2
        }}
        disabled={disabled}
      >
        {children}
      </ListItemButton>
    </ListItem>
  )
}

export function SidebarRouteItem({
  route,
  trailingContent,
  onClick,
  isShrunk = true,
  selectedRoute,
  setSelectedRoute
}: {
  route: string
  trailingContent?: React.ReactNode
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  onMouseOver?: React.MouseEventHandler<HTMLAnchorElement>
  selectedRoute: string
  setSelectedRoute: React.Dispatch<React.SetStateAction<string>>
  isShrunk?: boolean
}) {
  const router = useRouter()
  if (!route || !routeDictionary[route]) {
    return
  }

  const routeData = routeDictionary[route]

  return (
    <SidebarItem
      selected={selectedRoute === route}
      disabled={routeData.disabled}
      onClick={
        onClick !== undefined
          ? onClick
          : () => {
              setSelectedRoute(route)
              router.push(route)
            }
      }
    >
      {isShrunk ? (
        <Tooltip title={routeData.label} placement="right" variant="outlined">
          {routeData.icon}
        </Tooltip>
      ) : (
        <>
          <ListItemDecorator>{routeData.icon}</ListItemDecorator>
          <ListItemContent>
            <Typography level="title-sm">{routeData.label}</Typography>
          </ListItemContent>
          {trailingContent}
        </>
      )}
    </SidebarItem>
  )
}
