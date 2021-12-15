import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProductComponent } from './public-product.component';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

const routes: Routes = [{ path: ':id', component: PublicProductComponent }];

@NgModule({
  declarations: [PublicProductComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatCardModule,
    MatDividerModule,
  ],
})
export class PublicProductModule {}
