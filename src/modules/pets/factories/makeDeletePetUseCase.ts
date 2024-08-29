
import { RedisCache } from 'src/shared/cache/RedisCache';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { DeletePetUseCase } from '../useCases/DeletePetUseCase';

export function makeDeletePetUseCase() {
  const petsRepository = new PetsRepository();
  const redisCache = new RedisCache();

  const deletePetUseCase = new DeletePetUseCase(petsRepository, redisCache);

  return deletePetUseCase;
}
