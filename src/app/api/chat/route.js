import { createOpenAI } from '@ai-sdk/openai';
import { streamText, convertToCoreMessages } from 'ai';
import { prompts, convertTemplateLiteralToString } from '../../lib/prompstFile';
// Create an OpenAI API client
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});
const systemInstructions = convertTemplateLiteralToString(prompts.fitTrainer);
export async function POST(req) {
  // Extract the messages from the body of the request
  const { messages } = await req.json();
  const response = await streamText({
    model: openai('gpt-3.5-turbo'),
    stream: true,
    system: systemInstructions,
    messages: convertToCoreMessages(messages),
    max_tokens: 500,
    temperature: 0.7,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });
  // Respond with the stream
  return response.toDataStreamResponse();
}
