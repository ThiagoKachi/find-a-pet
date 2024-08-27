import { IOrg } from './IOrg';

export interface IOrgAuthenticated {
  org: IOrg;
  token: string;
}
