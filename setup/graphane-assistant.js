import filesystem        from "node:fs";
import fs                from "node:fs/promises";
import { createRequire } from 'node:module';
import OpenAI            from "openai";
import dotenv            from 'dotenv';

const name = 'graphane-assistant';

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
  tools       : [{type : "code_interpreter"}, {type : "file_search"}],
  model       : "gpt-4o-mini",
  temperature : 0.5,
  top_p       : 0.85,
};
const assistant = assistantId ?
  await openai.beta.assistants.update(assistantId, config) :
  await openai.beta.assistants.create(config);

const fileStreams = [
  './file_search/composer.md',
  './file_search/config.md',
  './file_search/data.md',
  './file_search/load.md',
  './file_search/methods.md',
  './file_search/plugin-shapes.md',
  './file_search/template.md'
].map((path) =>
  filesystem.createReadStream(path),
);

// Create a vector store including our files.
let vectorStore = await openai.beta.vectorStores.create({
  name : "Graphane documentation",
});

await openai.beta.vectorStores.fileBatches.uploadAndPoll(vectorStore.id, {files : fileStreams});

await openai.beta.assistants.update(assistant.id, {
  tool_resources : {file_search : {vector_store_ids : [vectorStore.id]}},
});

await fs.writeFile(jsonFile, JSON.stringify({assistant}, null, 2), 'utf8');
console.log(name, '(assistant.id):', assistant.id);

