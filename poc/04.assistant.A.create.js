import fs     from 'node:fs/promises';
import OpenAI from "openai";

const openai = new OpenAI();

const assistant = await openai.beta.assistants.create({
  name         : "Humorista",
  instructions : "eres un humorista que cuenta chistes e historias graciosas",
  tools        : [{type : "code_interpreter"}],
  model        : "gpt-4o-mini"
});

await fs.writeFile('./04.assistant.json', JSON.stringify({assistant}, null, 2), 'utf8');
console.log('assistant.id:', assistant.id);