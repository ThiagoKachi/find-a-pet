
import { PrismaClient } from '@prisma/client';
import { IUpdateOrg } from 'src/modules/orgs/domain/models/IUpdateOrg';
import { ICreateOrg } from '../../../domain/models/ICreateOrg';
import { IOrg } from '../../../domain/models/IOrg';
import { IOrgsRepository, ListParams } from '../../../domain/repositories/IOrgsRepository';

export class OrgsRepository implements IOrgsRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async index({ name, city }: ListParams): Promise<IOrg[]> {
    const orgs = await this.prismaClient.orgs.findMany({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
        city: {
          contains: city,
          mode: 'insensitive',
        },
      },
    });

    return orgs;
  }

  public async findById(id: string): Promise<IOrg | null> {
    const org = await this.prismaClient.orgs.findFirst({
      where: {
        id,
      },
    });

    return org;
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

  public async update(id: string, data: IUpdateOrg): Promise<IOrg> {
    const orgUpdated = await this.prismaClient.orgs.update({
      where: {
        id
      },
      data: {
        name: data.name,
        email: data.email,
        address: data.address,
        city: data.city,
        state: data.state,
        zipcode: data.zipcode,
        whatsapp_number: data.whatsapp_number,
      },
    });

    return orgUpdated;
  }

  public async remove(id: string): Promise<void> {
    await this.prismaClient.orgs.delete({
      where: {
        id
      },
    });
  }

}
