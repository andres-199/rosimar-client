import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicCategoriesComponent } from './public-categories.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [
  {
    path: '',
    component: PublicCategoriesComponent,
  },
];

@NgModule({
  declarations: [PublicCategoriesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), MatButtonModule],
})
export class PublicCategoriesModule {}
