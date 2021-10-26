import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { Offer } from '../offers/interfaces/offer.interface';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  constructor(private http: HttpClient) {}

  getImage(name: string) {
    const url = environment.BACKEND_URL + 'images/one/' + name;
    return this.http.get<Imagen>(url);
  }

  getImages(name: string) {
    const url = environment.BACKEND_URL + 'images/' + name;
    return this.http.get<Imagen[]>(url);
  }

  getOffers(limit: number) {
    const url = environment.BACKEND_URL + 'offers/multiple/' + limit;
    return this.http.get<Offer[]>(url);
  }
}
