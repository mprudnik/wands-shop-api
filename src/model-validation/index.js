import { setWandValidation } from './wand/index.js'

export default async (fastify) => {
  const { db } = fastify.mongo;
  if (!db) throw new Error('Mongo db object does not exists');

  const collectionsData = await db.listCollections().toArray();
  const collections = collectionsData.map(({ name }) => name);

  await setWandValidation(db, collections);
}
