import { ICreateOrg } from '../models/ICreateOrg';
import { IOrg } from '../models/IOrg';

export interface IOrgsRepository {
  // Filters
  findAll(): Promise<IOrg>;
  findById(id: string): Promise<IOrg | null>;
  findByEmail(email: string): Promise<IOrg | null>;
  create(data: ICreateOrg): Promise<IOrg>;
  update(data: ICreateOrg): Promise<IOrg>;
  remove(customer: IOrg): Promise<void>;
}
