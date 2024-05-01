"use client"

import { Box, Typography } from "@mui/joy"
import GameCard from "@/app/[locale]/(dashboard)/games/GameCard"
import * as React from "react"
import { useEffect, useState } from "react"
import { Tables } from "@/supabase/types"
import { supabase } from "@/app/lib/supabase/browser-client"
import ComingSoonPage from "@/app/components/ui/ComingSoonPage"

export default function GamesPage() {
  const [games, setGames] = useState([] as Tables<"games">[])

  useEffect(() => {
    const fetchGames = async () => {
      const { data } = await supabase.from("games").select("*")
      setGames(data ?? [])
    }
    fetchGames()
  })

  return <ComingSoonPage />

  return (
    <>
      <h1 className="self-start text-3xl font-bold leading-9 text-default-foreground">
        Games
      </h1>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          height: "100%",
          overflowY: "scroll",
          p: 3,
          gap: 2
        }}
      >
        {/* TODO: Game Banner Slideshow */}
        {/* TODO: Featured Games Section */}
        <Typography level="h3">Featured Games</Typography>
        {/* TODO: Game Categories Slider */}
        {/* Grid of Games */}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4
          }}
        >
          {games.map((game, index) => (
            <GameCard game={game} key={game.id} />
          ))}
        </Box>
      </Box>
    </>
  )
}
