import wands from './wand/index.js'

export default async (fastify) => {
  fastify.register(wands, { prefix: '/wands' });
}