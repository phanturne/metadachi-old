"use client"

import AuthForm from "@/app/components/auth/AuthForm"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"

export default function Login() {
  return <AuthForm type={AuthFormType.Login} />
}
