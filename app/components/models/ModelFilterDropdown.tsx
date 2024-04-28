import React from "react"
import { MODEL_PROVIDERS } from "@/app/components/models/ModelSelect"
import { Select, SelectItem } from "@nextui-org/react"

export function ModelFilterDropdown({
  modelFilter,
  setModelFilter,
  isDisabled,
  className
}: {
  modelFilter: string
  setModelFilter: (v: string) => void
  isDisabled?: boolean
  className?: string
}) {
  return (
    <Select
      variant="faded"
      isDisabled={isDisabled}
      defaultSelectedKeys={[MODEL_PROVIDERS[0]]}
      value={modelFilter}
      onChange={e => {
        setModelFilter(e.target.value ?? MODEL_PROVIDERS[0])
      }}
      className={`w-36 ${className}`}
    >
      {MODEL_PROVIDERS.map(filter => (
        <SelectItem value={filter} key={filter}>
          {filter}
        </SelectItem>
      ))}
    </Select>
  )
}
