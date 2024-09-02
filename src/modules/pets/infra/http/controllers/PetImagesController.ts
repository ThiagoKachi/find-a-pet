import { FastifyReply, FastifyRequest } from 'fastify';
import { IPetsImages } from 'src/modules/pets/domain/models/IPetsImages';
import { DeletePetImagesUseCase } from 'src/modules/pets/useCases/DeletePetImagesUseCase';
import { UploadPetImagesUseCase } from 'src/modules/pets/useCases/UploadPetImagesUseCase';
import { parseMultipartData } from '../middlewares/parseMultipartData';

export class PetImagesController {
  constructor(
    private uploadPetImagesUseCase: UploadPetImagesUseCase,
    private deletePetImagesUseCase: DeletePetImagesUseCase,
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

  public async delete(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { fileKey } = request.params as { fileKey: string };

    await this.deletePetImagesUseCase.execute(fileKey);

    return reply.status(204).send();
  }
}
