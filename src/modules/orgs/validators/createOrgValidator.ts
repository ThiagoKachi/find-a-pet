import { z } from 'zod';
import { ICreateOrg } from '../domain/models/ICreateOrg';

const createUserSchema = z.object({
  email: z.string().email(),
  name: z.string().min(1),
  password: z.string().min(6),
  address: z.string().min(1),
  city: z.string().min(1),
  state: z.string().min(1),
  zipcode: z.string().min(1),
  whatsapp_number: z.string().min(1),
});

export class CreateOrgValidator {
  validate(data: ICreateOrg) {
    return createUserSchema.parse(data);
  }
}
