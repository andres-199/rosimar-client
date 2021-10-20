import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoriesComponent } from './categories.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { DinamycCrudModule } from '../components/dinamyc-crud/dinamyc-crud.module';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagesModule } from '../components/images/images.module';

const routes: Routes = [{ path: '', component: CategoriesComponent }];

@NgModule({
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    DinamycCrudModule,
    MatDialogModule,
    ImagesModule,
  ],
})
export class CategoriesModule {}
