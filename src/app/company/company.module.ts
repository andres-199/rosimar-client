import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatCardModule } from '@angular/material/card';

const routes: Routes = [{ path: '', component: CompanyComponent }];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IvyCarouselModule,
    MatCardModule,
  ],
})
export class CompanyModule {}
