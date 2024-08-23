
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import { ShowOrgUseCase } from '../useCases/ShowOrgUseCase';

export function makeShowOrgUseCase() {
  const orgsRepository = new OrgsRepository();
  const showOrgUseCase = new ShowOrgUseCase(orgsRepository);

  return showOrgUseCase;
}
