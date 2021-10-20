import { Category } from 'src/app/categories/interfaces/categoria.interface';
import { Imagen } from 'src/app/components/images/interfaces/imagen.interface';

export interface Product {
  id?: number;
  name?: string;
  description?: string;
  brand_id?: number;
  category_id?: number;
  Category: Category;
  images: Imagen[];
}
