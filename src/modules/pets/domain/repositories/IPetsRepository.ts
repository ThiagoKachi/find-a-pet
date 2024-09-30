import { ICreatePet } from '../models/ICreatePet';
import { IPet } from '../models/IPet';
import { IPetResponse } from '../models/IPetResponse';

export interface PetsListParams {
  age?: number;
  species?: string;
  size?: string;
  gender?: string;
  page: number;
  limit: number;
}

export interface IPetsRepository {
  index({ age, species, size, gender, limit, page }: PetsListParams): Promise<IPetResponse>;
  findById(id: string): Promise<IPet | null>;
  create(orgId: string, data: ICreatePet): Promise<IPet>;
  update(id: string, data: ICreatePet): Promise<IPet>;
  remove(id: string): Promise<void>;
}
