// Source: https://ui.aceternity.com/components/tailwindcss-buttons

import React from "react"

export default function BorderMagicButton({
  onClick,
  text
}: {
  onClick: () => void
  text: string
}) {
  return (
    <button
      onClick={onClick}
      className="relative inline-flex overflow-hidden rounded-full p-px hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
    >
      <span className="absolute inset-[-1000%] animate-[spin_3s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
      <span className="inline-flex size-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-2 text-sm text-white backdrop-blur-3xl">
        {text}
      </span>
    </button>
  )
}
