import { IPetsImages } from '../models/IPetsImages';

export interface IPetsImagesRepository {
  create(petId: string, file_key: string): Promise<IPetsImages>;
}
