import { useTheme } from "next-themes"
import { Tab, Tabs } from "@nextui-org/react"
import { Icon } from "@iconify-icon/react"

export default function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()

  return (
    <Tabs
      variant="bordered"
      size="sm"
      radius="full"
      selectedKey={theme}
      onSelectionChange={key => setTheme(key as string)}
      classNames={{
        tabList: "p-0.5 gap-1",
        tab: "h-6 w-6"
      }}
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
            <Icon icon="solar:monitor-linear" className="h-4 text-base" />
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
