
import { PetsController } from '../infra/http/controllers/PetsController';
import { makeAdoptPetFormUseCase } from './makeAdoptPetFormUseCase';
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
  const adoptPetFormUseCase = makeAdoptPetFormUseCase();

  return new PetsController(
    listPetsUseCase,
    showPetUseCase,
    createPetUseCase,
    updatePetUseCase,
    deletePetUseCase,
    adoptPetFormUseCase
  );
}
