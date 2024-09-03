import { fastify } from '.';

const port = Number(process.env.PORT) || 3333;

fastify.listen({ port }, () => {
  console.log(`🚀 Server running on port ${port}`);
});
