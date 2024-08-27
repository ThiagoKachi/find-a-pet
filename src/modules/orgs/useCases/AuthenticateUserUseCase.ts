import { AppError } from 'src/shared/errors/AppError';
import { ICreateAuthentication } from '../domain/models/ICreateAuthentication';
import { IOrgAuthenticated } from '../domain/models/IOrgAuthenticated';
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import TokenProvider from '../providers/TokenProvider/implementations/TokenProvider';
import { CreateAuthenticationValidator } from '../validators/authenticateValidator';

export class AuthenticateUserUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private hashProvider: BcryptHashProvider,
    private tokenProvider: TokenProvider,
    private validator: CreateAuthenticationValidator,
  ) {}

  public async execute({ email, password }: ICreateAuthentication): Promise<IOrgAuthenticated> {
    const validatedData = this.validator.validate({ email, password });

    const org = await this.orgsRepository.findByEmail(validatedData.email);

    if (!org) {
      throw new AppError('Invalid credentials', 401);
    }

    const passwordConfirmed = await this.hashProvider
      .compareHash(validatedData.password, org.password);

    if (!passwordConfirmed) {
      throw new AppError('Invalid credentials', 401);
    }

    const token = await this.tokenProvider.generateToken({ orgId: org.id });

    return { org, token };
  }
}
