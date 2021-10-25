import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';

  constructor(
    private usersService: UsersService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit() {
    if (!this.username || !this.password) return false;
    return this.login();
  }

  private login() {
    this.usersService.login(this.username, this.password).subscribe({
      next: (res) => {
        if (res.access_token) {
          localStorage.setItem('access_token', res.access_token);
          this.router.navigate(['admin/products']);
        }
      },
      error: (e) => {
        const message = 'Usuario o Contraseña incorrectos';
        this.snackBar.open(message, 'Aceptar');
      },
    });
  }
}
