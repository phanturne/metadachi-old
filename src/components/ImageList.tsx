import { Box } from "@mui/joy";
import * as React from "react";
import Typography from "@mui/joy/Typography";

export default function ImageList() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Typography level="h1">No Images Found</Typography>
    </Box>
  );
}
