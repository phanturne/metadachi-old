import { useState } from "react"
import { DialogContent, Modal, ModalDialog } from "@mui/joy"
import AuthForm from "@/app/components/forms/AuthForm"

export default function AuthModal({
  isAuthPage,
  onClose
}: {
  isAuthPage?: boolean
  onClose?: () => void
}) {
  const [open, setOpen] = useState<boolean>(true)

  return (
    <Modal
      open={open}
      disableEscapeKeyDown={isAuthPage}
      onClose={() => {
        setOpen(false)
        onClose?.()
      }}
    >
      <ModalDialog layout={isAuthPage ? "fullscreen" : "center"} sx={{ p: 0 }}>
        <DialogContent>
          <AuthForm />
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}
