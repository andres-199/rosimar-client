import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {
  Col,
  DropdownOption,
  FormField,
} from '../components/dinamyc-crud/dinamyc-crud.component';
import { CategoriesService } from './categories.service';
import { Category } from './interfaces/categoria.interface';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  public columnsToDisplay = ['name', 'type', 'options'];

  public cols: Col[] = [
    { header: 'NOMBRE', field: 'name' },
    { header: 'TIPO DE CATEGORÍA', field: 'type' },
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

  public origin = 'categories';

  constructor(private categoriesService: CategoriesService) {}

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
      category.type = category.is_primary ? 'Primaria' : 'Secundaria';
      return category;
    });
  }
}
