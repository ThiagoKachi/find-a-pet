
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import { ShowPetUseCase } from '../useCases/ShowPetUseCase';

export function makeShowPetUseCase() {
  const petsRepository = new PetsRepository();
  const showPetUseCase = new ShowPetUseCase(petsRepository);

  return showPetUseCase;
}
