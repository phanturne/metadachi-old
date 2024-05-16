-- Source: https://github.com/mckaywrigley/chatbot-ui/tree/main/supabase/migrations

ALTER TABLE profiles
ADD COLUMN azure_openai_embeddings_id TEXT CHECK (char_length(azure_openai_embeddings_id) <= 1000);
