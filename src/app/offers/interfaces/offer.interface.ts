import { Product } from 'src/app/products/interfaces/product.interface';

export interface Offer {
  id: number;
  product_id: number;
  Product: Product;
}
