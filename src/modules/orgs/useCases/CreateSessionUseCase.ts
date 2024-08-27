import { ICreateSession } from '../domain/models/ICreateSession';
import { ISession } from '../domain/models/ISession';
import { SessionsRepository } from '../infra/prismaorm/repositories/SessionsRepository';

export class CreateSessionUseCase {
  constructor(
    private sessionsRepository: SessionsRepository,
  ) {}

  public async execute({ orgId, token }: ICreateSession): Promise<ISession> {
    const session = await this.sessionsRepository.create({ orgId, token });

    return { token: session.token };
  }
}
