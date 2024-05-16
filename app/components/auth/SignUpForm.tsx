// Source: https://github.com/mckaywrigley/chatbot-ui/blob/d60e1f3ee9d2caf8c9aab659791b841690183b2d/app/%5Blocale%5D/login/page.tsx#L145

import React, { FormEvent, useState } from "react"
import { useRouter } from "next/navigation"
import { supabase } from "@/app/lib/supabase/browser-client"
import {
  AuthFormType,
  useAuthModal
} from "@/app/lib/providers/AuthContextProvider"
import { Routes } from "@/app/lib/constants"
import { PasswordInput } from "@/app/components/input"
import { get } from "@vercel/edge-config"
import { EMAIL_VERIFICATION, ROOT_URL } from "@/app/lib/config"
import { Button, Divider, Input, Link } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { toast } from "sonner"

export function SignUpForm({
  setAuthFormType
}: {
  setAuthFormType: React.Dispatch<React.SetStateAction<AuthFormType>>
}) {
  const [error, setError] = useState<string>("")
  const hasError = error != ""
  const { closeAuthModal } = useAuthModal()
  const router = useRouter()

  const getEnvVarOrEdgeConfigValue = async (name: string) => {
    // "use server"
    if (process.env.EDGE_CONFIG) {
      return await get<string>(name)
    }

    return process.env[name]
  }

  async function handleSignup(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const formJson = Object.fromEntries(formData.entries())

    const email = formJson["email"] as string
    const password = formJson["password"] as string

    const emailDomainWhitelistPatternsString = await getEnvVarOrEdgeConfigValue(
      "EMAIL_DOMAIN_WHITELIST"
    )
    const emailDomainWhitelist = emailDomainWhitelistPatternsString?.trim()
      ? emailDomainWhitelistPatternsString?.split(",")
      : []
    const emailWhitelistPatternsString =
      await getEnvVarOrEdgeConfigValue("EMAIL_WHITELIST")
    const emailWhitelist = emailWhitelistPatternsString?.trim()
      ? emailWhitelistPatternsString?.split(",")
      : []

    // If there are whitelist patterns, check if the email is allowed to sign up
    if (emailDomainWhitelist.length > 0 || emailWhitelist.length > 0) {
      const domainMatch = emailDomainWhitelist?.includes(email.split("@")[1])
      const emailMatch = emailWhitelist?.includes(email)
      if (!domainMatch && !emailMatch) {
        return setError(`Email is not from a whitelisted domain.`)
      }
    }

    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options: {
        emailRedirectTo: `${ROOT_URL}/${Routes.Setup}`
      }
    })

    // Show error message and return early if the signup failed
    if (error) {
      setError(error.message)
      return
    }

    // Handle successful signup
    closeAuthModal()
    setAuthFormType(AuthFormType.Login)

    if (!EMAIL_VERIFICATION) {
      // Temporary workaround: Reload to set the access/refresh token properly
      window.location.reload()
      router.push(Routes.Setup)
    } else {
      toast.success("Check inbox to verify email address")
      router.push(Routes.Login)
    }
  }

  return (
    <>
      <p className="pb-2 text-center text-2xl font-medium">Join Metadachi!</p>
      <form className="flex flex-col gap-3" onSubmit={handleSignup}>
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
        {/*<Checkbox isRequired className="py-4" size="sm">*/}
        {/*  I agree with the&nbsp;*/}
        {/*  <Link href="#" size="sm">*/}
        {/*    Terms*/}
        {/*  </Link>*/}
        {/*  &nbsp; and&nbsp;*/}
        {/*  <Link href="#" size="sm">*/}
        {/*    Privacy Policy*/}
        {/*  </Link>*/}
        {/*</Checkbox>*/}
        <Button color="primary" type="submit">
          Sign Up
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
        Already have an account?&nbsp;
        <Link
          href=""
          size="sm"
          onClick={() => setAuthFormType(AuthFormType.Login)}
        >
          Log In
        </Link>
      </p>
    </>
  )
}
