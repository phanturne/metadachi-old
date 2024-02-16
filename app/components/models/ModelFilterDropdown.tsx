import { Option, Select } from "@mui/joy"
import React from "react"
import { MODEL_FILTER_LIST } from "@/app/components/models/ModelSelect"

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
      disabled={disabled}
      defaultValue={MODEL_FILTER_LIST[0]}
      value={modelFilter}
      onChange={(_, v) => {
        setModelFilter(v ?? MODEL_FILTER_LIST[0])
      }}
      onClick={e => e.stopPropagation()}
      sx={{ width: "150px" }}
    >
      {MODEL_FILTER_LIST.map(filter => (
        <Option value={filter} key={`model-filter-${filter}`}>
          {filter}
        </Option>
      ))}
    </Select>
  )
}
