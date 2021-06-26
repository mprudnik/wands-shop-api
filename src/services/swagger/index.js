import fp from 'fastify-plugin';
import fs from 'fastify-swagger';

const options = {
  routePrefix: '/docs',
  exposeRoute: true,
  openapi: {
    info: {
      title: 'Wands shop API',
      description: 'API docs for Wands shop project',
      version: '1.0.0',
    },
    externalDocs: {
      url: 'https://swagger.io',
      description: 'Find more info here',
    },
    servers: [{ url: 'http://localhost:8000' }],
  },
};

export default fp(async (fastify) => {
  fastify.register(fs, options);
});
