// "use client"
//
// import * as React from "react"
// import Card from "@mui/joy/Card"
// import Typography from "@mui/joy/Typography"
// import { Box, CardContent, CardCover } from "@mui/joy"
// import { Tables } from "@/supabase/types"
// import { useRouter } from "next/navigation"
// import { Routes } from "@/app/lib/constants"
//
// export default function GameCard({ game }: { game: Tables<"games"> }) {
//   const router = useRouter()
//
//   return (
//     <Card
//       sx={{ height: "240px", width: 320, cursor: "pointer" }}
//       onClick={() => router.push(`${Routes.Games}/${game.id}`)}
//     >
//       <CardCover>
//         <img src={`/games/${game.id}.jpg`} loading="lazy" alt="" />
//       </CardCover>
//
//       <CardCover
//         sx={{
//           background:
//             "linear-gradient(to top, rgba(0,0,0,0.4), rgba(0,0,0,0) 100px), " +
//             "linear-gradient(to top, rgba(0,0,0,0.8), rgba(0,0,0,0) 200px)"
//         }}
//       />
//
//       <CardContent sx={{ justifyContent: "flex-end" }}>
//         <Box sx={{ display: "flex", gap: 2 }}>
//           {/* TODO: Game Stats */}
//           {/*<Typography level="title-sm" startDecorator={<PlayArrowRounded />}>*/}
//           {/*  40.1k*/}
//           {/*</Typography>*/}
//           {/*<Typography level="title-sm" startDecorator={<FavoriteRounded />}>*/}
//           {/*  2,200*/}
//           {/*</Typography>*/}
//         </Box>
//         <Typography level="title-lg">{game.name}</Typography>
//       </CardContent>
//     </Card>
//   )
// }
