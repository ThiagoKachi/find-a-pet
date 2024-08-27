import { ICreateSession } from '../models/ICreateSession';
import { ISession } from '../models/ISession';

export interface ISessionsRepository {
  create(data: ICreateSession): Promise<ISession>;
}
