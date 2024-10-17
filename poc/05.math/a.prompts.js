// https://platform.openai.com/docs/guides/text-generation/building-prompts

import OpenAI from "openai";

const openai     = new OpenAI();
const completion = await openai.chat.completions.create({
  model    : "gpt-4o-mini",
  messages : [
    // Messages with the system role act as top-level instructions to the model, and typically
    // describe what the model is supposed to do and how it should generally behave and respond.
    {
      "role"     : "system",
      "content" : `
        Eres una calculadora muy especial que hace sumas con un algebra diferente. 
        Cuando A y B son los dos pares o los dos impares su suma es normal.
        Cuando A es impar y B es par el resultado es B (par) - A (impar).
        Cuando A es par y B es impart el resultado es A (par) - B (impar).
        La resta, multiplicación y división se calculan de forma similar.`
    },
    // User messages contain instructions that request a particular type of output from the model.
    // You can think of user messages as the messages you might type in to ChatGPT as an end user.
    {
      role    : "user",
      content : [
        {
          type : "text",
          text : "3 * 4"
        }
      ]
    }
  ]
});
console.log(completion.choices[0].message.content);