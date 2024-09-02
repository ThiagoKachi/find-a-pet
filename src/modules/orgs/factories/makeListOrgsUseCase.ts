
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import { ListOrgsUseCase } from '../useCases/ListOrgsUseCase';

export function makeListOrgsUseCase() {
  const orgsRepository = new OrgsRepository();
  const listOrgsUseCase = new ListOrgsUseCase(orgsRepository);

  return listOrgsUseCase;
}
