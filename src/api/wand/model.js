import mongo from 'mongodb';

const { ObjectId } = mongo;

export const generateModel = (db) => {
  const wands = db.collection('wands');

  const find = async (query, pagination, sortString, name) => {
    const { skip, limit } = parsePagination(pagination);
    const sort = sortString ? parseSort(sortString) : { name: 1 };

    const { manufacturer, wood, core, price, length, house } = query;
    const matchQuery = {};

    if (name) matchQuery.name = { $regex: name, $options: 'i' };
    if (manufacturer) matchQuery.manufacturer = { $in: manufacturer };
    if (wood) matchQuery.wood = { $in: wood };
    if (core) matchQuery.core = { $in: core };
    if (price) matchQuery.price = { $gt: price[0], $lt: price[1] };
    if (length) matchQuery.length = { $gt: length[0], $lt: length[1] };
    if (house) matchQuery.house = { $in: house };

    const [result] = await wands
      .aggregate([
        {
          $facet: {
            count: [{ $match: matchQuery }, { $count: 'result' }],
            rows: [
              { $match: matchQuery },
              { $skip: skip },
              { $limit: limit },
              { $sort: sort },
            ],
          },
        },
      ])
      .toArray();

    const { count, rows } = result;
    return { count: count.length ? count[0].result : 0, rows };
  };

  const findById = (id) => wands.findOne({ _id: new ObjectId(id) });

  return { find, findById };
};

const parsePagination = ({ page, limit }) => ({
  skip: (page - 1) * limit,
  limit: page * limit,
});

const parseSort = (sortString) => ({
  [sortString.slice(1)]: sortString.slice(0, 1) === '+' ? 1 : -1,
});
