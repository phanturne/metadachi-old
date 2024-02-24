import { MetadachiContext } from "@/app/lib/context"
import { FC, useContext, useState } from "react"
import {
  Button,
  DialogTitle,
  IconButton,
  Modal,
  ModalDialog,
  Slider,
  Tooltip
} from "@mui/joy"
import { TuneRounded } from "@mui/icons-material"

interface ChatRetrievalSettingsProps {}

export const FileRetrievalSettings: FC<ChatRetrievalSettingsProps> = ({}) => {
  const { sourceCount, setSourceCount } = useContext(MetadachiContext)
  const [sliderVal, setSliderVal] = useState(sourceCount)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <Tooltip title="Adjust retrieval settings." variant="outlined">
        <IconButton size="sm" onClick={() => setIsOpen(true)}>
          <TuneRounded />
        </IconButton>
      </Tooltip>

      <Modal open={isOpen} onClose={close => console.log(close)}>
        <ModalDialog>
          <DialogTitle>{`Source Count: ${sliderVal}`}</DialogTitle>
          <form>
            <Slider
              value={sliderVal}
              onChange={(event, newValue) => {
                setSliderVal(newValue as number)
              }}
              min={1}
              max={10}
              step={1}
            />
          </form>

          <Button
            variant="outlined"
            size="sm"
            color="neutral"
            onClick={() => {
              setIsOpen(false)
              setSourceCount(sliderVal)
            }}
          >
            Save & Close
          </Button>
        </ModalDialog>
      </Modal>
    </>
  )
}
