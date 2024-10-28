import fs     from 'node:fs/promises';
import OpenAI from "openai";
import config from "./04.assistant.json" with { type : 'json' };

const openai = new OpenAI();

console.log('assistant.id:', config.assistant.id);
console.log('thread.id:', config.thread.id);

let run = await openai.beta.threads.runs.createAndPoll(
  config.thread.id,
  {
    assistant_id: config.assistant.id,
    instructions: "cuéntame otro chiste sobre programadores"
  }
);

if (run.status === 'completed') {
  const messages = await openai.beta.threads.messages.list(
    run.thread_id
  );
  for (const message of messages.data.reverse()) {
    console.log('----------------------------------------------------');
    console.log(`${message.role} > ${message.content[0].text.value}`);
  }
  //   console.log(messages.data[0].content[0].text.value);
} else {
  console.log(run.status);
}