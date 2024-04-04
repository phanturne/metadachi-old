// Source: https://ui.aceternity.com/components/background-beams

import { BackgroundBeams } from "@/app/components/ui/BackgroundBeams"
import React from "react"

export default function ComingSoonPage() {
  return (
    <div className="relative flex size-full flex-col items-center justify-center rounded-md bg-neutral-950 antialiased">
      <div className="mx-auto max-w-2xl gap-2">
        <h1 className="relative z-10 bg-gradient-to-b from-neutral-200 to-neutral-600 bg-clip-text pb-2 text-center font-sans text-4xl font-bold text-transparent md:text-7xl">
          Coming Soon
        </h1>
        <p className="relative z-10 mx-auto my-2 max-w-lg text-center text-neutral-500">
          We&apos;re busy brewing up something magical behind the scenes! Get
          ready to be amazed when it launches soon. In the meantime, explore our
          other awesome stuff to keep you entertained!
        </p>
      </div>
      <BackgroundBeams />
    </div>
  )
}
