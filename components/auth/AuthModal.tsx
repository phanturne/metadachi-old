import { useState } from "react"
import { Box, DialogContent, Modal, ModalDialog } from "@mui/joy"
import { LoginForm } from "@/components/auth/LoginForm"
import { SignupForm } from "@/components/auth/SignupForm"

export const enum AuthFormType {
  Login,
  SignUp,
  ResetPassword
}

export default function AuthModal({
  isAuthPage,
  onClose
}: {
  isAuthPage?: boolean
  onClose?: () => void
}) {
  const [authFormType, setAuthFormType] = useState<AuthFormType>(
    AuthFormType.Login
  )
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
          <Box
            sx={{
              display: "flex",
              flexDirection: "row",
              height: "auto"
            }}
          >
            <Box sx={{ p: 5 }}>
              {authFormType === AuthFormType.Login && (
                <LoginForm setAuthFormType={setAuthFormType} />
              )}
              {authFormType === AuthFormType.SignUp && (
                <SignupForm setAuthFormType={setAuthFormType} />
              )}
            </Box>
          </Box>
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}
