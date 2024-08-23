import { FastifyReply, FastifyRequest } from 'fastify';
import { ICreateOrg } from 'src/modules/orgs/domain/models/ICreateOrg';
import { IOrg } from 'src/modules/orgs/domain/models/IOrg';
import { CreateOrgUseCase } from 'src/modules/orgs/useCases/CreateOrgUseCase';

export class OrgsController {
  constructor(private createOrgUseCase: CreateOrgUseCase) {}

  findAll(): Promise<IOrg> {
    throw new Error('Method not implemented.');
  }
  findById(id: string): Promise<IOrg | null> {
    throw new Error('Method not implemented.');
  }

  public async findByEmail(email: string): Promise<IOrg | null> {
    const org = await this.createOrgUseCase.findFirst({
      where: {
        email,
      },
    });

    return org;
  }

  public async create(request: FastifyRequest, reply: FastifyReply): Promise<IOrg> {
    const data = request.body as ICreateOrg;
    console.log(data, 'aquiiii');

    const org = await this.createOrgUseCase.execute(data);

    return reply.status(201).send(org);
  }

  update(data: ICreateOrg): Promise<IOrg> {
    throw new Error('Method not implemented.');
  }
  remove(customer: IOrg): Promise<void> {
    throw new Error('Method not implemented.');
  }
}
