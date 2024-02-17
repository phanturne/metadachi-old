import { ChatItem } from "./items/chat/chat-item"
import { PresetItem } from "./items/presets/preset-item"
import { PromptItem } from "./items/prompts/prompt-item"
import { FileItem } from "./items/files/file-item"
import { AssistantItem } from "./items/assistants/assistant-item"
import { ToolItem } from "./items/tools/tool-item"
import { ModelItem } from "./items/models/model-item"
import { Tables } from "@/supabase/types"
import { ContentType, DataItemType } from "@/app/lib/types"

export function DataListContent({
  contentType,
  item
}: {
  contentType: ContentType
  item: DataItemType
}) {
  switch (contentType) {
    case "chats":
      return <ChatItem key={item.id} chat={item as Tables<"chats">} />
    case "presets":
      return <PresetItem key={item.id} preset={item as Tables<"presets">} />
    case "prompts":
      return <PromptItem key={item.id} prompt={item as Tables<"prompts">} />
    case "files":
      return <FileItem key={item.id} file={item as Tables<"files">} />
    // case "collections":
    //   return (
    //     <CollectionItem
    //       key={item.id}
    //       collection={item as Tables<"collections">}
    //     />
    //   )
    case "assistants":
      return (
        <AssistantItem key={item.id} assistant={item as Tables<"assistants">} />
      )
    case "tools":
      return <ToolItem key={item.id} tool={item as Tables<"tools">} />
    case "models":
      return <ModelItem key={item.id} model={item as Tables<"models">} />
    default:
      return null
  }
}
