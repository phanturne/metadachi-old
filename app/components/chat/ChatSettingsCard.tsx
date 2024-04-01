"use client"

import { Icon } from "@iconify/react"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader
} from "@nextui-org/react"
import { useState } from "react"

export const animals = [
  {
    label: "Cat",
    value: "cat",
    description: "The second most popular pet in the world"
  },
  {
    label: "Dog",
    value: "dog",
    description: "The most popular pet in the world"
  },
  {
    label: "Elephant",
    value: "elephant",
    description: "The largest land animal"
  },
  { label: "Lion", value: "lion", description: "The king of the jungle" },
  { label: "Tiger", value: "tiger", description: "The largest cat species" },
  {
    label: "Giraffe",
    value: "giraffe",
    description: "The tallest land animal"
  },
  {
    label: "Dolphin",
    value: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals"
  },
  {
    label: "Penguin",
    value: "penguin",
    description: "A group of aquatic flightless birds"
  },
  {
    label: "Zebra",
    value: "zebra",
    description: "A several species of African equids"
  },
  {
    label: "Shark",
    value: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton"
  },
  {
    label: "Whale",
    value: "whale",
    description: "Diverse group of fully aquatic placental marine mammals"
  },
  {
    label: "Otter",
    value: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae"
  },
  {
    label: "Crocodile",
    value: "crocodile",
    description: "A large semiaquatic reptile"
  }
]

export default function ChatSettingsCard() {
  const [isChatSettingsOpen, setIsChatSettingsOpen] = useState(() => {
    const localStorageVal = localStorage.getItem("isChatSettingsOpen")
    return localStorageVal === "true"
  })

  const onChatSettingsDropdownClick = () => {
    const newValue = !isChatSettingsOpen
    setIsChatSettingsOpen(newValue)
    localStorage.setItem("isChatSettingsOpen", String(newValue))
  }

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <h4 className="text-small font-semibold leading-none text-default-600">
          Chat Settings
        </h4>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={onChatSettingsDropdownClick}
        >
          {isChatSettingsOpen ? (
            <Icon icon="solar:alt-arrow-down-linear" fontSize="16px" />
          ) : (
            <Icon icon="solar:alt-arrow-left-linear" fontSize="16px" />
          )}
        </Button>
      </CardHeader>

      {isChatSettingsOpen && (
        <CardBody className="flex gap-2 pt-0 text-small font-semibold leading-none text-default-500">
          <Autocomplete
            size="sm"
            label="Model"
            placeholder="Search a model"
            defaultItems={animals}
          >
            {item => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            size="sm"
            label="Assistants"
            placeholder="Search a model"
            defaultItems={animals}
          >
            {item => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            size="sm"
            label="Files"
            placeholder="Search a model"
            defaultItems={animals}
          >
            {item => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            size="sm"
            label="Tools"
            placeholder="Search a model"
            defaultItems={animals}
          >
            {item => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Button size="sm" variant="flat">
            Advanced Settings
          </Button>
        </CardBody>
      )}
    </Card>
  )
}
