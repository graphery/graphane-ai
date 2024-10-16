import fs     from 'node:fs/promises';
import OpenAI from "openai";
import config from "./04.assistant.json" with { type : 'json' };

const openai = new OpenAI();

console.log('assistant.id:', config.assistant.id);

const thread = await openai.beta.threads.create();

await openai.beta.threads.messages.create(
  thread.id,
  {
    "role"    : "assistant",
    "content" : [
      {
        type : "text",
        text : "Hay 10 tipos de personas en este mundo. Los que entienden binario y los que no."
      },
      {
        type : 'text',
        text : 'Lo mejor de Boolean es que incluso si te equivocas, solo te equivocas un poco.'
      },
      {
        type : 'text',
        text : 'Un hijo le preguntó a su padre (un programador) por qué el sol sale por el este y se pone por el oeste. ¿Su respuesta? ¡Funciona, no lo toques!'
      },
      {
        type : 'text',
        text : '¿Qué es un algoritmo? Una palabra que usan los programadores cuando no quieren explicar lo que hicieron.'
      },
      {
        type : 'text',
        text : 'Si la depuración es el proceso de eliminar errores, entonces la programación debe ser el proceso de colocarlos.'
      },
      {
        type : 'text',
        text : '¿La mejor manera de depurar un código? Borra el código 😅'
      },
      {
        type : 'text',
        text : '¿Cuál es la forma orientada a objetos para volverse rico? Herencia 🤣'
      },
      {
        type : 'text',
        text : 'El programador se quedó atascado en la ducha debido a las instrucciones del estado del champú: hacer espuma, enjuagar, repetir'
      },
      {
        type : 'text',
        text : '¿Qué le dijo el código Java al código C? No tienes clase. 😅'
      }
    ]
  }
);

await fs.writeFile('./04.assistant.json', JSON.stringify({...config, thread}, null, 2), 'utf8');
console.log('thread.id:', thread.id);