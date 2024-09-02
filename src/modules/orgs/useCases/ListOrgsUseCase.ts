import { IOrg } from '../domain/models/IOrg';
import { ListParams } from '../domain/repositories/IOrgsRepository';
import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';

export class ListOrgsUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  public async execute({ name, city }: ListParams): Promise<Omit<IOrg[] | null, 'password'>> {
    const orgs = await this.orgsRepository.index({ name, city });

    const responseWithoutPassword = orgs.map((org) => {
      return { ...org, password: undefined };
    });

    return responseWithoutPassword;
  }
}
