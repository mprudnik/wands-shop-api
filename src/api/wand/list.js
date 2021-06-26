import { cores, listWandResponse, manufacturers, sortOptions, woods } from "./schema.js";

export const listHandler = async (Wand, req, reply) => {
  try {
    const { page, limit, name, sort, ...query } = req.query;
    const pagination = { page, limit };
    console.log(pagination, name, sort, query)

    const wands = await Wand.find(query, pagination, sort, name);

    reply.statusCode = 200;
    reply.send(wands)
  } catch (error) {
    console.log(error);
  }
}

const querystring = {
  type: 'object',
  required: ['page', 'limit'],
  properties: {
    page: { type: 'integer', minimum: 1 },
    limit: { type: 'integer', minimum: 1 },
    name: { type: 'string' },
    sort: { type: 'string', enum: sortOptions },
    manufacturer: { type: 'string', enum: manufacturers },
    wood: { type: 'string', enum: woods },
    core: { type: 'string', enum: cores },
  }
}

const response = {
  200: listWandResponse,
}

export const listSchema = {
  description: 'List wands',
  tags: ['Wand'],
  querystring,
  response,
}