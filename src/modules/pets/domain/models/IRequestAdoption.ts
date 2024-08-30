export interface IRequestAdoption {
  petId: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
  instagramURL?: string;
  consent: boolean;
}
