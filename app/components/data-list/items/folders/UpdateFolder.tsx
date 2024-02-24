import { MetadachiContext } from "@/app/lib/context"
import { updateFolder } from "@/app/lib/db/folders"
import { Tables } from "@/supabase/types"
import React, { FC, useContext, useState } from "react"
import { EditRounded } from "@mui/icons-material"
import {
  Box,
  DialogTitle,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  Modal,
  ModalDialog,
  Stack
} from "@mui/joy"
import Button from "@mui/joy/Button"

interface UpdateFolderProps {
  folder: Tables<"folders">
}

export const UpdateFolder: FC<UpdateFolderProps> = ({ folder }) => {
  const { setFolders } = useContext(MetadachiContext)

  const [open, setOpen] = useState(false)
  const [name, setName] = useState(folder.name)

  const handleUpdateFolder = async () => {
    console.log("update")
    const updatedFolder = await updateFolder(folder.id, {
      name
    })
    setFolders(prevState =>
      prevState.map(c => (c.id === folder.id ? updatedFolder : c))
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
        <ModalDialog sx={{ midWidth: "450px", overflow: "scroll" }}>
          <DialogTitle>{`Edit Folder`}</DialogTitle>
          <Stack spacing={2}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input value={name} onChange={e => setName(e.target.value)} />
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
              <Button onClick={handleUpdateFolder}>Update</Button>
            </Box>
          </Stack>
        </ModalDialog>
      </Modal>
    </>
  )
}
