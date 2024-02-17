import {
  Box,
  Button,
  DialogContent,
  FormControl,
  FormLabel,
  Modal,
  ModalDialog,
  Stack,
  Textarea,
  Typography
} from "@mui/joy"

interface PromptVariableModalProps {
  showPromptVariables: boolean
  setShowPromptVariables: (showPromptVariables: boolean) => void
  promptVariables: {
    promptId: string
    name: string
    value: string
  }[]
  setPromptVariables: (
    promptVariables: {
      promptId: string
      name: string
      value: string
    }[]
  ) => void
  handleSubmitPromptVariables: () => void
}

export function PromptVariableModal({
  showPromptVariables,
  setShowPromptVariables,
  promptVariables,
  setPromptVariables,
  handleSubmitPromptVariables
}: PromptVariableModalProps) {
  return (
    <Modal
      open={showPromptVariables}
      onClose={() => setShowPromptVariables(false)}
    >
      <ModalDialog sx={{ minWidth: "400px" }}>
        <DialogContent>
          <form onSubmit={handleSubmitPromptVariables}>
            <Stack spacing={2}>
              <Typography level="h3" sx={{ alignSelf: "center" }}>
                Enter Prompt Variables
              </Typography>

              {promptVariables.map((variable, index) => (
                <FormControl key={`prompt-var-${variable}`}>
                  <FormLabel>{variable.name}</FormLabel>
                  <Textarea
                    placeholder={`Enter a value for ${variable.name}...`}
                    value={variable.value}
                    onChange={e => {
                      const newPromptVariables = [...promptVariables]
                      newPromptVariables[index].value = e.target.value
                      setPromptVariables(newPromptVariables)
                    }}
                    minRows={1}
                    maxRows={5}
                  />
                </FormControl>
              ))}

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
                  onClick={() => setShowPromptVariables(false)}
                >
                  Cancel
                </Button>

                <Button onClick={handleSubmitPromptVariables}>Submit</Button>
              </Box>
            </Stack>
          </form>
        </DialogContent>
      </ModalDialog>
    </Modal>
  )
}
