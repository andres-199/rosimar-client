import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from './interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  get produtcs$() {
    const url = environment.BACKEND_URL + 'products';
    return this.http.get(url);
  }

  update(product: Product) {
    const url = environment.BACKEND_URL + 'products';
    return this.http.put(url, product);
  }
}
