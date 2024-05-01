import { MetadachiContext } from "@/app/lib/context"
import React, { FC, useContext, useState } from "react"
import { Checkbox, Slider, Tooltip } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

interface ChatRetrievalSettingsProps {}

export const FileRetrievalSettings: FC<ChatRetrievalSettingsProps> = ({}) => {
  const { sourceCount, setSourceCount, useRetrieval, setUseRetrieval } =
    useContext(MetadachiContext)
  const [sliderVal, setSliderVal] = useState(sourceCount)

  return (
    <>
      <p className="font-semibold">File Retrieval Settings</p>
      <div className="flex items-center space-x-1">
        <Checkbox
          size="sm"
          checked={useRetrieval}
          onChange={() => setUseRetrieval(!useRetrieval)}
        >
          Enable File Retrieval
        </Checkbox>
        <Tooltip
          content={
            useRetrieval
              ? "File retrieval is enabled on the selected files for this message."
              : "Select the checkbox to enable file retrieval for this message."
          }
        >
          <Icon icon="solar:question-circle-linear" className="text-base" />
        </Tooltip>
      </div>
      <Slider
        size="sm"
        label="Source Count"
        value={sliderVal}
        onChange={value => setSliderVal(value as number)}
        minValue={1}
        maxValue={10}
        step={1}
      />
    </>
  )
}
