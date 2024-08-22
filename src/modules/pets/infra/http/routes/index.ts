import { FastifyInstance } from 'fastify';

export async function petsRoutes(fastify: FastifyInstance) {
  fastify.get('/', (request, reply) => {
    reply.send({ message: 'OK' });
  });
}
