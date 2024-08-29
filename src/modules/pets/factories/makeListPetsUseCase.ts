
import { RedisCache } from 'src/shared/cache/RedisCache';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { ListPetsUseCase } from '../useCases/ListPetsUseCase copy';

export function makeListPetsUseCase() {
  const petsRepository = new PetsRepository();
  const redisCache = new RedisCache();
  const listPetsUseCase = new ListPetsUseCase(petsRepository, redisCache);

  return listPetsUseCase;
}
