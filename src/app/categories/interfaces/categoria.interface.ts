import { Imagen } from 'src/app/components/images/interfaces/imagen.interface';

export interface Category {
  id?: number;
  name: string;
  images: Imagen[];
  is_primary?: boolean;
  type?: string;
}
