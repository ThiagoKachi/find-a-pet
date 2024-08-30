import path from 'node:path';
import { AppError } from 'src/shared/errors/AppError';
import { IRequestAdoption } from '../domain/models/IRequestAdoption';
import { PetsRepository } from '../infra/prismaorm/repositories/PetsRepository';
import ResendMail from '../infra/services/ResendMailService';
import { AdoptPetFormValidator } from '../validators/adoptPetFormValidator';

export class AdoptPetFormUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private validator: AdoptPetFormValidator,
    private resendMail: ResendMail,
  ) {}

  public async execute(data: IRequestAdoption): Promise<void> {
    const pet = await this.petsRepository.findById(data.petId);

    if (!pet) {
      throw new AppError('Pet not found');
    }

    const validatedData = this.validator.validate(data);

    const adoptPetTemplate = path.resolve(__dirname, '..', 'views', 'adopt_pet.hbs');

    await this.resendMail.sendMail({
      to: pet.org_id.email,
      subject: `Adoption request for ${validatedData.name}!`,
      templateData: {
        file: adoptPetTemplate,
        variables: {
          pet_name: pet.name,
          name: validatedData.name,
          email: validatedData.email,
          phone: validatedData.phone,
          address: validatedData.address,
          city: validatedData.city,
          state: validatedData.state,
          zipcode: validatedData.zipcode,
          instagramURL: validatedData.instagramURL ?? '',
          consent: String(validatedData.consent),
        }
      }
    });
  }
}
