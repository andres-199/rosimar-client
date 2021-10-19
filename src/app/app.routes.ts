import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((r) => r.UsersModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((r) => r.LoginModule),
  },
  {
    path: 'categories',
    loadChildren: () =>
      import('./categories/categories.module').then((r) => r.CategoriesModule),
  },
];
export default routes;
