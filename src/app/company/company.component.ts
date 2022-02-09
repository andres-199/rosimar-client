import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Image } from 'angular-responsive-carousel';
import { tap } from 'rxjs/operators';
import { ImagesComponent } from '../components/images/images.component';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { CommonService } from '../services/common.service';
import { UsersService } from '../users/users.service';
import { CompanyService } from './company.service';
import { Company } from './interfaces/company.interface';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css'],
})
export class CompanyComponent implements OnInit {

  company?: Company;
  images: Image[] = [];
  loading = false;
  isLogedIn = false;

  constructor (
    private companyService: CompanyService,
    private userService: UsersService,
    private dialogRef: MatDialog,
    public commonService: CommonService,
  ) { }

  ngOnInit (): void {
    this.isLogedIn = this.userService.isLogedIn;
    this.getCompany();
  }

  getCompany () {
    this.companyService.company$
      .pipe(
        tap((company) => {
          company?.images?.forEach((imagen) =>
            this.images.push({ path: imagen.path as string })
          );
        })
      )
      .subscribe({
        next: (company) => {
          this.loading = false;
          this.company = company;
        },
        error: (e) => {
          this.loading = false;
        },
      });
  }

  onClickAddimage () {
    this.loading = true;
    let images;

    images = this.company?.images || [];
    const title = 'Imagenes';
    const data = { imagenes: images, title, max: 3 };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (imgs: Imagen[]) => {
        if (!imgs) {
          this.loading = false;
          return;
        }
        if (this.company) {
          this.company.images = imgs;
          this.companyService.update(this.company).subscribe({
            next: (response) => {
              this.getCompany();
            },
            error: (e) => {
              this.loading = false;
            },
          });
        }
      },
    });
  }
}
