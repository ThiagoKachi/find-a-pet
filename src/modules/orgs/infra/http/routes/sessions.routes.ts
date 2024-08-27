import { FastifyInstance } from 'fastify';
import { makeSessionUseCase } from 'src/modules/orgs/factories/makeSessionUseCase';

const sessionsUseCases = makeSessionUseCase();

export async function sessionsRoutes(fastify: FastifyInstance) {
  fastify.post('/', async (req, res) => sessionsUseCases.create(req, res));
}
