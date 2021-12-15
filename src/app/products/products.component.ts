import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { forkJoin } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesService } from '../categories/categories.service';
import {
  Col,
  DinamycCrudComponent,
  DropdownOption,
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
  public columnsToDisplay = [
    'Brand',
    'Category',
    'name',
    'weight',
    'images',
    'description',
    'options',
  ];

  public cols: Col[] = [
    { header: 'MARCA', field: 'Brand' },
    { header: 'CATEGORÍA', field: 'Category' },
    { header: 'NOMBRE', field: 'name' },
    { header: 'PESO', field: 'weight', width: '10%' },
    { header: 'DESCRIPCIÓN', field: 'description', width: '20%' },
    { header: 'IMAGENES', field: 'images', type: 'image' },
  ];

  public formFields: FormField[] = [
    { name: 'name', label: 'Nombre' },
    { name: 'quantity', label: 'Peso', type: 'number' },
    {
      name: 'unit',
      label: 'Unidad de medida',
      type: 'dropdown',
      options: [
        { label: 'kg', value: 'kg' },
        { label: 'g', value: 'g' },
        { label: 'mg', value: 'mg' },
      ],
    },
    { name: 'description', label: 'Descripción', type: 'textArea' },
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
    private productService: ProductsService,
    private categoriesService: CategoriesService
  ) {}

  onClickEdit(product: Product) {
    if (product.primary_category_id)
      this.onSelectCategory(product.primary_category_id);
  }

  onSelectCategory(categoryId: number) {
    this.categoriesService
      .getSubCategories(categoryId)
      .pipe(
        map((categories) =>
          categories.map<DropdownOption>((category) => ({
            label: category.name,
            value: category.id,
          }))
        )
      )
      .subscribe({
        next: (categories) => {
          const CategoryField: FormField = {
            name: 'category_id',
            type: 'dropdown',
            options: categories,
            label: 'Subcategoría',
          };
          const found = this.formFields.find(
            (field) => field.name === 'category_id'
          );
          const deleteCount = found ? 1 : 0;
          this.formFields.splice(2, deleteCount, CategoryField);
        },
      });
  }

  ngOnInit(): void {
    const brands$ = this.productService.brands$.pipe(
      map((brands) =>
        brands.map<DropdownOption>((brand) => ({
          label: brand.name,
          value: brand.id,
        }))
      )
    );

    const categories$ = this.categoriesService.primaryCategories$.pipe(
      map((categories) =>
        categories.map<DropdownOption>((category) => ({
          label: category.name,
          value: category.id,
        }))
      )
    );

    forkJoin([brands$, categories$]).subscribe({
      next: ([brands, categories]) => {
        const brandField: FormField = {
          name: 'brand_id',
          type: 'dropdown',
          options: brands,
          label: 'Marca',
        };
        const CategoryField: FormField = {
          name: 'primary_category_id',
          type: 'dropdown',
          options: categories,
          label: 'Categoría Principal',
          onChange: (categoryId) => this.onSelectCategory(categoryId),
        };
        this.formFields.unshift(brandField, CategoryField);
      },
    });
  }

  onLoadDataSource(products: Product[]) {
    products = products.map((product) => {
      product.Category = product.Category?.name as any;
      product.Brand = product.Brand?.name as any;
      product.images = product.images?.map((img) => ({
        ...img,
        path: img.path?.replace('original', 'pequeno'),
      }));
      product.weight = `${product.quantity || ''} ${product.unit || ''}`;
      return product;
    });
  }

  private onClickImages(product: Product) {
    const imagenes = product.images;
    const title = product.name;
    const data = { imagenes, title, max: 1 };

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
