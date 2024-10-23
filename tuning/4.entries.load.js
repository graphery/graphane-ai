import fs            from 'fs';
import { writeFile } from 'fs/promises'
import OpenAI        from 'openai';
import dotenv        from 'dotenv';

dotenv.config({path : '../.env'});

const FILE   = 'entries';
const openai = new OpenAI();

// Create the file into OpenAI
const file = await openai.files.create({
  file    : fs.createReadStream(`./3.${ FILE }.jsonl`),
  purpose : 'fine-tune'
});
await writeFile(`./5.${ FILE }-file.json`, JSON.stringify({file}, null, 2), 'utf8');

// Create the fine tune model
const fineTune = await openai.fineTuning.jobs.create({
  training_file: file.id,
  model: 'gpt-4o-mini-2024-07-18'
});

// Save the file tune response
await writeFile(`./6.${FILE}-tune.json`, JSON.stringify({fineTune}, null, 2), 'utf8');
