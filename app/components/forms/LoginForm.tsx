import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase/browser-client"
import {
  AuthFormType,
  useAuthModal
} from "@/app/lib/providers/AuthContextProvider"
import { PasswordInput } from "@/app/components/input"
import { Routes } from "@/app/lib/constants"
import { toast } from "sonner"
import { Checkbox, Input, Button, Link, Divider } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

export function LoginForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const hasError = error != ""
  const router = useRouter()
  const { closeAuthModal } = useAuthModal()

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const { data, error } = await supabase.auth.signInWithPassword({
      email: formJson["email"] as string,
      password: formJson["password"] as string
    })

    // Show error message and return early if the login failed
    if (error) {
      setError(error.message)
      return
    }

    const { data: homeWorkspace, error: homeWorkspaceError } = await supabase
      .from("workspaces")
      .select("*")
      .eq("user_id", data.user.id)
      .eq("is_home", true)
      .single()

    if (!homeWorkspace) {
      throw new Error(
        homeWorkspaceError?.message || "An unexpected error occurred"
      )
    }

    // Handle successful login
    toast.success("Successfully logged in")
    closeAuthModal()

    // Refresh is required because routing to home won't work if the user is already on the home page
    router.push(Routes.Home)
    router.refresh()
  }

  return (
    <>
      <p className="pb-2 text-center text-2xl font-medium">Welcome back!</p>
      <form className="flex flex-col gap-3" onSubmit={handleLogin}>
        <Input
          isRequired
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
          isInvalid={hasError}
        />
        <PasswordInput
          variant="bordered"
          isInvalid={hasError}
          errorMessage={error}
        />
        <div className="flex items-center justify-between px-1 py-2">
          <Checkbox name="remember" size="sm">
            Remember me
          </Checkbox>
          <Link
            className="text-default-500"
            href="#"
            size="sm"
            onClick={() => setAuthFormType(AuthFormType.ForgotPassword)}
          >
            Forgot password?
          </Link>
        </div>
        <Button color="primary" type="submit">
          Log In
        </Button>
      </form>
      <div className="flex items-center gap-4 py-2">
        <Divider className="flex-1" />
        <p className="shrink-0 text-tiny text-default-500">OR</p>
        <Divider className="flex-1" />
      </div>
      <div className="flex flex-col gap-2">
        <Button
          startContent={<Icon icon="flat-color-icons:google" width={24} />}
          variant="bordered"
        >
          Continue with Google
        </Button>
        <Button
          startContent={
            <Icon className="text-default-500" icon="fe:github" width={24} />
          }
          variant="bordered"
        >
          Continue with Github
        </Button>
      </div>
      <p className="text-center text-small">
        New to Metadachi?&nbsp;
        <Link
          href="#"
          size="sm"
          onClick={() => setAuthFormType(AuthFormType.SignUp)}
        >
          Sign Up
        </Link>
      </p>
    </>
  )
}
