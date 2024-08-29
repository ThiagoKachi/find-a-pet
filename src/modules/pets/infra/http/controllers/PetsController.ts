import { FastifyReply, FastifyRequest } from 'fastify';
import { ICreatePet } from 'src/modules/pets/domain/models/ICreatePet';
import { IPet } from 'src/modules/pets/domain/models/IPet';
import { IUpdatePet } from 'src/modules/pets/domain/models/IUpdatePet';
import { PetsListParams } from 'src/modules/pets/domain/repositories/IPetsRepository';
import { CreatePetUseCase } from 'src/modules/pets/useCases/CreatePetUseCase';
import { DeletePetUseCase } from 'src/modules/pets/useCases/DeletePetUseCase';
import { ListPetsUseCase } from 'src/modules/pets/useCases/ListPetsUseCase copy';
import { ShowPetUseCase } from 'src/modules/pets/useCases/ShowPetUseCase';
import { UpdatePetUseCase } from 'src/modules/pets/useCases/UpdatePetUseCase';

export class PetsController {
  constructor(
    private listPetsUseCase: ListPetsUseCase,
    private showPetUseCase: ShowPetUseCase,
    private createPetUseCase: CreatePetUseCase,
    private updatePetUseCase: UpdatePetUseCase,
    private deletePetUseCase: DeletePetUseCase,
  ) {}

  public async show(request: FastifyRequest, reply: FastifyReply): Promise<IPet | null> {
    const { id } = request.params as { id: string };

    const pet = await this.showPetUseCase.execute(id);

    return reply.status(200).send(pet);
  }

  public async index(request: FastifyRequest, reply: FastifyReply): Promise<IPet[]> {
    const params = request.query as PetsListParams;

    const ageToNumber = Number(params.age);

    const pets = await this.listPetsUseCase.execute({
      ...params,
      age: ageToNumber
    });

    return reply.status(200).send(pets);
  }

  public async create(request: FastifyRequest, reply: FastifyReply): Promise<IPet> {
    const data = request.body as ICreatePet;
    const orgId = request.orgId as string;

    const pet = await this.createPetUseCase.execute(orgId, data);

    return reply.status(201).send(pet);
  }

  public async update(request: FastifyRequest, reply: FastifyReply): Promise<IPet> {
    const { id } = request.params as { id: string };
    const orgId = request.orgId as string;
    const data = request.body as IUpdatePet;

    const pet = await this.updatePetUseCase.execute(id, orgId, data);

    return reply.status(200).send(pet);
  }

  public async remove(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { id } = request.params as { id: string };
    const orgId = request.orgId as string;

    await this.deletePetUseCase.execute(id, orgId);

    return reply.status(204).send();
  }
}
