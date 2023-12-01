const { resolve } = require('path');
require('dotenv').config({ path: resolve(__dirname, '../.env.local') });

const { createClient } = require('@supabase/supabase-js');
const fsp = require('fs/promises');
const fs = require('fs');

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Function to remove all existing bots
async function dropAllBots() {
  const { error } = await supabase.from('bots').delete().lte('id', 1000);

  if (error) {
    console.error('Error dropping all bots:', error.message);
  }
}

// Function to read the JSON file
async function readBotsFromJson() {
  try {
    const content = await fsp.readFile('supabase/bots.json', 'utf-8');
    return JSON.parse(content);
  } catch (error) {
    console.error('Error reading bots list from JSON:', error.message);
    return [];
  }
}

// Function to insert bots into Supabase
async function insertBots(bots) {
  const successes = [];
  const failures = [];

  for (const bot of bots) {
    const { error } = await supabase.from('bots').upsert([bot]);
    await uploadBotAvatar(bot.id);

    if (error) {
      console.error('Error inserting bot:', error.message);
      failures.push(bot);
    } else {
      successes.push(bot);
    }
  }

  return { successes, failures };
}

// Upload the bot avatar to a Supabase Bucket
async function uploadBotAvatar(botId) {
  try {
    // Get the file name (supports different file extensions)
    const fileName = fs
      .readdirSync('supabase/bot-avatars')
      .find((fn) => fn.startsWith(`${botId}.`));

    // Return early if the file does not exist
    if (!fileName) return;

    // Read the file data
    const data = await fsp.readFile(`supabase/bot-avatars/${fileName}`);

    // Upload the file to Supabase storage
    const { error: uploadError } = await supabase.storage
      .from('bot-avatars')
      .upload(fileName, data, {
        upsert: true,
      });

    if (uploadError) {
      console.error(
        'Error uploading bot avatar to Supabase:',
        uploadError.message
      );
    }
  } catch (err) {
    console.error('Error reading file:', err.message);
  }
}

// Run the functions
(async () => {
  await dropAllBots();

  const bots = await readBotsFromJson();
  const { successes, failures } = await insertBots(bots);

  if (failures.length === 0) {
    console.log(
      `✔️All ${successes.length}/${bots.length} bots inserted successfully.`
    );
  } else {
    console.error(
      `❌ Failed to insert ${failures.length}/${bots.length} bots.`
    );
  }
})();
