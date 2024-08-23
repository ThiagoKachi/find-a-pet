import { FastifyInstance } from 'fastify';
import { OrgsController } from '../controllers/OrgsController';

const orgsController = new OrgsController();

export async function orgsRoutes(fastify: FastifyInstance) {
  fastify.post('/', () => orgsController);
}
