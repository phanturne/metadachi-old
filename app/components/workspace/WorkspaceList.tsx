"use client"

import { MetadachiContext } from "@/app/lib/context"
import React, { useContext, useEffect, useState } from "react"
import { BusinessRounded, HomeWorkRounded } from "@mui/icons-material"
import { SidebarItem } from "@/app/components/sidebar/SidebarItem"
import Image from "next/image"

export const WorkspaceList = ({ variant }: { variant?: "sidebar" }) => {
  const {
    workspaces,
    workspaceImages,
    selectedWorkspace,
    setSelectedWorkspace
  } = useContext(MetadachiContext)

  const [value, setValue] = useState("")

  useEffect(() => {
    if (!selectedWorkspace) return

    setValue(selectedWorkspace.id)
  }, [selectedWorkspace])

  const handleSelect = (workspaceId: string) => {
    const workspace = workspaces.find(workspace => workspace.id === workspaceId)

    if (!workspace) return

    setSelectedWorkspace(workspace)
  }

  const homeWorkspace = workspaces.find(workspace => workspace.is_home)

  if (!workspaces) return

  return (
    <>
      {homeWorkspace && (
        <SidebarItem
          onClick={() => handleSelect(homeWorkspace.id)}
          selected={value === homeWorkspace.id}
          variant="workspace"
        >
          <HomeWorkRounded />
        </SidebarItem>
      )}

      {workspaces
        .filter(workspace => !workspace.is_home && workspace.name.toLowerCase())
        .sort((a, b) => a.name.localeCompare(b.name))
        .map(workspace => {
          const image = workspaceImages.find(
            image => image.workspaceId === workspace.id
          )

          return (
            <SidebarItem
              key={`sidebar-workspace-${workspace.id}`}
              onClick={() => handleSelect(workspace.id)}
              selected={value === workspace.id}
              variant="workspace"
            >
              {image ? (
                <Image
                  style={{ width: "28px", height: "28px" }}
                  className="mr-3 rounded"
                  src={image.url || ""}
                  width={28}
                  height={28}
                  alt={workspace.name}
                />
              ) : (
                <BusinessRounded />
              )}
            </SidebarItem>
          )
        })}
    </>
  )
}
