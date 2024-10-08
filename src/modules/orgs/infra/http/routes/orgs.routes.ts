import { FastifyInstance } from 'fastify';
import { makeOrgUseCase } from 'src/modules/orgs/factories/makeOrgUseCase';
import { authMiddleware } from 'src/shared/infra/http/middlewares/isAuthenticated';

const orgsUseCases = makeOrgUseCase();

export async function orgsRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (req, res) => orgsUseCases.index(req, res));
  fastify.get('/:id', async (req, res) => orgsUseCases.show(req, res));
  fastify.post('/', async (req, res) => orgsUseCases.create(req, res));

  fastify.put(
    '/:id',
    { onRequest: [authMiddleware] },
    async (req, res) => orgsUseCases.update(req, res)
  );

  fastify.delete(
    '/:id',
    { onRequest: [authMiddleware] },
    async (req, res) => orgsUseCases.remove(req, res)
  );
}
