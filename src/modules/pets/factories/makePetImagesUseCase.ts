
import { PetImagesController } from '../infra/http/controllers/PetImagesController';
import { makeCreatePetImagesUseCase } from './makeCreatePetImagesUseCase';

export function makePetImagesUseCase() {
  const createPetImagesUseCase = makeCreatePetImagesUseCase();

  return new PetImagesController(
    createPetImagesUseCase,
  );
}
