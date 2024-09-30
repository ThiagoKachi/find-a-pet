import { redisKey } from 'src/config/redisKeys';
import { RedisCache } from 'src/shared/cache/RedisCache';
import { IPetResponse } from '../domain/models/IPetResponse';
import { PetsListParams } from '../domain/repositories/IPetsRepository';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';

export class ListPetsUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private redisCache: RedisCache,
  ) {}

  public async execute(params: PetsListParams): Promise<IPetResponse> {
    const { age, species, gender, size, limit, page } = params;

    const cacheKey = `${redisKey.FAF_API_PETS_LIST} ${JSON.stringify(params)}`;

    let pets = await this.redisCache.recover<IPetResponse>(cacheKey);

    if (!pets) {
      pets =  await this.petsRepository.index({
        age,
        species,
        gender,
        size,
        limit,
        page
      });

      await this.redisCache.save(cacheKey, pets);
    }

    return {
      pets: pets.pets,
      currentPage: Number(page),
      pageSize: Number(limit),
      total: Number(pets.total) || 0
    };
  }
}
