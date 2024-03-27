--------------- HEART'S SYMPHONY ---------------

-- TABLE --

CREATE TABLE IF NOT EXISTS hearts_symphony (
    -- ID
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),

    -- REQUIRED RELATIONSHIPS
    owner_id UUID NOT NULL REFERENCES auth.users(id),
    player_ids UUID[] DEFAULT '{}',

    -- METADATA
    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ,

    -- SHARING
    sharing TEXT NOT NULL DEFAULT 'private',

    -- GAME CONFIG
    difficulty TEXT DEFAULT 'Normal',
    modifiers TEXT[] DEFAULT '{}',
    character_id UUID NOT NULL REFERENCES characters(id),
    num_players INT DEFAULT 2,
    turn_time INT,

    -- GAME STATE
    active_player_ids UUID[] DEFAULT '{}',
    state TEXT CHECK (state IN ('Created', 'In Progress', 'Completed')),
    winners UUID[] DEFAULT '{}',
    friendship_levels INT8[],
    user_turn UUID CHECK (user_turn = ANY(player_ids)),
    is_bot_turn BOOLEAN DEFAULT FALSE
);

-- INDEXES --

-- RLS --

ALTER TABLE hearts_symphony ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow users to create a game with their own user_id"
    ON hearts_symphony
    FOR INSERT
    WITH CHECK (owner_id = auth.uid());

CREATE POLICY "Allow players of the match to view the game"
    ON hearts_symphony
    FOR SELECT
    USING (auth.uid() = ANY(player_ids));

CREATE POLICY "Allow players of the match to update the game"
    ON hearts_symphony
    FOR UPDATE
    USING (auth.uid() = ANY(player_ids));

CREATE POLICY "Allow view access to non-private games"
    ON hearts_symphony
    FOR SELECT
    USING (sharing <> 'private');

-- FUNCTIONS --

-- TRIGGERS --
