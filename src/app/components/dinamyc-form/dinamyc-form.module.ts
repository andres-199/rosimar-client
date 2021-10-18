import { NgModule } from '@angular/core'
import { CommonModule } from '@angular/common'
import { DinamycFormComponent } from './dinamyc-form.component'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatDialogModule } from '@angular/material/dialog'
import { FormsModule } from '@angular/forms'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatSelectModule } from '@angular/material/select'

@NgModule({
  declarations: [DinamycFormComponent],
  imports: [
    CommonModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    FormsModule,
    MatDatepickerModule,
    MatSelectModule,
  ],
  exports: [DinamycFormComponent],
})
export class DinamycFormModule {}
