import { AppError } from 'src/shared/errors/AppError';
import { ICreateOrg } from '../domain/models/ICreateOrg';
import { IOrg } from '../domain/models/IOrg';
import { IOrgsRepository } from '../domain/repositories/IOrgsRepository';

export class CreateOrgUseCase {
  constructor(private orgsRepository: IOrgsRepository) {}

  public async execute(data: ICreateOrg): Promise<IOrg> {
    const emailExists = await this.orgsRepository.findByEmail(data.email);

    if (emailExists) {
      throw new AppError('E-mail already used', 400);
    }

    const org = await this.orgsRepository.create(data);

    return org;
  }
}
