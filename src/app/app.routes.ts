import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'categories',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((r) => r.UsersModule),
    canActivate: [LoginGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((r) => r.LoginModule),
    canActivate: [LogoutGuard],
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((r) => r.CategoriesModule),
    canActivate: [LoginGuard],
  },
];
export default routes;
