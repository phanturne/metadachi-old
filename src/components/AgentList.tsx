import * as React from "react";
import { Box, CardContent, CardOverflow, Grid, Link } from "@mui/joy";
import { useMaskStore } from "@/stores";
import Typography from "@mui/joy/Typography";
import { Mask } from "@/typing";
import Card from "@mui/joy/Card";
import IconButton from "@mui/joy/IconButton";
import {
  AccountCircleRounded,
  BookmarkAddRounded,
  BookmarkBorderRounded,
  EditRounded,
  FavoriteBorderRounded,
  MoreVertRounded,
} from "@mui/icons-material";
import Divider from "@mui/joy/Divider";
import Avatar from "@mui/joy/Avatar";

export default function AgentList({
  variant,
}: {
  variant: "collection" | "explore";
}) {
  const maskStore = useMaskStore();
  const agents = maskStore.getAll();

  function AgentCard({ a }: { a: Mask }) {
    return (
      // TODO: Make hover effect more visible
      <Card
        sx={{
          p: 1,
          pl: 2,
          borderRadius: 4,
          display: "flex",
          height: 150,
          "&:hover": {
            boxShadow: "md",
            borderColor: "neutral.outlinedHoverBorder",
          },
        }}
      >
        {/*Top row with title and menu buttons*/}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              gap: 1,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              overflow: "hidden",
            }}
          >
            <Avatar size="sm" sx={{ borderRadius: 10 }}>
              ✨
            </Avatar>
            <Typography
              level="title-md"
              noWrap
              sx={{ textOverflow: "ellipsis" }}
            >
              <Link
                overlay
                underline="none"
                component="button"
                onClick={() => {
                  // ...process something
                }}
                sx={{ color: "text.tertiary" }}
              >
                {a.name}
              </Link>
            </Typography>
          </Box>

          <Box
            sx={{
              flexShrink: 0,
              ml: 1,
            }}
          >
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

            <IconButton size="sm" disabled>
              <MoreVertRounded />
            </IconButton>
          </Box>
        </Box>

        {/*TODO: Customize scrollbar*/}
        <Box
          sx={{
            flex: 1,
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <Typography level="body-sm">Agent Description Placeholder</Typography>
        </Box>

        {/*Bottom row with prompt stats*/}
        <CardOverflow
          variant="soft"
          sx={{
            bgColor: "background.level1",
            ml: -2,
            overflow: "hidden",
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
          </CardContent>
        </CardOverflow>
      </Card>
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
      <Grid
        container
        spacing={{ xs: 2 }}
        columns={{ xs: 1, sm: 2, md: 3, lg: 4 }}
        sx={{ flexGrow: 1 }}
      >
        {agents.map((a) => (
          <Grid xs={1} key={`agent-${a.id}`}>
            <AgentCard a={a} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
