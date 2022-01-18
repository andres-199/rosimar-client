import { Imagen } from 'src/app/components/images/interfaces/imagen.interface';

export interface Company {
  id?: number;
  mision?: string;
  vision?: string;
  corporate_values?: string;
  images?: Imagen[];
  monday_to_friday: string;
  saturday: string;
  phone: string;
  whatsapp: string;
  direction: string;
  email: string;
}
