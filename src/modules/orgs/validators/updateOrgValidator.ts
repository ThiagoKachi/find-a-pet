import { z } from 'zod';
import { IUpdateOrg } from '../domain/models/IUpdateOrg';

const updateOrgSchema = z.object({
  email: z.string().email().optional(),
  name: z.string().optional(),
  address: z.string().optional(),
  city: z.string().optional(),
  state: z.string().optional(),
  zipcode: z.string().optional(),
  whatsapp_number: z.string().optional(),
});

export class UpdateOrgValidator {
  validate(data: IUpdateOrg) {
    return updateOrgSchema.parse(data);
  }
}
