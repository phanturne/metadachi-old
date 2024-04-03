import { useTheme } from "next-themes"
import { Tab, Tabs } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

export default function ThemeToggleButton() {
  const { theme, setTheme } = useTheme()

  return (
    <Tabs
      variant="bordered"
      size="sm"
      radius="full"
      selectedKey={theme}
      onSelectionChange={key => setTheme(key as string)}
    >
      <Tab
        key="light"
        title={
          <div className="flex w-1 justify-center">
            <Icon
              icon="solar:sun-linear"
              className="text-base text-yellow-600"
            />
          </div>
        }
      />
      <Tab
        key="system"
        title={
          <div className="flex w-1 justify-center">
            <Icon icon="solar:monitor-linear" className="text-base" />
          </div>
        }
      />
      <Tab
        key="dark"
        title={
          <div className="flex w-1 justify-center">
            <Icon
              icon="solar:moon-linear"
              className="text-base text-blue-400"
            />
          </div>
        }
      />
    </Tabs>
  )
}
