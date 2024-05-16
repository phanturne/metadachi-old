// Source: https://github.com/mckaywrigley/chatbot-ui/tree/main/.github

export const getSortedData = (
  data: any,
  dateCategory: "Today" | "Yesterday" | "Previous Week" | "Older"
) => {
  const now = new Date()
  const todayStart = new Date(now.setHours(0, 0, 0, 0))
  const yesterdayStart = new Date(new Date().setDate(todayStart.getDate() - 1))
  const oneWeekAgoStart = new Date(new Date().setDate(todayStart.getDate() - 7))

  return data
    .filter((item: any) => {
      const itemDate = new Date(item.updated_at || item.created_at)
      switch (dateCategory) {
        case "Today":
          return itemDate >= todayStart
        case "Yesterday":
          return itemDate >= yesterdayStart && itemDate < todayStart
        case "Previous Week":
          return itemDate >= oneWeekAgoStart && itemDate < yesterdayStart
        case "Older":
          return itemDate < oneWeekAgoStart
        default:
          return true
      }
    })
    .sort(
      (
        a: { updated_at: string; created_at: string },
        b: { updated_at: string; created_at: string }
      ) =>
        new Date(b.updated_at || b.created_at).getTime() -
        new Date(a.updated_at || a.created_at).getTime()
    )
}
