import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { AppError } from 'src/shared/errors/AppError';
import { PetImagesUploadParams } from '../domain/models/IPetImagesUpload';
import { R2Storage } from '../infra/http/storage/r2-storage';
import { PetImagesRepository } from '../infra/prismaorm/repositories/PetImagesRepository';

export class UploadPetImagesUseCase {
  constructor(
    private petImagesRepository: PetImagesRepository,
    private uploader: R2Storage,
    private redisCache: RedisCache,
  ) {}

  async execute(petId: string, { fileName, fileType, body }: PetImagesUploadParams) {
    if (!fileName || !fileType || !body) {
      throw new AppError('File name, file type and body are required');
    }

    const petImageExists = await this.petImagesRepository.findByFileName(fileName);

    if (petImageExists) {
      throw new AppError('Pet image already exists');
    }

    const { url } = await this.uploader.upload({ fileName, fileType, body });

    const petImage = await this.petImagesRepository.create(petId, url);

    await this.redisCache.invalidate(redisKey.FAF_API_PETS_LIST);

    return petImage;
  }
}
