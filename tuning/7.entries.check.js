import { writeFile }     from 'fs/promises'
import { createRequire } from 'node:module';
import OpenAI            from 'openai';

import dotenv from 'dotenv';

dotenv.config({path : '../.env'});

const FILE    = 'entries';
const require = createRequire(import.meta.url);
const openai  = new OpenAI();

const job = require(`./6.${ FILE }-tune.json`);

// Retrieve the state of a fine-tune
let fineTune = await openai.fineTuning.jobs.retrieve(job.fineTune.id);
console.log('status', fineTune.status);
console.log('estimated finish', fineTune.estimated_finish ?
  new Date(fineTune.estimated_finish * 1000) :
  0);
await writeFile(`./8.${FILE}-model.json`, JSON.stringify({fineTune}, null, 2), 'utf8');
