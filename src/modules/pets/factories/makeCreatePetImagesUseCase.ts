import { RedisCache } from 'src/shared/cache/RedisCache';
import { R2Storage } from '../infra/http/storage/r2-storage';
import { PetImagesRepository } from '../infra/prismaorm/repositories/PetImagesRepository';
import { UploadPetImagesUseCase } from '../useCases/UploadPetImagesUseCase';

export function makeCreatePetImagesUseCase() {
  const petImagesRepository = new PetImagesRepository();
  const r2Storage = new R2Storage();
  const redisCache = new RedisCache();
  const uploadPetImagesUseCase = new UploadPetImagesUseCase(
    petImagesRepository,
    r2Storage,
    redisCache,
  );

  return uploadPetImagesUseCase;
}
