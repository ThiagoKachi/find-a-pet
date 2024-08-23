import { AppError } from 'src/shared/errors/AppError';
import { IOrg } from '../domain/models/IOrg';
import { IUpdateOrg } from '../domain/models/IUpdateOrg';
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';
import { UpdateOrgValidator } from '../validators/updateOrgValidator';

export class UpdateOrgUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private validator: UpdateOrgValidator,
  ) {}
  public async execute(id: string, data: IUpdateOrg): Promise<Omit<IOrg | null, 'password'>> {
    const org = await this.orgsRepository.findById(id);

    if (!org) {
      throw new AppError('Org not found', 404);
    }

    if (data.password) {
      throw new AppError('Password cannot be updated here.', 400);
    }

    if (data.email) {
      const emailAlreadyExists = await this.orgsRepository.findByEmail(data.email);

      if (emailAlreadyExists && data.email !== org.email) {
        throw new AppError('Email already in use.', 409);
      }
    }

    const validatedData = this.validator.validate(data);

    const updatedOrg = await this.orgsRepository.update(id, validatedData);

    return { ...updatedOrg, password: undefined };
  }
}
