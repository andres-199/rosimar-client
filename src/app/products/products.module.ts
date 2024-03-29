import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module';
import { ImagesModule } from '../components/images/images.module';

const routes: Routes = [{ path: '', component: ProductsComponent }];

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    DinamycCrudModule,
    ImagesModule,
  ],
})
export class ProductsModule {}
