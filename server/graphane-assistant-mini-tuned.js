import { createRequire } from 'node:module';
import OpenAI            from "openai";
import markdownIt        from 'markdown-it';

const openai  = new OpenAI();
const md      = markdownIt();
const require = createRequire(import.meta.url);

const config = require('../setup/graphane-assistant-mini-tuned.json');

export default async function query (text, threadId) {
  if (!threadId) {
    const thread = await openai.beta.threads.create();
    threadId = thread.id
  }

  await openai.beta.threads.messages.create(
    threadId,
    {
      "role"    : "user",
      "content" : [
        {
          type : "text",
          text
        },
      ]
    });

  let run = await openai.beta.threads.runs.createAndPoll(
    threadId,
    {
      assistant_id : config.assistant.id
    }
  );

  if (run.status === 'completed') {
    const messages   = await openai.beta.threads.messages.list(
      run.thread_id
    );
    const textResult = messages.data[0].content[0].text.value;
    return {
      html: md.render(textResult),
      markdown: textResult,
      threadId,
    };
  } else {
    console.log('run.status', run.status);
  }
}
