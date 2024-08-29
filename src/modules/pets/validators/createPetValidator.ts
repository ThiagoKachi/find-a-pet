import { z } from 'zod';
import { ICreatePet } from '../domain/models/ICreatePet';

const createPetSchema = z.object({
  name: z.string().min(1),
  age: z.number().min(1),
  species: z.string().min(1),
  breed: z.string().min(1),
  size: z.string().min(1),
  gender: z.string().min(1),
  description: z.string().optional(),
  available: z.boolean(),
});

export class CreatePetValidator {
  validate(data: ICreatePet) {
    return createPetSchema.parse(data);
  }
}
