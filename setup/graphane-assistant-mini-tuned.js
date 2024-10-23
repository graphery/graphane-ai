import fs                from "node:fs/promises";
import { createRequire } from 'node:module';
import OpenAI            from "openai";
import dotenv            from 'dotenv';

const name = 'graphane-assistant-mini-tuned';
dotenv.config({path : '../.env'});
const openai  = new OpenAI();
const require = createRequire(import.meta.url);

const model         = require('../tuning/8.entries-model.json');
const markdownFile = `./graphane-assistant-mini.md`;
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
  tools : [{type : "code_interpreter"}],
  model : model.fineTune.fine_tuned_model
};
const assistant = assistantId ?
  await openai.beta.assistants.update(assistantId, config) :
  await openai.beta.assistants.create(config);

await fs.writeFile(jsonFile, JSON.stringify({assistant}, null, 2), 'utf8');
console.log(name, '(assistant.id):', assistant.id);

