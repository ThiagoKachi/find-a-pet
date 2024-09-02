
import { PetImagesController } from '../infra/http/controllers/PetImagesController';
import { makeCreatePetImagesUseCase } from './makeCreatePetImagesUseCase';
import { makeDeletePetImagesUseCase } from './makeDeletePetImagesUseCase';

export function makePetImagesUseCase() {
  const createPetImagesUseCase = makeCreatePetImagesUseCase();
  const deletePetImagesUseCase = makeDeletePetImagesUseCase();

  return new PetImagesController(
    createPetImagesUseCase,
    deletePetImagesUseCase
  );
}
