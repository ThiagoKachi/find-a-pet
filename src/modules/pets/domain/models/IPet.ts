import { IPetsImages } from './IPetsImages';

export interface IPet {
  id: string;
  name: string;
  age: number;
  species: string;
  breed: string;
  size: string;
  gender: string;
  description: string | null;
  available: boolean;
  created_at: Date;
  updated_at: Date;
  orgId: string;
  petImages?: IPetsImages[];
}
