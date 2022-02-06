import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../categories/interfaces/categoria.interface';
import { CompanyService } from '../company/company.service';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/products.service';
import { CommonService } from '../services/common.service';

@Component({
  selector: 'app-public-product',
  templateUrl: './public-product.component.html',
  styleUrls: ['./public-product.component.css'],
})
export class PublicProductComponent implements OnInit {
  productId?: number;
  category?: Category;
  product?: Product;
  whatsapp: string[] = [];
  constructor (
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private router: Router,
    private companyService: CompanyService,
    public commonService: CommonService,
  ) { }

  ngOnInit (): void {
    this.productId = this.activatedRoute.snapshot.params.id;
    this.productsService.getById(this.productId as number).subscribe({
      next: (product) => {
        this.product = product;
        product.images[0].path = product.images[0].path?.replace(
          'pequeno',
          'original'
        );
      },
    });
    this.getCategory();
    this.getCompany();
  }

  private getCompany () {
    this.companyService.company$.subscribe({
      next: (company) => {
        this.whatsapp = company.whatsapp.split('/');
      },
    });
  }

  private getCategory () {
    this.productsService.getPimaryCategory(this.productId as number).subscribe({
      next: (category) => {
        this.category = category;
      },
    });
  }

  getImagePath (category?: Category) {
    let path = '';
    if (category?.images) {
      if (category.images.length && category.images.length > 1) {
        path = category.images[1].path as string;
      }
    }
    return path;
  }

  onClickProduct (product: Product) {
    this.router.navigate(['product', product.id]);
  }

  onClickWhatsapp () {
    window.location.href = `https://api.whatsapp.com/send?phone=+573157349102`;
  }
}
