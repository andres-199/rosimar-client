import { Person } from './person.interface';

export interface User {
  Person: Person;
  id: number;
  password: string;
  person_id: number;
  rol_id: number;
  username: string;
}
