import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './interfaces/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  get primaryCategories$() {
    const url = environment.BACKEND_URL + 'categories/primary';
    return this.http.get<Category[]>(url);
  }

  update(category: Category) {
    const url = environment.BACKEND_URL + 'categories';
    return this.http.put<Category>(url, category);
  }
}
