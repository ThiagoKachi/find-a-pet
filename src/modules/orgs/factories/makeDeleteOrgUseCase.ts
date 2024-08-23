
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import { DeleteOrgUseCase } from '../useCases/DeleteOrgUseCase';

export function makeDeleteOrgUseCase() {
  const orgsRepository = new OrgsRepository();
  const deleteOrgUseCase = new DeleteOrgUseCase(orgsRepository);

  return deleteOrgUseCase;
}
