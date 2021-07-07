import fastify from 'fastify';

import ajv from './src/services/ajv/index.js';
import mongo from './src/services/mongo/index.js';
import swagger from './src/services/swagger/index.js';

import setModelsValidation from './src/model-validation/index.js';

import api from './src/api/index.js';

const port = process.env.PORT || 8000;

const server = fastify({
  logger: {
    prettyPrint: {
      colorize: true,
      ignore: 'hostname',
      translateTime: true,
    },
  },
});

server.register(ajv);
server.register(mongo);
server.register(swagger);

server.register(api, { prefix: '/api' });

server.listen(port, port !== 8000 ? '0.0.0.0' : 'localhost', async () => {
  await setModelsValidation(server);
  server.log.info('Mongo validation set');
});
