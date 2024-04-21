"use client"

import AuthForm from "@/app/components/forms/AuthForm"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"

export default function Login() {
  return <AuthForm type={AuthFormType.Login} />
}
