import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Brand } from './interfaces/brand.interface';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

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
}
