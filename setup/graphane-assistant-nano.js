import fs                from "node:fs/promises";
import { createRequire } from 'node:module';
import OpenAI            from "openai";
import dotenv            from 'dotenv';

const name = 'graphane-assistant-nano';

dotenv.config({path : '../.env'});
const openai  = new OpenAI();
const require = createRequire(import.meta.url);

const markdownFile = `./${ name }.md`;
const jsonFile     = `./${ name }.json`;
let assistantId;
const instructions = (await fs.readFile(markdownFile, 'utf8')).toString();
try {
  const fileContent = require(jsonFile);
  assistantId       = fileContent.assistant.id;
} catch (err) {
  void (0);
}

const config    = {
  name,
  instructions,
  tools : [{type : "code_interpreter"}, {type : "file_search"}],
  model : "gpt-4o-mini"
};
const assistant = assistantId ?
  await openai.beta.assistants.update(assistantId, config) :
  await openai.beta.assistants.create(config);

await fs.writeFile(jsonFile, JSON.stringify({assistant}, null, 2), 'utf8');
console.log(name, '(assistant.id):', assistant.id);

