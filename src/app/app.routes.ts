import { Routes } from '@angular/router';
import { LoginGuard } from './guards/login.guard';
import { LogoutGuard } from './guards/logout.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    children: [
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((r) => r.UsersModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'categories',
        loadChildren: () =>
          import('./categories/categories.module').then(
            (r) => r.CategoriesModule
          ),
        canActivate: [LoginGuard],
      },
      {
        path: 'products',
        loadChildren: () =>
          import('./products/products.module').then((r) => r.ProductsModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'offers',
        loadChildren: () =>
          import('./offers/offers.module').then((r) => r.OffersModule),
        canActivate: [LoginGuard],
      },
      {
        path: 'brands',
        loadChildren: () =>
          import('./brands/brands.module').then((r) => r.BrandsModule),
        canActivate: [LoginGuard],
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((r) => r.LoginModule),
    canActivate: [LogoutGuard],
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((r) => r.HomeModule),
  },
];
export default routes;
