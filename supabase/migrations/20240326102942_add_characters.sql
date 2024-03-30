--------------- CHARACTERS ---------------

-- TABLE --

CREATE TABLE IF NOT EXISTS characters (
    -- ID
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- REQUIRED RELATIONSHIPS
    user_id UUID NOT NULL REFERENCES auth.users(id),

    -- METADATA
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,

    -- SHARING
    sharing TEXT NOT NULL DEFAULT 'public',

    -- REQUIRED
    name TEXT NOT NULL CHECK (char_length(name) <= 100),
    prompt TEXT NOT NULL,
    available_games TEXT[] DEFAULT ARRAY[]::TEXT[],

    -- OPTIONAL
    description TEXT NOT NULL CHECK (char_length(description) <= 1000),
    personality TEXT NOT NULL CHECK (char_length(personality) <= 1000),
    image_path TEXT CHECK (char_length(image_path) <= 1000), -- file path in assistant_images bucket

    -- STATS
    likes INT DEFAULT 0
);

-- INDEXES --

-- RLS --

ALTER TABLE characters ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow full access to own characters"
    ON characters
    USING (user_id = auth.uid())
    WITH CHECK (user_id = auth.uid());

CREATE POLICY "Allow view access to non-private characters"
    ON characters
    FOR SELECT
    USING (sharing <> 'private');

-- TODO: CREATE POLICY "Allow view access to characters that the user has played a match with"

-- FUNCTIONS --

-- TRIGGERS --
