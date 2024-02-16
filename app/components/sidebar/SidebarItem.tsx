import * as React from "react"
import ListItem from "@mui/joy/ListItem"
import ListItemButton from "@mui/joy/ListItemButton"
import { Tooltip } from "@mui/joy"
import ListItemDecorator from "@mui/joy/ListItemDecorator"
import ListItemContent from "@mui/joy/ListItemContent"
import Typography from "@mui/joy/Typography"
import { useRouter } from "next/navigation"
import { routeDictionary } from "@/app/components/sidebar/RouteDictionary"

export function SidebarItem({
  selected = false,
  disabled,
  onClick,
  isShrunk = true,
  variant,
  children
}: {
  selected?: boolean
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLAnchorElement>
  isShrunk?: boolean
  variant?: "workspace"
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
        selected={selected && variant !== "workspace"}
        onClick={onClick}
        sx={{
          justifyContent: "center",
          flexGrow: isShrunk ? 0 : 1,
          px: 2,
          border:
            variant === "workspace" && selected ? "1px solid gray" : "none"
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
