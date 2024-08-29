import { IPet } from '../domain/models/IPet';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';

export class ShowPetUseCase {
  constructor(private petsRepository: PetsRepository) {}

  public async execute(id: string): Promise<IPet | null> {
    const pets = await this.petsRepository.findById(id);

    return pets;
  }
}
