import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { ImagesComponent } from './components/images/images.component';
import { Imagen } from './components/images/interfaces/imagen.interface';
import { HomeService } from './home/home.service';
import { ImagesService } from './shared/images.service';
import { UsersService } from './users/users.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLoginPage = false;
  isAdminRoutes?: boolean;
  loadingBanner = false;
  banner?: Imagen;
  catalogoQR?: Imagen;
  loadingCatalogo = false;
  isLogedIn = false;
  constructor(
    private router: Router,
    private homeService: HomeService,
    private dialogRef: MatDialog,
    private imageService: ImagesService,
    private userService: UsersService
  ) {}

  ngOnInit() {
    this.isLogedIn = this.userService.isLogedIn;
    this.getBanner();
    this.getCatalogo();
    this.router.events
      .pipe(filter((e) => e instanceof NavigationEnd))
      .subscribe((e: any) => {
        this.isLoginPage =
          e.url.includes('login') || e.urlAfterRedirects.includes('login');
        this.isAdminRoutes =
          e.url.includes('admin') || e.urlAfterRedirects.includes('admin');
      });
  }

  private getBanner() {
    this.homeService.getImage('banner-footer').subscribe({
      next: (image) => {
        this.loadingBanner = false;
        this.banner = image;
      },
      error: (e) => {
        this.loadingBanner = false;
      },
    });
  }

  private getCatalogo() {
    this.homeService.getImage('catalogo-qr').subscribe({
      next: (image) => {
        this.loadingCatalogo = false;
        this.catalogoQR = image;
      },
      error: (e) => {
        this.loadingCatalogo = false;
      },
    });
  }

  onClickWhatsapp() {
    window.location.href = `https://api.whatsapp.com/send?phone=+573157349102`;
  }

  onClickAddBanner() {
    this.loadingBanner = true;
    let imageId: number;
    let images;

    if (this.banner) {
      images = [this.banner];
      imageId = this.banner.id as number;
    }

    images = images || [];
    const title = 'Banner';
    const data = { imagenes: images, title, max: 1 };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        if (!images) {
          this.loadingBanner = false;
          return;
        }

        const image = images[0] || {};
        image.id = imageId;
        image.name = 'banner-footer';
        const action = !images.length
          ? 'delete'
          : imageId
          ? 'update'
          : 'create';

        this.imageService[action](image).subscribe({
          next: (reponse) => {
            this.getBanner();
          },
          error: () => {
            this.loadingBanner = false;
          },
        });
      },
    });
  }

  onClickAddCatalogo() {
    this.loadingCatalogo = true;
    let imageId: number;
    let images;

    if (this.catalogoQR) {
      images = [this.catalogoQR];
      imageId = this.catalogoQR.id as number;
    }

    images = images || [];
    const title = 'Catalogo QR';
    const data = { imagenes: images, title, max: 1 };

    const dialogRef = this.dialogRef.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        if (!images) {
          this.loadingCatalogo = false;
          return;
        }

        const image = images[0] || {};
        image.id = imageId;
        image.name = 'catalogo-qr';
        const action = !images.length
          ? 'delete'
          : imageId
          ? 'update'
          : 'create';

        this.imageService[action](image).subscribe({
          next: (reponse) => {
            this.getCatalogo();
          },
          error: () => {
            this.loadingCatalogo = false;
          },
        });
      },
    });
  }
}
