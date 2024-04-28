"use client"

import { Icon } from "@iconify-icon/react"
import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Card,
  CardBody,
  CardHeader
} from "@nextui-org/react"
import React, { useContext, useState } from "react"
import { MetadachiContext } from "@/app/lib/context"
import { ModelSelect } from "@/app/components/models/ModelSelect"
import FileSelect from "@/app/components/files/FileSelect"

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
  const { selectedChat } = useContext(MetadachiContext)

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
    <Card className="p-1 py-2" key={selectedChat?.id}>
      {/* Dropdown button height > H4 height. Set 38px height to prevent CardHeader height increase. */}
      <CardHeader className="flex h-[38px] justify-between">
        <h4 className="text-small font-semibold leading-none text-default-600">
          Chat Settings
        </h4>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onClick={onChatSettingsDropdownClick}
          radius="full"
        >
          {isChatSettingsOpen ? (
            <Icon icon="solar:alt-arrow-down-linear" className="text-base" />
          ) : (
            <Icon icon="solar:alt-arrow-left-linear" className="text-base" />
          )}
        </Button>
      </CardHeader>

      {isChatSettingsOpen && (
        // TODO: add logic for disabling some of the settings
        <CardBody className="flex gap-2 pt-1 text-small font-semibold leading-none text-default-500">
          {/* TODO: Model Select is not taking effect*/}
          <ModelSelect
            label=""
            selectedModelId={selectedChat?.model}
            onSelectModel={() => {}}
          />
          <Autocomplete
            label="Assistants"
            placeholder="Select assistants"
            defaultItems={animals}
          >
            {item => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>

          <FileSelect label="" />

          <Autocomplete
            label="Files & Collections"
            placeholder="Select files & collections"
            defaultItems={animals}
          >
            {item => (
              <AutocompleteItem key={item.value}>{item.label}</AutocompleteItem>
            )}
          </Autocomplete>
          <Autocomplete
            label="Tools"
            placeholder="Select tools"
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
