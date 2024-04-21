"use client"

import React from "react"
import { Button, Input, Checkbox, Link, Divider } from "@nextui-org/react"
import Image from "next/image"
import { Icon } from "@iconify-icon/react"
import { Routes } from "@/app/lib/constants"

export default function AuthLayout({
  children
}: {
  children: React.ReactNode
}) {
  const [isVisible, setIsVisible] = React.useState(false)

  const toggleVisibility = () => setIsVisible(!isVisible)

  return (
    <div
      className="flex h-screen w-screen items-center justify-end overflow-hidden rounded-small bg-content1 p-2 sm:p-4 lg:p-8"
      style={{
        backgroundImage:
          "url(https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/black-background-texture.jpeg)",
        backgroundSize: "cover",
        backgroundPosition: "center"
      }}
    >
      {/* Brand Logo */}
      <div className="absolute left-10 top-10">
        <Link href={Routes.Home} color="foreground">
          <Image
            src="/metadachi.svg"
            alt="Metadachi Icon"
            width={26}
            height={26}
          />
          <span className="ml-2 font-medium">Metadachi</span>
        </Link>
      </div>

      {/* Testimonial */}
      <div className="absolute bottom-10 left-10 hidden md:block">
        <p className="max-w-xl text-white/60">
          <span className="font-medium">“</span>
          Learn from the best, inspire the next. Share your AI discoveries and
          fuel collective growth.
          <span className="font-medium">”</span>
        </p>
      </div>

      {/* Login Form */}
      <div className="flex w-full max-w-sm flex-col gap-4 rounded-large bg-content1 px-8 pb-10 pt-6 shadow-small">
        {children}
      </div>
    </div>
  )
}
