
import { PrismaClient } from '@prisma/client';
import { ICreatePet } from 'src/modules/pets/domain/models/ICreatePet';
import { IPet } from 'src/modules/pets/domain/models/IPet';
import { IUpdatePet } from 'src/modules/pets/domain/models/IUpdatePet';
import { IPetsRepository, PetsListParams } from 'src/modules/pets/domain/repositories/IPetsRepository';

export class PetsRepository implements IPetsRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async index({
    age,
    gender,
    size,
    species
  }: PetsListParams): Promise<IPet[]> {
    const pets = await this.prismaClient.pets.findMany({
      include: {
        petImages: true,
      },
      where: {
        ...(age && {
          age: {
            lte: age
          },
        }),
        gender,
        size,
        species
      }
    });

    return pets;
  }

  public async findById(id: string): Promise<IPet & { org_id: { email: string } } | null> {
    const pet = await this.prismaClient.pets.findFirst({
      where: {
        id,
      },
      include: {
        petImages: true,
        org_id: {
          select: {
            email: true
          }
        }
      },
    });

    return pet;
  }

  public async create(orgId: string, data: ICreatePet): Promise<IPet> {
    const pet = await this.prismaClient.pets.create({
      data: {
        ...data,
        orgId
      }
    });

    return pet;
  }

  public async update(id: string, data: IUpdatePet): Promise<IPet> {
    const petUpdated = await this.prismaClient.pets.update({
      where: {
        id
      },
      data: {
        name: data.name,
        age: data.age,
        species: data.species,
        breed: data.breed,
        size: data.size,
        gender: data.gender,
        description: data.description,
        available: data.available
      },
    });

    return petUpdated;
  }

  public async remove(id: string): Promise<void> {
    await this.prismaClient.pets.delete({
      where: {
        id
      },
    });
  }
}
