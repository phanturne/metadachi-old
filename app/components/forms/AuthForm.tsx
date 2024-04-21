import Image from "next/image"
import { useState } from "react"
import { ForgotPasswordForm } from "@/app/components/forms/ForgotPasswordForm"
import { ResetPasswordForm } from "@/app/components/forms/ResetPasswordForm"
import { Button, Input, Link, Checkbox } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"
import { PasswordInput } from "@/app/components/input"
import Divider from "@mui/joy/Divider"
import { AuthFormType } from "@/app/lib/providers/AuthContextProvider"

export default function AuthForm({ type }: { type?: AuthFormType }) {
  const [formType, setFormType] = useState<AuthFormType>(
    type ?? AuthFormType.Login
  )

  return (
    // <Box
    //   sx={{
    //     display: "flex",
    //     flexDirection: "column",
    //     alignItems: "center",
    //     height: "auto",
    //     p: 5,
    //     gap: 2
    //   }}
    // >
    //   <Image
    //     src="/apple-touch-icon.png"
    //     alt="Metadachi Icon"
    //     width={75}
    //     height={75}
    //   />
    //   {formType === AuthFormType.Login && (
    //     <LoginForm setAuthFormType={setFormType} />
    //   )}
    //   {formType === AuthFormType.SignUp && (
    //     <SignUpForm setAuthFormType={setFormType} />
    //   )}
    //   {formType === AuthFormType.ForgotPassword && (
    //     <ForgotPasswordForm setAuthFormType={setFormType} />
    //   )}
    //   {formType === AuthFormType.ResetPassword && <ResetPasswordForm />}
    // </Box>
    <>
      <p className="pb-2 text-center text-2xl font-medium">Welcome back!</p>
      <form className="flex flex-col gap-3" onSubmit={e => e.preventDefault()}>
        <Input
          label="Email Address"
          name="email"
          placeholder="Enter your email"
          type="email"
          variant="bordered"
        />
        <PasswordInput variant="bordered" />
        <div className="flex items-center justify-between px-1 py-2">
          <Checkbox name="remember" size="sm">
            Remember me
          </Checkbox>
          <Link className="text-default-500" href="#" size="sm">
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
        <Link href="#" size="sm">
          Sign Up
        </Link>
      </p>
    </>
  )
}
