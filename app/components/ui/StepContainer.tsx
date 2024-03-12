import Card from "@mui/joy/Card"
import CardActions from "@mui/joy/CardActions"
import CardContent from "@mui/joy/CardContent"
import Divider from "@mui/joy/Divider"
import Typography from "@mui/joy/Typography"
import Button from "@mui/joy/Button"

import { FC } from "react"
import { Box } from "@mui/joy"

interface StepContainerProps {
  stepCount: number
  stepDescription: string
  stepNum: number
  stepTitle: string
  onShouldProceed: (shouldProceed: boolean) => void
  children?: React.ReactNode
  showBackButton?: boolean
  showNextButton?: boolean
}

export const StepContainer: FC<StepContainerProps> = ({
  stepCount,
  stepDescription,
  stepNum,
  stepTitle,
  onShouldProceed,
  children,
  showBackButton = false,
  showNextButton = true
}) => {
  return (
    <Card
      variant="outlined"
      sx={{
        maxHeight: "100%",
        maxWidth: "100%",
        width: 500,
        mx: "auto",
        overflow: "scroll"
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between"
        }}
      >
        <Typography level="title-lg">{stepTitle}</Typography>
        <Typography level="title-sm">{`${stepNum} / ${stepCount}`}</Typography>
      </Box>
      <Typography>{stepDescription}</Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          gap: 1.5
        }}
      >
        {children}

        <CardActions
          sx={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          {showBackButton && (
            <Button
              color="neutral"
              variant="outlined"
              onClick={() => onShouldProceed(false)}
            >
              Back
            </Button>
          )}

          {showNextButton && (
            <Button onClick={() => onShouldProceed(true)}>Next</Button>
          )}
        </CardActions>
      </CardContent>
    </Card>
  )
}
