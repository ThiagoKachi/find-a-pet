import { z } from 'zod';
import { IUpdatePet } from '../domain/models/IUpdatePet';

const updatePetSchema = z.object({
  name: z.string().optional(),
  age: z.number().optional(),
  species: z.string().optional(),
  breed: z.string().optional(),
  size: z.string().optional(),
  gender: z.string().optional(),
  description: z.string().optional(),
  available: z.boolean().optional(),
});

export class UpdatePetValidator {
  validate(data: IUpdatePet) {
    return updatePetSchema.parse(data);
  }
}
