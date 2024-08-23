import { orgsRoutes } from 'src/modules/orgs/infra/http/routes';
import { petsRoutes } from 'src/modules/pets/infra/http/routes';
import { fastify } from '../index';

export async function appRoutes() {
  fastify.register(orgsRoutes, { prefix: '/orgs' });
  fastify.register(petsRoutes, { prefix: '/pets' });
}
