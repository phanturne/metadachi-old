const fs = require("fs")
const csvtojson = require("csvtojson")

async function fetchAwesomeChatGptPrompts(jsonFilePath) {
  const csvUrl =
    "https://raw.githubusercontent.com/f/awesome-chatgpt-prompts/main/prompts.csv"

  try {
    const csvData = await fetch(csvUrl).then(response => response.text())
    csvtojson()
      .fromString(csvData)
      .then(jsonArray => {
        // Replace "act" with "name" in each object
        const modifiedArray = jsonArray.map(({ act, prompt }) => ({
          name: act,
          content: prompt
        }))

        // Write the modified JSON array to file
        fs.writeFileSync(jsonFilePath, JSON.stringify(modifiedArray, null, 2))
      })
  } catch (error) {
    console.error("Error:", error.message)
  }
}

const jsonFilePath = `${__dirname}/awesome-chatgpt-prompts.json`
fetchAwesomeChatGptPrompts(jsonFilePath).then(() =>
  console.log("Saved prompts to awesome-chatgpt-prompts.json")
)
