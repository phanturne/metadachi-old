import { MetadachiContext } from "@/app/lib/context"
import { Tables } from "@/supabase/types"
import React, { FC, useContext } from "react"
import { Select, SelectItem } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface AssistantToolSelectProps {
  isDisabled?: boolean
  selectedAssistantTools: Tables<"tools">[]
  setSelectedAssistantTools: (tool: Tables<"tools">[]) => void
  label?: string
  labelPlacement?: "outside" | "inside"
}

export const AssistantToolSelect: FC<AssistantToolSelectProps> = ({
  isDisabled,
  selectedAssistantTools,
  setSelectedAssistantTools,
  label,
  labelPlacement
}) => {
  const { tools } = useContext(MetadachiContext)

  const selectedToolIds = tools
    .filter(tool => selectedAssistantTools.map(t => t.id).includes(tool.id))
    .map(tool => tool.id)

  return (
    <Select
      isDisabled={isDisabled}
      selectionMode="multiple"
      label={label ?? "Tools"}
      labelPlacement={labelPlacement}
      placeholder={`Search tools...`}
      selectedKeys={selectedToolIds}
      onSelectionChange={ids => {
        const selected = tools.filter(item => Array.from(ids).includes(item.id))

        setSelectedAssistantTools(selected)
      }}
      startContent={
        <Icon icon="solar:sledgehammer-bold-duotone" className="text-2xl" />
      }
    >
      {tools.map(item => (
        <SelectItem key={item.id} value={item.name} textValue={item.name}>
          <div className="flex items-center gap-2">
            <Icon icon="solar:sledgehammer-bold-duotone" className="text-2xl" />
            {item.name}
          </div>
        </SelectItem>
      ))}
    </Select>
  )
}
