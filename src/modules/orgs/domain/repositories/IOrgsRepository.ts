import { ICreateOrg } from '../models/ICreateOrg';
import { IOrg } from '../models/IOrg';

export interface ListParams {
  name?: string;
  city?: string;
}

export interface IOrgsRepository {
  index({ city, name }: ListParams): Promise<IOrg[]>;
  findById(id: string): Promise<IOrg | null>;
  findByEmail(email: string): Promise<IOrg | null>;
  create(data: ICreateOrg): Promise<IOrg>;
  update(id: string, data: ICreateOrg): Promise<IOrg>;
  remove(id: string): Promise<void>;
}
