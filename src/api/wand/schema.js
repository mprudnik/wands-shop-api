export const manufacturers = [
  'Peverell',
  'Olivander',
  'Gregorovitch',
  'Kiddell',
  'Cephalopos',
  'Beauvais',
  'Jonker',
  'Quintana',
  'Wolfe',
  'Steward'
]

export const woods = [
  'Acacia',
  'Alder',
  'Apple',
  'Beech',
  'Ceder',
  'Cherry',
  'Pear',
  'Pine',
  'Redwood',
];

export const cores = [
  'Unicorn hair',
  'Dragon heartstring',
  'Phoenix feather',
  'Troll whisker',
  'Thunderbird tail feather',
  'Basilisk horn',
]

export const sortOptions = [
  '-price',
  '+price',
  '+name',
  '-name',
  '+length',
  '-length',
]

export const wandResponse = {
  type: 'object',
  properties: {
    _id: { type: 'string' },
    name: { type: 'string' },
    image: { type: 'string' },
    manufacturer: { type: 'string' },
    price: { type: 'number' },
    wood: { type: 'string' },
    core: { type: 'string' },
    length: { type: 'number' },
  }
};

export const listWandResponse = {
  type: 'object',
  properties: {
    count: { type: 'integer' },
    rows: {
      type: 'array',
      items: wandResponse,
    }
  }
}