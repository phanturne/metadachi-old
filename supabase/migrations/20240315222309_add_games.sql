--------------- GAMES ---------------

-- TABLE --

CREATE TABLE IF NOT EXISTS games (
    -- ID
    id TEXT PRIMARY KEY NOT NULL,

    -- METADATA
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    -- REQUIRED
    name TEXT NOT NULL CHECK (char_length(name) <= 200),
    description TEXT NOT NULL CHECK (char_length(description) <= 500),

    -- STATS
    likes INT DEFAULT 0

);

-- INDEXES --


-- RLS --


-- TRIGGERS --

