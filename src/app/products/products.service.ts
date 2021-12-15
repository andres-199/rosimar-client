import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from '../categories/interfaces/categoria.interface';
import { Brand } from './interfaces/brand.interface';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  get offers$() {
    const url = environment.BACKEND_URL + 'products/offers';
    return this.http.get<Product[]>(url);
  }

  get brands$() {
    const url = environment.BACKEND_URL + 'brands';
    return this.http.get<Brand[]>(url);
  }

  get produtcs$() {
    const url = environment.BACKEND_URL + 'products';
    return this.http.get<Product[]>(url);
  }

  update(product: Product) {
    const url = environment.BACKEND_URL + 'products';
    return this.http.put(url, product);
  }

  getProductsByCategory(categoryId: number) {
    const url = `${environment.BACKEND_URL}categories/${categoryId}/products`;
    return this.http.get<Product[]>(url);
  }

  getBrandsByCategory(categoryId: number) {
    const url = `${environment.BACKEND_URL}categories/${categoryId}/products/brands`;
    return this.http.get<Brand[]>(url);
  }
}
