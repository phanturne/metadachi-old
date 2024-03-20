import { Chip } from "@mui/joy"
import { AccessAlarmRounded } from "@mui/icons-material"

export default function ComingSoonChip() {
  return (
    <Chip
      size="sm"
      variant="solid"
      color="primary"
      startDecorator={<AccessAlarmRounded />}
    >
      Coming Soon
    </Chip>
  )
}
