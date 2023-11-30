-------------------------------- PROFILES TABLE --------------------------------

---------------------------------- BOTS TABLE ----------------------------------
DROP TABLE IF EXISTS Bots CASCADE;
CREATE TABLE Bots (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY(START WITH 1000) PRIMARY KEY,
  avatar TEXT NOT NULL,
  name TEXT NOT NULL,
  alias TEXT NOT NULL,
  system_prompt TEXT,
  initial_message TEXT,
  description TEXT,
  tags TEXT[],
  ai_model TEXT NOT NULL,
  model_config JSONB NOT NULL,
  user_id UUID DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  public BOOLEAN DEFAULT FALSE,
  UNIQUE(name, system_prompt, initial_message, ai_model, model_config, user_id)
);

-- Row level security
ALTER TABLE Bots ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can select their own and public bots" on Bots;
CREATE POLICY "Everyone can select their own and public bots" ON Bots
FOR SELECT USING (public = TRUE OR (SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert their own bots" on Bots;
CREATE POLICY "Authenticated users can insert their own bots" ON Bots
FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can update their own bots" on Bots;
CREATE POLICY "Authenticated users can update their own bots" ON Bots
FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can delete their own bots" on Bots;
CREATE POLICY "Authenticated users can delete their own bots" ON Bots
FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE Bots;

-------------------------------- PROMPTS TABLE ---------------------------------

------------------------------- USER_STATS TABLE -------------------------------

--------------------------------- CHATS TABLE ----------------------------------
DROP TABLE IF EXISTS Chats CASCADE;
CREATE TABLE Chats (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT now(),
  chat_name TEXT NOT NULL,
  persona_id BIGINT REFERENCES Bots ON DELETE CASCADE NOT NULL,
  public BOOLEAN DEFAULT FALSE,
  user_id UUID DEFAULT auth.uid()
);

-- Row level security
ALTER TABLE Chats ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can select their own and public chats" on Chats;
CREATE POLICY "Everyone can select their own and public chats" ON Chats
FOR SELECT USING (public = TRUE OR (SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can insert their own chats" on Chats;
CREATE POLICY "Authenticated users can insert their own chats" ON Chats
FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can update their own chats" on Chats;
CREATE POLICY "Authenticated users can update their own chats" ON Chats
FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can delete their own chats" on Chats;
CREATE POLICY "Authenticated users can delete their own chats" ON Chats
FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE Chats;

-------------------------------- MESSAGES TABLE --------------------------------
DROP TABLE IF EXISTS Messages CASCADE;
CREATE TABLE Messages (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE DEFAULT auth.uid(),
  chat_id UUID NOT NULL REFERENCES Chats(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  content TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('assistant', 'user', 'system', 'function'))
);

-- Row level security
ALTER TABLE Messages ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Everyone can select messages in their chats" on Messages;
CREATE POLICY "Everyone can select messages in their chats"
ON messages FOR SELECT
USING (
  EXISTS (
    SELECT 1
    FROM chats
    WHERE
      chats.id = messages.chat_id AND
      (SELECT(auth.uid()) = chats.user_id OR chats.public = TRUE)
  )
);

DROP POLICY IF EXISTS "Authenticated users can insert their own messages" on Messages;
CREATE POLICY "Authenticated users can insert their own messages" ON Messages
FOR INSERT TO authenticated WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can update their own messages" on Messages;
CREATE POLICY "Authenticated users can update their own messages" ON Messages
FOR UPDATE TO authenticated USING ((SELECT auth.uid()) = user_id) WITH CHECK ((SELECT auth.uid()) = user_id);

DROP POLICY IF EXISTS "Authenticated users can delete their own messages" on Messages;
CREATE POLICY "Authenticated users can delete their own messages" ON Messages
FOR DELETE TO authenticated USING ((SELECT auth.uid()) = user_id);

------------------------------ USER CONFIG TABLE -------------------------------

------------------------------ MODEL CONFIG TABLE ------------------------------

------------------------------- API CONFIG TABLE -------------------------------

------------------------------ USER AVATARS BUCKET ------------------------------
INSERT INTO storage.buckets (id, name)
VALUES ('user-avatars', 'user-avatars')
ON CONFLICT (id) DO NOTHING;

-- TODO: Set up access controls for user avatars

------------------------------ BOT AVATARS BUCKET -------------------------------
INSERT INTO storage.buckets (id, name)
VALUES ('bot-avatars', 'bot-avatars')
ON CONFLICT (id) DO NOTHING;

-- TODO: Set up access controls for bot avatars

----------------------------------- TRIGGERS -----------------------------------
