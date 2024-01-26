const { resolve } = require("path")
require("dotenv").config({ path: resolve(__dirname, "../.env.local") })

const { createClient } = require("@supabase/supabase-js")
const fsp = require("fs/promises")

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

// Remove all built-in prompts
async function dropAllBuiltInPrompts() {
  const { data } = await supabase.auth.refreshSession()
  const id = data.user.id

  const { error } = await supabase.from("prompts").delete().eq("user_id", id)

  if (error) {
    console.error("Error dropping all prompts:", error.message)
  }
}

async function parseJson(path) {
  try {
    const content = await fsp.readFile(path)
    return JSON.parse(content)
  } catch (error) {
    console.error("Error reading prompts from JSON:", error.message)
    return []
  }
}

// Insert prompts to Supabase
async function insertPrompts(prompts) {
  const { data, error } = await supabase.auth.refreshSession()

  const successes = []
  const failures = []

  for (const prompt of prompts) {
    const { error } = await supabase.from("prompts").upsert([
      {
        ...prompt,
        user_id: data.user.id,
        sharing: "public",
        tags: ["built_in"]
      }
    ])

    if (error) {
      console.error("Error inserting prompt:", error.message)
      failures.push(prompt)
    } else {
      successes.push(prompt)
    }
  }

  return { successes, failures }
}

// Run the functions
;(async () => {
  // Log in as the default account
  const { error } = await supabase.auth.signInWithPassword({
    email: process.env.NEXT_PUBLIC_BUILT_IN_SUPABASE_ACCOUNT_EMAIL,
    password: process.env.NEXT_PUBLIC_BUILT_IN_SUPABASE_ACCOUNT_PASSWORD
  })

  if (error) {
    console.error("Error logging in:", error.message)
  }

  await dropAllBuiltInPrompts()

  const prompts = await parseJson(`${__dirname}/awesome-chatgpt-prompts.json`)
  const { successes, failures } = await insertPrompts(prompts)

  if (failures.length === 0) {
    console.log(
      `✔️All ${successes.length}/${prompts.length} prompts inserted successfully.`
    )
  } else {
    console.error(
      `❌ Failed to insert ${failures.length}/${prompts.length} prompts.`
    )
  }
})()
