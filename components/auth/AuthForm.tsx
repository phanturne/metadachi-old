import Image from "next/image"
import { LoginForm } from "@/components/auth/LoginForm"
import { SignUpForm } from "@/components/auth/SignUpForm"
import { Box } from "@mui/joy"
import { useState } from "react"
import { ResetPasswordForm } from "@/components/auth/ForgotPasswordForm"

export const enum AuthFormType {
  Login,
  SignUp,
  ResetPassword
}

export default function AuthForm() {
  const [formType, setFormType] = useState<AuthFormType>(AuthFormType.Login)

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
      {formType === AuthFormType.ResetPassword && (
        <ResetPasswordForm setAuthFormType={setFormType} />
      )}
    </Box>
  )
}
