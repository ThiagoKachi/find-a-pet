import { ICreatePet } from '../models/ICreatePet';
import { IPet } from '../models/IPet';

export interface IPetsImagesRepository {
  create(data: ICreatePet): Promise<IPet>;
  update(id: string, data: ICreatePet): Promise<IPet>;
  remove(id: string): Promise<void>;
}
