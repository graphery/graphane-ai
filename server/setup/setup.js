import fs                from 'node:fs/promises';
import { createRequire } from 'node:module';
import OpenAI            from "openai";
import dotenv from 'dotenv';

dotenv.config({path: '../.env'});

const require = createRequire(import.meta.url);
const openai  = new OpenAI();

export default async function setup (name) {

  const markdownFile = `./${ name }.md`;
  const jsonFile     = `./${ name }.json`;
  let assistantId;
  const instructions = (await fs.readFile(markdownFile, 'utf8')).toString();

  if (await fs.access(jsonFile).catch(err => void (0))) {

    const fileContent = require(jsonFile);
    assistantId       = fileContent.assistantId;
  }

  const config = {
    name,
    instructions,
    tools : [{type : "code_interpreter"}],
    model : "gpt-4o-mini"
  };
  const assistant = assistantId ?
    await openai.beta.assistants.update(assistantId, config) :
    await openai.beta.assistants.create(config);

  await fs.writeFile(jsonFile, JSON.stringify({assistant}, null, 2), 'utf8');
  console.log(name, '(assistant.id):', assistant.id);
}
