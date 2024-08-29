import { ICreatePet } from '../models/ICreatePet';
import { IPet } from '../models/IPet';

export interface PetsListParams {
  age?: number;
  species?: string;
  size?: string;
  gender?: string;
}

export interface IPetsRepository {
  index({ age, species, size, gender }: PetsListParams): Promise<IPet[]>;
  findById(id: string): Promise<IPet | null>;
  create(orgId: string, data: ICreatePet): Promise<IPet>;
  update(id: string, data: ICreatePet): Promise<IPet>;
  remove(id: string): Promise<void>;
}
