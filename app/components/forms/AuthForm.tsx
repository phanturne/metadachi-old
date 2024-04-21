import { useState } from "react"
import { ForgotPasswordForm } from "@/app/components/forms/ForgotPasswordForm"
import { ResetPasswordForm } from "@/app/components/forms/ResetPasswordForm"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"
import { LoginForm } from "@/app/components/forms/LoginForm"
import { SignUpForm } from "@/app/components/forms/SignUpForm"

export default function AuthForm({ type }: { type?: AuthFormType }) {
  const [formType, setFormType] = useState<AuthFormType>(
    type ?? AuthFormType.Login
  )

  return (
    <>
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
    </>
  )
}
