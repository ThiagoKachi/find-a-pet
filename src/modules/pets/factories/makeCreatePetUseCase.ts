
import { RedisCache } from 'src/shared/cache/RedisCache';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { CreatePetUseCase } from '../useCases/CreatePetUseCase';
import { CreatePetValidator } from '../validators/createPetValidator';

export function makeCreatePetUseCase() {
  const petsRepository = new PetsRepository();
  const createPetValidator = new CreatePetValidator();
  const redisCache = new RedisCache();

  const createPetUseCase = new CreatePetUseCase(
    petsRepository,
    createPetValidator,
    redisCache
  );

  return createPetUseCase;
}
