import { wandResponse } from "./schema.js";

export const showHandler = async (Wand, req, reply) => {
  try {
    const wand = await Wand.findById(req.params.id)

    if (!wand) {
      reply.statusCode = 404;
      reply.send({message: 'Wand not found'});
      return;
    }

    reply.statusCode = 200;
    reply.send(wand)
  } catch (error) {
    console.log(error)
  }
}

const params = {
  type: 'object',
  required: ['id'],
  properties: {
    id: { type: 'string', maxLength: 24, minLength: 24 }
  }
}

const response = {
  200: wandResponse
}

export const showSchema = {
  description: 'Show wand',
  tags: ['Wand'],
  params,
  response,
}