import { orgsRoutes } from 'src/modules/orgs/infra/http/routes/orgs.routes';
import { sessionsRoutes } from 'src/modules/orgs/infra/http/routes/sessions.routes';
import { petImagesRoutes } from 'src/modules/pets/infra/http/routes/pets-images.routes';
import { petsRoutes } from 'src/modules/pets/infra/http/routes/pets.routes';
import { fastify } from '../index';

export async function appRoutes() {
  fastify.register(orgsRoutes, { prefix: '/orgs' });
  fastify.register(sessionsRoutes, { prefix: '/sessions' });
  fastify.register(petsRoutes, { prefix: '/pets' });
  fastify.register(petImagesRoutes, { prefix: '/pets/images' });
}
