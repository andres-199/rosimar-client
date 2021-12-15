import { Imagen } from 'src/app/components/images/interfaces/imagen.interface';
import { Product } from 'src/app/products/interfaces/product.interface';

export interface Category {
  id?: number;
  name: string;
  images: Imagen[];
  is_primary?: boolean;
  type?: string;
  Product?: Product[];
}
