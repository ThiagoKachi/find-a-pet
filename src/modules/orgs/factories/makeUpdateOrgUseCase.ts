
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import { UpdateOrgUseCase } from '../useCases/UpdateOrgUseCase';
import { UpdateOrgValidator } from '../validators/updateOrgValidator';

export function makeUpdateOrgUseCase() {
  const orgsRepository = new OrgsRepository();
  const updateOrgValidator = new UpdateOrgValidator();
  const updateOrgUseCase = new UpdateOrgUseCase(orgsRepository, updateOrgValidator);

  return updateOrgUseCase;
}
