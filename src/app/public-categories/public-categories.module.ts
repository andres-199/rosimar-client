import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicCategoriesComponent } from './public-categories.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: PublicCategoriesComponent,
  },
];

@NgModule({
  declarations: [PublicCategoriesComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class PublicCategoriesModule {}
