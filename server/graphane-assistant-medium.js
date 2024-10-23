import { createRequire } from 'node:module';
import OpenAI            from "openai";
import markdownIt        from 'markdown-it';

const openai  = new OpenAI();
const md      = markdownIt();
const require = createRequire(import.meta.url);

const config = require('../setup/graphane-assistant-medium.json');

export default async function query (text) {
  const thread = await openai.beta.threads.create();

  await openai.beta.threads.messages.create(
    thread.id,
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
    thread.id,
    {
      assistant_id : config.assistant.id
    }
  );

  if (run.status === 'completed') {
    const messages   = await openai.beta.threads.messages.list(
      run.thread_id
    );
    const textResult = messages.data[0].content[0].text.value;
    return md.render(textResult);
  } else {
    console.log('run.status', run.status);
  }
}
