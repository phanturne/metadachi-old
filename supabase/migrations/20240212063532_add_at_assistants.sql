-- Source: https://github.com/mckaywrigley/chatbot-ui/tree/main/supabase/migrations

ALTER TABLE messages ADD COLUMN assistant_id UUID REFERENCES assistants(id) ON DELETE CASCADE DEFAULT NULL;