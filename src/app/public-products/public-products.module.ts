import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProductsComponent } from './public-products.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { PaginatorModule } from '../components/paginator/paginator.module';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { ImagesModule } from '../components/images/images.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [
  { path: ':categoryId', component: PublicProductsComponent },
];

@NgModule({
  declarations: [PublicProductsComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatListModule,
    MatDividerModule,
    MatIconModule,
    PaginatorModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    MatExpansionModule,
    ImagesModule,
    MatProgressSpinnerModule,
  ],
})
export class PublicProductsModule { }
