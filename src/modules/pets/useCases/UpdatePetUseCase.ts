import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { AppError } from 'src/shared/errors/AppError';
import { IPet } from '../domain/models/IPet';
import { IUpdatePet } from '../domain/models/IUpdatePet';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { UpdatePetValidator } from '../validators/updatePetValidator';

export class UpdatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private validator: UpdatePetValidator,
    private redisCache: RedisCache,
  ) {}
  public async execute(id: string, orgId: string, data: IUpdatePet): Promise<IPet> {
    const pet = await this.petsRepository.findById(id);

    if (!pet) {
      throw new AppError('Pet not found', 404);
    }

    if (orgId !== pet.orgId) {
      throw new AppError('Not authorized', 401);
    }

    const validatedData = this.validator.validate(data);

    const updatedPet = await this.petsRepository.update(id, validatedData);

    await this.redisCache.invalidate(redisKey.FAF_API_PETS_LIST);

    return updatedPet;
  }
}
