import { IPet } from './IPet';

export interface IPetResponse {
  currentPage: number;
  pageSize: number;
  total: number | null;
  pets: IPet[] | null;
}
