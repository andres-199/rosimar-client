import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs/operators';
import {
  Col,
  DinamycCrudComponent,
  DropdownOption,
  FormField,
  MenuOption,
} from '../components/dinamyc-crud/dinamyc-crud.component';
import { ImagesComponent } from '../components/images/images.component';
import { Imagen } from '../components/images/interfaces/imagen.interface';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/categoria.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public columnsToDisplay = ['name', 'type', 'images', 'options'];

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'name' },
    { header: 'TIPO DE CATEGORÍA', field: 'type' },
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
        { label: 'Subcategoría', value: false },
      ],
    },
  ];

  public origin = 'categories';

  menuOptions: MenuOption[] = [
    {
      icon: 'linked_camera',
      label: 'Imagenes',
      handler: (category) => this.onClickImages(category),
      hideIf: { option: 'is_primary', value: false },
    },
  ];

  @ViewChild(DinamycCrudComponent) dinamycCrud?: DinamycCrudComponent;
  constructor(
    private categoriesService: CategoriesService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.categoriesService.primaryCategories$
      .pipe(
        map((categories) =>
          categories.map<DropdownOption>((category) => ({
            label: category.name,
            value: category.id,
          }))
        )
      )
      .subscribe((options) => {
        const field: FormField = {
          name: 'category_id',
          type: 'dropdown',
          options,
          label: 'Categoría Principal',
          hideIf: { option: 'is_primary', value: true },
        };
        this.formFields.push(field);
      });
  }

  onLoadDataSource(categories: Category[]) {
    categories = categories.map((category) => {
      category.type = category.is_primary ? 'Primaria' : 'Subcategoría';
      category.images = category.images?.map((img) => ({
        ...img,
        path: img.path?.replace('original', 'pequeno'),
      }));
      return category;
    });
  }

  private onClickImages(category: Category) {
    const imagenes = category.images;
    const title = category.name;
    const data = { imagenes, title, max: 2 };

    const dialogRef = this.dialog.open(ImagesComponent, {
      data,
      minWidth: '500px',
      maxHeight: '700px',
    });

    dialogRef.afterClosed().subscribe({
      next: (images: Imagen[]) => {
        category.images = images;
        this.updateCategory(category);
      },
    });
  }

  private updateCategory(category: Category) {
    this.categoriesService.update(category).subscribe({
      next: () => {
        this.dinamycCrud?.showMsg('Categoría actualizada');
        this.dinamycCrud?.getDataSource();
      },
    });
  }
}
