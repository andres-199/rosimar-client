import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/interfaces/categoria.interface';

@Component({
  selector: 'app-public-categories',
  templateUrl: './public-categories.component.html',
  styleUrls: ['./public-categories.component.css'],
})
export class PublicCategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.categoryService.primaryCategories$.subscribe({
      next: (categories) => (this.categories = categories),
    });
  }

  getImagePath(category: Category) {
    let path = '';
    if (category.images) {
      if (category.images.length && category.images.length > 1) {
        path = category.images[1].path as string;
      }
    }
    return path;
  }

  onClickCategory(category: Category) {
    this.router.navigate(['products', category.id]);
  }
}
