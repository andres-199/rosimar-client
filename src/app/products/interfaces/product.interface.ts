import { Category } from 'src/app/categories/interfaces/categoria.interface';
import { Imagen } from 'src/app/components/images/interfaces/imagen.interface';
import { Brand } from './brand.interface';

export interface Product {
  id?: number;
  name: string;
  description?: string;
  brand_id?: number;
  category_id?: number;
  primary_category_id?: number;
  Category: Category;
  images: Imagen[];
  Brand?: Brand;
  weight?: string;
  quantity?: number;
  unit?: string;
}
