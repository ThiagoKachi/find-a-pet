
import { PetsController } from '../infra/http/controllers/PetsController';
import { makeCreatePetUseCase } from './makeCreatePetUseCase';
import { makeDeletePetUseCase } from './makeDeletePetUseCase';
import { makeListPetsUseCase } from './makeListPetsUseCase';
import { makeShowPetUseCase } from './makeShowPetUseCase';
import { makeUpdatePetUseCase } from './makeUpdateOrgUseCase';

export function makePetUseCase() {
  const listPetsUseCase = makeListPetsUseCase();
  const showPetUseCase = makeShowPetUseCase();
  const createPetUseCase = makeCreatePetUseCase();
  const updatePetUseCase = makeUpdatePetUseCase();
  const deletePetUseCase = makeDeletePetUseCase();

  return new PetsController(
    listPetsUseCase,
    showPetUseCase,
    createPetUseCase,
    updatePetUseCase,
    deletePetUseCase,
  );
}
