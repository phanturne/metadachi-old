// Source: https://github.com/mckaywrigley/chatbot-ui/blob/main/lib/server/server-utils.ts

export function createResponse(data: object, status: number): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      "Content-Type": "application/json"
    }
  })
}
