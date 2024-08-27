
import { SessionsRepository } from '../infra/prismaorm/repositories/SessionsRepository';
import { CreateSessionUseCase } from '../useCases/CreateSessionUseCase';

export function makeCreateSessionUseCase() {
  const sessionsRepository = new SessionsRepository();

  const createOrgUseCase = new CreateSessionUseCase(
    sessionsRepository,
  );

  return createOrgUseCase;
}
