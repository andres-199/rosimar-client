import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Category } from './interfaces/categoria.interface';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  constructor(private http: HttpClient) {}

  get categories$() {
    const url = environment.BACKEND_URL + 'categories';
    return this.http.get<Category[]>(url);
  }

  get primaryCategories$() {
    const url = environment.BACKEND_URL + 'categories/primary';
    return this.http.get<Category[]>(url);
  }

  update(category: Category) {
    const url = environment.BACKEND_URL + 'categories';
    return this.http.put<Category>(url, category);
  }

  getSubCategories(categoryId: number) {
    const url =
      environment.BACKEND_URL + `categories/${categoryId}/subcategories`;
    return this.http.get<Category[]>(url);
  }

  getById(categoryId: number) {
    const url = `${environment.BACKEND_URL}categories/${categoryId}`;
    return this.http.get<Category>(url);
  }
}
