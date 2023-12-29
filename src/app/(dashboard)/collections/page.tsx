import { ChatList } from "@/components/ChatList";
import Divider from "@mui/joy/Divider";
import * as React from "react";
import { Box } from "@mui/joy";
import { dashboardPx } from "@/constants";

export default function CollectionsPage() {
  return (
    <Box
      sx={{
        px: {
          xs: dashboardPx.xs,
          lg: dashboardPx.lg,
        },
      }}
    >
      <p>Collections Page</p>
    </Box>
  );
}
