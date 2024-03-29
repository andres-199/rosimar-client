import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Rol } from './interfaces/rol.interface';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient, private router: Router) {}

  get roles$() {
    const url = environment.BACKEND_URL + 'roles';
    return this.http.get<Rol[]>(url);
  }

  login(username: string, password: string) {
    const url = environment.BACKEND_URL + 'auth/login';
    return this.http.post<{ access_token: string }>(url, {
      username,
      password,
    });
  }

  logout() {
    localStorage.clear();
    setTimeout(() => {
      this.router.navigate(['home']);
    });
  }

  get token() {
    return localStorage.getItem('access_token');
  }

  get isLogedIn() {
    return !!this.token;
  }
}
