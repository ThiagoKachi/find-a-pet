import { FastifyInstance } from 'fastify';
import { makePetUseCase } from 'src/modules/pets/factories/makePetUseCase';
import { authPetMiddleware } from '../middlewares/isAuthenticated';

const petsUseCases = makePetUseCase();

export async function petsRoutes(fastify: FastifyInstance) {
  fastify.get('/', async (req, res) => petsUseCases.index(req, res));
  fastify.get('/:id', async (req, res) => petsUseCases.show(req, res));

  fastify.post(
    '/',
    { onRequest: [authPetMiddleware] },
    async (req, res) => petsUseCases.create(req, res)
  );

  fastify.put(
    '/:id',
    { onRequest: [authPetMiddleware] },
    async (req, res) => petsUseCases.update(req, res)
  );
  fastify.delete(
    '/:id',
    { onRequest: [authPetMiddleware] },
    async (req, res) => petsUseCases.remove(req, res)
  );
}
