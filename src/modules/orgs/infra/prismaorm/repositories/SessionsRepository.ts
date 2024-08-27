
import { PrismaClient } from '@prisma/client';
import { ICreateSession } from 'src/modules/orgs/domain/models/ICreateSession';
import { ISession } from 'src/modules/orgs/domain/models/ISession';
import { ISessionsRepository } from 'src/modules/orgs/domain/repositories/ISessionsRepository';

export class SessionsRepository implements ISessionsRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async create(data: ICreateSession): Promise<ISession> {
    const session = await this.prismaClient.sessions.create({ data });

    return session;
  }
}
