import mongo from 'mongodb';

const { ObjectId } = mongo;

export const generateModel = (db) => {
  const wands = db.collection('wands');

  const find = async (query, pagination, sortString, name) => {
    const { skip, limit } = parsePagination(pagination);
    const sort = sortString ? parseSort(sortString) : { name: 1 };
    
    const matchQuery = { ...query };
    if (name) matchQuery.name = { $regex: name, $options: 'i' };


    const [result] = await wands
      .aggregate([
        {
          $facet: {
            count: [{ $match: matchQuery }, { $count: 'result' }],
            rows: [{ $match: matchQuery }, { $skip: skip }, { $limit: limit }, { $sort: sort }],
          }
        }
      ]).toArray()
    
    const { count, rows } = result;
    return { count: count.length ? count[0].result : 0, rows };
  };

  const findById = (id) => wands.findOne({ _id: new ObjectId(id) });

  return { find, findById }
}

const parsePagination = ({page, limit}) => ({
  skip: (page - 1) * limit,
  limit: page * limit,
})

const parseSort = (sortString) => ({ [sortString.slice(1)]: sortString.slice(0, 1) === '+' ? 1 : -1 })