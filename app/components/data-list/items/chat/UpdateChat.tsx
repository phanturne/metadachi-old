import { Input } from "@/app/components/ui/input"
import { MetadachiContext } from "@/app/lib/context"
import { updateChat } from "@/app/lib/db/chats"
import { Tables } from "@/supabase/types"
import React, { FC, useContext, useRef, useState } from "react"
import {
  Box,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Modal,
  ModalDialog,
  Stack
} from "@mui/joy"
import { EditRounded } from "@mui/icons-material"
import Button from "@mui/joy/Button"

interface UpdateChatProps {
  chat: Tables<"chats">
}

export const UpdateChat: FC<UpdateChatProps> = ({ chat }) => {
  const { setChats } = useContext(MetadachiContext)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(chat.name)

  const handleUpdateChat = async () => {
    const updatedChat = await updateChat(chat.id, {
      name
    })
    setChats(prevState =>
      prevState.map(c => (c.id === chat.id ? updatedChat : c))
    )

    setOpen(false)
  }

  return (
    <>
      <IconButton
        onClick={() => setOpen(true)}
        size="sm"
        sx={{ "&:hover": { backgroundColor: "transparent" } }}
      >
        <EditRounded />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog sx={{ minWidth: "450px" }}>
          <DialogTitle>{`Edit chats`}</DialogTitle>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault()
              handleUpdateChat()
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Input
                  required
                  placeholder="Chat name..."
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </FormControl>
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
                <Button onClick={handleUpdateChat}>Save</Button>
              </Box>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </>
  )
}
