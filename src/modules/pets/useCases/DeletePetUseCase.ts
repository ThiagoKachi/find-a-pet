import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { AppError } from 'src/shared/errors/AppError';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';

export class DeletePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private redisCache: RedisCache,
  ) {}

  public async execute(id: string, orgId: string): Promise<void> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new AppError('Pet not found');
    }

    if (orgId !== pet.orgId) {
      throw new AppError('Not authorized', 401);
    }

    await this.redisCache.invalidate(redisKey.FAF_API_PETS_LIST);

    await this.petsRepository.remove(id);
  }
}
