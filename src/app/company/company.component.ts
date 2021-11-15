import { Component, OnInit } from '@angular/core';
import { Image } from 'angular-responsive-carousel';
import { tap } from 'rxjs/operators';
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
  constructor(private companyService: CompanyService) {}

  ngOnInit(): void {
    this.companyService.company$
      .pipe(
        tap((company) => {
          company?.images?.forEach((imagen) =>
            this.images.push({ path: imagen.path as string })
          );
        })
      )
      .subscribe({
        next: (company) => (this.company = company),
      });
  }
}
