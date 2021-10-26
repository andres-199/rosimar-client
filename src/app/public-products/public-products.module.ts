import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProductsComponent } from './public-products.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: ':categoryId', component: PublicProductsComponent },
];

@NgModule({
  declarations: [PublicProductsComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PublicProductsModule {}
