import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { CategoriesService } from '../categories/categories.service';
import { Category } from '../categories/interfaces/categoria.interface';
import { ImagesComponent } from '../components/images/images.component';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { Offer } from '../offers/interfaces/offer.interface';
import { Product } from '../products/interfaces/product.interface';
import { ImagesService } from '../shared/images.service';
import { UsersService } from '../users/users.service';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  gif?: Imagen;
  editable?: Imagen;
  banners?: Imagen[];
  categories?: Category[] = [];
  offers?: Offer[];
  loadingGif = false;
  loadingBanner = false;
  loadingEditable = false;
  isLogedIn = false;
  constructor(
    private homeService: HomeService,
    private categoryService: CategoriesService,
    private router: Router,
    private userService: UsersService,
    private dialogRef: MatDialog,
    private imageService: ImagesService
  ) {}

  ngOnInit(): void {
    this.isLogedIn = this.userService.isLogedIn;
    this.getGif();
    this.getEditable();
    this.getBanners();

    this.categoryService.primaryCategories$.subscribe({
      next: (categories) => (this.categories = categories),
    });

    this.homeService
      .getOffers(4)
      .subscribe({ next: (offers) => (this.offers = offers) });
  }

  private getEditable() {
    this.homeService.getImage('editable').subscribe({
      next: (image) => {
        this.loadingEditable = false;
        this.editable = image;
      },
    });
  }

  private getBanners() {
    this.homeService.getImages('banner').subscribe({
      next: (images) => {
        this.loadingBanner = false;
        this.banners = images;
      },
    });
  }

  private getGif() {
    this.homeService.getImage('gif').subscribe({
      next: (image) => {
        this.loadingGif = false;
        this.gif = image;
      },
    });
  }

  onClickCategory(category: Category) {
    this.router.navigate(['products', category.id]);
  }

  onClickProduct(product: Product) {
    this.router.navigate(['product', product.id]);
  }

  onClickAddGif() {
    this.loadingGif = true;
    let imageId: number;
    let images;

    if (this.gif) {
      images = [this.gif];
      imageId = this.gif.id as number;
    }

    images = images || [];
    const title = 'Imagen';
    const data = { imagenes: images, title, max: 1, path: 'upload' };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        if (!images) {
          this.loadingGif = false;
          return;
        }

        const image = images[0] || {};
        image.id = imageId;
        image.name = 'gif';
        const action = !images.length
          ? 'delete'
          : imageId
          ? 'update'
          : 'create';

        this.imageService[action](image).subscribe({
          next: (reponse) => {
            this.getGif();
          },
          error: () => {
            this.loadingGif = false;
          },
        });
      },
    });
  }

  handleUploadBanners(banners: Imagen[]) {
    let observers: Observable<any>[] = [];
    for (const banner of banners) {
      if (!banner.id) {
        banner.name = 'banner';
        const observer = this.imageService.create(banner);
        observers.push(observer);
      }
    }

    if (this.banners)
      for (const banner of this.banners) {
        const found = banners.find((image) => image.id === banner.id);
        if (!found) {
          const observer = this.imageService.delete(banner);
          observers.push(observer);
        }
      }

    forkJoin(observers).subscribe({
      next: (reponse) => {
        this.getBanners();
      },
      error: () => {
        this.loadingBanner = false;
      },
    });
  }

  onClickAddBanner() {
    this.loadingBanner = true;
    let images;

    images = this.banners || [];
    const title = 'Banner';
    const data = { imagenes: images, title, max: 3 };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (imgs: Imagen[]) => {
        if (!imgs) {
          this.loadingBanner = false;
          return;
        }
        this.handleUploadBanners(imgs);
      },
    });
  }

  onClickAddEditable() {
    this.loadingEditable = true;
    let imageId: number;
    let images;

    if (this.editable) {
      images = [this.editable];
      imageId = this.editable.id as number;
    }

    images = images || [];
    const title = 'Imagen';
    const data = { imagenes: images, title, max: 1 };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        if (!images) {
          this.loadingEditable = false;
          return;
        }

        const image = images[0] || {};
        image.id = imageId;
        image.name = 'editable';
        const action = !images.length
          ? 'delete'
          : imageId
          ? 'update'
          : 'create';

        this.imageService[action](image).subscribe({
          next: (reponse) => {
            this.getEditable();
          },
          error: () => {
            this.loadingEditable = false;
          },
        });
      },
    });
  }
}
