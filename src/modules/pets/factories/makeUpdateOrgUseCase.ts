
import { RedisCache } from 'src/shared/cache/RedisCache';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { UpdatePetUseCase } from '../useCases/UpdatePetUseCase';
import { UpdatePetValidator } from '../validators/updatePetValidator';

export function makeUpdatePetUseCase() {
  const petsRepository = new PetsRepository();
  const updatePetValidator = new UpdatePetValidator();
  const redisCache = new RedisCache();
  const updatePetUseCase = new UpdatePetUseCase(
    petsRepository,
    updatePetValidator,
    redisCache
  );

  return updatePetUseCase;
}
