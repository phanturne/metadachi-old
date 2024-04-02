import { Button } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

export default function ChatActions() {
  return (
    <div className="flex justify-between gap-2">
      <Button
        size="sm"
        className="grow"
        startContent={
          <Icon icon="solar:pen-new-square-linear" className="text-base" />
        }
      >
        New Chat
      </Button>
      <Button
        size="sm"
        variant="flat"
        className="grow"
        startContent={
          <Icon icon="solar:square-share-line-linear" className="text-base" />
        }
      >
        Share
      </Button>
    </div>
  )
}
