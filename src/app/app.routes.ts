import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./users/users.module').then((r) => r.UsersModule),
  },
];
export default routes;
