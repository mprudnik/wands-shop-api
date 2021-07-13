export const sortOptions = [
  '-price',
  '+price',
  '+name',
  '-name',
  '+length',
  '-length',
];

export const wandResponse = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    image: { type: 'string' },
    house: { type: 'string' },
    manufacturer: { type: 'string' },
    price: { type: 'number' },
    wood: { type: 'string' },
    core: { type: 'string' },
    length: { type: 'number' },
  },
};

export const listWandResponse = {
  type: 'object',
  properties: {
    count: { type: 'integer' },
    rows: {
      type: 'array',
      items: wandResponse,
    },
  },
};
