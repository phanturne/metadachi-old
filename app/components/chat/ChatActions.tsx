import { Button } from "@nextui-org/react"
import { Icon } from "@iconify/react"

export default function ChatActions() {
  return (
    <div className="flex justify-between gap-2">
      <Button
        size="sm"
        className="grow"
        startContent={
          <Icon icon="solar:pen-new-square-linear" fontSize="16px" />
        }
      >
        New Chat
      </Button>
      <Button
        size="sm"
        variant="flat"
        className="grow"
        startContent={
          <Icon icon="solar:square-share-line-linear" fontSize="16px" />
        }
      >
        Share
      </Button>
    </div>
  )
}
