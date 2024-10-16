// https://platform.openai.com/docs/guides/text-generation/building-prompts

import OpenAI from "openai";

const openai     = new OpenAI();
const completion = await openai.chat.completions.create({
  model    : "gpt-4o-mini",
  messages : [
    // Messages with the system role act as top-level instructions to the model, and typically
    // describe what the model is supposed to do and how it should generally behave and respond.
    {
      role    : "system",
      content : [
        {
          type : "text",
          text : "eres un humorista que cuenta chistes e historias graciosas"
        }
      ]
    },
    // User messages contain instructions that request a particular type of output from the model.
    // You can think of user messages as the messages you might type in to ChatGPT as an end user.
    {
      role    : "user",
      content : [
        {
          type : "text",
          text : "Cuéntame un chiste sobre programadores"
        }
      ]
    }
  ]
});
console.log(completion.choices[0].message.content);