import Image from "next/image"
import { LoginForm } from "@/app/components/forms/LoginForm"
import { SignUpForm } from "@/app/components/forms/SignUpForm"
import { Box } from "@mui/joy"
import { useState } from "react"
import { ResetPasswordForm } from "@/app/components/forms/ForgotPasswordForm"

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
