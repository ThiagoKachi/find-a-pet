import { FastifyInstance } from 'fastify';
import { makePetImagesUseCase } from 'src/modules/pets/factories/makePetImagesUseCase';

const petImagesUseCases = makePetImagesUseCase();

export async function petImagesRoutes(fastify: FastifyInstance) {
  fastify.post('/:id', async (req, res) => petImagesUseCases.create(req, res));
  fastify.delete('/:fileKey', async (req, res) => petImagesUseCases.delete(req, res));
}
