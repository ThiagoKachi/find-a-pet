import { fastify } from '.';

fastify.listen({ port: 3333 }, () => {
  console.log('🚀 Server running on port 3333');
});
