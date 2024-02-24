import Image from "next/image"
import { LoginForm } from "@/app/components/forms/LoginForm"
import { SignUpForm } from "@/app/components/forms/SignUpForm"
import { Box } from "@mui/joy"
import { useState } from "react"
import { ForgotPasswordForm } from "@/app/components/forms/ForgotPasswordForm"
import { ResetPasswordForm } from "@/app/components/forms/ResetPasswordForm"

export const enum AuthFormType {
  Login,
  SignUp,
  ForgotPassword,
  ResetPassword
}

export default function AuthForm({ type }: { type?: AuthFormType }) {
  const [formType, setFormType] = useState<AuthFormType>(
    type ?? AuthFormType.Login
  )

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: "auto",
        p: 5,
        gap: 2
      }}
    >
      <Image
        src="/apple-touch-icon.png"
        alt="Metadachi Icon"
        width={75}
        height={75}
      />
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
    </Box>
  )
}
