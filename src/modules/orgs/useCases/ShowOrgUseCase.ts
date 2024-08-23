import { IOrg } from '../domain/models/IOrg';
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';

export class ShowOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  public async execute(id: string): Promise<Omit<IOrg | null, 'password'> | null> {
    const org = await this.orgsRepository.findById(id);

    return { ...org, password: undefined };
  }
}
