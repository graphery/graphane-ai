import filesystem        from "node:fs";
import { createRequire } from 'node:module';
import OpenAI            from "openai";

const openai  = new OpenAI();
const require = createRequire(import.meta.url);

const config = require('../setup/graphane-assistant.json');

const thread = await openai.beta.threads.create();
const threadId     = thread.id;

const fileStream = filesystem.createReadStream('./provincias.csv');

const file = await openai.files.create({
  file: fileStream,
  purpose: "assistants",
});

await openai.beta.threads.messages.create(
  threadId,
  {
    "role"    : "user",
    "content" : [
      {
        type : "text",
        text : `sugiéreme un gráfico de provincias con estos datos`
      },
    ],
    "attachments": [
      {
        file_id: file.id,
        tools: [{type: "code_interpreter"}]
      }
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
  console.log(messages.data[0].content[0].text.value);
} else {
  console.log('run.status', run.status);
}

