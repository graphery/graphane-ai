// https://platform.openai.com/docs/guides/text-generation/building-prompts

import OpenAI     from "openai";
import markdownIt from 'markdown-it';

const openai = new OpenAI();
const md     = markdownIt();


export default async function query (text) {
  const completion = await openai.chat.completions.create({
    model    : "gpt-4o-mini",
    messages : [
      {
        role    : "system",
        content : [
          {
            type : "text",
            text : "eres un humorista que cuenta chistes e historias graciosas"
          }
        ]
      },
      {
        role    : "user",
        content : [
          {
            type : "text",
            text : text
          }
        ]
      }
    ]
  });
  return md.render(completion?.choices[0]?.message?.content);
}
