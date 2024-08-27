
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import TokenProvider from '../providers/TokenProvider/implementations/TokenProvider';
import { AuthenticateUserUseCase } from '../useCases/AuthenticateUserUseCase';
import { CreateAuthenticationValidator } from '../validators/authenticateValidator';

export function makeAuthenticateUseCase() {
  const orgsRepository = new OrgsRepository();
  const bcryptHashProvider = new BcryptHashProvider();
  const tokenProvider = new TokenProvider();
  const createAuthenticationValidator = new CreateAuthenticationValidator();

  const createOrgUseCase = new AuthenticateUserUseCase(
    orgsRepository,
    bcryptHashProvider,
    tokenProvider,
    createAuthenticationValidator
  );

  return createOrgUseCase;
}
