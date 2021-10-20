import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsComponent } from './brands.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module';

const routes: Routes = [{ path: '', component: BrandsComponent }];

@NgModule({
  declarations: [BrandsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    DinamycCrudModule,
  ],
})
export class BrandsModule {}
