import { Imagen } from 'src/app/components/images/interfaces/imagen.interface';

export interface Company {
  id?: number;
  mision?: string;
  vision?: string;
  corporate_values?: string;
  images?: Imagen[];
}
