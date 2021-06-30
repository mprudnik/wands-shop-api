import fp from 'fastify-plugin';
import fm from 'fastify-mongodb';

export default fp(async (fastify) => {
  fastify.register(fm, {
    forceClose: true,
    url: process.env.MONGO_URI || 'mongodb://localhost:27017/',
    database: 'wands-shop',
  });
});
