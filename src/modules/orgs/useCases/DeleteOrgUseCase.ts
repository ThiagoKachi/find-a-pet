import { OrgsRepository } from '../infra/prismaorm/repositories/OrgsRepository';

export class DeleteOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  public async execute(id: string): Promise<void> {
    await this.orgsRepository.remove(id);
  }
}
