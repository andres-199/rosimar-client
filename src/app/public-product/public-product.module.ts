import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicProductComponent } from './public-product.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{ path: ':id', component: PublicProductComponent }];

@NgModule({
  declarations: [PublicProductComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PublicProductModule {}
