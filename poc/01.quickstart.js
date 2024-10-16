// https://platform.openai.com/docs/overview
import OpenAI from "openai";

const openai     = new OpenAI();
const completion = await openai.chat.completions.create({
  model    : "gpt-4o-mini",
  messages : [
    {"role" : "user", "content" : "write a haiku about data visualization"}
  ]
});
console.log(completion.choices[0].message.content);
