import { CreateItemModal } from "@/app/components/data-list/shared/CreateItemModal"
import { TextareaAutosize } from "@/app/components/ui/textarea-autosize"
import { MetadachiContext } from "@/app/lib/context"
import { TOOL_DESCRIPTION_MAX, TOOL_NAME_MAX } from "@/app/lib/db/limits"
import { TablesInsert } from "@/supabase/types"
import { FC, useContext, useState } from "react"
import { FormControl, FormLabel, Input, Switch, Textarea } from "@mui/joy"
import { LinkRounded, WebAssetRounded } from "@mui/icons-material"

interface CreateToolProps {
  isOpen: boolean
  onOpenChange: (isOpen: boolean) => void
}

export const CreateTool: FC<CreateToolProps> = ({ isOpen, onOpenChange }) => {
  const { profile, selectedWorkspace } = useContext(MetadachiContext)

  const [name, setName] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState("")
  const [url, setUrl] = useState("")
  const [customHeaders, setCustomHeaders] = useState("")
  const [schema, setSchema] = useState("")
  const [isRequestInBody, setIsRequestInBody] = useState(true)

  if (!profile || !selectedWorkspace) return null

  return (
    <CreateItemModal
      contentType="tools"
      createState={
        {
          user_id: profile.user_id,
          name,
          description,
          url,
          custom_headers: customHeaders,
          schema,
          request_in_body: isRequestInBody
        } as TablesInsert<"tools">
      }
      isOpen={isOpen}
      isTyping={isTyping}
      renderInputs={() => (
        <>
          <FormControl>
            <FormLabel>Name</FormLabel>

            <Input
              placeholder="Tool name..."
              value={name}
              onChange={e => setName(e.target.value)}
              slotProps={{ input: { maxLength: TOOL_NAME_MAX } }}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Description</FormLabel>

            <Input
              placeholder="Tool description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              slotProps={{ input: { maxLength: TOOL_DESCRIPTION_MAX } }}
            />
          </FormControl>

          {/* <div className="space-y-1">
            <Label>URL</Label>

            <Input
              placeholder="Tool url..."
              value={url}
              onChange={e => setUrl(e.target.value)}
            />
          </div> */}

          {/* <div className="space-y-3 pt-4 pb-3">
            <div className="space-x-2 flex items-center">
              <Checkbox />

              <Label>Web Browsing</Label>
            </div>

            <div className="space-x-2 flex items-center">
              <Checkbox />

              <Label>Image Generation</Label>
            </div>

            <div className="space-x-2 flex items-center">
              <Checkbox />

              <Label>Code Interpreter</Label>
            </div>
          </div> */}

          <FormControl>
            <FormLabel>Custom Headers</FormLabel>

            <TextareaAutosize
              placeholder={`{"X-api-key": "1234567890"}`}
              value={customHeaders}
              onValueChange={setCustomHeaders}
              minRows={1}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Schema</FormLabel>

            <Textarea
              placeholder={`{
                "openapi": "3.1.0",
                "info": {
                  "title": "Get weather data",
                  "description": "Retrieves current weather data for a location.",
                  "version": "v1.0.0"
                },
                "servers": [
                  {
                    "url": "https://weather.example.com"
                  }
                ],
                "paths": {
                  "/location": {
                    "get": {
                      "description": "Get temperature for a specific location",
                      "operationId": "GetCurrentWeather",
                      "parameters": [
                        {
                          "name": "location",
                          "in": "query",
                          "description": "The city and state to retrieve the weather for",
                          "required": true,
                          "schema": {
                            "type": "string"
                          }
                        }
                      ],
                      "deprecated": false
                    }
                  }
                },
                "components": {
                  "schemas": {}
                }
              }`}
              value={schema}
              onChange={e => setSchema(e.target.value)}
              maxRows={10}
            />
          </FormControl>

          <FormControl>
            <FormLabel>Request in...</FormLabel>

            <Switch
              startDecorator={
                <>
                  <WebAssetRounded />
                  Body
                </>
              }
              endDecorator={
                <>
                  <LinkRounded />
                  URL
                </>
              }
              checked={isRequestInBody}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setIsRequestInBody(event.target.checked)
              }
              sx={{ alignSelf: "flex-start" }}
            />
          </FormControl>
        </>
      )}
      onOpenChange={onOpenChange}
    />
  )
}
