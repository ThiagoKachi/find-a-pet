import { AppError } from 'src/shared/errors/AppError';
import { ICreateOrg } from '../domain/models/ICreateOrg';
import { IOrg } from '../domain/models/IOrg';
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import BcryptHashProvider from '../providers/HashProvider/implementations/BcryptHashProvider';
import { CreateOrgValidator } from '../validators/createOrgValidator';

export class CreateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private validator: CreateOrgValidator,
    private hashProvider: BcryptHashProvider,
  ) {}

  public async execute(data: ICreateOrg): Promise<Omit<IOrg | null, 'password'>> {
    const emailExists = await this.orgsRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError('Email already exists', 409);
    }

    const hashedPassword = await this.hashProvider.generateHash(data.password);

    const validatedData = this.validator.validate({
      ...data,
      password: hashedPassword
    });

    const org = await this.orgsRepository.create(validatedData);

    return { ...org, password: undefined };
  }
}
