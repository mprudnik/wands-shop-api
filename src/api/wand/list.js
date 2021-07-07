import { listWandResponse, sortOptions } from './schema.js';
import {
  cores,
  woods,
  houses,
  manufacturers,
} from '../../model-validation/wand/index.js';

export const listHandler = async (Wand, req, reply) => {
  try {
    const { page, limit, name, sort, ...query } = req.query;
    const pagination = { page, limit };

    const wands = await Wand.find(query, pagination, sort, name);

    reply.statusCode = 200;
    reply.send(wands);
  } catch (error) {
    console.log(error);
  }
};

const querystring = {
  type: 'object',
  required: ['page', 'limit'],
  properties: {
    page: { type: 'integer', minimum: 1 },
    limit: { type: 'integer', minimum: 1 },
    name: { type: 'string' },
    sort: { type: 'string', enum: sortOptions },
    manufacturer: {
      type: 'array',
      items: { type: 'string', enum: manufacturers },
    },
    wood: { type: 'array', items: { type: 'string', enum: woods } },
    core: { type: 'array', items: { type: 'string', enum: cores } },
    house: { type: 'array', items: { type: 'string', enum: houses } },
    price: {
      type: 'array',
      items: { type: 'number', minimum: 1 },
      maxItems: 2,
      minItems: 2,
    },
    length: {
      type: 'array',
      items: { type: 'number', minimum: 1 },
      maxItems: 2,
      minItems: 2,
    },
  },
};

const response = {
  200: listWandResponse,
};

export const listSchema = {
  description: 'List wands',
  tags: ['Wand'],
  querystring,
  response,
};
