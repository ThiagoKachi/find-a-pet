import { DeleteObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { randomUUID } from 'node:crypto';
import { env } from 'src/config/env';
import { PetImagesUploadParams } from 'src/modules/pets/domain/models/IPetImagesUpload';

export class R2Storage {
  private client: S3Client;

  constructor() {
    const accountId = env.CLOUDFLARE_ACCOUNT_ID;

    this.client = new S3Client({
      endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
      region: 'auto',
      credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY
      }
    });
  }

  public async upload({
    fileName,
    fileType,
    body,
  }: PetImagesUploadParams): Promise<{ url: string }> {
    const uploadId = randomUUID();
    const uniqueFileName = `${uploadId}-${fileName}`;

    await this.client.send(
      new PutObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: uniqueFileName,
        ContentType: fileType,
        Body: body,
      })
    );

    return { url: uniqueFileName };
  }

  public async delete(fileName: string): Promise<void> {
    await this.client.send(
      new DeleteObjectCommand({
        Bucket: env.AWS_BUCKET_NAME,
        Key: fileName,
      })
    );
  }
}
