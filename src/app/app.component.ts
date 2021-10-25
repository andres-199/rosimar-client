import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoginPage = false;
  isAdminRoutes?: boolean;
  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isLoginPage =
          e.url.includes('login') || e.urlAfterRedirects.includes('login');
        this.isAdminRoutes =
          e.url.includes('admin') || e.urlAfterRedirects.includes('admin');
      });
  }
}
