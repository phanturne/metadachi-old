-- Source: https://github.com/mckaywrigley/chatbot-ui/tree/main/supabase/migrations

ALTER TABLE profiles ADD COLUMN groq_api_key TEXT CHECK (char_length(groq_api_key) <= 1000);