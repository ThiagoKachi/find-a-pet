import { petsRoutes } from 'src/modules/pets/infra/http/routes';
import { fastify } from '../index';

export async function appRoutes() {
  fastify.register(petsRoutes, { prefix: '/pets' });
}
