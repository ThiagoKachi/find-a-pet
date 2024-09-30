import { PrismaClient } from '@prisma/client';
import { ICreatePet } from 'src/modules/pets/domain/models/ICreatePet';
import { IPet } from 'src/modules/pets/domain/models/IPet';
import { IPetResponse } from 'src/modules/pets/domain/models/IPetResponse';
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
    species,
    limit,
    page
  }: PetsListParams): Promise<IPetResponse> {
    const pets = await this.prismaClient.pets.findMany({
      include: {
        petImages: {
          select: {
            id: true,
            file_key: true
          }
        },
        org_id: {
          select: {
            name: true
          }
        }
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
      },
      orderBy: {
        created_at: 'desc'
      },
      skip: (Number(page) - 1) * limit,
      take: Number(limit),
    });

    const petsQtd = await this.prismaClient.pets.count({
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

    return {
      pets,
      currentPage: Number(page),
      pageSize: Number(limit),
      total: petsQtd
    };
  }

  public async findById(id: string): Promise<IPet & { org_id: { email: string } } | null> {
    const pet = await this.prismaClient.pets.findFirst({
      where: {
        id,
      },
      include: {
        petImages: {
          select: {
            id: true,
            file_key: true
          }
        },
        org_id: {
          select: {
            email: true,
            name: true,
            address: true,
            city: true,
            state: true,
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
