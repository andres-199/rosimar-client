import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/interfaces/categoria.interface';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { Offer } from '../offers/interfaces/offer.interface';
import { Product } from '../products/interfaces/product.interface';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gif?: Imagen;
  banners?: Imagen[];
  categories?: Category[] = [];
  offers?: Offer[];
  constructor(
    private homeService: HomeService,
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.homeService.getImage('gif').subscribe({
      next: (image) => (this.gif = image),
    });

    this.homeService.getImages('banner').subscribe({
      next: (images) => (this.banners = images),
    });

    this.categoryService.primaryCategories$.subscribe({
      next: (categories) => (this.categories = categories),
    });

    this.homeService
      .getOffers(4)
      .subscribe({ next: (offers) => (this.offers = offers) });
  }

  onClickCategory(category: Category) {
    this.router.navigate(['products', category.id]);
  }

  onClickProduct(product: Product) {
    this.router.navigate(['product', product.id]);
  }
}
