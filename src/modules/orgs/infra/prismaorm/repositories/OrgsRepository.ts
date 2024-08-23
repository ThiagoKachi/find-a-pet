
import { PrismaClient } from '@prisma/client';
import { ICreateOrg } from '../../../domain/models/ICreateOrg';
import { IOrg } from '../../../domain/models/IOrg';
import { IOrgsRepository } from '../../../domain/repositories/IOrgsRepository';

export class OrgsRepository implements IOrgsRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }
  findAll(): Promise<IOrg> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<IOrg | null> {
    throw new Error('Method not implemented.');
  }

  public async findByEmail(email: string): Promise<IOrg | null> {
    const org = await this.prismaClient.orgs.findFirst({
      where: {
        email,
      },
    });

    return org;
  }

  public async create(data: ICreateOrg): Promise<IOrg> {
    const org = await this.prismaClient.orgs.create({ data });

    return org;
  }

  update(data: ICreateOrg): Promise<IOrg> {
    throw new Error('Method not implemented.');
  }
  remove(customer: IOrg): Promise<void> {
    throw new Error('Method not implemented.');
  }

}
