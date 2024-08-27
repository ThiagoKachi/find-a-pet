import { z } from 'zod';
import { ICreateAuthentication } from '../domain/models/ICreateAuthentication';

const createAuthenticationSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export class CreateAuthenticationValidator {
  validate(data: ICreateAuthentication) {
    return createAuthenticationSchema.parse(data);
  }
}
