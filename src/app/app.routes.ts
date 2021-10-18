import { Routes } from '@angular/router';

const routes: Routes = [
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
export default routes;
