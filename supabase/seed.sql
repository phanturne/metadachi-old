-- Drop all existing "default" personas (i.e. the user_id is null)
DELETE FROM Personas WHERE user_id IS NULL;

-- Insert default personas
INSERT INTO Personas (id, avatar, name, system_prompt, initial_message, description, tags, ai_model, model_config, public)
VALUES
(
  1,
  '<AVATAR_PLACEHOLDER>',
  'Metadachi',
  '<METADACHI_SYSTEM_PROMPT>',
  'Hi, I''m Metadachi.',
  '<DESCRIPTION PLACEHOLDER>',
  ARRAY['Default'],
  'accounts/fireworks/models/llama-v2-7b-chat',
  '{
      "temperature": 0.3,
      "max_tokens": 2000,
      "presence_penalty": 0,
      "frequency_penalty": 0,
      "sendMemory": true,
      "historyMessageCount": 4,
      "compressMessageLengthThreshold": 1000
  }',
  true
);