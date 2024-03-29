import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class CrudService {
  private urlBase = environment.BACKEND_URL;
  constructor(private http: HttpClient) {}

  public findAll<T>(origin: string) {
    const url = this.urlBase + origin;
    return this.http.get<T[]>(url);
  }

  public create(origin: string, data: any) {
    const url = this.urlBase + origin;
    return this.http.post(url, data);
  }

  public update(origin: string, data: any) {
    const url = this.urlBase + origin;
    return this.http.put(url, data);
  }

  public delete(origin: string) {
    const url = this.urlBase + origin;
    return this.http.delete(url);
  }
}
