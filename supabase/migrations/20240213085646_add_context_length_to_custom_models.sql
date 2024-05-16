-- Source: https://github.com/mckaywrigley/chatbot-ui/tree/main/supabase/migrations

ALTER TABLE models ADD COLUMN context_length INT NOT NULL DEFAULT 4096;