import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';
import { ImageService } from './image.service';
import { Imagen } from './interfaces/imagen.interface';

@Component({
  selector: 'app-images',
  templateUrl: './images.component.html',
  styleUrls: ['./images.component.css'],
})
export class ImagesComponent implements OnInit {
  imagenes: Imagen[] = [];
  title: string = '';
  iLoading = false;
  max = 4;
  path?: string;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private imageService: ImageService
  ) {}

  ngOnInit(): void {
    this.imagenes = this.data.imagenes;
    this.title = this.data.title;
    this.max = this.data.max ? this.data.max : this.max;
    this.path = this.data.path;
    this.validateImages();
  }

  onLoadImage(e: any) {
    const files = e.target.files;
    if (files?.length) {
      this.iLoading = true;
      this.imageService.uploadImg(files[0], this.path).subscribe({
        next: (images) => {
          if (this.imagenes.length === this.max)
            this.deleteImage(this.imagenes[0]);
          this.saveImage(images[0]);
          this.iLoading = false;
        },
        error: (err) => {},
      });
    }
  }

  deleteImage(image: Imagen) {
    const index = this.imagenes.indexOf(image);
    this.imagenes.splice(index, 1);
    this.validateImages();
  }

  private saveImage(image: Imagen) {
    if (this.imagenes.length === 1 && this.imagenes[0].is_empty) {
      this.imagenes[0] = image;
    } else {
      this.imagenes.push(image);
    }
    this.validateImages();
  }

  private validateImages() {
    if (!this.imagenes) return this.setAddImage();
    if (!this.imagenes.length) return this.setAddImage();
    this.imagenes = this.imagenes.map((imagen) => {
      if (!imagen.path?.includes('http'))
        imagen.path =
          environment.STORAGE_URL + imagen.path?.replace('original', 'pequeno');
      return imagen;
    });
  }

  private setAddImage() {
    this.imagenes = [
      {
        name: 'Cargar Imagen',
        path: 'assets/img/add-image.jpg',
        is_empty: true,
      },
    ];
  }

  get originalImages() {
    return this.imagenes
      .filter((img) => !img.is_empty)
      .map((img) => ({
        ...img,
        path: img.path?.replace('pequeno', 'original'),
      }));
  }
}
