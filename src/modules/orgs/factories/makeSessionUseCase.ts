import { SessionsController } from '../infra/http/controllers/SessionsController';
import { makeAuthenticateUseCase } from './makeAuthenticateUseCase';
import { makeCreateSessionUseCase } from './makeCreateSessionUseCase';

export function makeSessionUseCase() {
  const authenticateUserUseCase = makeAuthenticateUseCase();
  const createSessionUseCase = makeCreateSessionUseCase();

  return new SessionsController(
    authenticateUserUseCase,
    createSessionUseCase,
  );
}
