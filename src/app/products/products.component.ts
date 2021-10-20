import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {
  Col,
  DinamycCrudComponent,
  FormField,
  MenuOption,
} from '../components/dinamyc-crud/dinamyc-crud.component';
import { ImagesComponent } from '../components/images/images.component';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { Product } from './interfaces/product.interface';
import { ProductsService } from './products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  public columnsToDisplay = ['name', 'type', 'images', 'options'];

  public cols: Col[] = [
    { header: 'CATEGORÍA', field: 'Category' },
    { header: 'NOMBRE', field: 'name' },
    { header: 'DESCRIPCIÓN', field: 'description' },
    { header: 'IMAGENES', field: 'images', type: 'image' },
  ];

  public formFields: FormField[] = [
    { name: 'name', label: 'Nombre' },
    {
      name: 'is_primary',
      label: 'Tipo de Categoría',
      type: 'dropdown',
      options: [
        { label: 'Primaria', value: true },
        { label: 'Secundaria', value: false },
      ],
    },
  ];

  public origin = 'products';

  menuOptions: MenuOption[] = [
    {
      icon: 'linked_camera',
      label: 'Imagenes',
      handler: (product) => this.onClickImages(product),
    },
  ];

  @ViewChild(DinamycCrudComponent) dinamycCrud?: DinamycCrudComponent;
  constructor(
    private dialog: MatDialog,
    private productService: ProductsService
  ) {}

  ngOnInit(): void {}

  onLoadDataSource(products: Product[]) {
    products = products.map((product) => {
      product.Category = product.Category?.name as any;
      product.images = product.images?.map((img) => ({
        ...img,
        path: img.path?.replace('original', 'pequeno'),
      }));
      return product;
    });
  }

  private onClickImages(product: Product) {
    const imagenes = product.images;
    const title = product.name;
    const data = { imagenes, title };

    const dialogRef = this.dialog.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        product.images = images;
        this.updateProduct(product);
      },
    });
  }

  private updateProduct(product: Product) {
    this.productService.update(product).subscribe({
      next: () => {
        this.dinamycCrud?.showMsg('Producto actualizado');
        this.dinamycCrud?.getDataSource();
      },
    });
  }
}
