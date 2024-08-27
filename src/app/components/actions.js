'use server';

import { streamText } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { createStreamableValue } from 'ai/rsc';
import { prompts, convertTemplateLiteralToString } from '../lib/prompstFile';
const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: 'strict',
});
const systemInstructions = convertTemplateLiteralToString(prompts.fitTrainer);

export async function continueConversation(history) {
  'use server';
  const stream = createStreamableValue();

  (async () => {
    const { textStream } = await streamText({
      model: openai('gpt-3.5-turbo'),
      stream: true,
      system: systemInstructions,
      //messages: convertToCoreMessages(messages),
    });

    for await (const text of textStream) {
      stream.update(text);
    }

    stream.done();
  })();

  return {
    messages: history,
    newMessage: stream.value,
  };
}
