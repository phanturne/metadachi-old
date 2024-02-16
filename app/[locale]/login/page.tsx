"use client"

import { Alert, Box } from "@mui/joy"
import AuthForm from "@/app/components/forms/AuthForm"

export default function Login({
  searchParams
}: {
  searchParams: { message: string; variant: "success" | "danger" }
}) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        height: "100%"
      }}
    >
      {searchParams?.message && (
        <Alert
          color={searchParams?.variant ?? undefined}
          variant="soft"
          sx={{ textAlign: "center" }}
        >
          {searchParams.message}
        </Alert>
      )}
      <AuthForm />
    </Box>
  )
}
