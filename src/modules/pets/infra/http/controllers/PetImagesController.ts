import { FastifyReply, FastifyRequest } from 'fastify';
import { IPetsImages } from 'src/modules/pets/domain/models/IPetsImages';
import { UploadPetImagesUseCase } from 'src/modules/pets/useCases/UploadPetImagesUseCase';
import { parseMultipartData } from '../middlewares/parseMultipartData';

export class PetImagesController {
  constructor(
    private uploadPetImagesUseCase: UploadPetImagesUseCase,
  ) {}

  public async create(request: FastifyRequest, reply: FastifyReply): Promise<IPetsImages> {
    const { id } = request.params as { id: string };
    const data = await parseMultipartData(request, reply);

    for (const file of data) {
      await this.uploadPetImagesUseCase.execute(id, {
        fileName: file.fileName,
        fileType: file.fileType,
        body: file.body,
      });
    }

    return reply.status(201).send({ message: 'Images uploaded successfully' });
  }
}
