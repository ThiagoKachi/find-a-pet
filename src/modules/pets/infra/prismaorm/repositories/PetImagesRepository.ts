
import { PrismaClient } from '@prisma/client';
import { IPetsImages } from 'src/modules/pets/domain/models/IPetsImages';
import { IPetsImagesRepository } from 'src/modules/pets/domain/repositories/IPetsImagesRepository';

export class PetImagesRepository implements IPetsImagesRepository {
  private prismaClient: PrismaClient;

  constructor() {
    this.prismaClient = new PrismaClient();
  }

  public async create(petId: string, file_key: string): Promise<IPetsImages> {
    const petImage = await this.prismaClient.petImages.create({
      data: {
        petId,
        file_key
      }
    });

    return petImage;
  }
}
