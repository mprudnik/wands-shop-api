import { generateModel } from './model.js';
import { listSchema, listHandler } from './list.js';
import { showSchema, showHandler } from './show.js'

export default async (fastify) => {
  if (!fastify.mongo.db) throw new Error('Mongo connection error');

  const Wand = generateModel(fastify.mongo.db);

  const injectedList = listHandler.bind(null, Wand);
  const injectedShow = showHandler.bind(null, Wand);

  fastify.route({
    method: 'GET',
    url: '/',
    schema: listSchema,
    handler: injectedList,
  })

  fastify.route({
    method: 'GET',
    url: '/:id',
    schema: showSchema,
    handler: injectedShow,
  })
}