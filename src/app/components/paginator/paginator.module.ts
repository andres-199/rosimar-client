import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginatorComponent } from './paginator.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [PaginatorComponent],
  imports: [CommonModule, MatIconModule],
  exports: [PaginatorComponent],
})
export class PaginatorModule {}
