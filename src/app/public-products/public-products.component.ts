import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSelectionList } from '@angular/material/list';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/interfaces/categoria.interface';
import { ImagesComponent } from '../components/images/images.component';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { Brand } from '../products/interfaces/brand.interface';
import { Product } from '../products/interfaces/product.interface';
import { ProductsService } from '../products/products.service';
import { ImagesService } from '../shared/images.service';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-public-products',
  templateUrl: './public-products.component.html',
  styleUrls: ['./public-products.component.css'],
})
export class PublicProductsComponent implements OnInit {
  itemsPerPage = 28;
  actualPage = 1;
  categoryId?: any;
  categories?: Category[];
  products?: Product[];
  brands?: Brand[];
  category?: Category;
  weights: { quantity?: number; unit?: string }[] = [];
  filter: {
    category?: number[];
    brand?: number[];
    weight?: { unit: string; quantity: number }[];
  } = {};
  isLogedIn = false;
  loading = false;

  @ViewChild('categoryList') categoryList?: MatSelectionList;
  @ViewChild('brandList') brandList?: MatSelectionList;
  @ViewChild('weightList') weightList?: MatSelectionList;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private categoriesService: CategoriesService,
    private router: Router,
    private imageService: ImagesService,
    private dialogRef: MatDialog,
    private userService: UsersService
  ) {}

  ngOnInit(): void {
    this.categoryId = this.activatedRoute.snapshot.params.categoryId;
    this.isLogedIn = this.userService.isLogedIn;
    if (this.categoryId === 'offers') this.getOffers();
    else this.getProducts();

    this.getBrands();
    this.getCategories();
    this.getCategory();
  }

  onSelectCategory() {
    if (this.categoryList) {
      const selectedOptions = this.categoryList.options.filter(
        (option) => option.selected
      );
      this.filter.category = selectedOptions.map((op) => op.value.id);
      this.getProductsFiltered();
    }
  }

  onSelectBrand() {
    if (this.brandList) {
      const selectedOptions = this.brandList.options.filter(
        (option) => option.selected
      );
      this.filter.brand = selectedOptions.map((op) => op.value.id);
      this.getProductsFiltered();
    }
  }

  onSelectWeight() {
    if (this.weightList) {
      const selectedOptions = this.weightList.options.filter(
        (option) => option.selected
      );
      this.filter.weight = selectedOptions.map((op) => op.value);
      this.getProductsFiltered();
    }
  }

  private getCategory() {
    if (this.categoryId === 'offers') {
      this.category = { name: 'Ofertas', images: [{}] };
      this.imageService.findOne('offers').subscribe({
        next: (res) => {
          this.loading = false;
          if (res?.id) {
            this.category?.images.push(res);
          }
        },
        error: () => {
          this.loading = false;
        },
      });
      return;
    }
    this.categoriesService.getById(this.categoryId as number).subscribe({
      next: (category) => {
        this.category = category;
      },
    });
  }

  private getCategories() {
    this.categoriesService
      .getSubCategories(this.categoryId as number)
      .subscribe({
        next: (categories) => {
          this.categories = categories;
        },
      });
  }

  private getBrands() {
    if (this.categoryId === 'offers') return;
    this.productsService
      .getBrandsByCategory(this.categoryId as number)
      .subscribe({
        next: (brands) => {
          this.brands = brands;
        },
      });
  }

  private getOffers() {
    this.productsService.offers$.subscribe({
      next: (products) => {
        this.products = products;
      },
    });
  }

  private getProductsFiltered() {
    if (
      !this.filter.brand?.length &&
      !this.filter.category?.length &&
      !this.filter.weight?.length
    )
      return this.getProducts();
    this.productsService
      .getProductsFiltered(this.categoryId as number, this.filter)
      .subscribe({
        next: (products) => {
          this.actualPage = 1;
          this.products = products;
          this.createFilters();
        },
      });
  }

  private getProducts() {
    this.productsService
      .getProductsByCategory(this.categoryId as number)
      .subscribe({
        next: (products) => {
          this.products = products;
          this.createFilters();
        },
      });
  }

  private createFilters() {
    if (this.products) {
      this.products.forEach((product) => {
        const found = this.weights.find(
          (weight) =>
            weight.quantity === product.quantity && weight.unit === product.unit
        );

        if (!found && product.quantity) {
          this.weights.push({
            quantity: product.quantity,
            unit: product.unit,
          });
        }
      });
      this.weights = this.weights.sort((a, b) => {
        if (a.unit === b.unit) return (a.quantity || 0) - (b.quantity || 0);
        if (a.unit === 'mg' && b.unit !== a.unit) return -1;
        if (a.unit === 'g' && b.unit === 'kg') return -1;
        return 1;
      });
    }
  }

  getImagePath(category?: Category) {
    let path = '';
    if (category?.images) {
      if (category.images.length && category.images.length > 1) {
        path = category.images[1].path as string;
      }
    }
    return path;
  }

  onClickProduct(product: Product) {
    this.router.navigate(['product', product.id]);
  }

  onClickAddOfferImage() {
    this.loading = true;
    let imageId: number;
    let images;
    if (this.category?.images)
      if (this.category?.images.length > 1) {
        images = [this.category?.images[1]];
        imageId = images[0].id as number;
      }

    images = images || [];
    const title = 'Ofertas';
    const data = { imagenes: images, title, max: 1, path: 'upload' };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        if (!images) {
          this.loading = false;
          return;
        }

        const image = images[0] || {};
        image.id = imageId;
        image.name = 'offers';
        const action = !images.length
          ? 'delete'
          : imageId
          ? 'update'
          : 'create';

        this.imageService[action](image).subscribe({
          next: (reponse) => {
            this.getCategory();
          },
          error: () => {
            this.loading = false;
          },
        });
      },
    });
  }
}
