import { FastifyReply, FastifyRequest } from 'fastify';
import { ICreateOrg } from 'src/modules/orgs/domain/models/ICreateOrg';
import { IOrg } from 'src/modules/orgs/domain/models/IOrg';
import { ListParams } from 'src/modules/orgs/domain/repositories/IOrgsRepository';
import { CreateOrgUseCase } from 'src/modules/orgs/useCases/CreateOrgUseCase';
import { DeleteOrgUseCase } from 'src/modules/orgs/useCases/DeleteOrgUseCase';
import { ListOrgsUseCase } from 'src/modules/orgs/useCases/ListOrgsUseCase copy';
import { ShowOrgUseCase } from 'src/modules/orgs/useCases/ShowOrgUseCase';
import { UpdateOrgUseCase } from 'src/modules/orgs/useCases/UpdateOrgUseCase';

export class OrgsController {
  constructor(
    private createOrgUseCase: CreateOrgUseCase,
    private listOrgsUseCase: ListOrgsUseCase,
    private showOrgUseCase: ShowOrgUseCase,
    private deleteOrgUseCase: DeleteOrgUseCase,
    private updateOrgUseCase: UpdateOrgUseCase,
  ) {}

  public async show(request: FastifyRequest, reply: FastifyReply): Promise<IOrg[]> {
    const { id } = request.params as { id: string };

    const org = await this.showOrgUseCase.execute(id);

    return reply.status(200).send(org);
  }

  public async index(request: FastifyRequest, reply: FastifyReply): Promise<IOrg[]> {
    const params = request.query as ListParams;

    const orgs = await this.listOrgsUseCase.execute(params);

    return reply.status(200).send(orgs);
  }

  public async create(request: FastifyRequest, reply: FastifyReply): Promise<IOrg> {
    const data = request.body as ICreateOrg;

    const org = await this.createOrgUseCase.execute(data);

    return reply.status(201).send(org);
  }

  public async update(request: FastifyRequest, reply: FastifyReply): Promise<IOrg> {
    const { id } = request.params as { id: string };
    const data = request.body as ICreateOrg;

    const org = await this.updateOrgUseCase.execute(id, data);

    return reply.status(200).send(org);
  }

  public async remove(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };

    await this.deleteOrgUseCase.execute(id);

    return reply.status(204).send();
  }
}
