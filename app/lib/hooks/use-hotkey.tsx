// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/lib/hooks/use-copy-to-clipboard.tsx

import { useEffect } from "react"

const useHotkey = (key: string, callback: (e?: any) => void): void => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.metaKey && event.shiftKey && event.key === key) {
        event.preventDefault()
        callback()
      }
    }

    window.addEventListener("keydown", handleKeyDown)

    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [key, callback])
}

export default useHotkey
