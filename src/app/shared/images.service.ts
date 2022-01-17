import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imagen } from '../components/images/interfaces/imagen.interface';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private http: HttpClient) {}

  create(image: Imagen) {
    const url = environment.BACKEND_URL + 'images';
    return this.http.post(url, image);
  }

  update(image: Imagen) {
    const url = environment.BACKEND_URL + 'images';
    return this.http.put(url, image);
  }

  delete(image: Imagen) {
    const url = environment.BACKEND_URL + 'images/' + image.id;
    return this.http.delete(url);
  }

  findOne(name: string) {
    const url = environment.BACKEND_URL + 'images/one/' + name;
    return this.http.get<Imagen>(url);
  }

  findMultiple(name: string) {
    const url = environment.BACKEND_URL + 'images/' + name;
    return this.http.get<Imagen[]>(url);
  }
}
