import { NextRequest } from 'next/server';
import { Message as VercelChatMessage, StreamingTextResponse } from 'ai';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { PromptTemplate } from 'langchain/prompts';
import { ChatFireworks } from 'langchain/chat_models/fireworks';

export const runtime = 'edge';

/**
 * Basic memory formatter that stringifies and passes message history directly into the model.
 */
const formatMessage = (message: VercelChatMessage) => {
  return `${message.role}: ${message.content}`;
};

// https://js.langchain.com/docs/modules/model_io/prompts/prompt_templates/
const TEMPLATE = `
{system_prompt}
 
Current conversation:
{chat_history}
 
User: {input}
AI:
`;

/*
 * This handler initializes and calls a simple chain with a prompt,
 * chat model, and output parser. See the docs for more information:
 *
 * https://js.langchain.com/docs/guides/expression_language/cookbook#prompttemplate--llm--outputparser
 */
export async function POST(req: NextRequest) {
  const body = await req.json();
  const messages = body.messages ?? [];
  const formattedPreviousMessages = messages.slice(0, -1).map(formatMessage);
  const currentMessageContent = messages[messages.length - 1].content;
  const customChatConfig = body.customChatConfig ?? {};
  const systemPrompt = body.systemPrompt ?? '';

  const prompt = PromptTemplate.fromTemplate(TEMPLATE);

  // Model Config: https://js.langchain.com/docs/api/llms_fireworks/classes/Fireworks
  const model = new ChatFireworks({
    ...customChatConfig,
    maxTokens: 5,
    streaming: true,
  });

  /**
   * Chat models stream message chunks rather than bytes, so this
   * output parser handles serialization and encoding.
   */
  const outputParser = new BytesOutputParser();

  /*
   * Can also initialize as:
   *
   * import { RunnableSequence } from "langchain/schema/runnable";
   * const chain = RunnableSequence.from([prompt, model, outputParser]);
   */
  const chain = prompt.pipe(model).pipe(outputParser);

  const stream = await chain.stream({
    system_prompt: systemPrompt,
    chat_history: formattedPreviousMessages.join('\n'),
    input: currentMessageContent,
  });

  return new StreamingTextResponse(stream);
}
