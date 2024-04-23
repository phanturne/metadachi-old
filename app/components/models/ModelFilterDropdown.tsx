import React from "react"
import { MODEL_PROVIDERS } from "@/app/components/models/ModelSelect"
import { Select, SelectItem } from "@nextui-org/react"

export function ModelFilterDropdown({
  modelFilter,
  setModelFilter,
  disabled
}: {
  modelFilter: string
  setModelFilter: (v: string) => void
  disabled?: boolean
}) {
  return (
    <Select
      variant="faded"
      disabled={disabled}
      defaultSelectedKeys={[MODEL_PROVIDERS[0]]}
      value={modelFilter}
      onChange={e => {
        setModelFilter(e.target.value ?? MODEL_PROVIDERS[0])
      }}
      className="w-36"
    >
      {MODEL_PROVIDERS.map(filter => (
        <SelectItem value={filter} key={filter}>
          {filter}
        </SelectItem>
      ))}
    </Select>
  )
}
