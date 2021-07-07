const houses = ['Gryffindor', 'Hufflepuff', 'Ravenclaw', 'Slytherin'];

const manufacturers = [
  'Peverell',
  'Olivander',
  'Gregorovitch',
  'Kiddell',
  'Cephalopos',
  'Beauvais',
  'Jonker',
  'Quintana',
  'Wolfe',
  'Steward',
];

const woods = [
  'Acacia',
  'Alder',
  'Apple',
  'Beech',
  'Ceder',
  'Cherry',
  'Elder',
  'Pear',
  'Pine',
  'Redwood',
];

const cores = [
  'Thestral tail hair',
  'Unicorn hair',
  'Dragon heartstring',
  'Phoenix feather',
  'Troll whisker',
  'Thunderbird tail feather',
  'Basilisk horn',
];

const schema = {
  $jsonSchema: {
    bsonType: 'object',
    required: [
      'name',
      'image',
      'manufacturer',
      'price',
      'wood',
      'core',
      'length',
    ],
    additionalProperties: false,
    properties: {
      _id: { bsonType: 'objectId' },
      name: { bsonType: 'string' },
      image: { bsonType: 'string' },
      house: { bsonType: 'string', enum: houses },
      manufacturer: { bsonType: 'string', enum: manufacturers },
      price: { bsonType: 'double', minimum: 1.0 },
      wood: { bsonType: 'string', enum: woods },
      core: { bsonType: 'string', enum: cores },
      length: { bsonType: 'double', minimum: 10.0 },
    },
  },
};

export const setWandValidation = async (db, collections) => {
  const col = 'wands';

  const wands = collections.includes(col)
    ? db.collection(col)
    : await db.createCollection(col);

  await db.command({ collMod: col, validator: schema });

  await wands.createIndex('name', { unique: true });
};
