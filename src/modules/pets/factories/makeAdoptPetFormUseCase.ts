
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import ResendMail from '../infra/services/ResendMailService';
import { AdoptPetFormUseCase } from '../useCases/AdoptPetFormUseCase';
import { AdoptPetFormValidator } from '../validators/adoptPetFormValidator';

export function makeAdoptPetFormUseCase() {
  const petsRepository = new PetsRepository();
  const adoptPetFormValidator = new AdoptPetFormValidator();
  const resendMail = new ResendMail();

  const AdoptPetUseCase = new AdoptPetFormUseCase(
    petsRepository,
    adoptPetFormValidator,
    resendMail
  );

  return AdoptPetUseCase;
}
