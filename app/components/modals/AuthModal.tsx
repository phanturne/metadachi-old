import { useState } from "react"
import { Modal, ModalBody, ModalContent, ModalHeader } from "@nextui-org/react"
import Image from "next/image"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"
import { LoginForm } from "@/app/components/forms/LoginForm"
import { ForgotPasswordForm } from "@/app/components/forms/ForgotPasswordForm"
import { ResetPasswordForm } from "@/app/components/forms/ResetPasswordForm"
import { SignUpForm } from "@/app/components/forms/SignUpForm"

export default function AuthModal({
  open,
  onClose,
  type
}: {
  open: boolean
  onClose: () => void
  type?: AuthFormType
}) {
  const [formType, setFormType] = useState<AuthFormType>(
    type ?? AuthFormType.Login
  )

  return (
    <Modal size="sm" isOpen={open} onOpenChange={onClose}>
      <ModalContent className="p-4">
        <ModalHeader className="justify-center">
          <Image
            src="/apple-touch-icon.png"
            alt="Metadachi Icon"
            width={50}
            height={50}
          />
        </ModalHeader>
        <ModalBody>
          {formType === AuthFormType.Login && (
            <LoginForm setAuthFormType={setFormType} />
          )}
          {formType === AuthFormType.SignUp && (
            <SignUpForm setAuthFormType={setFormType} />
          )}
          {formType === AuthFormType.ForgotPassword && (
            <ForgotPasswordForm setAuthFormType={setFormType} />
          )}
          {formType === AuthFormType.ResetPassword && <ResetPasswordForm />}
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
