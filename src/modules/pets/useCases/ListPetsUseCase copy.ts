import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { IPet } from '../domain/models/IPet';
import { PetsListParams } from '../domain/repositories/IPetsRepository';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';

export class ListPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private redisCache: RedisCache,
  ) {}

  public async execute(params: PetsListParams): Promise<IPet[]> {
    const { age, species, gender, size } = params;

    const cacheKey = `${redisKey.FAF_API_PETS_LIST} ${JSON.stringify(params)}`;

    let pets = await this.redisCache.recover<IPet[]>(cacheKey);

    if (!pets) {
      pets =  await this.petsRepository.index({
        age,
        species,
        gender,
        size
      });

      await this.redisCache.save(cacheKey, pets);
    }

    return pets;
  }
}
