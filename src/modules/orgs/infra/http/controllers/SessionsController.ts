import { FastifyReply, FastifyRequest } from 'fastify';
import { ICreateAuthentication } from 'src/modules/orgs/domain/models/ICreateAuthentication';
import { ISession } from 'src/modules/orgs/domain/models/ISession';
import { AuthenticateUserUseCase } from 'src/modules/orgs/useCases/AuthenticateUserUseCase';
import { CreateSessionUseCase } from 'src/modules/orgs/useCases/CreateSessionUseCase';

export class SessionsController {
  constructor(
    private authenticateUserUseCase: AuthenticateUserUseCase,
    private createSessionUseCase: CreateSessionUseCase,
  ) {}

  public async create(request: FastifyRequest, reply: FastifyReply): Promise<ISession> {
    const { email, password } = request.body as ICreateAuthentication;

    const { org, token } = await this.authenticateUserUseCase.execute({ email, password });

    const session = await this.createSessionUseCase.execute({ orgId: org.id, token });

    return reply.status(201).send(session);
  }
}
