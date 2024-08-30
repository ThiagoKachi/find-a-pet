import { z } from 'zod';
import { IRequestAdoption } from '../domain/models/IRequestAdoption';

const adoptPetFormSchema = z.object({
  petId: z.string().min(1),
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(1),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipcode: z.string().min(1),
  instagramURL: z.string().optional(),
  consent: z.boolean(),
});

export class AdoptPetFormValidator {
  validate(data: IRequestAdoption) {
    return adoptPetFormSchema.parse(data);
  }
}
