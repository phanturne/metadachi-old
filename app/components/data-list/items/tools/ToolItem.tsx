import { TOOL_DESCRIPTION_MAX, TOOL_NAME_MAX } from "@/app/lib/db/limits"
import { Tables } from "@/supabase/types"
import { FC, useState } from "react"
import { DataListItem } from "@/app/components/data-list/shared/DataListItem"
import { FormControl, FormLabel, Input, Textarea, Typography } from "@mui/joy"
import { BuildRounded } from "@mui/icons-material"
import { DATA_LIST_ITEM_ICON_STYLE } from "@/app/lib/constants"
import { validateOpenAPI } from "@/app/lib/utils/openapi-conversion"

interface ToolItemProps {
  tool: Tables<"tools">
}

export const ToolItem: FC<ToolItemProps> = ({ tool }) => {
  const [name, setName] = useState(tool.name)
  const [isTyping, setIsTyping] = useState(false)
  const [description, setDescription] = useState(tool.description)
  const [url, setUrl] = useState(tool.url)
  const [customHeaders, setCustomHeaders] = useState(
    tool.custom_headers as string
  )
  const [schema, setSchema] = useState(tool.schema as string)
  const [schemaError, setSchemaError] = useState("")

  return (
    <DataListItem
      item={tool}
      isTyping={isTyping}
      contentType="tools"
      icon={<BuildRounded sx={DATA_LIST_ITEM_ICON_STYLE} />}
      updateState={{
        name,
        description,
        url,
        custom_headers: customHeaders,
        schema
      }}
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

            <Textarea
              placeholder={`{"X-api-key": "1234567890"}`}
              value={customHeaders}
              onChange={e => setCustomHeaders(e.target.value)}
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
              onChange={e => {
                const value = e.target.value

                setSchema(value)

                try {
                  const parsedSchema = JSON.parse(value)
                  validateOpenAPI(parsedSchema)
                    .then(() => setSchemaError("")) // Clear error if validation is successful
                    .catch(error => setSchemaError(error.message)) // Set specific validation error message
                } catch (error) {
                  setSchemaError("Invalid JSON format") // Set error for invalid JSON format
                }
              }}
              maxRows={10}
            />
          </FormControl>

          <Typography color="danger">{schemaError}</Typography>
        </>
      )}
    />
  )
}
