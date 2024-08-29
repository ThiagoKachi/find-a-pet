import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { ICreatePet } from '../domain/models/ICreatePet';
import { IPet } from '../domain/models/IPet';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { CreatePetValidator } from '../validators/createPetValidator';

export class CreatePetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private validator: CreatePetValidator,
    private redisCache: RedisCache,
  ) {}

  public async execute(orgId: string, data: ICreatePet): Promise<IPet> {
    const validatedData = this.validator.validate(data);

    await this.redisCache.invalidate(redisKey.FAF_API_PETS_LIST);

    const pet = await this.petsRepository.create(orgId, validatedData);

    return pet;
  }
}
