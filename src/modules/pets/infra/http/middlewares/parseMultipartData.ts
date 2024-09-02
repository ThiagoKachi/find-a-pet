/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyReply, FastifyRequest } from 'fastify';

export async function parseMultipartData(request: FastifyRequest, _reply: FastifyReply) {
  const files = await request.files();

  const uploadedFiles = [];

  for await (const part of files) {
    const fileName = part.filename;
    const fileType = part.mimetype;

    const chunks: Buffer[] = [];
    for await (const chunk of part.file) {
      chunks.push(chunk);
    }

    const body = Buffer.concat(chunks);

    uploadedFiles.push({
      fileName,
      fileType,
      body,
    });
  }

  return uploadedFiles;
}
