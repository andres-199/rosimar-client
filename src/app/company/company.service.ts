import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Company } from './interfaces/company.interface';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  constructor(private http: HttpClient) {}

  get company$() {
    const url = environment.BACKEND_URL + 'company';
    return this.http.get<Company[]>(url).pipe(map((companies) => companies[0]));
  }
}
