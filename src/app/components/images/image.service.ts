import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imagen } from './interfaces/imagen.interface';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  uploadImg(file: File, path: string = 'upload-img') {
    const url = environment.STORAGE_URL + path;
    console.log(url);

    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    return this.http.post<Imagen[]>(url, formData);
  }
}
