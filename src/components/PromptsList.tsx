import * as React from "react";
import { Box, Sheet } from "@mui/joy";
import { usePromptStore } from "@/stores";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import IconButton from "@mui/joy/IconButton";
import {
  AddRounded,
  DeleteRounded,
  EditRounded,
  ExpandMoreRounded,
} from "@mui/icons-material";

// TODO: Convert to an accordion list
export default function PromptsList({
  variant,
}: {
  variant: "collection" | "explore";
}) {
  const promptStore = usePromptStore();
  const prompts = promptStore.search("");

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100dvh",
        flexDirection: "column-reverse",
      }}
    >
      <List sx={{ flexGrow: 1 }}>
        {prompts.map((p) => (
          <Sheet
            key={`prompt-${p.id}`}
            variant="soft"
            sx={{
              p: 1,
              borderRadius: 4,
              mb: 1.5,
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton size="sm" disabled>
              <ExpandMoreRounded />
            </IconButton>

            <Box
              sx={{
                ml: 2,
                flex: 1,
                overflow: "none",
                textOverflow: "ellipsis",
                width: "50%",
              }}
            >
              <Typography
                level="title-md"
                noWrap
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {p.title}
              </Typography>
              <Typography
                level="body-md"
                noWrap
                sx={{
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                }}
              >
                {p.content}
              </Typography>
            </Box>
            <Box
              sx={{
                ml: 3,
              }}
            >
              {variant === "collection" && (
                <>
                  <IconButton size="sm" disabled>
                    <EditRounded />
                  </IconButton>
                  <IconButton size="sm" disabled>
                    <DeleteRounded />
                  </IconButton>
                </>
              )}

              {/*TODO: On the explore page, render check mark icon if the user has added the prompt already*/}
              {variant === "explore" && (
                <IconButton size="sm" disabled>
                  <AddRounded />
                </IconButton>
              )}
            </Box>
          </Sheet>
        ))}
      </List>
    </Box>
  );
}
