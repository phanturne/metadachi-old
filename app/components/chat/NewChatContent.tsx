import Image from "next/image"
import * as React from "react"

export const NewChatContent = () => {
  return (
    <div className="flex grow flex-col items-center justify-center">
      <Image src="/metadachi.svg" alt="Metadachi Icon" width={50} height={50} />
      <h2 className="mb-5 mt-2 text-lg">How may I help you today?</h2>
    </div>
  )
}
