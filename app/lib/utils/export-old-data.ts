// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/lib/export-old-data.ts

export function exportLocalStorageAsJSON() {
  const data: { [key: string]: string | null } = {}
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i)
    if (key !== null) {
      data[key] = localStorage.getItem(key)
    }
  }

  const json = JSON.stringify(data)
  const blob = new Blob([json], { type: "application/json" })
  const url = URL.createObjectURL(blob)

  const a = document.createElement("a")
  a.href = url
  a.download = "metadachi-data.json"
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
