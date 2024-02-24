import { MetadachiContext } from "@/app/lib/context"
import { deleteChat } from "@/app/lib/db/chats"
import { Tables } from "@/supabase/types"
import React, { FC, useContext, useRef, useState } from "react"
import { useChatHandler } from "@/app/lib/hooks/use-chat-handler"
import {
  Box,
  DialogContent,
  DialogTitle,
  IconButton,
  Modal,
  ModalDialog,
  Stack
} from "@mui/joy"
import { DeleteRounded } from "@mui/icons-material"
import Button from "@mui/joy/Button"

interface DeleteChatProps {
  chat: Tables<"chats">
}

export const DeleteChat: FC<DeleteChatProps> = ({ chat }) => {
  // useHotkey("Backspace", () => setShowChatDialog(true))

  const { setChats } = useContext(MetadachiContext)
  const { handleNewChat } = useChatHandler()

  const [open, setOpen] = useState(false)

  const handleDeleteChat = async () => {
    await deleteChat(chat.id)

    setChats(prevState => prevState.filter(c => c.id !== chat.id))

    setOpen(false)

    handleNewChat()
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="sm"
        sx={{ "&:hover": { backgroundColor: "transparent" }, ml: -1 }}
      >
        <DeleteRounded />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: "450px", overflow: "scroll" }}>
          <DialogTitle>{`Delete "${chat.name}"`}</DialogTitle>
          <DialogContent>
            Are you sure you want to delete this chat?
          </DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              handleDeleteChat()
            }}
          >
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  flexGrow: 1,
                  justifyContent: "flex-end",
                  gap: 2
                }}
              >
                <Button
                  variant="plain"
                  color="neutral"
                  onClick={() => setOpen(false)}
                >
                  Cancel
                </Button>
                <Button color="danger" onClick={handleDeleteChat}>
                  Delete
                </Button>
              </Box>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}
