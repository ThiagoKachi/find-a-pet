
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import { CreateOrgUseCase } from '../useCases/CreateOrgUseCase';
import { CreateOrgValidator } from '../validators/createOrgValidator';

export function makeCreateOrgUseCase() {
  const orgsRepository = new OrgsRepository();
  const createOrgValidator = new CreateOrgValidator();
  const bcryptHashProvider = new BcryptHashProvider();
  const createOrgUseCase = new CreateOrgUseCase(
    orgsRepository,
    createOrgValidator,
    bcryptHashProvider
  );

  return createOrgUseCase;
}
