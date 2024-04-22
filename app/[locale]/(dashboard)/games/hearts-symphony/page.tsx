"use client"

import {
  AspectRatio,
  Box,
  Button,
  Radio,
  RadioGroup,
  Typography
} from "@mui/joy"
import * as React from "react"
import { useState } from "react"
import Sheet from "@mui/joy/Sheet"
import { FULL_WIDTH_PADDING_X } from "@/app/lib/constants"
import Divider from "@mui/joy/Divider"
import ComingSoonChip from "@/app/components/ui/Chips"

const difficultyOptions = ["Easy", "Normal", "Hard"]
const numPlayersOptions = Array.from({ length: 4 }, (_, i) => i + 1)
const timerOptions = ["N/A"]
const modifierOptions = ["N/A"]

export default function HeartsSymphonyGamePage() {
  const [difficulty, setDifficulty] = useState("Normal")
  const [timer, setTimer] = useState("N/A")
  const [numPlayers, setNumPlayers] = useState(2)
  const [modifiers, setModifiers] = useState("N/A")

  return (
    <>
      <h1 className="self-start text-3xl font-bold leading-9 text-default-foreground">
        {"Heart's Symphony"}
      </h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          mt: 2,
          px: FULL_WIDTH_PADDING_X,
          gap: 2
        }}
      >
        {/* Banner Image */}
        <AspectRatio
          variant="outlined"
          ratio="4/1"
          sx={{ borderRadius: "md", width: "100%" }}
        >
          <img
            src={`/games/hearts-symphony.jpg`}
            loading="lazy"
            alt="Heart's Symphony Banner"
          />
        </AspectRatio>

        <Box sx={{ display: "flex", gap: 8 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 3,
              maxWidth: 250
            }}
          >
            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography level="title-lg">Difficulty</Typography>
              <RadioGroup
                aria-labelledby="game-difficulty"
                defaultValue={difficulty}
                sx={{ gap: 2, flexDirection: "row" }}
                onChange={e => setDifficulty(e.target.value)}
              >
                {difficultyOptions.map(value => (
                  <Sheet
                    key={value}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: "md",
                      boxShadow: "sm"
                    }}
                  >
                    <Radio
                      label={value}
                      overlay
                      disableIcon
                      value={value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary"
                          }
                        }),
                        action: ({ checked }) => ({
                          sx: theme => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500]
                              }
                            })
                          })
                        })
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography level="title-lg">Players</Typography>
              <RadioGroup
                aria-labelledby="2"
                defaultValue={numPlayers}
                sx={{ gap: 2, flexDirection: "row", flexWrap: "wrap" }}
                onChange={e => setNumPlayers(Number(e.target.value))}
              >
                {numPlayersOptions.map(value => (
                  <Sheet
                    key={value}
                    sx={{
                      px: 2,
                      py: 1,
                      borderRadius: "md",
                      boxShadow: "sm"
                    }}
                  >
                    <Radio
                      label={value}
                      overlay
                      disableIcon
                      value={value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary"
                          }
                        }),
                        action: ({ checked }) => ({
                          sx: theme => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500]
                              }
                            })
                          })
                        })
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography level="title-lg" endDecorator={<ComingSoonChip />}>
                Timer
              </Typography>
              <RadioGroup
                aria-labelledby="timer"
                defaultValue={timer}
                sx={{ gap: 2, flexDirection: "row" }}
                onChange={e => setTimer(e.target.value)}
              >
                {timerOptions.map(value => (
                  <Sheet
                    key={value}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: "md",
                      boxShadow: "sm"
                    }}
                  >
                    <Radio
                      label={value}
                      overlay
                      disableIcon
                      value={value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary"
                          }
                        }),
                        action: ({ checked }) => ({
                          sx: theme => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500]
                              }
                            })
                          })
                        })
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            </Box>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
              <Typography level="title-lg" endDecorator={<ComingSoonChip />}>
                Modifiers
              </Typography>
              <RadioGroup
                aria-labelledby="modifiers"
                defaultValue={modifiers}
                sx={{ gap: 2, flexDirection: "row" }}
                onChange={e => setModifiers(e.target.value)}
              >
                {modifierOptions.map(value => (
                  <Sheet
                    key={value}
                    sx={{
                      px: 1.5,
                      py: 1,
                      borderRadius: "md",
                      boxShadow: "sm"
                    }}
                  >
                    <Radio
                      label={value}
                      overlay
                      disableIcon
                      value={value}
                      slotProps={{
                        label: ({ checked }) => ({
                          sx: {
                            fontWeight: "lg",
                            fontSize: "md",
                            color: checked ? "text.primary" : "text.secondary"
                          }
                        }),
                        action: ({ checked }) => ({
                          sx: theme => ({
                            ...(checked && {
                              "--variant-borderWidth": "2px",
                              "&&": {
                                // && to increase the specificity to win the base :hover styles
                                borderColor: theme.vars.palette.primary[500]
                              }
                            })
                          })
                        })
                      }}
                    />
                  </Sheet>
                ))}
              </RadioGroup>
            </Box>

            <Divider />
            <Button color="success" disabled>
              Create Game
            </Button>
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              flexGrow: 2
            }}
          >
            <Typography level="title-lg">Characters</Typography>
          </Box>
        </Box>
      </Box>
    </>
  )
}
