import { writeFile }     from "node:fs/promises";
import { createRequire } from 'node:module';

const FILE    = 'entries';
const require = createRequire(import.meta.url);

// get instructions
const assistant    = require('../setup/graphane-assistant-mini.json');
const instructions = assistant.assistant.instructions;

// get entries
const entries = require(`./1.${ FILE }.json`);

// transform entries to fine-tuning
const fineTuning = entries
  .filter(entry => !entry.private)
  .map(entry => ({
    messages : [
      {role : 'system', content : instructions},
      {role : 'user', content : `create a ${ entry.title } ${ entry.description }`},
      {role : 'assistant', content : `This is the ${ entry.title }\n \`\`\`html\n ${ entry.code }\n\`\`\`\n`}
    ]
  }));

// create the JSONL file
const jsonl = fineTuning.map(entry => (JSON.stringify(entry))).join('\n');
await writeFile(`./3.${ FILE }.jsonl`, jsonl, 'utf8');
