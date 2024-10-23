import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Fastify           from 'fastify';
import fastifyStatic     from '@fastify/static';
import humor             from './humor.js';
import mini              from './graphane-assistant-mini.js';
import tuned             from './graphane-assistant-mini-tuned.js';
import medium            from './graphane-assistant-medium.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HOST      = process.env.HOST || 'localhost'
const PORT      = process.env.PORT || 8080;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';

const routes = [
  { // Get the assistant collection
    method  : 'GET',
    url     : `/assistants/`,
    handler : async (request, reply) => {
      reply.send({
        ok : true, result : [
          '/assistants/humor/',
          '/assistants/graphane-assistant-mini/',
          '/assistants/graphane-assistant-mini-tuned/',
          '/assistants/graphane-assistant-medium/'
        ]
      });
    }
  },
  { // Run the assistant
    method  : 'POST',
    url     : `/assistants/humor/`,
    handler : async (request, reply) => {
      try {
        const result = await humor(request.body.question);
        if (result) {
          reply.send({ok : true, result});
        } else {
          reply.code(400).send({ok : false});
        }
      } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ok : false});
      }
    }
  },
  { // Run the assistant
    method  : 'POST',
    url     : `/assistants/graphane-assistant-medium/`,
    handler : async (request, reply) => {
      try {
        const result = await medium(request.body.question);
        if (result) {
          reply.send({ok : true, result});
        } else {
          reply.code(400).send({ok : false});
        }
      } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ok : false});
      }
    }
  },
  { // Run the assistant
    method  : 'POST',
    url     : `/assistants/graphane-assistant-mini/`,
    handler : async (request, reply) => {
      try {
        const result = await mini(request.body.question);
        if (result) {
          reply.send({ok : true, result});
        } else {
          reply.code(400).send({ok : false});
        }
      } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ok : false});
      }
    }
  },
  { // Run the assistant
    method  : 'POST',
    url     : `/assistants/graphane-assistant-mini-tuned/`,
    handler : async (request, reply) => {
      try {
        const result = await tuned(request.body.question);
        if (result) {
          reply.send({ok : true, result});
        } else {
          reply.code(400).send({ok : false});
        }
      } catch (err) {
        request.log.error(err);
        return reply.code(500).send({ok : false});
      }
    }
  },
];

let app;

// Start the server
export async function start (port = PORT, host = HOST) {

  app = Fastify({
    logger : {level : LOG_LEVEL},
  });
  await app.register(fastifyStatic, {
    root : join(__dirname, '../client/')
  })

  // Load routes
  for (let route of routes) {
    app.route(route);
  }

  return app.listen({host, port});
}

// Stop the server
export function stop () {
  return app?.close();
}

export default {stop, start};
