import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { RouterModule, Routes } from '@angular/router';
import { IvyCarouselModule } from 'angular-responsive-carousel';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { ImagesModule } from '../components/images/images.module';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

const routes: Routes = [{ path: '', component: CompanyComponent }];

@NgModule({
  declarations: [CompanyComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    IvyCarouselModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    ImagesModule,
    MatProgressSpinnerModule,
  ],
})
export class CompanyModule {}
