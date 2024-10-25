import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import Fastify           from 'fastify';
import fastifyStatic     from '@fastify/static';
import fastifyCors       from '@fastify/cors';
import pino              from 'pino';
import humor             from './humor.js';
import mini              from './graphane-assistant-mini.js';
import tuned             from './graphane-assistant-mini-tuned.js';
import medium            from './graphane-assistant-medium.js';

const __dirname = dirname(fileURLToPath(import.meta.url));

const HOST      = process.env.HOST || 'localhost'
const PORT      = process.env.PORT || 8080;
const LOG_LEVEL = process.env.LOG_LEVEL || 'info';
const logger    = pino(pino.destination('./logs/log.jsonl'));
const endPoints = [
  '/assistants/humor/',
  '/assistants/graphane-assistant-mini/',
  '/assistants/graphane-assistant-mini-tuned/',
  '/assistants/graphane-assistant-medium/'
];

const routes = [
  { // Get the assistant collection
    method  : 'GET',
    url     : `/assistants/`,
    handler : async (request, reply) => {
      reply.send({
        ok : true, result : endPoints
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
        const result = await medium(request.body.question, request.body.threadId);
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
        const result = await mini(request.body);
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
        const result = await tuned(request.body.question, request.body.threadId);
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

  // Regular log
  app = Fastify({
    logger : {level : LOG_LEVEL},
  });

  // Static server
  await app.register(fastifyStatic, {
    root : join(__dirname, '../client/')
  });

  // Register CORS plugin
  await app.register(fastifyCors, {
    origin : '*'
  });

  // Load routes
  for (let route of routes) {
    app.route(route);
  }

  // Custom log
  app.addHook('onSend', async (request, reply, payload) => {
    if (endPoints.includes(request.url) && request.method === 'POST') {
      logger.info({
        url      : request.url,
        body     : request.body,
        response : JSON.parse(payload),
      });
    }

    // You must return the payload, or the response will not be sent.
    return payload;
  });

  return app.listen({host, port});
}

// Stop the server
export function stop () {
  return app?.close();
}

export default {stop, start};
