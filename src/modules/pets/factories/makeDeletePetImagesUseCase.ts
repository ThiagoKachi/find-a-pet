import { RedisCache } from 'src/shared/cache/RedisCache';
import { R2Storage } from '../infra/http/storage/r2-storage';
import { PetImagesRepository } from '../infra/prismaorm/repositories/PetImagesRepository';
import { DeletePetImagesUseCase } from '../useCases/DeletePetImagesUseCase';

export function makeDeletePetImagesUseCase() {
  const petImagesRepository = new PetImagesRepository();
  const r2Storage = new R2Storage();
  const redisCache = new RedisCache();
  const deletePetImagesUseCase = new DeletePetImagesUseCase(
    petImagesRepository,
    r2Storage,
    redisCache,
  );

  return deletePetImagesUseCase;
}
