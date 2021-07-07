import fp from 'fastify-plugin';
import Ajv from 'ajv';

const ajv = new Ajv({
  removeAdditional: true,
  useDefaults: true,
  coerceTypes: 'array',
  allErrors: true,
});

export default fp(async (fastify) => {
  fastify.setValidatorCompiler(({ schema }) => ajv.compile(schema));
});
