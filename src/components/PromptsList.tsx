import * as React from "react";
import { Box, Button, CardContent, CardOverflow, Grid, Sheet } from "@mui/joy";
import { usePromptStore } from "@/stores";
import Typography from "@mui/joy/Typography";
import List from "@mui/joy/List";
import IconButton from "@mui/joy/IconButton";
import {
  AccountCircleRounded,
  AddRounded,
  BookmarkAddRounded,
  BookmarkBorderRounded,
  ContentCopyRounded,
  DeleteRounded,
  EditRounded,
  EmojiEventsRounded,
  FavoriteBorderRounded,
  MoreVertRounded,
  VisibilityRounded,
} from "@mui/icons-material";
import { Prompt } from "@/typing";
import Card from "@mui/joy/Card";
import Divider from "@mui/joy/Divider";

// TODO: Convert to an accordion list
export default function PromptsList({
  variant,
}: {
  variant: "collection" | "explore";
}) {
  const promptStore = usePromptStore();
  const prompts = promptStore.search("");

  function ExpandedMenu() {
    return (
      <>
        {/*<IconButton size="sm" disabled>*/}
        {/*  <OpenWithRounded />*/}
        {/*</IconButton>*/}
      </>
    );
  }

  function ListView() {
    return (
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
            {variant === "explore" && (
              <IconButton size="sm" disabled>
                <AddRounded />
              </IconButton>
            )}

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

              {variant === "explore" && (
                <>
                  <IconButton size="sm" disabled>
                    <VisibilityRounded />
                  </IconButton>
                  <IconButton size="sm" disabled>
                    <ContentCopyRounded />
                  </IconButton>
                </>
              )}
            </Box>
          </Sheet>
        ))}
      </List>
    );
  }

  function PromptCard({ p }: { p: Prompt }) {
    return (
      <Card
        key={`prompt-${p.id}`}
        sx={{
          p: 1,
          pl: 2,
          borderRadius: 4,
          display: "flex",
          height: 225,
        }}
      >
        {/*Top row with title and menu buttons*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography level="title-md" noWrap>
            {p.title}
          </Typography>

          <Box sx={{ flexShrink: 0, ml: 1 }}>
            <IconButton size="sm" disabled>
              <ContentCopyRounded />
            </IconButton>

            {/*TODO: On the explore page, render check mark icon if the user has added the prompt already*/}
            {variant === "explore" && (
              <IconButton size="sm" disabled>
                <BookmarkAddRounded />
              </IconButton>
            )}

            {variant === "collection" && (
              <IconButton size="sm" disabled>
                <EditRounded />
              </IconButton>
            )}

            {variant === "collection" && (
              <IconButton size="sm" disabled>
                <EditRounded />
              </IconButton>
            )}

            <IconButton size="sm" disabled>
              <MoreVertRounded />
            </IconButton>
          </Box>
        </Box>

        {/*TODO: Customize scrollbar*/}
        <Box
          sx={{
            flex: 1,
            overflow: "scroll",
            overflowX: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography level="body-sm">{p.content}</Typography>
        </Box>

        {/*Bottom row with prompt stats*/}
        <CardOverflow
          variant="soft"
          sx={{
            bgColor: "background.level1",
            ml: -2,
          }}
        >
          <Divider inset="context" />
          <CardContent
            orientation="horizontal"
            sx={{ alignItems: "center", p: 0 }}
          >
            <IconButton size="md" disabled sx={{ mr: -1 }}>
              <AccountCircleRounded />
            </IconButton>
            <Typography level="body-xs">Name</Typography>
            <Divider orientation="vertical" sx={{ my: 1, ml: 1 }} />
            <IconButton size="sm" disabled sx={{ mr: -1 }}>
              <FavoriteBorderRounded />
            </IconButton>
            <Typography level="body-xs">100</Typography>

            <IconButton size="sm" disabled sx={{ mr: -1 }}>
              <BookmarkBorderRounded />
            </IconButton>
            <Typography level="body-xs">50</Typography>

            <Button
              variant="plain"
              color="neutral"
              size="sm"
              disabled
              startDecorator={<EmojiEventsRounded />}
            >
              <Typography level="body-xs">Kudos</Typography>
            </Button>
          </CardContent>
        </CardOverflow>
      </Card>
    );
  }
  function GalleryView() {
    return (
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 1, sm: 2, md: 3 }}
        sx={{ flexGrow: 1 }}
      >
        {prompts.map((p) => (
          <Grid xs={1} key={`prompt-${p.id}`}>
            <PromptCard p={p} />
          </Grid>
        ))}
      </Grid>
    );
  }

  return (
    <Box
      sx={{
        flexGrow: 1,
        height: "100dvh",
        flexDirection: "column-reverse",
      }}
    >
      {/*<ListView />*/}
      <GalleryView />
    </Box>
  );
}
