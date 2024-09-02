import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { AppError } from 'src/shared/errors/AppError';
import { R2Storage } from '../infra/http/storage/r2-storage';
import { PetImagesRepository } from '../infra/prismaorm/repositories/PetImagesRepository';

export class DeletePetImagesUseCase {
  constructor(
    private petImagesRepository: PetImagesRepository,
    private storage: R2Storage,
    private redisCache: RedisCache,
  ) {}

  async execute(fileName: string) {
    if (!fileName) {
      throw new AppError('File name not provided', 400);
    }

    const petImage = await this.petImagesRepository.findByFileName(fileName);

    if (!petImage) {
      throw new AppError('Pet image not found', 404);
    }

    await this.storage.delete(fileName);

    await this.petImagesRepository.delete(fileName);

    await this.redisCache.invalidate(redisKey.FAF_API_PETS_LIST);
  }
}
